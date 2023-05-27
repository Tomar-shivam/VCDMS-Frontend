import { useState } from "react";
import "../addelement/addelement.css";
import httpService from "../../services/http.service"; import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";


let ChangePassword = (props) => {

  const history = useHistory();
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("cpassword")

  const getUser = async () => {
    var username_ = localStorage.getItem("Username");
    let data = {
      "Username": username_,
      "givenPassword": OldPassword,
      "NewPassword": NewPassword
    }
    const user = await httpService.verifyPassword('verifyPassword', data).catch(err => {
    })
    if (user.data.msg === "Password has been updated succesfully") {
      SuccessMessage("Password changed Successfully");
      return props.logoutClick();
    } else {
      ErrorMessage("Please enter correct password");
    }
    return user;
  }

  const savePassword = () => {
    if (NewPassword === ConfirmPassword) {
      getUser();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } else {
      ErrorMessage("The new password you entered does not match the confirm password");
    }
  }

  // const cancelClickHandler = () => {
  //   setOldPassword("");
  //   setNewPassword("");
  //   setConfirmPassword("");
  //   setActiveTab("profile")
  //   return (
  //     <Link
  //       to="/content/changepassword"
  //       className={
  //         "nav-link " + (activeTab === "profile" ? "active" : "")
  //       }
  //       aria-current="page"
  //       href="#"
  //     ></Link>
  //   )

  // }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light p-0 my-3">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav custom-tabs dashboard-navbar">
            <li className="nav-item">
              <Link
                to="/content/profile"
                className={
                  "nav-link " + (activeTab === "profile" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <i className="fa fa-user"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/content/changepassword"
                className={
                  "nav-link " + (activeTab === "cpassword" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <i className="fa fa-key"></i>
                Account Security
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            Change Password
          </div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Old Password : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="OldPassword"
                    placeholder="Old Password"
                    value={OldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    New Password : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="NewPassword"
                    placeholder="New Password"
                    value={NewPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      Confirm Password : <i style={{ color: "red" }}>*</i>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="ConfirmPassword"
                      placeholder="Confirm Password"
                      value={ConfirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button color="danger" className="btn change-pwd-btn marb-15 marl-15" onClick={(e) => {
              e.preventDefault();
              history.push("/dashboard");
            }}>
              Cancel
            </Button>
            <Button
              color="success"
              className="btn change-pwd-btn marl-15 marb-15 "
              onClick={(event) => savePassword(event)}
            >
              Save
            </Button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ChangePassword;