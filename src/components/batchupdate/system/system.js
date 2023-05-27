import { useState, useEffect } from "react";
import "../batchupdate.css";
import "./system.css";
// import VCDMSservice from "../../../services/http.service";
// import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from "../../../common/CommonUtils";

let System = (props) => {
  const DeviceModelCondition = CommonUtils.DeviceModelCondition(props.selectedModel)
  const InterleaverValueArray = ['128,1', '128,2', '64,2', '128,3', '32,4', '128,4', '16,8', '128,5', '8,16', '128,6', '128,7', '128,9']
  //   const [setAuthenticationClass, changeSetAuthenticationClass] =
  //   const [rebootDeviceClass, changeRebootDeviceClass] = useState("not-visible");
  //   const [ticked, setticked] = useState(false)
  //   const [checkBoxFrontPanel, changeFrontPanelCheckBox] = useState(false);
  //   const [setFrontPanelClass, changeFrontPanelClass] = useState("not-visible");
  //   const [fppassword1, setFppassword1] = useState("");
  //   const [fppassword2, setFppassword2] = useState("");
  //   const [webPassword1, setWebpassword1] = useState("");
  //   const [webPassword2, setWebpassword2] = useState("");
  //   const [
  //     setAuthenticationWebPasswordChangeButtonText,
  //     changeSetAuthenticationWebPasswordChangeButtonText,
  //   ] = useState("Change");
  //   const [setAutenticationLoader, changeSetAutenticationLoader] = useState("");
  //   const [setFppasswordLoader, changeSetFppasswordLoader] = useState("");
  //   const [setFppasswordButtonText, changeSetFppasswordButtonText] =
  //     useState("Change");
  //   const [rebootButtonLoader, changeRebootButtonLoader] = useState("");
  //   const [rebootButtonText, changeRebootButtonText] = useState("Yes");
  const [inputMode, setInputMode] = useState("");
  const [videoMode, setVideoMode] = useState("1xHD+1xSD");
  const [outputMode, setOutputMode] = useState("UDP");
  const [tsType, setTsType] = useState("SPTS");
  const [tsMode, setTsMode] = useState("");
  const [tsIPMode, setTsIPMode] = useState("");
  const [outputBitrateMode, setOutputBitrateMode] = useState("");
  const [legacyStbSupport, setLegacyStbSupport] = useState("");
  const [enableVlan, setEnableVlan] = useState("");
  const [enableTelnet, setEnableTelnet] = useState("");
  const [enableSsh, setEnableSsh] = useState("");
  const [enablesnmp, setEnablesnmp] = useState("");
  const [enableIPv6, setEnableIPv6] = useState("");
  const [sshPort, setSshPort] = useState("");
  const [enableSyslog, setEnableSyslog] = useState("");
  const [syslogDestIp, setSyslogDestIp] = useState("");
  const [syslogDestPort, setSyslogDestPort] = useState("");
  const [
    enableRemoteSysLogIpPortVisibleClass,
    setEnableRemoteSysLogIpPortVisibleClass,
  ] = useState("not-visible");
  const [outputFrequency, setOutputFrequency] = useState('')
  const [Interleaver, setInterleaver] = useState(1)
  const [qamMode, setQamMOde] = useState('')
  const [enablePush, setEnablePush] = useState('')
  const [enableOutOfBondMgmt, setEnableOutOfBondMgmt] = useState('');
  const [tsEthernetInterface, setTsEthernetInterface] = useState('')
  useEffect(() => {
    setInputMode(props.properties.input_mode);
    setVideoMode(props.properties.video_mode);
    setOutputMode(props.properties.output_mode);
    setTsType(props.properties.ts_type);
    setTsMode(props.properties.ts_mode);
    setOutputBitrateMode(props.properties.output_bitrate_mode);
    setLegacyStbSupport(props.properties.legacy_stb_support);
    setEnableVlan(DeviceModelCondition ? props.properties.enable_vlan : props.properties.enabled_vlan);
    setEnableTelnet(DeviceModelCondition ? props.properties.enable_telnet : props.properties.enabled_telnet);
    setEnableSsh(DeviceModelCondition ? props.properties.enable_ssh : props.properties.enabled_ssh);
    setEnableSyslog(DeviceModelCondition ? props.properties.enable_syslog : props.properties.enabled_syslog);
    setSyslogDestIp(props.properties.syslog_dest_ip);
    setEnablesnmp(props.properties.enabled_snmp);
    setEnableIPv6(props.properties.enableIPv6);
    setTsIPMode(props.properties.ts_ip_mode);
    setSyslogDestPort(props.properties.syslog_dest_port);
    setOutputFrequency(props.properties.qam_frequency);
    setInterleaver(props.properties.qam_interleaver);
    setQamMOde(props.properties.qam_mode);
    setEnablePush(props.properties.push_enabled);
    setEnableOutOfBondMgmt(props.properties.enabled_outofbandmanagement);
    setTsEthernetInterface(props.properties.ethernetinterface)
  }, [props.properties]);

  //   let setAutenticationWebPasswordButton =
  //     setAutenticationLoader === "" ? (
  //       <button
  //         type="submit"
  //         className="btn btn-dark"
  //         onClick={(event) => changeWebPasswordSubmit(event)}
  //       >
  //         {setAuthenticationWebPasswordChangeButtonText}
  //       </button>
  //     ) : (
  //       <button disabled className="btn btn-dark">
  //         {setAuthenticationWebPasswordChangeButtonText}
  //       </button>
  //     );

  //   let setFppasswordButton =
  //     setFppasswordLoader === "" ? (
  //       <button
  //         type="submit"
  //         className="btn btn-dark"
  //         onClick={(event) => changeFppasswordSubmit(event)}
  //       >
  //         {setFppasswordButtonText}
  //       </button>
  //     ) : (
  //       <button disabled className="btn btn-dark">
  //         {setFppasswordButtonText}
  //       </button>
  //     );

  //   let rebootButton =
  //     rebootButtonLoader === "" ? (
  //       <button
  //         type="submit"
  //         className="btn btn-dark"
  //         onClick={(event) => rebootButtonClick(event)}
  //       >
  //         {rebootButtonText}
  //       </button>
  //     ) : (
  //       <button disabled className="btn btn-dark">
  //         {rebootButtonText}
  //       </button>
  //     );

  //   const setAuthenticationCancelButton = (event) => {
  //     event.preventDefault();
  //     // changeSetAuthenticationClass("not-visible");
  //   };

  //   const toggleCheckBoxState = () => {
  //     changeFrontPanelCheckBox(!checkBoxFrontPanel);
  //     if (setFrontPanelClass === "not-visible") changeFrontPanelClass("");
  //     else changeFrontPanelClass("not-visible");
  //   };

  //   const changeFppasswordHandler1 = (value) => {
  //     setFppassword1(value);
  //   };

  //   const changeFppasswordHandler2 = (value) => {
  //     setFppassword2(value);
  //   };

  //   const changeWebPasswordHandler1 = (value) => {
  //     setWebpassword1(value);
  //   };

  //   const changeWebPasswordHandler2 = (value) => {
  //     setWebpassword2(value);
  //   };

  //   const changeWebPasswordSubmit = async (event) => {
  //     event.preventDefault();
  //     changeSetAutenticationLoader("active");
  //     changeSetAuthenticationWebPasswordChangeButtonText(
  //       <>
  //         <span
  //           className="spinner-border spinner-border-sm mr-1"
  //           role="status"
  //           aria-hidden="true"
  //         ></span>
  //         Change
  //       </>
  //     );
  //     if (webPassword1.localeCompare(webPassword2) === 0 && webPassword1 !== "") {
  //       let data = {
  //         ip: props.peerip,
  //         password: webPassword1,
  //         username: "admin",
  //       };

  //       let res = await VCDMSservice.CreateUpdate("setloginproperties", data)
  //         .then((res) => res.data)
  //         .catch((err) => {return});
  //       if (res) {
  //         if (res.status === "success") {
  //           changeSetAutenticationLoader("");
  //           changeSetAuthenticationWebPasswordChangeButtonText("Change");
  //           changeWebPasswordHandler1("");
  //           changeWebPasswordHandler2("");
  //         } else {
  //           changeSetAutenticationLoader("");
  //           changeSetAuthenticationWebPasswordChangeButtonText("Change");
  //           changeWebPasswordHandler1("");
  //           changeWebPasswordHandler2("");
  //           // alert("Unable to set Web Password");
  //           toast.error("Unable to set Web Password",{
  //             position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //           })

  //         }
  //       }
  //     } else {
  //       changeSetAutenticationLoader("");
  //       changeSetAuthenticationWebPasswordChangeButtonText("Change");
  //       // alert("Password doesn't match");
  //       toast.error("Password doesn't match",{
  //         position: "top-center",
  // autoClose: 5000,
  // hideProgressBar: false,
  // closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  // progress: undefined,
  //       })
  //     }
  //   };

  //   const changeFppasswordSubmit = async (event) => {
  //     event.preventDefault();
  //     changeSetFppasswordLoader("active");
  //     changeSetFppasswordButtonText(
  //       <>
  //         <span
  //           className="spinner-border spinner-border-sm mr-1"
  //           role="status"
  //           aria-hidden="true"
  //         ></span>
  //         Change
  //       </>
  //     );

  //     if (fppassword1.localeCompare(fppassword2) === 0 && fppassword1 !== "") {
  //       let data = {
  //         ip: props.peerip,
  //         lcdpassword: fppassword1,
  //       };

  //       let res = await VCDMSservice.CreateUpdate("setlcdloginproperties", data)
  //         .then((res) => res.data)
  //         .catch((err) => {return});
  //       if (res) {
  //         if (res.status === "success") {
  //           changeSetFppasswordLoader("");
  //           changeSetFppasswordButtonText("Change");
  //           changeFppasswordHandler1("");
  //           changeFppasswordHandler2("");
  //         } else {
  //           changeSetFppasswordLoader("");
  //           changeSetFppasswordButtonText("Change");
  //           // alert("Unable to change password due to some error");
  //           toast.error("Unable to change password due to some error",{
  //             position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //           })
  //         }
  //       }
  //     } else {
  //       changeSetFppasswordLoader("");
  //       changeSetFppasswordButtonText("Change");
  //       // alert("Passwords doesn't match or empty");
  //       toast.error("Passwords doesn't match or empty",{
  //         position: "top-center",
  // autoClose: 5000,
  // hideProgressBar: false,
  // closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  // progress: undefined,
  //       })

  //     }
  //   };

  //   const rebootButtonClick = async (event) => {
  //     event.preventDefault();
  //     changeRebootButtonLoader("active");
  //     changeRebootButtonText(
  //       <>
  //         <span
  //           className="spinner-border spinner-border-sm mr-1"
  //           role="status"
  //           aria-hidden="true"
  //         ></span>
  //         Yes
  //       </>
  //     );
  //     let data = {
  //       ip: props.peerip,
  //     };

  //     let res = await VCDMSservice.CreateUpdate("devicereboot", data)
  //       .then((res) => res.data)
  //       .catch((err) => {return});
  //     if (res) {
  //       if (res.status === "success") {
  //         changeRebootButtonText("Yes");
  //         changeRebootButtonLoader("");
  //         // changeRebootDeviceClass("not-visible");
  //         // alert("Device has been rebooted");
  //         toast.success("Device has been rebooted",{
  //           position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //         })

  //       } else {
  //         changeRebootButtonText("Yes");
  //         changeRebootButtonLoader("");
  //         // alert("An error occured while rebooting device");
  //         toast.error("An error occured while rebooting device",{
  //           position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //         })

  //       }
  //     } else {
  //       changeRebootButtonText("Yes");
  //       changeRebootButtonLoader("");
  //     }
  //   };

  const changeHandler = (event, setContent, type = "") => {
    let sample = { ...props.properties };
    let enablePrm = ['push_enabled', 'enabled_vlan', 'enable_vlan', 'enable_telnet', 'enabled_telnet', 'enabled_snmp', 'enableIPv6', 'enable_ssh', 'enabled_ssh', 'enabled_outofbandmanagement']
    if (type === "enable_syslog" || type === "enabled_syslog") {
      event.target.checked ? setContent("Y") : setContent("N");
      sample[type] = event.target.checked ? "Y" : "N";
      props.setProperties(sample);
      event.target.checked
        ? setEnableRemoteSysLogIpPortVisibleClass("")
        : setEnableRemoteSysLogIpPortVisibleClass("not-visible");
      return;
    }
    else if (enablePrm.includes(type)) {
      event.target.checked ? setContent("Y") : setContent("N");
      if (type === 'enabled_outofbandmanagement' && !event.target.checked) {
        sample['enabled_snmp'] = "N"
      }
      if (type === 'enable_vlan' || type === 'enabled_vlan') sample['enableIPv6'] = 'N';
      else if (type === 'enableIPv6') sample[DeviceModelCondition ? "enable_vlan" : "enabled_vlan"] = 'N'
      sample[type] = event.target.checked ? "Y" : "N";
      props.setProperties(sample);
      return;
    }
    else if (type === "legacy_stb_support") {
      event.target.checked ? setContent("1") : setContent("0");
      sample[type] = event.target.checked ? "1" : "0";
      props.setLegacyStbSupport(sample[type]);
      props.setProperties(sample);
      return;
    }
    setContent(event.target.value);
    sample[type] = event.target.value;
    props.setProperties(sample);
  };

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
    }
  };

  return (
    <>
      {props.selectedModel !== "RM1121HD/CXF" &&
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Encoder Preset Configuration</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Input Mode</label>
                    <select
                      className="form-control"
                      onChange={(event) =>
                        changeHandler(event, setInputMode, "input_mode")
                      }
                      value={inputMode}
                    >
                      <option value="">Select One</option>
                      {DeviceModelCondition ? <option value="1x3G">1x3G</option> :
                        props.selectedModel !== '' ?
                          <><option value="1x3G">1x3G</option>
                            <option value="2xHD">2xHD</option></>
                          : ''}
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Video Mode</label>
                    <select
                      className="form-control"
                      value={videoMode}
                      onChange={(event) => {
                        changeHandler(event, setVideoMode, "video_mode");
                        props.setVideoMode(event.target.value);
                      }}
                    >
                      <option value="">Select One</option>
                      {inputMode === '1x3G' && DeviceModelCondition ?
                        <>
                          <option value="1xHD">Single Stream(1xHD)</option>
                          <option value="1xHD+1xSD">Dual Stream(1xHD+1xSD)</option>
                        </> :
                        inputMode === '2xHD' ?
                          <>
                            <option value="2xHD">2xHD</option>
                            <option value="2xHD+1xSD">2xHD+1xSD</option>
                            <option value="2xHD+2xSD">2xHD+2xSD</option>
                          </> :

                          inputMode !== '' ?
                            <>
                              <option value="1xHD">1xHD</option>
                              <option value="1xHD+1xSD">1xHD+1xSD</option>
                            </> : ''
                      }
                    </select>
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
                      <option value="">Select One</option>
                      {props.selectedModel !== "" && props.selectedModel !== 'VL4510' ?
                        <><option value="UDP">UDP</option>
                          {!DeviceModelCondition ? <option value="ASI">ASI</option> : ''}
                          {props.selectedModel !== "VL4522Q" ? <option value="TCP">TCP</option> : ''}
                          {props.selectedModel.includes('RM1121XD') ? <option value="RTSP">RTSP</option> : ''}

                          {props.selectedModel === "VL4522Q" ? <option value="QAM">QAM</option> : ''}</> :
                        props.selectedModel !== "" && props.selectedModel === 'VL4510' ?
                          <><option value="UDP">UDP</option>
                            <option value="ASI">ASI</option></> : ''
                      }
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">TS Type</label>
                    <select
                      className="form-control"
                      onChange={(event) =>
                        changeHandler(event, setTsType, "ts_type")
                      }
                      value={tsType}
                    >
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      {props.selectedModel !== "" ?
                        <><option value="DVB">DVB</option>
                          <option value="ATSC">ATSC</option>
                        </> : ''}
                    </select>
                  </div>
                </div>

                {DeviceModelCondition ?
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">
                        Output Bitrate Mode
                      </label>
                      <select
                        className="form-control"
                        value={outputBitrateMode}
                        onChange={(event) => {
                          changeHandler(event, setOutputBitrateMode, "output_bitrate_mode");
                          props.setOutputBitrateMode(event.target.value);
                        }}>
                        <option value="">Select One</option>
                        {props.selectedModel !== "" ?
                          <><option value="AUTO">AUTO</option>
                            <option value="MANUAL">MANUAL</option>
                          </> : ''}
                      </select>
                    </div>
                  </div> : ""}

                {!DeviceModelCondition ? (
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        ASI Input:
                        <input type="checkbox" className="enc-checkbox" />
                      </label>
                    </div>
                  </div>
                ) : (<></>)}

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Legacy STB Support:
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={legacyStbSupport === "1" ? true : false}
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

                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      }
      {(props.selectedModel.includes("VL4522Q") && outputMode === "QAM") && (
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
                      <option value="">Select One</option>
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
      {!DeviceModelCondition &&
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">System Interface Management</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                {DeviceModelCondition &&
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable Serial Console:
                        <input type="checkbox" className="enc-checkbox" />
                      </label>
                    </div>
                  </div>}

                {/* {(!props.selectedModel.includes('VL4510H') && !props.selectedModel.includes('VL4510C') && !props.selectedModel.includes('RM1')) ? */}
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable LCD and Keypad:
                      <input type="checkbox" className="enc-checkbox" />
                    </label>
                  </div>
                </div>

                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      }
      {/* {props.selectedModel === 'RM1121HD/CXF' ?
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Network Interface Management</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable IPv6:
                      <input type="checkbox" className="enc-checkbox"
                        checked={enableIPv6 === "Y"}
                        onChange={(event) =>
                          changeHandler(event, setEnableIPv6, "enableIPv6")
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable SNMP Trap:
                      <input type="checkbox" className="enc-checkbox"
                        checked={enablesnmp === "Y"}
                        onChange={(event) =>
                          changeHandler(event, setEnablesnmp, "enabled_snmp")
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      TS IP Mode:
                      <select
                        className="form-control"
                        onChange={(event) => {
                          changeHandler(event, setTsIPMode, "ts_ip_mode");
                          // props.setTsMode(event.target.value);
                        }}
                        value={tsIPMode}
                      >
                        <option value="">Select One</option>
                        {props.selectedModel !== "" ?
                          <><option value="Static">Static</option>
                            <option value="DHCP">DHCP</option>
                          </> : ''}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div> : (!props.selectedModel.includes('VL4510H') && !props.selectedModel.includes('VL4510C') && !props.selectedModel.includes('RM11')) ? (
          <div className="pad-15">
            <div className="form-boxdiv">
              <div className="form-boxtopline5">Network Interface Management</div>
              <div className="form-boxtopcont user-form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">
                        TS Ethernet Interface
                      </label>
                      <select >
                        <option>Select One</option>
                        {props.selectedModel !== "" ? <option>copper</option> : ''}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable VLAN:
                      </label>
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={enableVlan === "Y" ? true : false}
                        onChange={(event) =>
                          changeHandler(event, setEnableVlan, "enabled_vlan")
                        }
                      />
                    </div>
                  </div>

                  <div className="clear"></div>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        ) : (<></>)} */}

      {DeviceModelCondition || props.selectedModel.includes('VL4522Q') ? (
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
                      // disabled={
                      //   props.customerData.Role === "Operator" ? true : false
                      // }
                      checked={enableIPv6 === "Y" ? true : false}
                      onChange={(event) => {
                        changeHandler(event, setEnableIPv6, "enableIPv6")
                        // props.setEnableIpv6(event.target.checked ? 'Y' : 'N')
                      }
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group form-inline w-50">
                    <label className="form-check-label mr-3">TS IP Mode</label>
                    <select className="form-control flex-grow-1"
                      value={tsIPMode}
                      onChange={(event) => changeHandler(event, setTsIPMode, "ts_ip_mode")}
                    >
                      <option value="">Select One</option>
                      <option value="static">Static</option>
                      <option value="DHCP">DHCP</option>
                    </select>
                  </div>
                </div>
                {props.selectedModel.includes("RM1121HD/CXF") &&
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label enc-status">
                        Enable SNMP Trap:
                      </label>
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={enablesnmp === 'Y' ? true : false}
                        // disabled={
                        //   props.customerData.Role === "Operator" ? true : false
                        // }
                        onChange={(event) => {
                          changeHandler(event, setEnablesnmp, "enabled_snmp")
                          // props.setEnableSnmp(event.target.checked ? 'Y' : 'N')
                        }}
                      />
                    </div>
                  </div>}
                {!props.selectedModel.includes('VL4522Q') && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable Push Notification:
                    </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      // disabled={
                      //   props.customerData.Role === "Operator" ? true : false
                      // }
                      checked={enablePush === "Y" ? true : false}
                      onChange={(event) => {
                        changeHandler(event, setEnablePush, "push_enabled")
                        // props.setEnablePush(event.target.checked ? 'Y' : 'N')
                      }
                      }
                    />
                  </div>
                </div>}
                {!props.selectedModel.includes("RM1121HD/CXF") && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Enable VLAN:
                    </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={enableVlan === "Y"}
                      // disabled={
                      //   props.customerData.Role === "Operator" ? true : false
                      // }
                      onChange={(event) =>
                        changeHandler(event, setEnableVlan, DeviceModelCondition ? "enable_vlan" : "enabled_vlan")
                      }
                    />
                  </div>
                </div>}
                {props.selectedModel.includes('VL4522Q') && <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      TS Ethernet Interface
                    </label>
                    <select className="form-control"
                      value={tsEthernetInterface}
                      onChange={(e) => changeHandler(e, setTsEthernetInterface, 'ethernetinterface')}
                    >
                      <option value="">Select One</option>
                      <option value={'lan0'}>copper</option>
                      {props.selectedModel.substring(0, 4) === "VL45" && (
                        <option value={'lan1'}>SFP</option>
                      )}
                    </select>
                  </div>
                </div>}

                {props.selectedModel.includes('VL4522Q') && (
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
                          // disabled={
                          //   props.customerData.Role === "Operator" ? true : false
                          // }
                          onChange={(event) => {
                            changeHandler(event, setEnableOutOfBondMgmt, "enabled_outofbandmanagement")
                            // props.setEnableOutOfBondMgmt(event.target.checked ? 'Y' : 'N');
                            // props.setEnableSnmp('N');
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
                            checked={enablesnmp === 'Y' ? true : false}
                            // disabled={
                            //   props.customerData.Role === "Operator" ? true : false
                            // }
                            onChange={(event) => {
                              changeHandler(event, setEnablesnmp, "enabled_snmp")
                              // props.setEnableSnmp(event.target.checked ? 'Y' : 'N')
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

      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Remote Access Configuration</div>
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
                    onChange={(event) =>
                      changeHandler(event, setEnableTelnet, DeviceModelCondition ? "enable_telnet" : "enabled_telnet")
                    }
                  />
                </div>
              </div>


              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">SSH:</label>
                  <input
                    type="checkbox"
                    className="enc-checkbox"
                    checked={enableSsh === "Y" ? true : false}
                    onChange={(event) =>
                      changeHandler(event, setEnableSsh, DeviceModelCondition ? "enable_ssh" : "enabled_ssh")
                    }
                  />
                </div>
              </div>

              {enableSsh === 'Y' && <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">Port</label>
                  <input
                    type="number"
                    className="enc-checkbox"
                    value={sshPort}
                    onChange={(event) =>
                      changeHandler(event, setSshPort, "ssh_port")
                    }
                  />
                </div>
              </div>}
              {/* {ticked===true?
            <span >
            <label style={{paddingLeft:200}}>Port:</label>
                    <input
                      type="text"
                      // value={valueport}
                      name="sshport"
                      placeholder="Enter Port"
                      onChange={(event)=>{
                        if (event.target.value.match(/[^0-9]/)) {return;}
                        // setvalueport(event.target.value.replace(/[^0-9]/g,""))}
                      }}
                    />  
              </span> 
:""} */}

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
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
                    onChange={(event) =>
                      changeHandler(event, setEnableSyslog, DeviceModelCondition ? "enable_syslog" : "enabled_syslog")
                    }
                  />
                </div>
              </div>

              <div
                className={"col-sm-6 " + enableRemoteSysLogIpPortVisibleClass}
              >
                <div className="form-group">
                  <label className="form-check-label enc-status">IP:</label>
                  <input
                    type="text"
                    className="enc-checkbox"
                    value={syslogDestIp}
                    onChange={(event) => {
                      let string = event.target.value.split(":")[0];
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
                      changeHandler(event, setSyslogDestIp, "syslog_dest_ip")
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
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setSyslogDestPort,
                        "syslog_dest_port"
                      )
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

      {/* <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Device Management</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Set Authentication:
                  </label>
                  <button
                    className="btn btn-dark enc-checkbox"
                    onClick={() => changeSetAuthenticationClass("")}
                  >
                    Go
                  </button>
                  <div className={setAuthenticationClass}>
                    <form>
                      <div className="mb-3 form-check">
                        {checkBox}
                        <label className="form-check-label" for="exampleCheck1">
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
                    Update Firmware:
                  </label>
                  <button className="btn btn-dark enc-checkbox" disabled>
                    Go
                  </button>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Reboot Device:
                  </label>
                  <button
                    className="btn btn-dark enc-checkbox"
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
              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div> */}
      {/* <ToastContainer/> */}
    </>
  );
};

export default System;