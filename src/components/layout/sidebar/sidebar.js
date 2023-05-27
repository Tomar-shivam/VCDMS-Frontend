import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Accordion, Card } from "react-bootstrap";
import VCDMSService from "../../../services/http.service";
import Loader from "../../../common/loader";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import logosidebar from "../../logo/logo.png";
import ErrorMsg from '../../../common/errorMsg';
import SuccessMessage from '../../../common/successMsg';
let SideBar = (props) => {
  //   const [encoderbtn, setEncoderbtn] = useState("");
  const [spinellvis, setSpinellvis] = useState(-1);
  const [spinencoder, setSpinencoder] = useState(-1);
  const [ellvisSpinner, setEllvisSpinner] = useState(false);
  const [ellvisStateBold, setEllvisStateBold] = useState("");
  const [clickedParent, setClickedParent] = useState(
    localStorage.getItem("clickedParent")
      ? Number.parseInt(localStorage.getItem("clickedParent"))
      : -1
  );
  const [clickedChild, setClickedChild] = useState(
    localStorage.getItem("clickedChild")
      ? Number.parseInt(localStorage.getItem("clickedChild"))
      : -1
  );
  let [loading, setState] = useState(false);
  useEffect(() => {
    localStorage.setItem("clickedParent", clickedParent);
    localStorage.setItem("clickedChild", clickedChild);
  }, [clickedParent, clickedChild]);

  const cardClick = (event, value, cardData, ellvis) => {
    event.preventDefault();
    props.ellvisClick();
    if (ellvisStateBold === "") setEllvisStateBold("submenu-active");
    else setEllvisStateBold("");
    props.setIp(value);
    props.setCardData(cardData);
    props.setClickedEllvis(ellvis);
  };
  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  const getColor = (stats) => {
    if (stats.MailStatus === "not running") return "";
    if (stats.MailStatus === "disconnected") return "two";
    if (stats.MailStatus === "connected") return "one";
    if (stats.MailStatus === "major") return "three";
  };

  const changeEncoderData = (
    event,
    encoder,
    peerIP,
    inputStats,
    outputStats,
    inputStream
  ) => {
    showLoader();
    event.preventDefault();
    localStorage.setItem("encoderId", encoder.Id);
    //if (inputStream != "SRT L 50.239.254.202:20443") {
    // setEncoderbtn(peerIP);
    props.setPeerIP(peerIP);
    props.setIp(encoder.deviceip);
    hideLoader();
  };

  const getActiveKeyRegion = () => {
    for (let i = 0; i < props.sidebarClassesRegion.length; i++) {
      if (props.sidebarClassesRegion[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };

  const getActiveKeySystem = () => {
    for (let i = 0; i < props.sidebarClassesSystem.length; i++) {
      if (props.sidebarClassesSystem[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };

  const getActiveKeyDevice = () => {
    for (let i = 0; i < props.sidebarClassesDevices.length; i++) {
      if (props.sidebarClassesDevices[i] === "1") {
        return i.toString();
      }
    }
    return "";
  };

  const toggleRegionCard = (event, index) => {
    let x = [...props.sidebarClassesRegion];
    let y = [...props.regionButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setRegionButtons(y);
    props.setSidebarClassesRegion(x);
    localStorage.setItem("regionClasses", x);
    localStorage.setItem("regionButtons", y);
  };

  const toggleSystemCard = (event, index) => {
    let x = [...props.sidebarClassesSystem];
    let y = [...props.systemButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setSidebarClassesSystem(x);
    props.setSystemButtons(y);
    localStorage.setItem("systemClasses", x);
    localStorage.setItem("systemButtons", y);
  };

  const toggleDeviceCard = (event, index) => {
    event.preventDefault();
    let x = [...props.sidebarClassesDevices];
    let y = [...props.deviceButtons];
    for (let i = 0; i < x.length; i++) {
      if (i !== index) {
        y[i] = "fa-plus-circle";
        x[i] = "0";
      }
    }
    y[index] = x[index] === "1" ? "fa-plus-circle" : "fa-minus-circle";
    x[index] = x[index] === "1" ? "0" : "1";
    props.setSidebarClassesDevices(x);
    props.setDeviceButtons(y);
    localStorage.setItem("deviceClasses", x);
    localStorage.setItem("deviceButtons", y);
  };

  //   const checkBoxClickHandler = (event, peerIP, ellvisindex, index) => {
  //     event.preventDefault();
  //     let checkboxes = [...props.selectedStreams];
  //     let peerIPs = [...props.peerIPs];
  //     if (ellvisindex === 0) {
  //       checkboxes[index] = event.target.checked;
  //       peerIPs[index] = peerIP;
  //     } else {
  //       checkboxes[props.streamIndexSum[ellvisindex - 1] + index] =
  //         event.target.checked;
  //       peerIPs[props.streamIndexSum[ellvisindex - 1] + index] = peerIP;
  //     }

  //     props.setSelectedStreams(checkboxes);
  //     props.setPeerIPs(peerIPs);
  //   };

  const isEllvis = (device) => {
    let obj = {
      isEllvis: false,
    };

    if (device.DeviceType === "ELLVIS9000V3") {
      obj.isEllvis = true;
      obj.ellvis = {
        ConnectedDevice: [],
        deviceip: device.IP,
      };
      for (let i = 0; i < props.ellvisList.length; i++) {
        if (props.ellvisList[i].deviceip === device.IP) {
          obj.isEllvis = true;
          obj["ellvis"] = props.ellvisList[i];
          return obj;
        }
      }
    }
    return obj;
  };

  const refreshLegacyClickHandler = async (
    event,
    peerIP,
    ellvisindex,
    encoderindex
  ) => {
    event.preventDefault();
    setSpinellvis(ellvisindex);
    setSpinencoder(encoderindex);
    let data = {
      IP: peerIP,
    };

    let res = await VCDMSService.getByBoj("refreshlegacy", data)
      .then((res) => res.data)
      .catch((err) => {
        // alert("Unable to refresh the stream");
        return null;
      });

    if (res) {
      if (res.ack === "1") {
        // alert("Successfully refreshed the stream");
        SuccessMessage(res.message);
      } else {
        // alert("Unable to refresh the stream");
        ErrorMsg(res.message);
      }
    } else {
      ErrorMsg("Unable to refresh the device");
      setSpinellvis(-1);
      setSpinencoder(-1);
    }

    setSpinellvis(-1);
    setSpinencoder(-1);
  };

  const refreshEncoderClickHandler = async (
    event,
    peerIP,
    ellvisindex,
    deviceType,
    encoderindex,
  ) => {
    event.preventDefault();
    setSpinellvis(ellvisindex);
    setSpinencoder(encoderindex);
    let data = {
      ip: peerIP,
    };

    let res = await VCDMSService.getByBoj("refreshstream", data)
      .then((res) => res.data)
      .catch((err) => {
        setSpinellvis(-1);
        setSpinencoder(-1);
        return null;
      });
    props.setgetalldevicesApi(true);

    if (res) {
      if (res.status === "success" && (deviceType.includes('VL45') || deviceType.includes('RM11'))) {
        // alert("Successfully refreshed the stream");
        SuccessMessage(res.message);
        props.setEncoderRefresh(true);
      }
      else if (res.status && (deviceType.includes('VL45') || deviceType.includes('RM11'))) {
        // alert("Unable to refresh the stream");
        ErrorMsg("Unable to refresh the encoder");
        props.setEncoderRefresh(false);
      }
    } else {
      ErrorMsg("Unable to refresh the encoder");
      setSpinellvis(-1);
      setSpinencoder(-1);
    }

    setSpinellvis(-1);
    setSpinencoder(-1);
  };

  const refreshStreamClickHandler = async (
    event,
    ip,
    ellvisindex,
    encoderindex,
    encoderId,

  ) => {
    event.preventDefault();
    let id = sessionStorage.getItem("streamId");

    if (id === encoderId) {
      setSpinellvis(ellvisindex);
      setSpinencoder(encoderindex);
      let data = {
        ip: ip,
        Id: encoderId,
      };

      let res = await VCDMSService.getByBoj("refreshstreambyid", data)
        .then((res) => res.data)
        .catch((err) => {
          // alert("Unable to refresh the stream");

          setSpinellvis(-1);
          setSpinencoder(-1);
          return null;
        });

      if (res) {
        if (res.status === "success") {

          // alert("Successfully refreshed the stream");
          SuccessMessage("Successfully refreshed the stream");
          props.setCheckStreamsStatsRefresh(true);
        } else {
          // alert("Unable to refresh the stream");
          ErrorMsg("Unable to refresh the stream");
          props.setCheckStreamsStatsRefresh(false);
        }
      } else {
        ErrorMsg("Unable to refresh the stream");
        setSpinellvis(-1);
        setSpinencoder(-1);
      }

      setSpinellvis(-1);
      setSpinencoder(-1);
    }
    else {
      setSpinellvis(ellvisindex);
      setSpinencoder(encoderindex);
      let data = {
        ip: ip,
        Id: encoderId
      };

      let res = await VCDMSService.getByBoj("refreshstreambyid", data)
        .then((res) => res.data)
        .catch((err) => {
          // alert("Unable to refresh the stream");

          setSpinellvis(-1);
          setSpinencoder(-1);
          return null;
        });

      if (res) {
        if (res.status === "success") {
          // alert("Successfully refreshed the stream");
          SuccessMessage("Successfully refreshed the stream");
        } else {
          // alert("Unable to refresh the stream");
          ErrorMsg("Unable to refresh the stream");
        }
      } else {
        ErrorMsg("Unable to refresh the stream");
        setSpinellvis(-1);
        setSpinencoder(-1);
      }

      setSpinellvis(-1);
      setSpinencoder(-1);
    }

  };

  const refreshEllvisClickHandler = async (event, deviceip, ellvisindex) => {
    event.preventDefault();
    let data = {
      ip: deviceip,
    };
    setSpinellvis(ellvisindex);
    setEllvisSpinner(true);
    let res = await VCDMSService.CreateUpdate("refreshellvis", data)
      .then((res) => { return res.data })
      .catch((err) => {
        setSpinellvis(-1);
        setSpinencoder(-1);
        return null;
      });
    if (res) {
      if (res.status === "success") {
        props.setCheckEllvisStreamRefresh(true);
        props.fetchEllvisList();
        setTimeout(() => { props.getAllDevices() }, 2000);

        SuccessMessage("Successfully refreshed ELLVIS");
      } else {
        ErrorMsg("Unable to refresh Ellvis");
        props.setCheckEllvisStreamRefresh(false);
      }
    } else {
      ErrorMsg("Unable to refresh ELLVIS");
      props.setCheckEllvisStreamRefresh(false);
    }
    setSpinellvis(-1);
    setSpinencoder(-1);
    setEllvisSpinner(false);
  };

  const getColorEncoder = (status, IP, deviceList) => {
    for (let j = 0; j < deviceList.length; j++) {
      if (deviceList[j].IP === IP) {
        if (deviceList[j].status) {
          let encoder1_status = deviceList[j].status.encoder1_status;
          let encoder2_status = deviceList[j].status.encoder2_status;
          let encoder3_status = deviceList[j].status.encoder3_status;
          let encoder4_status = deviceList[j].status.encoder4_status;
          let arr = [encoder1_status, encoder2_status, encoder3_status, encoder4_status];
          for (let i = 0; i < Number.parseInt(deviceList[j].status.encoder_count); i++) {
            if (arr[i] === '4' || (status && status.status === 'NA')) {
              return "two";
            }
          }
        }
      }
    }
    for (let j = 0; j < deviceList.length; j++) {
      if (status === undefined || status === null || status.status === "error" || status.status === "NA") {
        return "two";
      }
      if (deviceList[j].IP === IP) {
        if (deviceList[j].status) {
          let encoder1_status = deviceList[j].status.encoder1_status;
          let encoder2_status = deviceList[j].status.encoder2_status;
          let encoder3_status = deviceList[j].status.encoder3_status;
          let encoder4_status = deviceList[j].status.encoder4_status;
          let arr = [encoder1_status, encoder2_status, encoder3_status, encoder4_status];
          for (let i = 0; i < Number.parseInt(deviceList[j].status.encoder_count); i++) {
            if (arr[i] === '0') {
              return "";
            }
          }
        }
      }
    }
    return "one";
  };
  return (
    <>
      <div className="encoderBar col-3 left-sidefixed-outer">
        {loading ? <Loader /> : null}
        <div className="logo-sidebar">
          <img src={logosidebar} alt="" />
        </div>
        <Accordion className="left-sidefixed" activeKey={getActiveKeyRegion()}>
          {/* <div className="row m-0 pl-1 stream-sort-select">
            <div className="col-6 px-1">
              <select className="form-control" defaultValue={sessionStorage.getItem('DeviceType')} onChange={(e)=>{
                if(e.target.value=='Dated'){
                  props.setDropDownenable(false);
                  sessionStorage.setItem('DeviceType',e.target.value);
                  props.streamSortClickHandler(sessionStorage.getItem('DeviceTypeAscDsc'));
                  sessionStorage.setItem('DeviceTypeNotInList','enable');
              }
                else{props.setDropDownenable(true);}
                let filterList=props.deviceList.filter(checkDevice=>{
                  if(checkDevice.DeviceType==e.target.value){
                    return checkDevice;
                  }
                })
                if(filterList.length>0){
                  sessionStorage.setItem('DeviceType',e.target.value);
                  props.streamSortClickHandler(e.target.value);
                }else if(e.target.value!='Dated'){
                    props.setDropDownenable(true);
                    sessionStorage.setItem('DeviceTypeNotInList','disable');
                  }
                }}>
                <option hidden={true}>SORT BY</option>
                <option value="Ellvis9000">Ellvis9000</option>
                <option value="VL4500">VL4500</option>
                <option value="RM1100">RM1100</option>
                <option value="LEGACY">LEGACY</option>
                <option value="Dated">Date</option>
              </select>
            </div>
            <div className="col-6 px-1">
              <select className="form-control" disabled={props.dropDownenable} defaultValue={sessionStorage.getItem('DeviceTypeAscDsc')} onChange={(e)=>{
                sessionStorage.setItem('DeviceTypeAscDsc',e.target.value);
                props.streamSortClickHandler(e.target.value);
                }}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </div>
          </div> */}
          {props.regionList.map((region, regionindex) => {
            return (
              <Card
                key={regionindex}
                className="leftCard card-sidebar change-margin-top"
              >
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={regionindex.toString()}
                >
                  <Link
                    to="/content/dashboard"
                    className={"headcustm-btn color-inherit"}
                  >
                    <i
                      className={
                        "cus-pointer fa head circlegreen " +
                        props.regionButtons[regionindex]
                      }
                      onClick={(event) => toggleRegionCard(event, regionindex)}
                    ></i>{" "}
                    <href
                      className={
                        "headcustm-btn color-inherit text-dec-underline"
                      }
                    >
                      {region.Region}
                    </href>
                  </Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={regionindex.toString()}>
                  <Card.Body className="card-body2">
                    <Accordion activeKey={getActiveKeySystem()}>
                      {props.systemList.map((system, systemindex) => {
                        if (system.RegionID === region._id) {
                          return (
                            <Card
                              key={systemindex}
                              className="card-sidebar leftcard"
                            >
                              <Accordion.Toggle
                                as={Card.Header}
                                eventKey={systemindex.toString()}
                              >
                                <Link
                                  to="/content/dashboard"
                                  className={"headcustm-btn color-inherit"}
                                >
                                  <i
                                    className={
                                      "cus-pointer fa head circlegreen " +
                                      props.systemButtons[systemindex]
                                    }
                                    onClick={(event) =>
                                      toggleSystemCard(event, systemindex)
                                    }
                                  ></i>{" "}
                                  <href
                                    className={
                                      "headcustm-btn color-inherit text-dec-underline"
                                    }
                                  >
                                    {system.System}
                                  </href>
                                </Link>
                              </Accordion.Toggle>
                              <Accordion.Collapse
                                eventKey={systemindex.toString()}
                              >
                                <Card.Body className="card-body2">
                                  <Accordion activeKey={getActiveKeyDevice()}>
                                    {
                                      props.deviceList.map(
                                        (ellvis, ellvisindex) => {
                                          if (
                                            ellvis.SystemID === system._id &&
                                            ellvis.RegionID === region._id
                                          ) {
                                            let obj = isEllvis(ellvis);
                                            if (obj.isEllvis && obj.ellvis) {
                                              return (
                                                <Card
                                                  key={ellvisindex}
                                                  className="leftCard card-sidebar "
                                                >
                                                  <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey={ellvisindex.toString()}
                                                  >
                                                    <i
                                                      id={
                                                        !obj.ellvis
                                                          .ConnectedDevice ||
                                                          obj.ellvis.ConnectedDevice
                                                            .length === 0
                                                          ? "two"
                                                          : ""
                                                      }
                                                      className={
                                                        !obj.ellvis
                                                          .ConnectedDevice ||
                                                          obj.ellvis.ConnectedDevice
                                                            .length === 0
                                                          ? "cus-pointer fa head circlegreen fa-circle"
                                                          : "cus-pointer fa head circlegreen " +
                                                          props.deviceButtons[
                                                          ellvisindex
                                                          ]
                                                      }
                                                      onClick={(event) =>
                                                        toggleDeviceCard(
                                                          event,
                                                          ellvisindex
                                                        )
                                                      }
                                                    ></i>
                                                    <span
                                                      onClick={(event) =>
                                                        cardClick(
                                                          event,
                                                          obj.ellvis.deviceip,
                                                          obj.ellvis
                                                            .ConnectedDevice,
                                                          obj.ellvis
                                                        )
                                                      }
                                                    >
                                                      {" "}
                                                      {ellvis.IsPasswordNeeded ===
                                                        false ? (
                                                        <>
                                                          <Tippy
                                                            className="tomato-theme"
                                                            content={
                                                              <>
                                                                <span className="textbold">
                                                                  IP :{" "}
                                                                </span>
                                                                {ellvis.IP}
                                                                <br />
                                                                <span className="textbold">
                                                                  Device Name :{" "}
                                                                </span>
                                                                {
                                                                  ellvis.DeviceName
                                                                }
                                                                <br />
                                                                <span className="textbold">
                                                                  Device Type :{" "}
                                                                </span>
                                                                {
                                                                  ellvis.DeviceType
                                                                }
                                                                <br />
                                                              </>
                                                            }
                                                          >
                                                            <Link
                                                              to={
                                                                "/content/ellvis/" +
                                                                obj.ellvis
                                                                  .deviceip +
                                                                "/dashboard"
                                                              }
                                                              onClick={(
                                                                event
                                                              ) => {
                                                                setClickedParent(
                                                                  ellvisindex
                                                                );
                                                                setClickedChild(
                                                                  -1
                                                                );
                                                              }}
                                                              className={
                                                                "headcustm-btn color-inherit text-dec-underline " +
                                                                (clickedParent ===
                                                                  ellvisindex
                                                                  ? "text-bold"
                                                                  : "")
                                                              }
                                                            >
                                                              {ellvis.DeviceName.toUpperCase()}
                                                            </Link>
                                                          </Tippy>
                                                          <i
                                                            className={
                                                              "fa fa-refresh refresh-button " +
                                                              (spinellvis ===
                                                                ellvisindex &&
                                                                ellvisSpinner
                                                                ? "fa-spin"
                                                                : "")
                                                            }
                                                            onClick={(event) =>
                                                              refreshEllvisClickHandler(
                                                                event,
                                                                ellvis.IP,
                                                                ellvisindex
                                                              )
                                                            }
                                                          ></i>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <Tippy
                                                            className="tomato-theme"
                                                            content={
                                                              <>
                                                                <span className="textbold">
                                                                  IP :{" "}
                                                                </span>
                                                                {ellvis.IP}
                                                                <br />
                                                                <span className="textbold">
                                                                  Device Name :{" "}
                                                                </span>
                                                                {
                                                                  ellvis.DeviceName
                                                                }
                                                                <br />
                                                                <span className="textbold">
                                                                  Device Type :{" "}
                                                                </span>
                                                                {
                                                                  ellvis.DeviceType
                                                                }
                                                                <br />
                                                              </>
                                                            }
                                                          >
                                                            <Link
                                                              to={
                                                                "/content/setpassword/ellvis"
                                                              }
                                                              onClick={() => {
                                                                setClickedParent(
                                                                  ellvisindex
                                                                );
                                                                setClickedChild(-1);

                                                                localStorage.setItem(
                                                                  "SetPasswordIP",
                                                                  ellvis.IP
                                                                );
                                                                localStorage.setItem(
                                                                  "SetPasswordID",
                                                                  ellvis._id
                                                                );
                                                                localStorage.setItem(
                                                                  "nextUrl",
                                                                  "/content/ellvis/" +
                                                                  obj.ellvis
                                                                    .deviceip +
                                                                  "/dashboard"
                                                                );
                                                              }}
                                                              className={
                                                                "headcustm-btn color-inherit text-dec-underline alert-div " +
                                                                (clickedParent ===
                                                                  ellvisindex
                                                                  ? "text-bold"
                                                                  : "")
                                                              }
                                                            >
                                                              {ellvis.DeviceName.toUpperCase()}
                                                            </Link>
                                                          </Tippy>
                                                          <i className="fa fa-exclamation-triangle exclamation"></i>
                                                          <i
                                                            className={
                                                              "fa fa-refresh refresh-button " +
                                                              (spinellvis ===
                                                                ellvisindex &&
                                                                ellvisSpinner
                                                                ? "fa-spin"
                                                                : "")
                                                            }
                                                            onClick={(event) =>
                                                              refreshEllvisClickHandler(
                                                                event,
                                                                ellvis.IP,
                                                                ellvisindex
                                                              )
                                                            }
                                                          ></i>
                                                        </>
                                                      )}
                                                    </span>
                                                  </Accordion.Toggle>
                                                  <Accordion.Collapse
                                                    eventKey={ellvisindex.toString()}
                                                  >
                                                    <Card.Body className="card-body2">
                                                      <ul className="tree">
                                                        {obj.ellvis.ConnectedDevice.map(
                                                          (
                                                            encoder,
                                                            encoderindex
                                                          ) => {
                                                            return (
                                                              <li
                                                                className="items"
                                                                key={encoderindex}
                                                                onClick={() => {
                                                                  props.encoderClick();
                                                                  localStorage.setItem(
                                                                    "RegionID",
                                                                    region._id
                                                                  );
                                                                  localStorage.setItem(
                                                                    "SystemID",
                                                                    system._id
                                                                  );
                                                                  localStorage.setItem(
                                                                    "deviceip",
                                                                    ellvis.IP
                                                                  );
                                                                }}
                                                              >
                                                                <i
                                                                  className="fa fa-circle font9"
                                                                  id={getColor(
                                                                    encoder
                                                                  )}
                                                                ></i>{" "}
                                                                <span
                                                                  className=""
                                                                  onClick={(
                                                                    event
                                                                  ) =>
                                                                    changeEncoderData(
                                                                      event,
                                                                      encoder,
                                                                      encoder.peerIP,
                                                                      encoder.inputStats,
                                                                      encoder.outputStats,
                                                                      encoder.input
                                                                    )
                                                                  }
                                                                >
                                                                  <Tippy
                                                                    className="tomato-theme"
                                                                    content={
                                                                      <>
                                                                        <span className="textbold">
                                                                          Comment
                                                                          :{" "}
                                                                        </span>
                                                                        {
                                                                          encoder.comment
                                                                        }
                                                                        <br />
                                                                        <span className="textbold">
                                                                          Device
                                                                          Name :{" "}
                                                                        </span>
                                                                        {encoder.properties
                                                                          ? encoder
                                                                            .properties
                                                                            .devicename
                                                                          : encoder.peerIP
                                                                            ? ""
                                                                            : " "}
                                                                        <br />
                                                                        <span className="textbold">
                                                                          Model :{" "}
                                                                        </span>
                                                                        {encoder.properties
                                                                          ? encoder
                                                                            .properties
                                                                            .model
                                                                          : encoder.peerIP
                                                                            ? ""
                                                                            : " "}
                                                                        <br />
                                                                        <span className="textbold">
                                                                          PeerIP :{" "}
                                                                        </span>
                                                                        {encoder.peerIP
                                                                          ? encoder.peerIP.split(
                                                                            ":"
                                                                          )[0]
                                                                          : " "}
                                                                      </>
                                                                    }
                                                                  >
                                                                    <Link
                                                                      to={
                                                                        "/content/encoder/" +
                                                                        ellvisindex +
                                                                        "/" +
                                                                        encoderindex +
                                                                        "/dashboard"
                                                                      }
                                                                      className={
                                                                        "color-inherit " +
                                                                        (props
                                                                          .sidebarClassesDevices[
                                                                          ellvisindex
                                                                        ] ===
                                                                          "1" &&
                                                                          encoderindex ===
                                                                          clickedChild
                                                                          ? "text-bold"
                                                                          : "")
                                                                      }
                                                                      onClick={(
                                                                        event
                                                                      ) => {
                                                                        sessionStorage.setItem("streamId", encoder.Id)
                                                                        setClickedChild(
                                                                          encoderindex
                                                                        );
                                                                        setClickedParent(
                                                                          -1
                                                                        );
                                                                        props.setUpdateEncoderDashboardCheckbox(
                                                                          true
                                                                        );
                                                                        props.setResetDashboard(
                                                                          true
                                                                        );
                                                                      }}
                                                                    >
                                                                      {encoder !==undefined && !encoder.comment?"(No Comment)": 
                                                                      encoder !==undefined && encoder.comment !==undefined && encoder.comment.length !==undefined && encoder.comment.length <=25
                                                                        ? encoder.comment
                                                                        : encoder !==
                                                                          undefined &&
                                                                          encoder.comment !==
                                                                          undefined
                                                                          ? encoder.comment.substring(
                                                                            0,
                                                                            25
                                                                          ) +
                                                                          "..."
                                                                          : "..."}
                                                                    </Link>
                                                                  </Tippy>
                                                                  {/* {encoder.IsPasswordNeeded ===
                                                                  false ||
                                                                (encoder.IsCorrect &&
                                                                  encoder.Password) ? (
                                                                  <></>
                                                                ) : (
                                                                  <i className="fa fa-exclamation-triangle exclamation"></i>
                                                                )} */}
                                                                  {props
                                                                    .customerData
                                                                    .Role ===
                                                                    "Operator" ? (
                                                                    <></>
                                                                  ) : (
                                                                    <>
                                                                      {/* <input
                                                                    type="checkbox"
                                                                    checked={
                                                                      props
                                                                        .selectedStreams[
                                                                        encoderindex
                                                                      ]
                                                                    }
                                                                    className="margin-left-1"
                                                                    onClick={(
                                                                      event
                                                                    ) =>
                                                                      checkBoxClickHandler(
                                                                        event,
                                                                        encoder.peerIP,
                                                                        ellvisindex,
                                                                        encoderindex
                                                                      )
                                                                    }
                                                                  /> */}

                                                                      <i
                                                                        className={
                                                                          "fa fa-refresh refresh-button " +
                                                                          (spinellvis ===
                                                                            ellvisindex &&
                                                                            spinencoder ===
                                                                            encoderindex
                                                                            ? "fa-spin"
                                                                            : "")
                                                                        }
                                                                        onClick={(
                                                                          event
                                                                        ) =>
                                                                          refreshStreamClickHandler(
                                                                            event,
                                                                            encoder.deviceip,
                                                                            ellvisindex,
                                                                            encoderindex,
                                                                            encoder.Id,
                                                                          )
                                                                        }
                                                                      ></i>
                                                                    </>
                                                                  )}
                                                                </span>
                                                              </li>
                                                            );
                                                          }
                                                        )}
                                                      </ul>
                                                    </Card.Body>
                                                  </Accordion.Collapse>
                                                </Card>
                                              );
                                            } else if (
                                              ellvis.DeviceType === "LEGACY"
                                            ) {
                                              return (
                                                <Card
                                                  key={ellvisindex}
                                                  className="leftCard card-sidebar"
                                                >
                                                  <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey={ellvisindex.toString()}
                                                  >
                                                    <i
                                                      className="cus-pointer fa head circlegreen fa-circle"
                                                      id={
                                                        ellvis.status
                                                          ? ellvis.status
                                                            .status ===
                                                            "connected"
                                                            ? "one"
                                                            : "two"
                                                          : ""
                                                      }
                                                    ></i>{" "}
                                                    <i
                                                      style={{ display: "none" }}
                                                      className={
                                                        "cus-pointer fa head circlegreen " +
                                                        props.deviceButtons[
                                                        ellvisindex
                                                        ]
                                                      }
                                                      onClick={(event) =>
                                                        toggleDeviceCard(
                                                          event,
                                                          ellvisindex
                                                        )
                                                      }
                                                    ></i>
                                                    <span>
                                                      {" "}
                                                      {
                                                        <Tippy
                                                          className="tomato-theme"
                                                          content={
                                                            <>
                                                              <span className="textbold">
                                                                IP :{" "}
                                                              </span>
                                                              {ellvis.IP}
                                                              <br />
                                                              <span className="textbold">
                                                                Management IP :{" "}
                                                              </span>
                                                              {ellvis.ManagementIP ? ellvis.ManagementIP : ""}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Name :{" "}
                                                              </span>
                                                              {ellvis.DeviceName}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Type :{" "}
                                                              </span>
                                                              {ellvis.DeviceType}
                                                              <br />
                                                            </>
                                                          }
                                                        >
                                                          <Link
                                                            to={
                                                              "/content/legacy/" +
                                                              ellvisindex
                                                            }
                                                            onClick={(event) => {
                                                              setClickedParent(
                                                                ellvisindex
                                                              );
                                                              setClickedChild(-1);
                                                              localStorage.setItem(
                                                                "RegionID",
                                                                region._id
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordIP",
                                                                ellvis.IP
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordID",
                                                                ellvis._id
                                                              );
                                                              localStorage.setItem(
                                                                "SystemID",
                                                                system._id
                                                              );
                                                              localStorage.setItem(
                                                                "deviceip",
                                                                ellvis.IP
                                                              );
                                                              props.setResetDashboard(
                                                                true
                                                              );
                                                            }}
                                                            className={
                                                              "headcustm-btn color-inherit text-dec-underline " +
                                                              (ellvisindex ===
                                                                clickedParent
                                                                ? "text-bold"
                                                                : "")
                                                            }
                                                          >
                                                            {`${ellvis.DeviceName.toUpperCase()}: ${ellvis.IP
                                                              }`}
                                                          </Link>
                                                        </Tippy>
                                                      }
                                                      <i
                                                        className={
                                                          "fa fa-refresh refresh-button " +
                                                          (spinellvis ===
                                                            ellvisindex &&
                                                            spinencoder === 0
                                                            ? "fa-spin"
                                                            : "")
                                                        }
                                                        onClick={(event) =>
                                                          refreshLegacyClickHandler(
                                                            event,
                                                            ellvis.IP,
                                                            ellvisindex,
                                                            0
                                                          )
                                                        }
                                                      ></i>
                                                    </span>
                                                  </Accordion.Toggle>
                                                </Card>
                                              );
                                            } else {
                                              return (
                                                <Card
                                                  key={ellvisindex}
                                                  className="leftCard card-sidebar"
                                                >
                                                  <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey={ellvisindex.toString()}
                                                  >
                                                    <i
                                                      className="cus-pointer fa head circlegreen fa-circle"
                                                      id={getColorEncoder(
                                                        ellvis.status, ellvis.IP, props.deviceList
                                                      )}
                                                    ></i>{" "}
                                                    <i
                                                      style={{ display: "none" }}
                                                      className={
                                                        "cus-pointer fa head circlegreen " +
                                                        props.deviceButtons[
                                                        ellvisindex
                                                        ]
                                                      }
                                                      onClick={(event) =>
                                                        toggleDeviceCard(
                                                          event,
                                                          ellvisindex
                                                        )
                                                      }
                                                    ></i>
                                                    <span>
                                                      {" "}
                                                      {ellvis.IsPasswordNeeded ===
                                                        false ||
                                                        (ellvis.IsCorrect &&
                                                          ellvis.Password) ? (
                                                        (ellvis.LegacyIP) ? (<Tippy
                                                          className="tomato-theme"
                                                          content={
                                                            <>
                                                              <span className="textbold">
                                                                IP :{" "}
                                                              </span>
                                                              {ellvis.LegacyIP}
                                                              <br />
                                                              <span className="textbold">
                                                                Management IP :{" "}
                                                              </span>
                                                              {ellvis.IP}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Name :{" "}
                                                              </span>
                                                              {ellvis.DeviceName}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Type :{" "}
                                                              </span>

                                                              {ellvis.DeviceType}
                                                              <br />
                                                              {(ellvis.warningMessagesArray.length > 0 && ellvis.presetOptimization) ?
                                                                <span className="textbold">
                                                                  Warning Msg : <span style={{ color: '#a37900' }}>{"There is some issue in Preset"}</span>
                                                                  <br />
                                                                </span>
                                                                : ""}
                                                            </>
                                                          }
                                                        >
                                                          <Link
                                                            to={
                                                              "/content/encoder/" +
                                                              ellvisindex +
                                                              "/0/dashboard"
                                                            }
                                                            onClick={(event) => {
                                                              setClickedParent(
                                                                ellvisindex
                                                              );
                                                              setClickedChild(-1);
                                                              localStorage.setItem(
                                                                "RegionID",
                                                                region._id
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordIP",
                                                                ellvis.IP
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordID",
                                                                ellvis._id
                                                              );
                                                              localStorage.setItem(
                                                                "SystemID",
                                                                system._id
                                                              );
                                                              localStorage.setItem(
                                                                "deviceip",
                                                                ellvis.IP
                                                              );
                                                              props.setResetDashboard(
                                                                true
                                                              );
                                                            }}
                                                            className={
                                                              "headcustm-btn color-inherit text-dec-underline " +
                                                              (ellvisindex ===
                                                                clickedParent
                                                                ? "text-bold"
                                                                : "")
                                                            }
                                                          >
                                                            {ellvis.DeviceName.toUpperCase()}: {ellvis.IP}
                                                            {(ellvis.warningMessagesArray.length > 0 && ellvis.presetOptimization) ? <i className="fa fa-exclamation-triangle exclamation"></i> : ''}
                                                          </Link>
                                                        </Tippy>) : (<Tippy
                                                          className="tomato-theme"
                                                          content={
                                                            <>
                                                              <span className="textbold">
                                                                IP :{" "}
                                                              </span>
                                                              {ellvis.IP}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Name :{" "}
                                                              </span>
                                                              {ellvis.DeviceName}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Type :{" "}
                                                              </span>
                                                              {ellvis.DeviceType}
                                                              <br />
                                                              {(ellvis.warningMessagesArray.length > 0 && ellvis.presetOptimization) ?
                                                                <span className="textbold">
                                                                  Warning Msg : <span style={{ color: '#a37900' }}>{"There is some issue in Preset"}</span>
                                                                  <br />
                                                                </span>
                                                                : ""}
                                                            </>
                                                          }
                                                        >
                                                          <Link
                                                            to={
                                                              "/content/encoder/" +
                                                              ellvisindex +
                                                              "/0/dashboard"
                                                            }
                                                            onClick={(event) => {
                                                              setClickedParent(
                                                                ellvisindex
                                                              );
                                                              setClickedChild(-1);
                                                              localStorage.setItem(
                                                                "RegionID",
                                                                region._id
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordIP",
                                                                ellvis.IP
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordID",
                                                                ellvis._id
                                                              );
                                                              localStorage.setItem(
                                                                "SystemID",
                                                                system._id
                                                              );
                                                              localStorage.setItem(
                                                                "deviceip",
                                                                ellvis.IP
                                                              );
                                                              props.setResetDashboard(
                                                                true
                                                              );
                                                            }}
                                                            className={
                                                              "headcustm-btn color-inherit text-dec-underline " +
                                                              (ellvisindex ===
                                                                clickedParent
                                                                ? "text-bold"
                                                                : "")
                                                            }
                                                          >
                                                            {ellvis.DeviceName.toUpperCase()}: {ellvis.IP}
                                                            {(ellvis.warningMessagesArray.length > 0 && ellvis.presetOptimization) ? <i className="fa fa-exclamation-triangle exclamation"></i> : ''}
                                                          </Link>
                                                        </Tippy>)
                                                      ) : (
                                                        <Tippy
                                                          className="tomato-theme"
                                                          content={
                                                            <>
                                                              <span className="textbold">
                                                                IP :{" "}
                                                              </span>
                                                              {ellvis.IP}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Name :{" "}
                                                              </span>
                                                              {ellvis.DeviceName}
                                                              <br />
                                                              <span className="textbold">
                                                                Device Type :{" "}
                                                              </span>
                                                              {ellvis.DeviceType}
                                                              <br />
                                                            </>
                                                          }
                                                        >
                                                          <Link
                                                            to={
                                                              "/content/setpassword/encoder"
                                                            }
                                                            onClick={(event) => {
                                                              setClickedParent(
                                                                ellvisindex
                                                              );
                                                              setClickedChild(-1);
                                                              localStorage.setItem(
                                                                "SetPasswordIP",
                                                                ellvis.IP
                                                              );
                                                              localStorage.setItem(
                                                                "SetPasswordID",
                                                                ellvis._id
                                                              );
                                                              localStorage.setItem(
                                                                "RegionID",
                                                                region._id
                                                              );
                                                              localStorage.setItem(
                                                                "SystemID",
                                                                system._id
                                                              );
                                                              localStorage.setItem(
                                                                "deviceip",
                                                                ellvis.IP
                                                              );
                                                              localStorage.setItem(
                                                                "nextUrl",
                                                                "/content/encoder/" +
                                                                ellvisindex +
                                                                "/0/dashboard"
                                                              );
                                                            }}
                                                            className={
                                                              "headcustm-btn color-inherit text-dec-underline alert-div " +
                                                              (ellvisindex ===
                                                                clickedParent
                                                                ? "text-bold"
                                                                : "")
                                                            }
                                                          >
                                                            {ellvis.DeviceName.toUpperCase()}
                                                            <i className="fa fa-exclamation-triangle exclamation"></i>
                                                          </Link>
                                                        </Tippy>
                                                      )}
                                                      {/* {ellvis.Region !== "OnBoardRegion" && */}
                                                       <i
                                                        className={
                                                          "fa fa-refresh refresh-button " +
                                                          (spinellvis ===
                                                            ellvisindex &&
                                                            spinencoder === 0
                                                            ? "fa-spin"
                                                            : "")
                                                        }
                                                        onClick={(event) =>
                                                          refreshEncoderClickHandler(
                                                            event,
                                                            ellvis.IP,
                                                            ellvisindex,
                                                            ellvis.DeviceType,
                                                            0
                                                          )
                                                        }
                                                      ></i> 
                                                    </span>
                                                  </Accordion.Toggle>
                                                </Card>
                                              );
                                            }
                                          } else {
                                            return <></>;
                                          }
                                        }
                                      )}
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                    </Accordion>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SideBar;
