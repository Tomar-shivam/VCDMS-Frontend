import { React, useState } from 'react'
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import HttpService from '../../../services/http.service';
import Loader from '../../../common/loader';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Redirect, Link } from 'react-router-dom';


let Signup = (props) => {
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setState] = useState(false);
  let [redirect, setRedirect] = useState(false)

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let handleValidSubmit = async (event, values) => {

    event.preventDefault();
    showLoader();
    let data = {
      Username: values.username,
      Password: values.password,
      Email: values.email,
      Phone: values.phone
    }

    let returnData = await HttpService.CreateUpdate('saveregistration', data).then(res => res.data);

    if (returnData === "Customer has been registered Successfully.") {
      setEmail("");
      setUsername("");
      setPassword("");
      setPhone("");
      hideLoader();
      setRedirect(true)
      alert("User registered : " + values.username);
    } else {
      hideLoader();
      alert("User Already Exist.");
    }
  }

  return redirect ? <Redirect to="/login" /> : (
    <>
      {
        loading ? <Loader /> : null
      }

      <div className="home-btn d-none d-sm-block">
        <i className="bx bx-home h2"></i>
      </div>
      <div className="account-pages my-5 pt-sm-5 ">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={11} xl={9}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0 row padl-0">
                  <div className="col-7">
                    <div className="login-bgbox"></div>
                  </div>
                  <div className="col-5 login-rbox">

                    <div className="">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={handleValidSubmit}
                      >
                        {props.user && props.user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {props.registrationError &&
                          props.registrationError ? (
                          <Alert color="danger">
                            {props.registrationError}
                          </Alert>
                        ) : null}

                        <div className="form-group">
                          <AvField
                            name="username"
                            label="Username"
                            value={username}
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            validate={{
                              required: { value: true, errorMessage: "Required" }
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            validate={{
                              required: { value: true, errorMessage: "Required" }
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            value={email}
                            className="form-control"
                            placeholder="Enter Email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            validate={{
                              required: { value: true, errorMessage: "Required" }
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="phone"
                            label="Phone"
                            value={phone}
                            className="form-control"
                            placeholder="Enter Phone Number"
                            type="number"
                            onChange={e => setPhone(e.target.value)}
                            validate={{
                              required: { value: true, errorMessage: "Required" }
                            }}
                          />
                        </div>

                        <div className="mt-4">
                          <button

                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                        <p className="padt-txt">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            onClick={props.loginClick}
                            className="text-primary textCursor"
                          >
                            {" "}
                            Login
                          </Link>{" "}
                        </p>
                      </AvForm>

                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Signup