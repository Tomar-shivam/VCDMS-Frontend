import React, { useState, useEffect } from "react";
import "./legacydevice.css";
import HttpService from "../../src/services/http.service";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../src/common/loader";
import { Redirect } from "react-router";
import ErrorMessage from '../common/errorMsg'
import SuccessMessage from '../common/successMsg'

let LegacyDevice = (props) => {
  let deviceindex = props.deviceindex;
  const [beforecolor, setBeforeColor] = useState("");
  const [statuscolor, setStatusColor] = useState("");
  const [managementIPdata, setManagementIPdata] = useState("");
  const [mgmtIp, setMgmtIp] = useState("");
  const [editMgmtIp, setEditMgmtIp] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordMgmt, setpasswordMgmt] = useState("");
  const [nexturl, seturl] = useState("");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setRedirect(false);
    seturl(`/content/encoder/${props.deviceindex}/${0}/dashboard`);
  }, [props.deviceindex])
  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }

  useEffect(() => {
    if (props.deviceList.length > 0 && props.deviceindex !== undefined) {
      setMgmtIp(props.deviceList[deviceindex].ManagementIP)
      setManagementIPdata(props.deviceList[deviceindex].ManagementIP)
    }
  }, [props.deviceindex])

  useEffect(() => {
    if (props.status === "Connected") {
      setBeforeColor("before-green");
      setStatusColor("colorgreen");
    } else {
      setBeforeColor("before-red");
      setStatusColor("colorred");
    }
  }, [props]);
  var linkinflate1 = props.deviceindex !== undefined ? props.deviceList.length > 0 ? props.deviceList[deviceindex].IP : "" : "";
  var linkinflate2 = props.deviceindex !== undefined ? props.deviceList.length > 0 ? mgmtIp : "" : "";

  let saveManagementIPHandler = async () => {
    if (managementIPdata.length < 7) {
      ErrorMessage("Please enter a valid Management IP")
      return;
    }
    if (managementIPdata.split(".").length !== 4) {
      ErrorMessage("Please enter a valid Management IP")
      return;
    }
    showLoader();
    let data = {
      _id: props.deviceList[deviceindex] ? props.deviceList[deviceindex]._id : null,
      IP: props.deviceList[deviceindex].IP,
      ManagementIP: managementIPdata,
      Password: passwordMgmt,
      DeviceName: props.deviceList[deviceindex].DeviceName.toUpperCase(),
      DeviceType: props.deviceList[deviceindex].DeviceType,
      DeviceIP: props.deviceList[deviceindex].IP,
      Region: props.deviceList[deviceindex].Region,
      RegionID: props.deviceList[deviceindex].Region
        ? props.deviceList[deviceindex].RegionID
        : "",
      SystemID: props.deviceList[deviceindex].SystemID,
      Username: props.customerData.Username,
      ActionType: "Update",
      ActionTime: new Date(),
      TimeCreated: new Date(),
      Module: "Device",
      Target: props.deviceList[deviceindex].IP,
    }
    let res = await HttpService.CreateUpdate("saveManagementIP", data)
      .then((res) => res.data)
      .catch((err) => { return });


    hideLoader();
    if (res && res.message === "Management Ip doesn't match with TS IP") {
      ErrorMessage("Management Ip doesn't match with TS IP")
      return;
    }
    if (res && res.ack === "0") {
      ErrorMessage(res.message);
      return;
    }
    if (res && res.ack === "1") {
      setMgmtIp(managementIPdata);
      SuccessMessage(res.message);
      return;
    }

    if (res && res.message === "Management Ip doesn't match with TS IP") {
      ErrorMessage("Management Ip doesn't match with TS IP")
      return;
    } else if (res && res.ack && res.ack === "1") {
      props.getAllDevices();
      if (res.modified && res.modified === true) {
        setRedirect(true);
      }
      setManagementIPdata(managementIPdata);
    } else if (res && res.message === "Device Already Exist with this Management IP") {
      ErrorMessage("Device Already Exist with this Management IP")
      return;
    } else if (res && res.ack === "0") {
      ErrorMessage("Something went wrong")
      return;
    }

  }
  if (redirect) {
    return <Redirect to={nexturl} />;
  }

  const handleEditClick = ()=>{
    setEditMgmtIp(mgmtIp);
    setMgmtIp('');
  }
  const handleCancelClick = ()=>{
    setEditMgmtIp('');
    setMgmtIp(editMgmtIp);
  }

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <div className="outerdiv">
        <div className={beforecolor + " innerdiv"}>
          <h2>
            Device Name :{" "}
            <span>
              {props.deviceList.length > 0
                ? props.deviceindex !== undefined
                  ? props.deviceList[deviceindex].DeviceName
                  : ""
                : ""}
            </span>
          </h2>
          <h2>
            Device IP : <span><a href={'http://' + linkinflate1} rel="noreferrer" target="_blank">{props.deviceList.length > 0
              ? props.deviceindex !== undefined ? props.deviceList[deviceindex].IP : "" : ""} </a> </span>
          </h2>
          {mgmtIp ? <h2>
            Management IP :{" "}
            <span><a href={'http://' + linkinflate2} target="_blank">{props.deviceList.length > 0
              ? props.deviceindex !== undefined ? mgmtIp : "" : ""}</a>
              <i
                  className="fa fa-edit stream-icons icon-tooltip"
                  onClick={(event) => handleEditClick()}
                ></i>
              </span>
          </h2> :
            <h2>

              Management IP :{" "}
              <span className="inputfield-mgmt">{
                props.deviceList.length > 0
                  ? (props.deviceindex !== undefined ? (
                    <div>
                      <input
                        type="text"
                        value={managementIPdata}
                        className="form-control"
                        defaultValue={props.deviceList[deviceindex].ManagementIP}
                        onChange={(e) => {
                          let string = e.target.value.split(":")[0];
                          if (string.match(/[^0-9.]/)) {
                            return;
                          }
                          let count = 0;
                          for (let i = 0; i < string.length; i++) {
                            if (string.charAt(i) === ".") {
                              count++;
                            }
                          }
                          if (count > 3) {
                            return;
                          }
                          let x = string.split(".");
                          for (let i = 0; i < x.length; i++) {
                            if (x[i].length > 3) {
                              return;
                            }
                            if (Number.parseInt(x[i]) > 255) {
                              return;
                            }
                          }
                          setManagementIPdata(e.target.value);


                        }}
                      ></input>
                    </div>
                  ) : "") : ""


              }
              </span>
            </h2>}
          {mgmtIp ? <></> :
            <h2>

              Password :{" "}
              <span className="inputfield">{
                props.deviceList.length > 0
                  ? (props.deviceindex !== undefined ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <input
                        type="password"
                        value={passwordMgmt}
                        className="form-control"
                        onChange={(e) => {
                          setpasswordMgmt(e.target.value)
                        }}

                      ></input>
                      <button className="btn btn-primary mx-1" onClick={saveManagementIPHandler}>Save</button>
                      <button className="btn btn-danger" onClick={handleCancelClick}>Cancel</button>
                    </div>
                  ) : "") : ""


              }
              </span>
            </h2>}

          <h2>
            Device Type : <span>Legacy Device</span>
          </h2>
          <h2>
            Status: <span className={statuscolor}><strong>{props.status}</strong></span>
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LegacyDevice;
