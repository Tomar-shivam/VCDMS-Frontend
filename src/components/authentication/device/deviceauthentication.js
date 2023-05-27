import React, { useEffect, useState } from "react";
import "./deviceauthentication.css";
import VCDMSService from "../../../services/http.service";
import { Redirect } from "react-router";
import Loader from '../../../common/loader';
import ErrorMessage from "../../../common/errorMsg";
import SuccessMessage from "../../../common/successMsg";
let DeviceAuthentication = (props) => {
  const [password, setPassword] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [redirect, setRedirect] = useState(false);
  let [loading, setState] = useState(false);
  useEffect(() => {
    setNextUrl(
      localStorage.getItem("nextUrl") ? localStorage.getItem("nextUrl") : ""
    );
  }, []);

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  const changePassword = async (event) => {
    event.preventDefault();
    showLoader();
    let data = {
      IP: props.IP,
      _id: props.ID,
      Password: password,
      Module: props.device,
      ActionTime: new Date(),
      ActionType: "Update Password",
      Username: props.customerData.Username,
      Target: props.IP,
    };

    let res = null;
    if (props.device === "ellvis") {
      res = await VCDMSService.getByBoj("setellvispassword", data)
        .then((res) => res.data)
        .catch((err) => null);
    } else if (props.device === "encoder") {
      res = await VCDMSService.getByBoj("setencoderpassword", data)
        .then((res) => res.data)
        .catch((err) => null);
    } else if (props.device === "stream") {
      res = await VCDMSService.getByBoj("setstreampassword", data)
        .then((res) => res.data)
        .catch((err) => null);
    }
    if (res) {
      if (res.ack === "1") {
        hideLoader();
        SuccessMessage(res.message);
        setRedirect(true);
        props.getAllDevices();
      } else {
        hideLoader();
        ErrorMessage(res.message);
      }
    } else {
      hideLoader();
      ErrorMessage("Something went wrong please try again");
    }
  };
  if (redirect) {
    return <Redirect to={nextUrl} />;
  }
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="passworddiv">
        <div className="passworddivheading">
          Set Password
        </div>
        <div className="formdiv-setpassword">
          <form>
            <div class="form-group">
              <label className="form-check-label" for="exampleInputPassword1">Password:</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              class="btn btn-success"
              onClick={(event) => changePassword(event)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeviceAuthentication;
