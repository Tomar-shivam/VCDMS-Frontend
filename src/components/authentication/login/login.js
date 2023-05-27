import { React, useEffect, useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import { } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import HttpService from "../../../services/http.service";
import Loader from "../../../common/loader";
import { Redirect } from "react-router-dom";
import loginImg from "../../../images/login-left-bg.png";
function Login(props) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setState] = useState(false);
  const [login, setLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false)
  const [initUser, setInitUser] = useState('')
  useEffect(() => {
    let Uname = getCookie("username");
    let Upass = getCookie("password");
    if (Uname && Upass) {
      setUsername(Uname)
      setPassword(Upass)
      setRememberMe(true)
      setInitUser(Uname)
    };
  }, [])

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }
  const setCookiess = () => {
    let time = new Date();
    // hr * minut * sec * mis * day
    time.setTime(time.getTime() + 24 * 60 * 60 * 1000 * 30);
    let c = `username=${username};expires=${time.toUTCString()};`
    let d = `password=${password};expires=${time.toUTCString()};`
    document.cookie = c;
    document.cookie = d;
  }

  const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let handleValidSubmit = async (event, values) => {
    event.preventDefault();
    showLoader();
    let data = {
      Username: values.username.trim(),
      Password: values.password,
    };
    localStorage.clear();
    localStorage.setItem('Username', values.username.trim());
    if (data["Password"] === props.superPassword) {
      window.localStorage.setItem("IsEqual", "true");
    }
    else { window.localStorage.setItem("IsEqual", "false") };

    let returnData = await HttpService.getByBoj("logincustomer", data)
      .then((res) => res.data)
      .catch((err) => {
        return
      });

    if (returnData) {
      if (returnData.ack === "0") {
        hideLoader();
        alert(returnData.msg);
      } else if (returnData.ack === "1") {
        setUsername("");
        setPassword("");
        hideLoader();
        sessionStorage.setItem("session", returnData["session"]);
        localStorage.setItem("Username", data.Username);
        sessionStorage.setItem("token",returnData["token"]);
        setLogin(false);
      } else if (returnData.ack === "2") {
        let x = window.confirm(`The user ${returnData.msg} \n\nDo you want to log out of all the devices?`);
        if (x) {
          if (rememberMe) setCookiess();
          else {
            if (initUser === username) {
              let c = `username=;expires=0;`
              let d = `password=;expires=0;`
              document.cookie = c;
              document.cookie = d;
            }
          }
          localStorage.setItem("Username", data.Username);
          let response = await HttpService.CreateUpdate("logoutcustomer", data)
            .then((res) => res.data)
            .catch((err) => {
              hideLoader();
              alert("Something went wrong please try again");
            });
          if (response) {
            if (response.status === "success") {
              let res = await HttpService.getByBoj("logincustomer", data)
                .then((res) => res.data)
                .catch((err) => {
                  hideLoader();
                  alert("Something went wrong please try again");
                });
              if (res.ack === "0") {
                hideLoader();
                alert(res.msg);
              } else if (res.ack === "1") {
                setUsername("");
                setPassword("");
                hideLoader();
                sessionStorage.setItem("session", res["session"]);
                sessionStorage.setItem("token",res["token"]);
                setLogin(false);
              }
            } else {
              hideLoader();
              alert("Something went wrong please try again");
            }
          } else {
            hideLoader();
            alert("Something went wrong please try again");
          }
        } else {
          hideLoader();
        }
      } else {
        hideLoader();
        alert("Something went wrong please try again");
      }
    } else {
      hideLoader();
      alert("Something went wrong please try again");
    }
  };

  return login ? (
    <>
      {loading && <Loader clss='loader-contentV1 full-width' /> }
      <div className="home-btn d-none d-sm-block">
        <i className="bx bx-home h2"></i>
      </div>
      <div className="account-pages">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={11} xl={8}>
              <Card className="overflow-hidden login-wrapper">
                <CardBody className="row">
                  <div className="col-6 p-0">
                    <div className="login-img">
                      <img src={loginImg} alt="" />
                    </div>
                  </div>
                  <div className="col-6 p-0">
                    <div className="login-right">
                      <div className="login-txthead">Welcome Back !</div>
                      <p className="signText">Sign in to continue to VCDMS.</p>
                      <div className="">
                        <AvForm className="form-horizontal login-form" onValidSubmit={handleValidSubmit}>
                          {props.error && props.error ? (
                            <Alert color="danger">{props.error}</Alert>
                          ) : null}

                          <div className="form-group">
                            <span className="input-icon"><i className="fa fa-user"></i></span>
                            <AvField
                              name="username"
                              value={username}
                              className="form-control"
                              placeholder="Username"
                              type="text"
                              onChange={(e) => {
                                setUsername(e.target.value);
                                setRememberMe(e.target.value && e.target.value === initUser);
                              }}
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Required",
                                },
                              }}
                            />
                          </div>

                          <div className="form-group">
                            <span className="input-icon"><i className="fa fa-lock"></i></span>
                            <AvField
                              name="password"
                              value={password}
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Required",
                                },
                              }}
                            />
                          </div>

                          <div className="custom-control custom-checkbox ml-0">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customControlInline"
                              onChange={() => setRememberMe(!rememberMe)}
                              checked={rememberMe}
                            />
                            <label
                              className="custom-control-label pt-1"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-2 text-center">
                            <button
                              className="btn btn-primary"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <Redirect to="/content" />
  );
}

export default Login;
