import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import httpService from "../../services/http.service";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const BackupLocation = (props) => {
  const [activeTab] = useState("backupLocation");
  const [username, setusername] = useState("");
  const [pass, setPass] = useState("");
  const [location, setlocation] = useState("");
  const [port, setPort] = useState('');
  const [host, setHost] = useState("");
  const [saved] = useState(false);
  const saveBackupLocation = async () => {

    let data = {
      host: host,
      username: username,
      user: localStorage.getItem("Username"),
      password: pass,
      location: location,
      port: port
    };
    let res = await httpService
      .delete("savebackuplocation", data)
      .then((res) => res.data)
      .catch((err) => {
        ErrorMessage("Could not update backup location")
      });
    if (res) {
      SuccessMessage(res.msg)
      props.setSaved(!saved);
      props.setBackupLocation(res);
    }
  };
  return (
    <>
      <form>
        <NavSlider activeTab={activeTab} />
      </form>
      <div>

        <div className="pad-15" >
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Remote Backup Location</div>
            {Object.keys(props.backupLocation).length ? (
              <>
                <div className="font-size-16 p-3">
                  <h5>Current Remote databse Backup Location:</h5>
                  <div className="font-size-16">
                    <ul>
                      <li style={{ color: "black" }}>
                        IP: {props.backupLocation.IP}
                      </li>
                      <li style={{ color: "black" }}>
                        Location on remote: {props.backupLocation.location}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" d-flex m-4 justify-content-center">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#formModal"
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-size-16 p-3">
                  You have not added any remote database backup location click on the below button to add it now.
                </div>
                <div className="d-flex m-4 justify-content-center">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#formModal"
                  >
                    Add
                  </button>
                </div>
              </>
            )}

            <div
              className="modal fade"
              id="formModal"
              tabIndex="-1"
              aria-labelledby="formModal"
              aria-hidden="true"
            >
              <div
                className="modal-dialog-centered modal-dialog"
                style={{ width: "45%" }}
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="nowModal">
                      Save database backup location
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      saveBackupLocation();
                    }}>
                      <div className="form-boxtopcont user-form">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                IP : <i style={{ color: "red" }}>*</i>
                              </label>
                              <input
                                required
                                className="form-control"
                                type="text"
                                name="server_ip"
                                placeholder="IP"
                                value={host}
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
                                  setHost(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                Backup Location :<i style={{ color: "red" }}>*</i>
                              </label>
                              <input
                                required
                                className="form-control"
                                type="text"
                                name="backup_location"
                                placeholder="/home/vcdms/backup"
                                value={location}
                                onChange={(e) => {
                                  setlocation(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label className="form-check-label">
                                Username : <i style={{ color: "red" }}>*</i>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="user"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                  setusername(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label className="form-check-label">
                                Password : <i style={{ color: "red" }}>*</i>
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={pass}
                                required
                                onChange={(e) => {
                                  setPass(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label className="form-check-label">
                                Port : <i style={{ color: "red" }}>*</i>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="number"
                                placeholder="Port"
                                value={port}
                                required
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/) === null && e.target.value.length <= 5) {
                                    setPort(e.target.value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                          onClick={() => {
                            setHost("");
                            setPass("");
                            setlocation("");
                            setusername("");
                            setPort("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"

                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackupLocation;
