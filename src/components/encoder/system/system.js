import { useState, useEffect } from "react";
import "../encoder.css";
import "./system.css";
import VCDMSservice from "../../../services/http.service";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import httpService from "../../../services/http.service";
import ErrorMsg from '../../../common/errorMsg';
import SuccessMessage from '../../../common/successMsg';
import Loader from "../../../common/loader";
import CommonUtils from "../../../common/CommonUtils";

let System = (props) => {
  const DeviceModelCondition = CommonUtils.DeviceModelCondition(props.properties.model);
  const InterleaverValueArray = ['128,1', '128,2', '64,2', '128,3', '32,4', '128,4', '16,8', '128,5', '8,16', '128,6', '128,7', '128,9']
  const [setDeviceNameClass, changeSetDeviceNameClass] = useState("not-visible");
  const [setAuthenticationClass, changeSetAuthenticationClass] = useState("not-visible");
  const [factoryResetClass, changeFactoryRestetClass] = useState("not-visible");
  const [rebootDeviceClass, changeRebootDeviceClass] = useState("not-visible");
  const [checkBoxFrontPanel, changeFrontPanelCheckBox] = useState(false);
  const [setFrontPanelClass, changeFrontPanelClass] = useState("not-visible");
  const [fppassword1, setFppassword1] = useState("");
  const [fppassword2, setFppassword2] = useState("");
  const [webPassword1, setWebpassword1] = useState("");
  const [webPassword2, setWebpassword2] = useState("");
  const [newDeviceName, setNewDeviceName] = useState("");
  const [setDeviceNameText, changeSetDeviceNameText] = useState("Change");
  const [setAuthenticationWebPasswordChangeButtonText, changeSetAuthenticationWebPasswordChangeButtonText,] = useState("Change");
  const [setDeviceNameLoader, changeDeviceNameLoader] = useState("");
  const [setAutenticationLoader, changeSetAutenticationLoader] = useState("");
  const [setFppasswordLoader, changeSetFppasswordLoader] = useState("");
  const [setFppasswordButtonText, changeSetFppasswordButtonText] = useState("Change");
  const [rebootButtonLoader, changeRebootButtonLoader] = useState("");
  const [rebootButtonText, changeRebootButtonText] = useState("Yes");
  const [inputMode, setInputMode] = useState(props.properties1.input_mode);
  const [videoMode, setVideoMode] = useState(props.properties1.video_mode);
  const [outputMode, setOutputMode] = useState(props.properties1.output_mode);
  const [tsType, setTsType] = useState(props.properties1.ts_type);
  const [tsMode, setTsMode] = useState(props.properties1.ts_mode);
  const [outputBitrateMode, setOutputBitrateMode] = useState(props.properties1.output_bitrate_mode);
  const [legacyStbSupport, setLegacyStbSupport] = useState(props.properties1.legacy_stb_support);
  const [enableVlan, setEnableVlan] = useState(DeviceModelCondition ? props.properties1.enable_vlan : props.properties1.enabled_vlan);
  // const [enableVlan, setEnableVlan] = useState(props.properties1.enabled_vlan);
  const [enableTelnet, setEnableTelnet] = useState(DeviceModelCondition ? props.properties1.enable_telnet : props.properties1.enabled_telnet);
  const [enableSsh, setEnableSsh] = useState(DeviceModelCondition ? props.properties1.enable_ssh : props.properties1.enabled_ssh);
  const [enableSyslog, setEnableSyslog] = useState(DeviceModelCondition ? props.properties1.enable_syslog : props.properties1.enabled_syslog);
  const [syslogDestIp, setSyslogDestIp] = useState(props.properties1.syslog_dest_ip);
  const [syslogDestPort, setSyslogDestPort] = useState(props.properties1.syslog_dest_port);
  const [enableRemoteSysLogIpPortVisibleClass, setEnableRemoteSysLogIpPortVisibleClass] = useState("not-visible");
  const [toggle, setToggle] = useState(false);
  const [firmwareFile, setFirmwareFile] = useState({});
  const [updateText, setUpdateText] = useState(<>Update</>);
  const [firmwareFiles, setFirmwareFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [upDateLoading, setUpdateLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [enableOutOfBondMgmt, setEnableOutOfBondMgmt] = useState(props.properties1.enabled_outofbandmanagement);
  const [enableSnmp, setEnableSnmp] = useState(props.properties1.enabled_snmp);
  const [deviceModel, setDeviceModel] = useState(props.properties1.model);
  const [enableIPv6, setEnableIPv6] = useState(props.properties1.enableIPv6);
  const [tsIpMode, settsIpMode] = useState(props.properties1.ts_ip_mode);
  const [enablePort, setEnablePort] = useState(DeviceModelCondition ? props.properties1.enable_ssh : props.properties1.enabled_ssh);
  const [sshPort, setSshPort] = useState(props.properties1.ssh_port);
  const [enablePush, setEnablePush] = useState(props.properties1.push_enabled)
  const [enableLcdAndKeypad, setEnableLcdAndKeypad] = useState(props.properties1.enabled_lcd_and_keypad)
  const [outputFrequency, setOutputFrequency] = useState(props.properties1.qam_frequency)
  const [Interleaver, setInterleaver] = useState(props.properties1.qam_interleaver)
  const [qamMode, setQamMOde] = useState(props.properties1.qam_mode)
  const [tsEthernetInterface, setTsEthernetInterface] = useState(props.properties1.ethernetinterface)

  useEffect(() => {
    setInputMode(props.properties1.input_mode);
    setVideoMode(props.properties1.video_mode);
    setOutputMode(props.properties1.output_mode);
    setTsType(props.properties1.ts_type);
    setTsMode(props.properties1.ts_mode);
    setOutputBitrateMode(props.properties1.output_bitrate_mode);
    setLegacyStbSupport(props.properties1.legacy_stb_support);
    setEnableVlan(DeviceModelCondition ? props.properties1.enable_vlan : props.properties1.enabled_vlan);
    setEnableTelnet(DeviceModelCondition ? props.properties1.enable_telnet : props.properties1.enabled_telnet);
    setEnableSsh(DeviceModelCondition ? props.properties1.enable_ssh : props.properties1.enabled_ssh);
    setEnableSyslog(DeviceModelCondition ? props.properties1.enable_syslog : props.properties1.enabled_syslog);
    setSyslogDestIp(props.properties1.syslog_dest_ip);
    setSyslogDestPort(props.properties1.syslog_dest_port);
    setEnableOutOfBondMgmt(props.properties1.enabled_outofbandmanagement);
    setEnableSnmp(props.properties1.enabled_snmp);
    setDeviceModel(props.properties1.model);
    setEnableIPv6(props.properties1.enableIPv6);
    setEnablePort(DeviceModelCondition ? props.properties1.enable_ssh : props.properties1.enabled_ssh)
    setSshPort(props.properties1.ssh_port);
    setEnablePush(props.properties1.push_enabled)
    setEnableLcdAndKeypad(props.properties1.enabled_lcd_and_keypad)
    setOutputFrequency(props.properties1.qam_frequency)
    setInterleaver(props.properties1.qam_interleaver)
    setQamMOde(props.properties1.qam_mode)
    setTsEthernetInterface(props.properties1.ethernetinterface)
  }, [props.properties1, props.startState, props.stopState, props.isStopped]);
  useEffect(() => {
    const getFirmwareFiles = async () => {
      let data = {
        deviceName: props.properties.devicename
          ? props.properties.devicename
          : null,
        ip: props.peerip
      };
      let res = await httpService.getFirmwarefiles("getfirmwarefilesbydevicename", data);
      setFirmwareFiles(res.data);
    };
    getFirmwareFiles();
  }, [props.properties.devicename, toggle]);
  const makeFormdata = (e) => {
    setSelectedFile(e.target.value);
  };
  const updateSingleDeviceFirmware = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Updating
      </>
    );
    let data = {
      ip: props.peerip,
      file: selectedFile,
      deviceName: props.properties.devicename,
    };
    let res = await VCDMSservice.updateFirmwareByUploadedFile(
      "updatefirmwareforsingledevice",
      data
    )
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        await getDeviceStatus(data.ip);
        // SuccessMessage("Successfully Updated device");
      } else if (res.ack === "0") {
        setUpdateLoading(false)
        setToggle(!toggle);
        ErrorMsg("Unable to update");
      } else if (res.ack === "2") {
        setUpdateLoading(false)
        setToggle(!toggle);
        ErrorMsg(res.msg);
      }
    } else {
      setUpdateLoading(false)
      setToggle(!toggle);
      ErrorMsg("Something went wrong please try again");
    }
    setUpdateText(<>Update</>);
    // setUpdateLoading(false);
    // setUpdateText(
    //   <>
    //     Update
    //   </>
    // );
    return;
  };

  const getDeviceStatus = async (ip) => {
    let promise = new Promise((resolve, reject) => {
      let x = setInterval(async () => {
        let response = await VCDMSservice.get('getfirmwareupgradestatus')
          .then((res) => res.data).catch(e => { })
        if (response && response[ip] > 2) {
          resolve('1');
          SuccessMessage("Successfully Updated Batch");
          clearInterval(x)
        }
      }, 20 * 1000);
    })
    promise.then(() => {
    }).catch(() => {
    }).finally(() => {
      setUpdateLoading(false)
      setToggle(!toggle);
    })
  }

  let deviceChangeButton =
    setDeviceNameLoader === "" ? (
      <button
        type="submit"
        className="btn btn-dark"
        onClick={(event) => changeDeviceNameAPI(event)}
      >
        {setDeviceNameText}
      </button>
    ) : (
      <button disabled className="btn btn-dark">
        {setDeviceNameText}
      </button>
    );
  let setAutenticationWebPasswordButton =
    setAutenticationLoader === "" ? (
      <button
        type="submit"
        className="btn btn-dark"
        onClick={(event) => changeWebPasswordSubmit(event)}
      >
        {setAuthenticationWebPasswordChangeButtonText}
      </button>
    ) : (
      <button disabled className="btn btn-dark">
        {setAuthenticationWebPasswordChangeButtonText}
      </button>
    );

  let setFppasswordButton =
    setFppasswordLoader === "" ? (
      <button
        type="submit"
        className="btn btn-dark"
        onClick={(event) => changeFppasswordSubmit(event)}
      >
        {setFppasswordButtonText}
      </button>
    ) : (
      <button disabled className="btn btn-dark">
        {setFppasswordButtonText}
      </button>
    );

  let rebootButton =
    rebootButtonLoader === "" ? (
      <button
        type="submit"
        className="btn btn-dark"
        onClick={(event) => rebootButtonClick(event)}
      >
        {rebootButtonText}
      </button>
    ) : (
      <button disabled className="btn btn-dark">
        {rebootButtonText}
      </button>
    );

  const changeNewDeviceState = (event) => {
    event.preventDefault();
    setNewDeviceName(event.target.value);
  };

  const changeDeviceNameAPI = async (event) => {
    event.preventDefault();
    changeDeviceNameLoader("active");
    changeSetDeviceNameText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Change
      </>
    );
    let data = {
      ip: props.peerip,
      devicename: newDeviceName,
    };
    let response = await VCDMSservice.getByBoj("setdevicename", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (response) {
      if (response.status === "success") {
        setNewDeviceName("");
        changeSetDeviceNameText("Change");
      }
    }
    changeDeviceNameLoader("");
  };

  const deviceChangeCancelButtonClick = (event) => {
    event.preventDefault();
    changeSetDeviceNameClass("not-visible");
  };

  const setAuthenticationCancelButton = (event) => {
    event.preventDefault();
    changeSetAuthenticationClass("not-visible");
  };

  const toggleCheckBoxState = () => {
    changeFrontPanelCheckBox(!checkBoxFrontPanel);
    if (setFrontPanelClass === "not-visible") changeFrontPanelClass("");
    else changeFrontPanelClass("not-visible");
  };

  const changeFppasswordHandler1 = (value) => {
    setFppassword1(value);
  };

  const changeFppasswordHandler2 = (value) => {
    setFppassword2(value);
  };

  const changeWebPasswordHandler1 = (value) => {
    setWebpassword1(value);
  };

  const changeWebPasswordHandler2 = (value) => {
    setWebpassword2(value);
  };

  const changeWebPasswordSubmit = async (event) => {
    event.preventDefault();
    changeSetAutenticationLoader("active");
    changeSetAuthenticationWebPasswordChangeButtonText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Change
      </>
    );
    if (webPassword1.localeCompare(webPassword2) === 0 && webPassword1 !== "") {
      let data = {
        ip: props.peerip,
        password: webPassword1,
        username: "admin",
      };

      let res = await VCDMSservice.CreateUpdate("setloginproperties", data)
        .then((res) => res.data)
        .catch((err) => { return });
      if (res) {
        if (res.status === "success") {
          changeSetAutenticationLoader("");
          changeSetAuthenticationWebPasswordChangeButtonText("Change");
          changeWebPasswordHandler1("");
          changeWebPasswordHandler2("");
        } else {
          changeSetAutenticationLoader("");
          changeSetAuthenticationWebPasswordChangeButtonText("Change");
          changeWebPasswordHandler1("");
          changeWebPasswordHandler2("");
          ErrorMsg("Unable to set Web Password");
        }
      }
    } else {
      changeSetAutenticationLoader("");
      changeSetAuthenticationWebPasswordChangeButtonText("Change");
      ErrorMsg("Password doesn't match");
    }
  };

  const changeFppasswordSubmit = async (event) => {
    event.preventDefault();
    changeSetFppasswordLoader("active");
    changeSetFppasswordButtonText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Change
      </>
    );

    if (fppassword1.localeCompare(fppassword2) === 0 && fppassword1 !== "") {
      let data = {
        ip: props.peerip,
        lcdpassword: fppassword1,
      };

      let res = await VCDMSservice.CreateUpdate("setlcdloginproperties", data)
        .then((res) => res.data)
        .catch((err) => { return });
      if (res) {
        if (res.status === "success") {
          changeSetFppasswordLoader("");
          changeSetFppasswordButtonText("Change");
          changeFppasswordHandler1("");
          changeFppasswordHandler2("");
        } else {
          changeSetFppasswordLoader("");
          changeSetFppasswordButtonText("Change");
          ErrorMsg("Unable to change password due to some error");
        }
      }
    } else {
      changeSetFppasswordLoader("");
      changeSetFppasswordButtonText("Change");
      ErrorMsg("Passwords doesn't match or empty");
    }
  };

  const rebootButtonClick = async (event) => {
    event.preventDefault();
    changeRebootButtonLoader("active");
    changeRebootButtonText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Yes
      </>
    );
    let data = {
      ip: props.peerip,
    };

    let res = await VCDMSservice.CreateUpdate("devicereboot", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.status === "success") {
        changeRebootButtonText("Yes");
        changeRebootButtonLoader("");
        changeRebootDeviceClass("not-visible");
        SuccessMessage("Device has been rebooted");
      } else {
        changeRebootButtonText("Yes");
        changeRebootButtonLoader("");
        ErrorMsg("An error occured while rebooting device");
      }
    } else {
      changeRebootButtonText("Yes");
      changeRebootButtonLoader("");
    }
  };

  const changeHandler = (event, setContent, type = "") => {
    let sample = { ...props.properties1 };
    if (type === "enable_syslog" || type === "enabled_syslog") {
      event.target.checked ? setContent("Y") : setContent("N");
      sample[type] = event.target.checked ? "Y" : "N";
      props.setProperties1(sample);
      event.target.checked
        ? setEnableRemoteSysLogIpPortVisibleClass("")
        : setEnableRemoteSysLogIpPortVisibleClass("not-visible");
      return;
    }
    let typeArr = ['push_enabled', "enabled_vlan", "enable_vlan", "enable_telnet", "enabled_telnet", "enable_ssh", "enabled_ssh",
      "enabled_outofbandmanagement", "enabled_snmp", "enableIPv6", "enabled_lcd_and_keypad"]
    if (typeArr.includes(type)) {
      event.target.checked ? setContent("Y") : setContent("N");
      if (type === "enabled_outofbandmanagement") {
        if (!event.target.checked) {
          sample['enabled_snmp'] = "N"
        }
        // sample[type] = event.target.checked ? "Y" : "N";
        // props.setProperties1(sample);
        // return;
      }
      if (type === 'enable_vlan' || type === 'enabled_vlan') sample['enableIPv6'] = 'N';
      else if (type === 'enableIPv6') sample[DeviceModelCondition ? "enable_vlan" : "enabled_vlan"] = 'N'
      sample[type] = event.target.checked ? "Y" : "N";
      props.setProperties1(sample);
      return;
    }
    if (type === "legacy_stb_support") {
      event.target.checked ? setContent("1") : setContent("0");
      sample[type] = event.target.checked ? "1" : "0";
      props.setLegacyStbSupport(sample[type]);
      props.setProperties1(sample);
      return;
    }
    if (type === 'input_mode') {
      sample['video_mode'] = event.target.value === '1x3G' ? '1xHD' : '2xHD'
      props.setVideoMode(event.target.value === '1x3G' ? '1xHD' : '2xHD')
    }
    if (type === 'output_mode') {
      sample['ts_type'] = outputMode === "TCP" ? 'SPTS' : 'MPTS'
    }
    setContent(event.target.value);
    sample[type] = event.target.value;
    props.setProperties1(sample);
  };

  const updateFirmaware = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Updating
      </>
    );
    let data = {
      ip: [props.peerip],
      file: firmwareFile,
    };
    let res = await VCDMSservice.updateSingleDevice(
      "updatefirmareforsingleip",
      data
    )
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        SuccessMessage("Successfully Updated device");
      } else if (res.ack === "0") {
        ErrorMsg("Unable to update");
      } else if (res.ack === "2") {
        ErrorMsg(res.msg);
      }
    } else {
      ErrorMsg("Something went wrong please try again");
    }
    setUpdateText(<>Update</>);
    setToggle(!toggle);
    setUpdateLoading(false);
    setUpdateText(
      <>
        Update
      </>
    );
    return;
  };
  const checkBox = checkBoxFrontPanel ? (
    <input
      type="checkbox"
      className="form-check-input"
      onClick={toggleCheckBoxState}
      id="exampleCheck1"
      checked
      disabled={props.customerData.Role === "Operator" ? true : false}
    />
  ) : (
    <input
      type="checkbox"
      className="form-check-input"
      onClick={toggleCheckBoxState}
      id="exampleCheck1"
      disabled={props.customerData.Role === "Operator" ? true : false}
    />
  );

  const getTsType = () => {
    if (outputMode === "UDP") {
      props.setTsType(tsType);
      return (
        <>
          <option value="MPTS">MPTS</option>
          <option value="SPTS">SPTS</option>
        </>
      );
    }
    if (outputMode === "TCP" || outputMode === "RTSP") {
      props.setTsType("SPTS");
      return <option value="SPTS">SPTS</option>;
    }
    if (outputMode === "ASI" || outputMode === "QAM") {
      props.setTsType("MPTS");
      return <option value="MPTS">MPTS</option>;
    } else {
      props.setTsType(tsType);
      return (
        <>
          <option value="MPTS">MPTS</option>
          <option value="SPTS">SPTS</option>
        </>
      );
    }
  };

  return (
    <>
      {upDateLoading ? <Loader clss='loader-contentV1 full-width' /> : <></>}
      {!props.properties1.model.includes("RM1121CXF") ?
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Encoder Preset Configuration</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Input Mode</label>
                    {props.properties1.model.substring(0, 6) === "VL4510" &&
                      (<select
                        className="form-control"
                        onChange={(event) =>
                          changeHandler(event, setInputMode, "input_mode")
                        }
                        value={inputMode}
                      >
                        <option value="1x3G">1x3G</option>
                      </select>)}
                    {props.properties1.model.substring(0, 6) === "VL4522" && (
                      <select
                        className="form-control"
                        onChange={(event) => {
                          props.setInputMode(event.target.value);
                          changeHandler(event, setInputMode, "input_mode")
                        }}
                        value={inputMode}
                      >
                        <option value="1x3G">1x3G</option>
                        <option value="2xHD">2xHD</option>
                      </select>)}
                    {props.properties1.model.substring(0, 6) !== "VL4522" && (
                      props.properties1.model.substring(0, 6) !== "VL4510" && (
                        <select
                          className="form-control"
                          onChange={(event) =>
                            changeHandler(event, setInputMode, "input_mode")
                          }
                          value={inputMode}
                        >
                          <option value="1x3G">1x3G</option>
                          {/* {props.properties1.model.includes('RM1121XD') && <>
                            <option value="2xHD">2xHD</option>
                            <option value="2xHD+2xSD">2xHD+2xSD</option>
                            <option value="1xHD+4xSD">1xHD+4xSD</option>
                            <option value="8xSD">8xSD</option>
                          </>} */}
                        </select>
                      )
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Video Mode</label>
                    {props.properties1.model.substring(0, 6) === "VL4510" ? (
                      <select
                        className="form-control"
                        value={videoMode}
                        onChange={(event) => {
                          changeHandler(event, setVideoMode, "video_mode");
                          props.setVideoMode(event.target.value);
                        }}
                      >
                        <option value="1xHD">Single Stream(1xHD)</option>
                        <option value="1xHD+1xSD">Dual Stream(1xHD+1xSD)</option>
                      </select>
                    ) :
                      (props.properties1.model.substring(0, 6) === "VL4522" && inputMode === "1x3G") ? (
                        <select
                          className="form-control"
                          value={videoMode}
                          onChange={(event) => {
                            changeHandler(event, setVideoMode, "video_mode");
                            props.setVideoMode(event.target.value);
                          }}
                        >
                          <option value="1xHD">1xHD</option>
                          <option value="1xHD+1xSD">1xHD+1xSD</option>
                        </select>
                      ) : (props.properties1.model.substring(0, 6) === "VL4522" && inputMode === "2xHD") ? (
                        <select
                          className="form-control"
                          value={videoMode}
                          onChange={(event) => {
                            changeHandler(event, setVideoMode, "video_mode");
                            props.setVideoMode(event.target.value);
                          }}
                        >
                          <option value="2xHD">2xHD</option>
                          <option value="2xHD+1xSD">2xHD+1xSD</option>
                          <option value="2xHD+2xSD">2xHD+2xSD</option>
                        </select>
                      ) : <select
                        className="form-control"
                        value={videoMode}
                        onChange={(event) => {
                          changeHandler(event, setVideoMode, "video_mode");
                          props.setVideoMode(event.target.value);
                        }}
                      >
                        <option value="1xHD">Single Stream(1xHD)</option>
                        <option value="1xHD+1xSD">Dual Stream(1xHD+1xSD)</option>
                      </select>}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Output Mode</label>
                    <select
                      className="form-control"
                      value={outputMode}
                      onChange={(event) => {
                        changeHandler(event, setOutputMode, "output_mode");
                        props.setOutputMode(event.target.value);
                      }}
                    >
                      <option value="UDP">UDP</option>
                      {(!DeviceModelCondition) ? (
                        <option value="ASI">ASI</option>
                      ) : <></>}

                      {deviceModel !== 'VL4510' && deviceModel !== "VL4522Q" ? <option value="TCP">TCP</option> : ''}
                      {deviceModel.includes('RM1121XD') ? <option value="RTSP">RTSP</option> : ''}
                      {deviceModel.includes("VL4522Q") ? <option value="QAM">QAM</option> : ''}
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">TS Type</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        changeHandler(event, setTsType, "ts_type");
                      }}
                      value={tsType}
                    >
                      {getTsType()}
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">TS Mode</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        changeHandler(event, setTsMode, "ts_mode");
                        props.setTsMode(event.target.value);
                      }}
                      value={tsMode}
                    >
                      <option>DVB</option>
                      <option>ATSC</option>
                    </select>
                  </div>
                </div>

                {outputMode !== "QAM" &&
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">
                        Output Bitrate Mode
                      </label>
                      <select
                        className="form-control"
                        value={outputBitrateMode}
                        onChange={(event) => {
                          changeHandler(
                            event,
                            setOutputBitrateMode,
                            "output_bitrate_mode"
                          );
                          props.setOutputBitrateMode(event.target.value);
                        }}
                      >
                        <option value="AUTO">AUTO</option>
                        <option value="MANUAL">MANUAL</option>
                      </select>
                    </div>
                  </div>}


                {(!DeviceModelCondition) ? (
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        ASI Input:
                        <input
                          type="checkbox"
                          className="enc-checkbox"
                          disabled={
                            props.customerData.Role === "Operator" ? true : false
                          }
                        />
                      </label>
                    </div>
                  </div>) : (<></>)}

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Legacy STB Support:
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={legacyStbSupport === "0" ? false : true}
                        disabled={
                          props.customerData.Role === "Operator" ? true : false
                        }
                        onChange={(event) =>
                          changeHandler(
                            event,
                            setLegacyStbSupport,
                            "legacy_stb_support"
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : <></>}

      {(props.properties1.model.includes("VL4522Q") && outputMode === "QAM") && (
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">QAM Setup</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Output Frequency(KHz)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={outputFrequency}
                      onChange={(event) => {
                        changeHandler(event, setOutputFrequency, "qam_frequency")
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Interleaver</label>
                    <select className="form-control"
                      value={Interleaver}
                      onChange={(event) => changeHandler(event, setInterleaver, "qam_interleaver")}
                    >
                      {InterleaverValueArray.map((value, indx) => <option value={indx + 1}>{value}</option>)}


                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Format</label>
                    <select className="form-control"
                      value={qamMode}
                      onChange={(event) => changeHandler(event, setQamMOde, "qam_mode")}
                    >
                      <option value="2">QAM 64 Annex B</option>
                      <option value="3">QAM 256 Annex B</option>

                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!DeviceModelCondition && (
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">System Interface Management</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                {!deviceModel.includes('VL4522Q') &&
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable Serial Console:
                        <input
                          type="checkbox"
                          className="enc-checkbox"
                          disabled={
                            props.customerData.Role === "Operator" ? true : false
                          }
                        />
                      </label>
                    </div>
                  </div>}
                {!DeviceModelCondition ? (
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable LCD and Keypad:
                        <input
                          type="checkbox"
                          checked={enableLcdAndKeypad === 'Y'}
                          className="enc-checkbox"
                          disabled={props.customerData.Role === "Operator" ? true : false}
                          onChange={(event) => { changeHandler(event, setEnableLcdAndKeypad, "enabled_lcd_and_keypad") }}
                        />
                      </label>
                    </div>
                  </div>) : (<></>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {DeviceModelCondition || deviceModel.includes('VL4522Q') ? (
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Network Interface Management</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable IPv6:
                    </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      disabled={
                        props.customerData.Role === "Operator" ? true : false
                      }
                      checked={enableIPv6 === "Y" ? true : false}
                      onChange={(event) => {
                        changeHandler(event, setEnableIPv6, "enableIPv6")
                        props.setEnableIpv6(event.target.checked ? 'Y' : 'N')
                        props.setEnableVlan('N')

                      }
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group form-inline w-50">
                    <label className="form-check-label mr-3">TS IP Mode</label>
                    <select className="form-control flex-grow-1"
                      value={tsIpMode}
                      onChange={(event) => changeHandler(event, settsIpMode, "ts_ip_mode")}
                    >
                      <option value="static">Static</option>
                      <option value="DHCP">DHCP</option>
                    </select>
                  </div>
                </div>
                {props.properties1.model.includes("RM1121CXF") &&
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable SNMP Trap:
                      </label>
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={enableSnmp === 'Y' ? true : false}
                        disabled={
                          props.customerData.Role === "Operator" ? true : false
                        }
                        onChange={(event) => {
                          changeHandler(event, setEnableSnmp, "enabled_snmp")
                          props.setEnableSnmp(event.target.checked ? 'Y' : 'N')
                        }}
                      />
                    </div>
                  </div>}
                {!deviceModel.includes('VL4522Q') && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable Push Notification:
                    </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      disabled={
                        props.customerData.Role === "Operator" ? true : false
                      }
                      checked={enablePush === "Y" ? true : false}
                      onChange={(event) => {
                        changeHandler(event, setEnablePush, "push_enabled")
                        props.setEnablePush(event.target.checked ? 'Y' : 'N')
                      }
                      }
                    />
                  </div>
                </div>}
                {!deviceModel.includes("RM1121CXF") && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable VLAN:
                    </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={enableVlan === "Y"}
                      disabled={
                        props.customerData.Role === "Operator" ? true : false
                      }
                      onChange={(event) => {
                        changeHandler(event, setEnableVlan, DeviceModelCondition ? "enable_vlan" : "enabled_vlan")
                        props.setEnableVlan(event.target.checked ? 'Y' : 'N')
                        props.setEnableIpv6('N')

                      }
                      }
                    />
                  </div>
                </div>}
                {/* {props.properties1.model.includes("RM1121XD") ?
                      <>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-check-label enc-status">
                              Enable VLAN:
                            </label>
                            <input
                              type="checkbox"
                              className="enc-checkbox"
                              checked={enableVlan === "N" ? false : true}
                              disabled={
                                props.customerData.Role === "Operator" ? true : false
                              }
                              onChange={(event) =>
                                changeHandler(event, setEnableVlan, "enable_vlan")
                              }
                            />
                          </div>
                        </div></>
                      : <>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-check-label enc-status">
                              Enable SNMP Trap:
                            </label>
                            <input
                              type="checkbox"
                              className="enc-checkbox"
                              checked={enableSnmp === 'Y' ? true : false}
                              disabled={
                                props.customerData.Role === "Operator" ? true : false
                              }
                              onChange={(event) => {
                                changeHandler(event, setEnableSnmp, "enabled_snmp")
                                props.setEnableSnmp(event.target.checked ? 'Y' : 'N')
                              }}
                            />
                          </div>
                        </div>
                      </>} */}
                {deviceModel.includes('VL4522Q') && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      TS Ethernet Interface
                    </label>
                    <select className="form-control"
                      value={tsEthernetInterface}
                      onChange={(e) => changeHandler(e, setTsEthernetInterface, 'ethernetinterface')}
                    >
                      <option value={'lan0'}>copper</option>
                      {deviceModel.substring(0, 4) === "VL45" && (
                        <option value={'lan1'}>SFP</option>
                      )}
                    </select>
                  </div>
                </div>}

                {deviceModel.includes('VL4522Q') && (
                  <>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Enable Out-of-Band Management:
                        </label>
                        <input
                          type="checkbox"
                          className="enc-checkbox"
                          checked={enableOutOfBondMgmt === 'Y' ? true : false}
                          disabled={
                            props.customerData.Role === "Operator" ? true : false
                          }
                          onChange={(event) => {
                            changeHandler(event, setEnableOutOfBondMgmt, "enabled_outofbandmanagement")
                            props.setEnableOutOfBondMgmt(event.target.checked ? 'Y' : 'N');
                            props.setEnableSnmp('N');
                          }}
                        />
                      </div>
                    </div>
                    {enableOutOfBondMgmt === "Y" && (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-check-label enc-status">
                            Enable SNMP Trap:
                          </label>
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={enableSnmp === 'Y' ? true : false}
                            disabled={
                              props.customerData.Role === "Operator" ? true : false
                            }
                            onChange={(event) => {
                              changeHandler(event, setEnableSnmp, "enabled_snmp")
                              props.setEnableSnmp(event.target.checked ? 'Y' : 'N')
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      ) : (<></>)}

      {/* {props.properties1.model.includes("RM1121CXF") && */}
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            Remote Access Configuration
          </div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Enable Telnet:
                  </label>
                  <input
                    type="checkbox"
                    className="enc-checkbox"
                    checked={enableTelnet === "Y" ? true : false}
                    disabled={
                      props.customerData.Role === "Operator" ? true : false
                    }
                    onChange={(event) =>
                      changeHandler(event, setEnableTelnet, DeviceModelCondition ? "enable_telnet" : "enabled_telnet")
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group form-inline">
                  <label className="form-check-label enc-status">
                    Enable SSH:
                  </label>
                  <input
                    type="checkbox"
                    className="enc-checkbox"
                    checked={enableSsh === "Y" ? true : false}
                    disabled={
                      props.customerData.Role === "Operator" ? true : false
                    }
                    onChange={(event) => {
                      changeHandler(event, setEnableSsh, DeviceModelCondition ? "enable_ssh" : "enabled_ssh")
                    }
                    }
                  />
                  {enablePort == "Y" &&
                    <>
                      <label className="form-check-label enc-status ml-3 mr-1">
                        Port:
                      </label>
                      <input
                        type="text"
                        className="form-control d-inline"
                        value={sshPort}
                        disabled={props.customerData.Role === "Operator" ? true : false}
                        onChange={(event) => {
                          if (event.target.value.match(/[^0-9-]/) || event.target.value.length > 5) { return; }
                          changeHandler(event, setSshPort, "ssh_port")
                        }}
                      /></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            Remote System Log Configuration
          </div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Enable Remote System Log:
                  </label>
                  <input
                    type="checkbox"
                    className="enc-checkbox"
                    checked={enableSyslog === "Y" ? true : false}
                    disabled={props.customerData.Role === "Operator" ? true : false}
                    onChange={(event) => changeHandler(event, setEnableSyslog, DeviceModelCondition ? "enable_syslog" : "enabled_syslog")}
                  />
                </div>
              </div>
              <div className={"col-sm-6 " + enableRemoteSysLogIpPortVisibleClass}>
                <div className="form-group">
                  <label className="form-check-label enc-status">IP:</label>
                  <input type="text" className="enc-checkbox" value={syslogDestIp}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9.]/)) {
                        return;
                      }
                      changeHandler(event, setSyslogDestIp, "syslog_dest_ip");
                    }}
                  />
                </div>
              </div>

              <div
                className={"col-sm-6 " + enableRemoteSysLogIpPortVisibleClass}
              >
                <div className="form-group">
                  <label className="form-check-label enc-status">Port:</label>
                  <input
                    type="text"
                    className="enc-checkbox"
                    value={syslogDestPort}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      changeHandler(
                        event,
                        setSyslogDestPort,
                        "syslog_dest_port"
                      );
                    }}
                  />
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      {props.customerData.Role === "Operator" ? (
        <></>
      ) : (
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Device Management</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Set Device Name:
                    </label>
                    <button
                      className="btn btn-primary enc-checkbox"
                      onClick={() => changeSetDeviceNameClass("")}
                    >
                      Go
                    </button>
                    <div className={setDeviceNameClass}>
                      <form>
                        <div className="mb-3">
                          <label for="newdevicename" className="form-label">
                            New Device Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="newdevicename"
                            onChange={(event) => changeNewDeviceState(event)}
                            value={newDeviceName}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary margin-right-10px"
                          onClick={(event) => {
                            deviceChangeCancelButtonClick(event);
                          }}
                        >
                          Cancel
                        </button>
                        {deviceChangeButton}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Set Authentication:
                    </label>
                    <button
                      className="btn btn-primary enc-checkbox"
                      onClick={() => changeSetAuthenticationClass("")}
                    >
                      Go
                    </button>
                    <div className={setAuthenticationClass}>
                      <form>
                        <div className="mb-3 form-check">
                          {checkBox}
                          <label
                            className="form-check-label"
                            for="exampleCheck1"
                          >
                            Set Front Panel Password
                          </label>
                          <div className={setFrontPanelClass}>
                            <form>
                              <div className="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  className="form-label"
                                >
                                  New FP Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="fppassword1"
                                  value={fppassword1}
                                  onChange={(event) =>
                                    changeFppasswordHandler1(event.target.value)
                                  }
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  className="form-label"
                                >
                                  New FP Password Again
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="fppassword2"
                                  value={fppassword2}
                                  onChange={(event) =>
                                    changeFppasswordHandler2(event.target.value)
                                  }
                                />
                              </div>
                              {setFppasswordButton}
                            </form>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            New web password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="webpassword1"
                            value={webPassword1}
                            onChange={(event) =>
                              changeWebPasswordHandler1(event.target.value)
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            New web password again
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="webpassword2"
                            value={webPassword2}
                            onChange={(event) =>
                              changeWebPasswordHandler2(event.target.value)
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-dark margin-right-10px"
                          onClick={(event) =>
                            setAuthenticationCancelButton(event)
                          }
                        >
                          Cancel
                        </button>
                        {setAutenticationWebPasswordButton}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Factory Reset
                    </label>
                    <button
                      className="btn btn-primary enc-checkbox"
                      onClick={() => changeFactoryRestetClass("")}
                    >
                      Go
                    </button>
                    <div className={factoryResetClass}>
                      Continue with factory reset?
                      <button
                        className="btn btn-primary enc-checkbox"
                      // onClick={() => changeFactoryRestetClass("")}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-primary enc-checkbox"
                        onClick={() => changeFactoryRestetClass("not-visible")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Update Firmware:
                    </label>
                    <button
                      className="btn btn-primary enc-checkbox"
                      disabled={!props.startState}
                      onClick={() => setToggle(!toggle)}
                    >
                      Go
                    </button>
                    <Modal className='file-del-popup' isOpen={toggle} toggle={() => setToggle(!toggle)}>
                      <ModalHeader toggle={() => setToggle(!toggle)}>
                        Update Firmware
                      </ModalHeader>
                      <ModalBody>

                        <div className="col-sm-12 p-0">
                          <div className="firmwareinnerdiv">
                            <div className="w-100 avail-files mt-2">
                              <h4 className="text-center">
                                Available Files : {firmwareFiles.length}
                              </h4>
                              <form>
                                <div className="row" >
                                  {firmwareFiles.length
                                    ? firmwareFiles.map((files, index) => (
                                      <div className="col-6" key={index}>
                                        <div className="form-check d-flex justify-content-center">
                                          <label className="form-check-label">
                                            <input
                                              type="radio"
                                              className="form-check-input"
                                              checked={selectedFile === files}
                                              onChange={makeFormdata}
                                              name="optradio"
                                              disabled={uploadedFile}
                                              value={files}
                                            />
                                            {files}
                                          </label>
                                        </div>
                                      </div>
                                    ))
                                    : null}
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 p-0">
                          <h4 className="firmware-seperator">
                            <span>OR</span>
                          </h4>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-check-label">
                                Upload firmware file:
                              </label>
                              <input
                                id='firmwareFile'
                                className="form-control"
                                type="file"
                                name="firmaware_file"
                                placeholder="Firmware file"
                                onChange={(event) => {
                                  setUploadedFile(event.target.files[0])
                                  setFirmwareFile(event.target.files[0])
                                }
                                }
                                disabled={selectedFile}
                              />
                            </div>
                          </div>
                        </div>
                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() => { setSelectedFile(''); setToggle(!toggle); document.getElementById('firmwareFile').value = null; setUploadedFile(false) }}
                            disabled={upDateLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="success"
                            onClick={selectedFile ? updateSingleDeviceFirmware : updateFirmaware}
                            disabled={upDateLoading}
                          >
                            {updateText}
                          </Button>
                        </ModalFooter>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Reboot Device:
                    </label>
                    <button
                      className="btn btn-primary enc-checkbox"
                      onClick={() => changeRebootDeviceClass("")}
                    >
                      Go
                    </button>
                    <div className={rebootDeviceClass}>
                      <label className="margin-right-10px">
                        Continue with device reboot?
                      </label>
                      {rebootButton}
                      <button
                        className="btn btn-dark"
                        onClick={() => changeRebootDeviceClass("not-visible")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default System;