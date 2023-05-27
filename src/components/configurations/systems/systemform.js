import { useEffect, useState } from "react";
import "./system.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import HttpService from "../../../services/http.service";
import Loader from "../../../common/loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMsg from '../../../common/errorMsg';
let SystemForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [criticalAlarma, setCriticalAlarms] = useState("");
  const [system, setSystem] = useState("");
  //   const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [formRegion, setFormRegion] = useState("");
  const [formContactNo, setFormContactNo] = useState("");
  const [formEmail, setFormEmail] = useState("");
  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }

  useEffect(() => {
    if (props.data) {
      let t =0;
      setCriticalAlarms(props.data.Contact);
      //   setRegion(props.data.Location);
      setSystem(props.data.System);
      setEmail(props.data.Email);
      for (let i = 0; i < props.regionList.length; i++) {
        if (props.data.RegionID === props.regionList[i]._id) {
          t=i;
          setIndex(i);
          break;
        }
      }
      document.getElementsByName('device_type')[0].disabled =  props.regionList[t].Region === 'OnBoardingRegion'
      document.getElementsByName('device_name')[0].disabled = props.data.System === 'OnBoardingSystem'
    }
  }, [props.data, props.regionList]);

  const cancelClickHandler = () => {
    setCriticalAlarms("");
    // setRegion("");
    setEmail("");
    setIndex(0);
    setSystem("");
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  const saveRegion = async (event) => {
    event.preventDefault();
    if (!props.customerData) return;
    if (!props.customerData.Username) return;
    if (formRegion?.trim() === "") {
      ErrorMsg("Please enter Region Name");
      return;
    }
    if (formContactNo?.trim() === "") {
      ErrorMsg("Please enter a Contact Number");
      return;
    }
    if (formContactNo?.trim().length < 10) {
      ErrorMsg("Please enter a valid Contact Number");
      return;
    }
    if (formEmail === "") {
      ErrorMsg("Please enter an Email");
      return;
    }
    if (!formEmail.includes("@") || !formEmail.includes(".com")) {
      ErrorMsg("Please enter a Valid Email");
      return;
    }
    if (formRegion.toLocaleLowerCase() === 'Onboardingregion') {
      ErrorMsg("You can't Create a Region by name 'OnBoardingRegion' !");
      return;
    }
    let data = {
      Email: formEmail,
      Region: formRegion.trim(),
      Contact: formContactNo.trim(),
      Module: "Region",
      ActionType: "Add",
      ActionTime: new Date(),
      Username: props.customerData.Username,
      Target: formRegion,
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
      setToggle(!toggle);
    }
  };

  const submitButton = async (event) => {
    if (!props.customerData) return;
    if (!props.customerData.Username) return;
    if (system?.trim() === "") {
      ErrorMsg("Please enter System Name");
      return;
    }

    if (props.regionList[index] === undefined) {
      ErrorMsg("Please select a Region");
      return;
    }
    if (criticalAlarma === "") {
      ErrorMsg("Please enter atleast an Email for critical alarm");
      return;
    }
    if (email === "") {
      ErrorMsg("Please enter atleast an Email for alarms");
      return;
    }
    if (system.toLowerCase() === 'onboardingsystem' && !document.getElementsByName('device_name')[0].disabled) {
      ErrorMsg("You can't Create a System by name 'OnBoardingSystem' !");
      return;
    }
    if (
      !email.includes("@") ||
      !email.includes(".com") ||
      !criticalAlarma.includes("@") ||
      !criticalAlarma.includes(".com")
    ) {
      ErrorMsg("Please enter a valid Email");
      return;
    }
    event.preventDefault();
    let data = {
      _id: props.data ? props.data._id : null,
      Email: email,
      Location: props.regionList[index].Region,
      Contact: criticalAlarma,
      RegionID: props.regionList[index]._id,
      System: system,
      Module: "System",
      ActionType: props.data ? (props.data._id ? "Update" : "Add") : "Add",
      ActionTime: new Date(),
      Username: props.customerData.Username,
      Target: system,
    };

    if (!data.RegionID) {
      ErrorMsg("No region is selected");
      return;
    }
    showLoader();

    let res = await HttpService.CreateUpdate("createsystem", data)
      .then((res) => res.data)
      .catch((err) => { return });

    var split = res.split(" ");
    var result = split[1];
    if (result === "Successfully") {
      //   setRegion("");
      setIndex(0);
      setEmail("");
      setCriticalAlarms("");
      hideLoader();

      if (props.changeContent) {
        props.getSystems();
        props.changeContent();
      } else if (props.setformContent) {
        props.setformContent("list");
        props.getSystems();
      }
    } else if (res) {
      hideLoader();
      ErrorMsg("System" + res);
    } else {
      hideLoader();
      // alert("Unable to process data please try again")
      ErrorMsg("Unable to process data please try again");
    }
  };

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            {props.data ? "Edit System" : "Add System"}
          </div>
          <div className="form-boxtopcont user-form">
            {loading ? <Loader /> : null}
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    System Name: <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="device_name"
                    placeholder="System Name"
                    onChange={(event) => {
                      if (event.target.value.match(/[^A-Za-z0-9\s]/gi, "")) {
                        return;
                      }
                      setSystem(event.target.value);
                    }}
                    value={system}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Region: <i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    name="device_type"
                    id="device_type"
                    onChange={(e) => setIndex(e.target.value)}
                    value={index}
                  >
                    <option>Select Location</option>
                    {props.regionList.map((val, index) => {
                      return (val.Region !== 'OnBoardingRegion' || (val.Region === 'OnBoardingRegion' && system === 'OnBoardingSystem')) && <option value={index}>{val.Region}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-sm-6 pl-0">
                <div className="form-group">
                  <Button
                    className="margin-top1 add-new-btn"
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
                              placeholder="example1@abc.com, example1@pqr.com"
                              onChange={(event) => {
                                setFormEmail(event.target.value);
                              }}
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
                    Email Targets for Alarms : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="device_ip"
                    placeholder="example1@abc.com, example2@pqr.com"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Email Targets for Critical Alarms :{" "}
                    <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="device_ip"
                    placeholder="example1@abc.com, example2@pqr.com"
                    onChange={(event) => {
                      setCriticalAlarms(event.target.value);
                    }}
                    value={criticalAlarma}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-danger marb-15"
              onClick={() => cancelClickHandler()}
            >
              Cancel
            </button>
            <button
              className="btn btn-success marl-15 marb-15"
              onClick={(event) => submitButton(event)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </>
  );
};

export default SystemForm;
