import { useEffect, useState } from "react";
import "./addelement.css";
import HttpService from "../../services/http.service";
import Loader from "../../common/loader";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorMessage from '../../common/errorMsg';
import SuccessMessage from '../../common/successMsg';
import { deviceTypeForAddDevice } from '../../common/CommonUtils';

const AddElementForm = (props) => {
  const [device_name, setDeviceName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState({ region: '', isSelect: false });
  const [selectedSystem, setSelectedSystem] = useState({ system: '', isSelect: false });
  const [device_type, setDeviceType] = useState("");
  const [device_ip, setDeviceIP] = useState("");
  const [loading, setLoading] = useState(false);
  const setDeviceState = true;
  const [selectedRegionIndex, setSelectedRegionIndex] = useState();
  const [systemList, setSystemList] = useState([]);
  const [system, setSystem] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [formRegion, setFormRegion] = useState("");
  const [formContactNo, setFormContactNo] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [systemFormSystem, setSystemFormSystem] = useState("");
  const [systemFormContactNo, setSystemFormContactNo] = useState("");
  const [systemFormEmail, setSystemFormEmail] = useState("");
  const [systemFormSelectedRegionIndex, setSystemFormSelectedRegionIndex] = useState();
  const [sysToggle, setSysToggle] = useState(false);
  const [passwordForDevice, setPasswordForDevice] = useState("");
  const [managementip, setManagementIP] = useState("")
  const [deviceTypes, setDeviceTypes] = useState([])
  const [deviceTypeName, setDeviceTypeName] = useState('')
  const [dTToggle, setDTToggle] = useState(false)
  const changeDeviceData = () => {
    if (setDeviceState) {
      if (props.data) {
        setDeviceName(props.data.DeviceName);
        setDeviceIP(props.data.IP);
        setManagementIP(props.data.ManagementIP);
        setDeviceType(props.data.DeviceType);
        setPasswordForDevice(props.data.Password);
        let sys = [];
        for (let i = 0; i < props.regionList.length; i++) {
          if (props.regionList[i]._id === props.data.RegionID) {
            setSelectedRegionIndex(i);
            if (props.systemList) {
              for (let j = 0; j < props.systemList.length; j++) {
                if (props.systemList[j].RegionID === props.data.RegionID) {
                  sys.push(props.systemList[j]);
                }
              }
            }
            break;
          }
        }
        for (let i = 0; i < sys.length; i++) {
          if (props.data.SystemID === sys[i]._id) {
            setSystem(i);
            break;
          }
        }
        setSystemList(sys);
      }
    }
  };

  // useEffect(() => {
  //   GetAllDeviceTypes()
  // }, [])
  useEffect(() => {
    changeDeviceData();
    for (let i = 0; i < props.regionList.length; i++) {
      if (selectedRegion.region === props.regionList[i].Region) {
        setSelectedRegionIndex(i); break;
      }
    }
  }, [props.data, props.systemList, props.regionList]);

  useEffect(() => {
    if (selectedRegionIndex >= 0) {
      let sys = [];
      for (let i = 0; i < props.systemList.length; i++) {
        if (
          props.systemList[i].RegionID ===
          props.regionList[selectedRegionIndex]._id
        ) {
          sys.push(props.systemList[i]);
        }
      }
      setSystemList(sys);
      for (let i = 0; i < sys.length; i++) {
        if (selectedSystem.system === sys[i].System) {
          setSystem(i);
          break;
        }
      }
    }
  }, [props.systemList, props.regionList]);

  const saveRegion = async (event) => {

    if (!props.customerData) {
      return;
    }

    if (!props.customerData.Username) {
      return;
    }
    if (formRegion?.trim().toLowerCase() === 'Onboardingregion') {
      ErrorMessage("You can't Create a Region by name 'OnBoardingRegion' !");
      return;
    }

    if (formRegion?.trim() === "") {
      ErrorMessage("Please enter Region");
      return;
    }
    if (formContactNo === "") {
      ErrorMessage("Please enter Phone No.");
      return;
    }
    if (formContactNo.length < 10) {
      ErrorMessage("Please enter valid Phone No.");
      return;
    }
    if (formEmail === "") {
      ErrorMessage("Please enter Email");
      return;
    }
    if (!formEmail.includes("@")) {
      ErrorMessage("Please enter a valid Email");
      return;
    }

    event.preventDefault();
    let data = {
      Email: formEmail,
      Region: formRegion?.trim(),
      Contact: formContactNo,
      Username: props.customerData.Username,
      ActionType: "Add",
      ActionTime: new Date(),
      Module: "Region",
      Target: formRegion?.trim(),
    };

    let res = await HttpService.CreateUpdate("createregion", data)
      .then((res) => res.data)
      .catch((err) => { return });

    var split = res.split(" ");
    var result = split[1];
    if (result === "Successfully") {
      setFormEmail("");
      setFormRegion("");
      setFormContactNo("");
      props.getRegions();
      setSelectedRegion({ region: formRegion?.trim(), isSelect: true });
      setToggle(!toggle);
    }
    else if (res) {
      ErrorMessage("Region " + res);
    } else {
      ErrorMessage("Unable to process data please try again!!!");
    }
  };

  const saveSystem = async (event) => {
    event.preventDefault();
    if (systemFormSystem?.trim() === "") {
      ErrorMessage("Please enter System Name");
      return;
    }
    if (systemFormSystem?.trim().toLocaleLowerCase() === 'Onboardingsystem') {
      ErrorMessage("You can't Create a System by name 'OnBoardingSystem' !");
      return;
    }

    if (systemFormContactNo === "") {
      ErrorMessage("Please enter atleast an email for critical alarms");
      return;
    }
    if (systemFormEmail === "") {
      ErrorMessage("Please enter atleast an email for alarms");
      return;
    }
    if (!systemFormEmail.includes("@")) {
      ErrorMessage("Please enter a valid email");
      return;
    }
    if (props.regionList[systemFormSelectedRegionIndex] === undefined) {
      ErrorMessage("Please select a region");
      return;
    }
    let data = {
      Email: systemFormEmail,
      Location: props.regionList[systemFormSelectedRegionIndex].Region,
      Contact: systemFormContactNo,
      RegionID: props.regionList[systemFormSelectedRegionIndex]._id,
      System: systemFormSystem?.trim(),
      Username: props.customerData.Username,
      ActionType: "Add",
      ActionTime: new Date(),
      Module: "System",
      Target: systemFormSystem?.trim(),
    };

    if (!data.RegionID) {
      ErrorMessage("No region is selected");
      return;
    }

    let res = await HttpService.CreateUpdate("createsystem", data)
      .then((res) => res.data)
      .catch((err) => { return });
    var split = res.split(" ");
    var result = split[1];
    if (result === "Successfully") {
      setSystemFormSystem("");
      setSystemFormContactNo("");
      setSystemFormEmail("");
      setSystemFormSelectedRegionIndex();
      props.getSystems();
      setSelectedSystem({ system: systemFormSystem, isSelect: true });
      setSysToggle(!sysToggle);
    } else if (res) {
      ErrorMessage("System " + res);
    } else {
      ErrorMessage("Unable to process data please try again");
    }
  };

  const cancelClickHandler = () => {
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  const regionClickHandler = async (index) => {
    setSelectedRegionIndex(index);
    let sys = [];
    for (let i = 0; i < props.systemList.length; i++) {
      if (props.regionList[index] !== undefined && props.systemList[i].RegionID === props.regionList[index]._id) {
        sys.push(props.systemList[i]);
      }
    }
    setSystemList(sys);
  };

  const SubmitButton = async (event) => {
    if (device_name?.trim() === "") {
      ErrorMessage("Please enter Device Name");
      return;
    }
    if (device_ip === "") {
      ErrorMessage("Please enter Device IP")
      return;
    }

    if (device_ip.length < 7) {
      ErrorMessage("Please enter a valid Device IP");
      return;
    }
    if (device_type === "") {
      ErrorMessage("Please select a Device Type");
      return;
    }
    if (selectedRegionIndex === null) {
      ErrorMessage("Please select a region");
      return;
    }
    if (selectedRegionIndex === undefined) {
      ErrorMessage("Please select a region");
      return;
    }
    if (system === undefined || system === null) {
      ErrorMessage("Please select a system");
      return;
    }
    if (device_type === "ELLVIS9000V3" && passwordForDevice === "") {
      ErrorMessage("Please Enter Password");
      return;
    }
    event.preventDefault();
    setLoading(true);

    let data = {
      IP: device_ip,
      DeviceName: device_name?.trim().toUpperCase(),
      DeviceType: device_type,
      DeviceIP: device_ip,
      ManagementIP: managementip,
      _id: props.data ? props.data._id : null,
      Region: props.regionList[selectedRegionIndex].Region,
      RegionID: props.regionList[selectedRegionIndex]._id
        ? props.regionList[selectedRegionIndex]._id
        : "",
      SystemID: systemList[system]._id ? systemList[system]._id : "",
      Password: passwordForDevice,
      Username: props.customerData.Username,
      ActionType: props.data ? (props.data._id ? "Update" : "Add") : "Add",
      ActionTime: new Date(),
      TimeCreated: new Date(),
      Module: "Device",
      Target: device_ip,
    };
    if (data.IP === "" || data.DeviceName === "") {
      return;
    }
    if (props.data) {
      let updatedData = [device_name?.trim().toUpperCase(), device_ip, device_type, props.regionList[selectedRegionIndex].Region, systemList[system]._id, passwordForDevice];
      let oldData = [props.data.DeviceName.toUpperCase(), props.data.IP, props.data.DeviceType, props.data.Region, props.data.SystemID, props.data.Password];
      let count = 0;
      for (let i = 0; i < oldData.length; i++) {
        if (oldData[i] === updatedData[i]) {
          count++;
        }
      }
      if (count === oldData.length) {
        ErrorMessage("Please update something or cancel");
        setLoading(false);
        return;
      }
    }
    let returnData = await HttpService.CreateUpdate("createdevice", data)
      .then((res) => res.data)
      .catch((err) => {
        setLoading(false);
      });
    if (returnData !== null) {
      if (returnData.ack === "1") {
        setDeviceName("");
        setDeviceIP("");
        setManagementIP("");
        props.getAllDevices();
        if (props.changeContent) {
          props.changeContent();
        } else if (props.setformContent) {
          props.setformContent("list");
        }
        SuccessMessage(`Device ${returnData.message}`);
        setLoading(false);
      }
      else if (returnData.ack === "0") {
        setLoading(false);
        ErrorMessage(returnData.message);
      }
      else {
        setLoading(false);
        ErrorMessage((data._id ? "Device Not Updated: " : "Device Not Added: ") + returnData.message);
      }
    } else {
      setLoading(false);
      ErrorMessage((data._id ? "Device Not Updated: " : "Device Not Added: ") + "Unknown device, please check device type and IP address.");
    }
    setSelectedRegion({ region: '', isSelect: false })
    setSelectedSystem({ system: '', isSelect: false })
  };

  // const GetAllDeviceTypes = async () => {
  //   await HttpService.get("devicetype")
  //     .then(res => {
  //       setDeviceTypes(res.data.ack === '0' ? [] : res.data.Data)
  //     })
  // }
  // const saveDeviceType = async (e) => {
  //   e.preventDefault();
  //   if (deviceTypeName.trim()) {
  //     let devicetypedata = {
  //       DeviceType: deviceTypeName.trim()
  //     }

  //     let result = await HttpService.getByBoj("devicetype", devicetypedata
  //     ).then((res) => {
  //       GetAllDeviceTypes();
  //       return res.data
  //     })
  //       .catch((e) => {
  //         ErrorMessage(e)
  //       }
  //       );
  //     if (result.ack === '1') {
  //       setDeviceTypeName('');
  //       setDTToggle(!dTToggle);
  //       SuccessMessage(result.msg)
  //     }
  //     else ErrorMessage(result.msg)
  //   }
  //   else {
  //     setDeviceTypeName('');
  //     ErrorMessage('Enter a valid Device-Type name');
  //   }
  // }
  return (
    <>
      <div className="pad-15">
        {loading ? <Loader /> : <></>}
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            {props.data ? "Edit Device" : "Add Device"}
          </div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Device Name : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="device_name"
                    placeholder="Device Name"
                    value={device_name}
                    onChange={(e) => setDeviceName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Device IP : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="device_ip"
                    placeholder="Device IP"
                    value={device_ip}
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
                      setDeviceIP(e.target.value);
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
                      Device Type : <i style={{ color: "red" }}>*</i>
                    </label>
                    <select
                      className="form-control"
                      name="device_type"
                      id="device_type"
                      value={device_type}
                      onChange={(e) => setDeviceType(e.target.value)}
                    >
                      <option>Select Device type</option>
                      {
                        deviceTypeForAddDevice.map((item, index) => <option value={item}>{item}</option>)
                      }
                    </select>
                  </div>
                </div>
                {device_type === "LEGACY" ?
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">
                        Management IP:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="manageip"
                        placeholder="Management IP"
                        value={managementip}
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
                          setManagementIP(e.target.value);
                        }}
                      />
                    </div>
                  </div> : <></>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Region : <i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    name="region"
                    id="region"
                    value={selectedRegionIndex}
                    onChange={(e) => regionClickHandler(e.target.value)}
                  >
                    <option value="">Select Region</option>
                    {props.regionList.map((val, index) => {
                      return <option hidden={(val.Region === 'OnBoardingRegion' && props.data && props.data.Region !== 'OnBoardingRegion') || (!props.data && val.Region === 'OnBoardingRegion')} value={index} >{val.Region}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="col-sm-6 pl-0">
                <div className="form-group">
                  <Button
                    className="margin-top1 add-new-btn"
                    color="info"
                    onClick={() => setToggle(!toggle)}
                  >
                    <i className="fa fa-plus"></i>
                  </Button>
                  <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
                    <ModalHeader toggle={() => setToggle(!toggle)}>
                      Add Region
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              Region Name:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="region_name"
                              placeholder="Region Name"
                              onChange={(event) =>
                                setFormRegion(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              Phone No.:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contact_no"
                              placeholder="Phone No."
                              onChange={(event) => {
                                if (
                                  event.target.value.match(/[^0-9]/) === null &&
                                  event.target.value.length <= 10
                                ) {
                                  setFormContactNo(event.target.value);
                                }
                              }}
                              value={formContactNo}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              Email Targets for Critical Alarms:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="example1@abc.com, example2@pqr.com"
                              onChange={(event) =>
                                setFormEmail(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={() => setToggle(!toggle)}>
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        onClick={(event) => saveRegion(event)}
                      >
                        Save
                      </Button>{" "}
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    System : <i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    name="system_name"
                    id="system_name"
                    value={system}
                    onChange={(e) => setSystem(e.target.value)}
                  >
                    <option>Select System</option>
                    {systemList.map((val, index) => {
                      return <option value={index} >{val.System}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="col-sm-6 pl-0">
                <div className="form-group">
                  <Button
                    className="margin-top1 add-new-btn"
                    color="info"
                    onClick={() => setSysToggle(!sysToggle)}
                  >
                    <i className="fa fa-plus"></i>
                  </Button>
                  <Modal
                    isOpen={sysToggle}
                    toggle={() => setSysToggle(!sysToggle)}
                  >
                    <ModalHeader toggle={() => setSysToggle(!sysToggle)}>
                      Add System
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              System Name:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="system_name"
                              placeholder="System"
                              onChange={(event) =>
                                setSystemFormSystem(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-check-label">Region :</label>
                            <select
                              className="form-control"
                              name="region"
                              id="region"
                              value={systemFormSelectedRegionIndex}
                              onChange={(e) =>
                                setSystemFormSelectedRegionIndex(e.target.value)
                              }
                            >
                              <option>Select Region</option>
                              {props.regionList.map((val, index) => {
                                return <option hidden={(val.Region === 'OnBoardingRegion' && props.data && props.data.Region !== 'OnBoardingRegion') || (!props.data && val.Region === 'OnBoardingRegion')} value={index}>{val.Region}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              Email Targets for Alarms:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="example1@abc.com, example2@pqr.com"
                              onChange={(event) =>
                                setSystemFormEmail(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              Email Targets for Critical Alarms{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="contact_no"
                              placeholder="example1@abc.com, example2@pqr.com"
                              onChange={(event) => {
                                setSystemFormContactNo(event.target.value);
                              }}
                              value={systemFormContactNo}
                            />
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={() => setSysToggle(!sysToggle)}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        onClick={(event) => saveSystem(event)}
                      >
                        Save
                      </Button>{" "}
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>

            {
              device_type !== "LEGACY" ?
                <div className="row" >
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">
                        Password : {device_type === "ELLVIS9000V3" ? <i style={{ color: "red" }}>*</i> : <></>}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={passwordForDevice}
                        onChange={(event) =>
                          setPasswordForDevice(event.target.value)
                        }
                      />
                    </div>
                  </div>
                </div> : <></>}
            <button
              className="btn btn-danger marb-15"
              onClick={() => cancelClickHandler()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success marl-15 marb-15"
              onClick={(event) => SubmitButton(event)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddElementForm;
