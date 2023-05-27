import React, { useEffect, useState } from "react";
import "./settings.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HttpService from "../../../services/http.service";
import Loader from "../../../common/loader";
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ErrorMessage from "../../../common/errorMsg";
import SuccessMessage from "../../../common/successMsg";

let Settings = (props) => {
  let [current_pass, setCurrentPass] = useState("");
  let [new_pass, setNewPass] = useState("");
  let [confirm_pass, setComfirmPass] = useState("");
  let [ip, setIP] = useState("");
  const [eth, setEth] = useState([]);
  let [managePort, setManagePort] = useState("");
  let [appVersion, setAppVersion] = useState("");
  let [licences, setLicences] = useState("");
  const [shutdownPassword, setShutdownPassword] = useState("");
  const [toggleReboot, setToggleReboot] = useState(false);
  const [toggleReset, setToggleReset] = useState(false);
  let [loading, setState] = useState(false);
  const [toggleShutdown, setToggleShutdown] = useState(false);

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  useEffect(() => {
    setPageState();
  }, []);

  const setPageState = async () => {
    showLoader();
    if (props.ip) {
      const Networkdata = await HttpService.getByBoj("getnetworksettings", {
        IP: props.ip,
      }).then((res) => res.data);
      const Versiondata = await HttpService.getByBoj("getversionlicensing", {
        IP: props.ip,
      }).then((res) => res.data);

      if (Networkdata && Networkdata.eth.length > 0) {
        setEth(Networkdata.eth);
      }

      // const licences = Versiondata.licenses;
      // var licence ="" +licences.totalLicenses +"(" +licences.inputSRT +"," +licences.inputUDP +"," +licences.outputSRT +   "," +
      //   licences.outputUDP +
      //   "," +
      //   licences.outputHLSAndDASH +
      //   "," +
      //   licences.outputRTMP +
      //   ")";

      let licence = Versiondata.licenses ? Versiondata.licenses.totalLicenses : "";
      licence += "(";
      if (Versiondata.enablePackager === 'true') licence += "Packager, ";
      if (Versiondata.enableRTMP === 'true') licence += "RTMP, ";
      if (Versiondata.enableQam === 'true') licence += "QAM";
      licence += ")";

      setIP(props.ip);
      setManagePort(Networkdata.managementPort);
      setAppVersion(Versiondata.appVersion);
      setLicences(licence);
    }
    hideLoader();
  };

  const handleResetPassword = async () => {
    if (new_pass === confirm_pass) {
      let data = {
        ip: ip,
        username: "appuser",
        password: current_pass,
        newPassword: confirm_pass,
      };

      let returnData = await HttpService.CreateUpdate(
        "changepassword",
        data
      ).then((res) => res.data);

      if (returnData === "Password successfully changed") {
        setCurrentPass("");
        setNewPass("");
        setComfirmPass("");
        SuccessMessage(returnData);
      } else {
        ErrorMessage("Error in Change Password!");
      }
    } else {
      ErrorMessage("Mismatch Confirm password!");
    }
  };

  const handleShutdown = (event) => {
    event.preventDefault();
    setToggleShutdown(!toggleShutdown);
  };

  const submitShutdown = async (event) => {
    event.preventDefault();
    let data = {
      ip: props.ip,
      username: "appuser",
      password: shutdownPassword,
      action: "poweroff",
    };

    let res = await HttpService.CreateUpdate("shutdownsystem", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res === "Successfully executed shutdown command") {
        SuccessMessage(res);
      } else {
        ErrorMessage("Unable to execute shutdown command");
      }
    }
  };

  const handleReboot = (event) => {
    event.preventDefault();
    setToggleReboot(!toggleReboot);
  };

  const submitReboot = async (event) => {
    event.preventDefault();
    let data = {
      ip: props.ip,
      username: "appuser",
      password: shutdownPassword,
      action: "reboot",
    };

    let res = await HttpService.CreateUpdate("rebootsystem", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res === "Successfully executed reboot command") {
        SuccessMessage(res);
      } else {
        ErrorMessage("Unable to execute reboot command");
      }
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setToggleReset(!toggleReset);
  };

  const submitReset = async (event) => {
    event.preventDefault();
    let data = {
      ip: props.ip,
      username: "appuser",
      password: shutdownPassword,
      action: "reset",
    };

    let res = await HttpService.CreateUpdate("resetsystem", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res === "Successfully executed factory default command") {
        // alert(res);        
        SuccessMessage(res);
      } else {
        ErrorMessage("Unable to execute factory default command");
      }
    }
  };

  // const changeHandler = (event, type, ethType) => {
  //   event.preventDefault();
  //   let ethTemp = [...eth];
  //   if (ethType === "enp4s0") {
  //     let string = event.target.value.split(":")[0];
  //     if (string.match(/[^0-9.]/)) {
  //       return;
  //     }
  //     let count = 0;
  //     for (let i = 0; i < string.length; i++) {
  //       if (string.charAt(i) === ".") {
  //         count++;
  //       }
  //     }
  //     if (count > 3) {
  //       return;
  //     }
  //     let x = string.split(".");
  //     for (let i = 0; i < x.length; i++) {
  //       if (x[i].length > 3) {
  //         return;
  //       }
  //       if (Number.parseInt(x[i]) > 255) {
  //         return;
  //       }
  //     }
  //     ethTemp[0].enp4s0[type] = event.target.value;
  //   }
  //   if (ethType === "enp6s0") {
  //     let string = event.target.value.split(":")[0];
  //     if (string.match(/[^0-9.]/)) {
  //       return;
  //     }
  //     let count = 0;
  //     for (let i = 0; i < string.length; i++) {
  //       if (string.charAt(i) === ".") {
  //         count++;
  //       }
  //     }
  //     if (count > 3) {
  //       return;
  //     }
  //     let x = string.split(".");
  //     for (let i = 0; i < x.length; i++) {
  //       if (x[i].length > 3) {
  //         return;
  //       }
  //       if (Number.parseInt(x[i]) > 255) {
  //         return;
  //       }
  //     }
  //     ethTemp[1].enp6s0[type] = event.target.value;
  //   }
  //   if (ethType === "manage") {
  //     setManagePort(event.target.value);
  //   }
  //   setEth(ethTemp);
  // };

  const saveNetworkSettings = async (event) => {
    event.preventDefault();
    let data = {
      deviceip: props.ip,
      eth: eth,
      managementPort: managePort,
    };

    await HttpService.CreateUpdate("changeipaddresses", data)
      .then((res) => res.data)
      .catch((err) => { return });
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">System Configuration</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-boxdiv-gray shadow-box">
                    <div className="form-boxtopline7">Network Setting</div>
                    <div className="form-boxtopcont user-form">
                      <div className="panel-default">
                        <div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  ADAPTER
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IP"
                                  value={eth[0] ? Object.keys(eth[0])[0] : ''}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">IP</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IP"
                                  value={
                                    eth.length !== 0 && eth[0] && eth[0][Object.keys(eth[0])[0]]
                                      ? eth[0][Object.keys(eth[0])[0]].address
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       // changeHandler(
                                //       //   event,
                                //       //   "address",
                                //       //   "enp4s0"
                                //       // )
                                // }
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  GATEWAY
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Latency"
                                  className="form-control"
                                  value={
                                    eth.length !== 0 && eth[0] && eth[0][Object.keys(eth[0])[0]]
                                      ? eth[0][Object.keys(eth[0])[0]].gateway
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       changeHandler(
                                //         event,
                                //         "gateway",
                                //         "enp4s0"
                                //       )
                                // }
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">MASK</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter TTL"
                                  value={
                                    eth.length !== 0 && eth[0] && eth[0][Object.keys(eth[0])[0]]
                                      ? eth[0][Object.keys(eth[0])[0]].netmask
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       changeHandler(
                                //         event,
                                //         "netmask",
                                //         "enp4s0"
                                //       )
                                // }
                                />
                              </div>
                            </div>
                            {/* <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">Management</label>{"  "}
                                <input
                                  type={'checkbox'}
                                  defaultChecked={eth[0]?eth[0].enp4s0.isManagement:false}
                                  disabled
                                />
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="panel-default">
                        <div className="">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  ADAPTER
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IP"
                                  value={eth[1] ? Object.keys(eth[1])[0] : ''}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">IP</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IP"
                                  value={
                                    eth.length !== 0 && eth[1] && eth[1][Object.keys(eth[1])[0]]
                                      ? eth[1][Object.keys(eth[1])[0]].address
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       changeHandler(
                                //         event,
                                //         "address",
                                //         "enp6s0"
                                //       )
                                // }
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  GATEWAY
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Latency"
                                  className="form-control"
                                  value={
                                    eth.length !== 0 && eth[1] && eth[1][Object.keys(eth[1])[0]]
                                      ? eth[1][Object.keys(eth[1])[0]].gateway
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       changeHandler(
                                //         event,
                                //         "gateway",
                                //         "enp6s0"
                                //       )
                                // }
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">MASK</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter TTL"
                                  value={
                                    eth.length !== 0 && eth[1] && eth[1][Object.keys(eth[1])[0]]
                                      ? eth[1][Object.keys(eth[1])[0]].netmask
                                      : ""
                                  }
                                  disabled
                                // onChange={
                                //   props.customerData.Role === "Operator"
                                //     ? null
                                //     : (event) =>
                                //       changeHandler(
                                //         event,
                                //         "netmask",
                                //         "enp6s0"
                                //       )
                                // }
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">Management</label>{"  "}
                              <input
                                type={'checkbox'}
                                defaultChecked={eth[1]?eth[1].enp6s0.isManagement:false}
                                disabled
                              />
                            </div>
                          </div> */}

                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              MANAGEMENT PORT
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter TTL"
                              value={managePort}
                              disabled
                            // onChange={
                            //   props.customerData.Role === "Operator"
                            //     ? null
                            //     : (event) =>
                            //       changeHandler(event, "address", "manage")
                            // }
                            />
                          </div>
                        </div>
                        {/* <div className="col-sm-12 text-center mart-10">
                          {props.customerData.Role === "Operator" ? (
                            <></>
                          ) : (
                            <button type="submit" className="btn btn-primary" onClick={(event) => saveNetworkSettings(event)}>
                              Save
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {props.customerData.Role === "Operator" ? (
                  <></>
                ) : (

                  <div className="form-group pt-4">
                    <div className="form-boxdiv-gray shadow-box">
                      <div className="form-boxtopline7">
                        Import/Export Stream List
                      </div>
                      <div className="form-boxtopcont user-form">
                        <div className="row">
                          <div className="col-md-4 form-group">
                            <div className="radio">
                              <label title="">
                                <input
                                  type="radio"
                                  name="import-export-option"
                                  value="import"
                                  statekey="optionImportExport"
                                  required=""
                                />
                                <div className="label-txts">Import</div>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 form-group">
                            <div className="radio">
                              <label title="">
                                <input
                                  type="radio"
                                  checked
                                  name="import-export-option"
                                  value="export"
                                  statekey="optionImportExport"
                                  required=""
                                />
                                <div className="label-txts">Export</div>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 form-group">
                            <div className="radio">
                              <label title="">
                                <input
                                  type="radio"
                                  name="import-export-option"
                                  value="manage"
                                  statekey="optionImportExport"
                                  required=""
                                />
                                <div className="label-txts">Manage</div>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-12 text-center mart-10">
                            {props.customerData.Role === "Operator" ? (
                              <></>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-boxdiv-gray shadow-box">
                    <div className="form-boxtopline7">About</div>
                    <div className="form-boxtopcont user-form">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">LICENCES</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter TTL"
                              value={licences}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">VERSION</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter TTL"
                              value={appVersion}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {props.customerData.Role === "Operator" ? (
                  <></>
                ) : (
                  <div className="form-group pt-4">
                    <div className="form-boxdiv-gray shadow-box">
                      <div className="form-boxtopline7">Password Reset</div>
                      <div className="form-boxtopcont user-form">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-check-label">
                                CURRENT PASSWORD
                              </label>
                              <input
                                name="currentPassword"
                                type="text"
                                className="form-control"
                                placeholder="Enter Current Password"
                                onChange={(e) => setCurrentPass(e.target.value)}
                                value={current_pass}
                              />
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-check-label">
                                NEW PASSWORD
                              </label>
                              <input
                                name="newPassword"
                                type="password"
                                className="form-control"
                                placeholder="Enter New Password"
                                onChange={(e) => setNewPass(e.target.value)}
                                value={new_pass}
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-check-label">
                                CONFIRM PASSWORD
                              </label>
                              <input
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                placeholder="Re-Enter Password"
                                onChange={(e) => setComfirmPass(e.target.value)}
                                value={confirm_pass}
                              />
                            </div>
                          </div>

                          <div className="col-sm-12 text-center mart-10">
                            {props.customerData.Role === "Operator" ? (
                              <></>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleResetPassword}
                              >
                                Save
                              </button>
                            )}
                          </div>

                          <div className="clear"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* {props.customerData.Role === "Operator" ? (
                  <></>
                ) : (
                  <div className="form-group mt-5">
                    <div className="form-boxdiv-gray shadow-box">
                      <div className="form-boxtopline7">Server Setting</div>
                      <div className="form-boxtopcont user-form">
                        <div>
                          <div>
                            <div className="row">
                              <div className="col-sm-6 txt-ssh form-group2">
                                SSH:
                              </div>
                              <div className="col-sm-6 on-off form-group2">
                                <BootstrapSwitchButton
                                  checked={true}
                                  onstyle="primary"
                                  offstyle="info"
                                />
                              </div>

                              <div className="col-sm-6 form-group2">
                                <button
                                  type="submit"
                                  className="btn btn-primary min-w135"
                                  onClick={(event) => handleShutdown(event)}
                                  disabled={true}
                                >
                                  Shutdown
                                </button>
                              </div>

                              <div className="col-sm-6 form-group2 text-right">
                                <button
                                  type="submit"
                                  className="btn btn-primary min-w135"
                                  onClick={(event) => handleReboot(event)}
                                >
                                  Reboot
                                </button>
                              </div>

                              <div className="col-sm-6 form-group2">
                                <button
                                  type="submit"
                                  className="btn btn-primary min-w135"
                                >
                                  Update
                                </button>
                              </div>

                              <div className="col-sm-6 form-group2 text-right">
                                <button
                                  type="submit"
                                  className="btn btn-primary min-w135"
                                  onClick={(event) => handleReset(event)}
                                >
                                  Factory Default
                                </button>
                              </div>

                              <div className="col-sm-12 text-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Update SSL Certificate
                                </button>
                              </div>

                              <div className="clear"></div>
                            </div>

                            <Modal
                              isOpen={toggleShutdown}
                              toggle={() => setToggleShutdown(!toggleShutdown)}
                            >
                              <ModalHeader
                                toggle={() =>
                                  setToggleShutdown(!toggleShutdown)
                                }
                              >
                                Authenticate
                              </ModalHeader>
                              <ModalBody>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label className="form-check-label">
                                        Password:{" "}
                                      </label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) =>
                                          setShutdownPassword(
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    setToggleShutdown(!toggleShutdown)
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  color="success"
                                  onClick={(event) => submitShutdown(event)}
                                >
                                  Authenticate
                                </Button>{" "}
                              </ModalFooter>
                            </Modal>

                            <Modal
                              isOpen={toggleReboot}
                              toggle={() => setToggleReboot(!toggleReboot)}
                            >
                              <ModalHeader
                                toggle={() => setToggleReboot(!toggleReboot)}
                              >
                                Authenticate
                              </ModalHeader>
                              <ModalBody>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label className="form-check-label">
                                        Password:{" "}
                                      </label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) =>
                                          setShutdownPassword(
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() => setToggleReboot(!toggleReboot)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  color="success"
                                  onClick={(event) => submitReboot(event)}
                                >
                                  Authenticate
                                </Button>{" "}
                              </ModalFooter>
                            </Modal>
                            <Modal
                              isOpen={toggleReset}
                              toggle={() => setToggleReset(!toggleReset)}
                            >
                              <ModalHeader
                                toggle={() => setToggleReset(!toggleReset)}
                              >
                                Authenticate
                              </ModalHeader>
                              <ModalBody>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <label className="form-check-label">
                                        Password:{" "}
                                      </label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) =>
                                          setShutdownPassword(
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() => setToggleReset(!toggleReset)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  color="success"
                                  onClick={(event) => submitReset(event)}
                                >
                                  Authenticate
                                </Button>{" "}
                              </ModalFooter>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </>
  );
};

export default Settings;
