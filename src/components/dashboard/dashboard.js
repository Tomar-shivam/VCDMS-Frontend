import { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CardBody, Card, Table } from "reactstrap";
import "./dashboard.css";
import Loader from "../../common/loader";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

let intervalDevices = setInterval(() => { }, 3000);
let Dashboard = (props) => {
  const [systemClasses, setSystemClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    Region: "",
    Email: "",
    Contact: "",
  });
  const [regionClasses, setRegionClasses] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [arrowClasses, setArrowClasses] = useState([]);
  const [devicesClass, setDevicesClass] = useState([]);

  useEffect(() => {
    if (props.regionList.length > 0) {
      let classes = [...systemClasses];
      if (localStorage.getItem("dashboardSystemClasses"))
        classes = [
          ...localStorage.getItem("dashboardSystemClasses").split(","),
        ];
      let regionclasses = [...regionClasses];
      if (localStorage.getItem("dashboardRegionClasses"))
        regionclasses = [
          ...localStorage.getItem("dashboardRegionClasses").split(","),
        ];
      let arrowclasses = [...arrowClasses];
      if (localStorage.getItem("dashboardArrowClasses"))
        arrowclasses = [
          ...localStorage.getItem("dashboardArrowClasses").split(","),
        ];

      for (let i = 0; i < props.regionList.length; i++) {
        if (i >= classes.length) {
          classes.push("none");
          regionclasses.push("btn-100 btn btn-secondary");
          arrowclasses.push("faPlusCircle");
        }
      }
      setSystemClasses(classes);
      setRegionClasses(regionclasses);
      setArrowClasses(arrowclasses);
      localStorage.setItem("dashboardSystemClasses", classes);
      localStorage.setItem("dashboardRegionClasses", regionclasses);
      localStorage.setItem("dashboardArrowClasses", arrowclasses);
    }
  }, [props.regionList]);

  useEffect(() => {
    let regionClassesTemp = [...regionClasses];
    let arrowClassesTemp = [...arrowClasses];
    let systemClassesTemp = [...systemClasses];
    let deviceClassesTemp = [...devicesClass];
    for (let i = 0; i < props.sidebarClassesRegion.length; i++) {
      if (props.sidebarClassesRegion[i] === "1") {
        arrowClassesTemp[i] = "faMinusCircle";
        regionClassesTemp[i] = "btn-100-active btn btn-secondary";
        systemClassesTemp[i] = "";
      } else {
        arrowClassesTemp[i] = "faPlusCircle";
        regionClassesTemp[i] = "btn-100 btn btn-secondary";
        systemClassesTemp[i] = "none";
      }
    }
    for (let i = 0; i < props.sidebarClassesSystem.length; i++) {
      if (props.sidebarClassesSystem[i] === "1") {
        deviceClassesTemp[i] = "";
      } else {
        deviceClassesTemp[i] = "not-visible";
      }
    }
    setDevicesClass(deviceClassesTemp);
    setRegionClasses(regionClassesTemp);
    setArrowClasses(arrowClassesTemp);
    setSystemClasses(systemClassesTemp);
    localStorage.setItem("dashboardRegionClasses", regionClassesTemp);
    localStorage.setItem("dashboardArrowClasses", arrowClassesTemp);
    localStorage.setItem("dashboardSystemClasses", systemClassesTemp);
    localStorage.setItem("dashboardDeviceClasses", deviceClassesTemp);
  }, [
    props.sidebarClassesDevices,
    props.sidebarClassesRegion,
    props.sidebarClassesSystem,
  ]);

  useEffect(() => {
    let classes = [...devicesClass];
    if (localStorage.getItem("dashboardDeviceClasses"))
      classes = [...localStorage.getItem("dashboardDeviceClasses").split(",")];
    for (let i = 0; i < props.systemList.length; i++) {
      if (i >= devicesClass.length) {
        classes.push("not-visible");
      }
    }

    setDevicesClass(classes);
    localStorage.setItem("dashboardDeviceClasses", classes);
  }, [props.systemList]);

  const loadSidebar = async (event, RegionID, SystemID, index) => {
    event.preventDefault();
    let classes = [...devicesClass];
    let y = [...props.systemButtons];
    for (let i = 0; i < classes.length; i++) {
      if (i !== index) {
        classes[i] = "not-visible";
        y[i] = "fa-plus-circle";
      }
    }
    y[index] =
      classes[index] === "not-visible" ? "fa-minus-circle" : "fa-plus-circle";
    classes[index] = classes[index] === "not-visible" ? "" : "not-visible";
    if (classes[index] === "not-visible") {
      let x = [...props.sidebarClassesSystem];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      props.setSidebarClassesSystem(x);
      localStorage.setItem("systemClasses", x);
    } else {
      let x = [...props.sidebarClassesSystem];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      x[index] = "1";
      props.setSidebarClassesSystem(x);
      localStorage.setItem("systemClasses", x);
    }

    setDevicesClass(classes);
    props.setSystemButtons(y);
    localStorage.setItem("systemButtons", y);
    localStorage.setItem("dashboardDeviceClasses", classes);
  };

  const toggleDevice = async (event, index) => {
    event.preventDefault();
    let classes = [...props.sidebarClassesDevices];
    let y = [...props.deviceButtons];
    if (classes[index] === "1") {
      for (let i = 0; i < classes.length; i++) {
        classes[i] = "0";
        y[i] = "fa-plus-circle";
      }
    } else {
      for (let i = 0; i < classes.length; i++) {
        classes[i] = "0";
        y[i] = "fa-plus-circle";
      }
      classes[index] = "1";
      y[index] = "fa-minus-circle";
    }
    props.setSidebarClassesDevices(classes);
    props.setDeviceButtons(y);
    localStorage.setItem("deviceButtons", y);
    localStorage.setItem("deviceClasses", classes);
  };

  const toggleRow = (event, index) => {
    event.preventDefault();
    let classes = [...systemClasses];
    let y = [...props.regionButtons];
    for (let i = 0; i < classes.length; i++) {
      if (i !== index) {
        classes[i] = "none";
        y[i] = "fa-plus-circle";
      }
    }
    y[index] = classes[index] === "none" ? "fa-minus-circle" : "fa-plus-circle";
    classes[index] = classes[index] === "none" ? "" : "none";
    if (classes[index] === "none") {
      let x = [...props.sidebarClassesRegion];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      props.setSidebarClassesRegion(x);
      localStorage.setItem("regionClasses", x);
    } else {
      let x = [...props.sidebarClassesRegion];
      for (let i = 0; i < x.length; i++) {
        x[i] = "0";
      }
      x[index] = "1";
      props.setSidebarClassesRegion(x);
      localStorage.setItem("regionClasses", x);
    }

    let arrowclasses = [...arrowClasses];
    for (let i = 0; i < arrowclasses.length; i++) {
      if (i !== index) {
        arrowclasses[i] = "faPlusCircle";
      }
    }
    arrowclasses[index] =
      classes[index] === "none" ? "faPlusCircle" : "faMinusCircle";

    let regionclasses = [...regionClasses];
    for (let i = 0; i < regionclasses.length; i++) {
      if (i !== index) {
        regionclasses[i] = "btn-100 btn btn-secondary";
      }
    }
    regionclasses[index] =
      classes[index] === "none"
        ? "btn-100 btn btn-secondary"
        : "btn-100-active btn btn-secondary";
    setRegionClasses(regionclasses);
    setArrowClasses(arrowclasses);
    setSystemClasses(classes);
    props.setRegionButtons(y);
    localStorage.setItem("regionButtons", y);
    localStorage.setItem("dashboardRegionClasses", regionclasses);
    localStorage.setItem("dashboardArrowClasses", arrowclasses);
    localStorage.setItem("dashboardSystemClasses", classes);
  };

  const toggleSystemEmailsDetails = (event, details) => {
    event.preventDefault();
    setDetails(details);
    setToggle(!toggle);
  };

  const toggleRegionDetails = (event, details) => {
    event.preventDefault();
    setDetails(details);
    setToggle(!toggle);
  };

  return (
    <div className={"pad-15 "}>
      {loading ? <Loader /> : ""}
      <div className="boxplate">
        <div className="boxplate-heading">Regions</div>
        <div className="pad-new regions-scroll">
          {props.regionList.map((value, index) => {
            return (
              <>
                <div class="col-sm-12">
                  <div className="posrel">
                    <button
                      key={index}
                      className={regionClasses[index]}
                      onClick={(event) => toggleRow(event, index)}
                    >
                      {value.Region.length < 30
                        ? value.Region
                        : value.Region.substring(0, 30) + "...."}
                      <div>
                        <div className="alarmdiv">
                          <span className="color-dark-green font-bold">
                            Nominal :{" "}
                            {props.RegionCount[value._id]
                              ? props.RegionCount[value._id].Nominal
                              : 0}
                          </span>
                          <span className="color-red font-bold marl-15">
                            Critical :{" "}
                            {props.RegionCount[value._id]
                              ? props.RegionCount[value._id].Critical
                              : 0}
                          </span>
                          <span className="color-yellow font-bold marl-15">
                            Major :{" "}
                            {props.RegionCount[value._id]
                              ? props.RegionCount[value._id].Major
                              : 0}
                          </span>
                        </div>
                        <FontAwesomeIcon
                          className="faviconright font-centered"
                          icon={
                            arrowClasses[index] === "faPlusCircle"
                              ? faPlusCircle
                              : faMinusCircle
                          }
                        />
                      </div>
                    </button>
                  </div>
                  <div
                    key={"system" + index}
                    style={{ display: systemClasses[index] }}
                  >
                    <Card className="card-this">
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <div className="alarmdiv">
                            <span className="color-dark-green font-bold">
                              Nominal :{" "}
                              {props.RegionCount[value._id]
                                ? props.RegionCount[value._id].Nominal
                                : 0}
                            </span>
                            <span className="color-red font-bold marl-15">
                              Critical :{" "}
                              {props.RegionCount[value._id]
                                ? props.RegionCount[value._id].Critical
                                : 0}
                            </span>
                            <span className="color-yellow font-bold marl-15">
                              Major :{" "}
                              {props.RegionCount[value._id]
                                ? props.RegionCount[value._id].Major
                                : 0}
                            </span>
                          </div>
                          <button
                            className="btn btn-view-region"
                            onClick={(event) => toggleRegionDetails(event, value)}
                          >
                            View Region
                          </button>
                        </div>
                        <div className="table-responsive border systemList-scroll">
                          <Table className="table-inner">
                            <thead className="bg-header">
                              <tr>
                                <th>System</th>
                                <th>Email for Alarms</th>
                                <th>Email for Critical Alarms</th>
                                <th className="color-dark-green">Nominal</th>
                                <th className="color-red">Critical</th>
                                <th className="color-yellow">Major</th>
                              </tr>
                            </thead>
                            <tbody className="font12">
                              {props.systemList.map((val, i) => {
                                if (val.RegionID === value._id) {
                                  return (
                                    <>
                                      <tr
                                        key={i.toString() + index.toString()}
                                        onClick={(event) =>
                                          loadSidebar(
                                            event,
                                            val.RegionID,
                                            val._id,
                                            i
                                          )
                                        }
                                        className="pointer"
                                      >
                                        <td>{val.System}</td>
                                        <td>
                                          {val.Email.length < 50
                                            ? val.Email
                                            : val.Email.substring(0, 50) + "..."}
                                        </td>
                                        <td>
                                          {val.Contact.length < 50
                                            ? val.Contact
                                            : val.Contact.substring(0, 50) +
                                            "..."}
                                        </td>
                                        <td>
                                          {props.SystemCount[val._id]
                                            ? props.SystemCount[val._id].Nominal
                                            : 0}
                                        </td>
                                        <td>
                                          {props.SystemCount[val._id]
                                            ? props.SystemCount[val._id].Critical
                                            : 0}
                                        </td>
                                        <td>
                                          {props.SystemCount[val._id]
                                            ? props.SystemCount[val._id].Major
                                            : 0}
                                        </td>
                                      </tr>
                                      <tr
                                        className={
                                          devicesClass[i] + " cluster-view"
                                        }
                                      >
                                        <td
                                          colSpan="6"
                                          className="form-boxtable-pad-15"
                                        >
                                          <div className="table-responsive border deviceList-scroll">
                                            <Table className="cluster-table">
                                              <thead className="bg-header">
                                                <tr>
                                                  <th>Device Name</th>
                                                  <th>Device IP</th>
                                                  <th>Device Type</th>
                                                  <th className="color-dark-green">
                                                    Nominal
                                                  </th>
                                                  <th className="color-red">
                                                    Critical
                                                  </th>
                                                  <th className="color-yellow">
                                                    Major
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {props.deviceList.map((v, idx) => {
                                                  if (
                                                    v.RegionID === val.RegionID &&
                                                    v.SystemID === val._id
                                                  ) {
                                                    return (
                                                      <tr
                                                        onClick={(event) =>
                                                          toggleDevice(event, idx)
                                                        }
                                                      >
                                                        <td>{v.DeviceName}</td>
                                                        <td>{v.IP}</td>
                                                        <td>{v.DeviceType}</td>
                                                        <td>
                                                          {props.DeviceCount[v._id]
                                                            ? props.DeviceCount[
                                                              v._id
                                                            ].Nominal
                                                            : 0}
                                                        </td>
                                                        <td>
                                                          {props.DeviceCount[v._id]
                                                            ? props.DeviceCount[
                                                              v._id
                                                            ].Critical
                                                            : 0}
                                                        </td>
                                                        <td>
                                                          {props.DeviceCount[v._id]
                                                            ? props.DeviceCount[
                                                              v._id
                                                            ].Major
                                                            : 0}
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                })}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                } else return <></>;
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>


      <Modal isOpen={toggle} toggle={() => setToggle(!toggle)} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader toggle={() => setToggle(!toggle)} id="contained-modal-title-vcenter">
          Region Detail
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-check-label font-weight-600">
                  Region Name :{" "}
                </label>
                <span> {details.Region}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-check-label font-weight-600">
                  Phone No.{" "}
                </label>
                <span> {details.Contact}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-check-label font-weight-600">
                  Email Targets for Critical Alarms :{" "}
                </label>
                <span
                  onClick={() => setEmailToggle(!emailToggle)}
                  className="pointer link"
                >
                  {details.Email.split(",").length}
                </span>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>


      <Modal isOpen={emailToggle} toggle={() => setEmailToggle(!emailToggle)} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader toggle={() => setEmailToggle(!emailToggle)} id="contained-modal-title-vcenter" >
          Emails
        </ModalHeader>
        <ModalBody>
          {details.Email.split(",").map((value, index) => {
            return (
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-check-label font-weight-600">
                      Email Targets for Critical Alarms :{" "}
                    </label>
                    <span> {value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Dashboard;
