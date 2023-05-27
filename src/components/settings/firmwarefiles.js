import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import VCDMSservice from "../../services/http.service";
import httpService from "../../services/http.service";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./settings.css";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import { deviceTypesnames } from "../../common/CommonUtils";

const FirmwareFiles = (props) => {
  const history = useHistory();
  const [activeTab] = useState("firmwarerefiles");
  const [fileDeleted, setfileDeleted] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const [devicetype, setDeviceType] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [firmwareFiles, setFirmwareFiles] = useState([]);
  const [modal, setModal] = useState(null);
  let data = {};

  const removefile = async (file, devicetype) => {
    setLoading(true);
    let data = {
      file: file,
      devicetype: devicetype,
    };
    let res = await VCDMSservice.delete("deletefirmwarefilebydevicetype", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setfileDeleted(true);
        SuccessMessage("File has been deleted.")
      } else if (res.ack === "0") {
        ErrorMessage("Unable to delete ");
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setLoading(false);
    setfileDeleted(false);
    setModal(!modal);
  };
  const firmwareUpdateChange = (event) => {
    setFormData(event.target.files[0]);
  };
  useEffect(() => {
    const getFirmwareFiles = async () => {
      let data = { DeviceType: devicetype ? devicetype : null };
      let res = await httpService.getFirmwarefiles(
        "getfirmwarefilesbydevicetype",
        data
      );
      setFirmwareFiles(res.data);
    };
    getFirmwareFiles();
  }, [devicetype, fileDeleted, fileAdded]);

  const SubmitFirmwareUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (devicetype === "") {
      ErrorMessage("Please select a Device Type");
      setFileAdded(false);
      setLoading(false);
      return;
    }
    if (!formData) {
      ErrorMessage("Please select a File");
      setFileAdded(false);
      setLoading(false);
      return;
    }
    data = {
      devicetype: devicetype,
      file: formData,
    };

    let res = await VCDMSservice.uploadFirmwareFile(
      "savefirmwarefilebydevicetype",
      data
    )
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setFileAdded(true);
        SuccessMessage("File has been saved.")
      } else if (res.ack === "0") {
        ErrorMessage("Unable to save");
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setFileAdded(false);
    setLoading(false);
    document.getElementById("formFile").value = null;
  };

  return (
    <>
      <form>
        <NavSlider activeTab={activeTab} />
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">FIRMWARE FILES</div>
            <div className="form-boxtopcont ">
              {loading ? <Loader /> : null}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Device Type :<i style={{ color: "red" }}>*</i></label>
                    <select
                      className="form-control"
                      name="select_type"
                      id="select_type"
                      value={devicetype}
                      onChange={(e) => {
                        setDeviceType(e.target.value);
                        document.getElementById("formFile").value = null;
                      }}>
                      <option value="" hidden={true}>
                        Select One
                      </option>
                      {deviceTypesnames.map((item, index) => <option value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-unstyled firmware-file-list">
                    {firmwareFiles.map((file, index) => (
                      <li key={index}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>{file}</div>
                          {/* <button className='btn btn-danger'  ></button> */}
                          {/* onClick={(e)=>{e.preventDefault(); removefile(file,devicetype)} */}
                          <i
                            className="fa fa-trash file-delete"
                            onClick={(e) => {
                              setModal(file)
                            }}
                          ></i>
                          <Modal id={file} isOpen={modal === file} className="file-del-popup" style={{ width: '500px' }} >
                            <ModalHeader>Delete firmware file</ModalHeader>
                            <ModalBody className="font-size-16">
                              Are you sure you want to delete this file.{" "}
                            </ModalBody>
                            <ModalFooter>
                              <button
                                className="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removefile(file, devicetype);
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  setModal(!modal);
                                }}
                              >
                                No
                              </button>
                            </ModalFooter>
                          </Modal>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">File :<i style={{ color: "red" }}>*</i></label>
                    <input
                      className="form-control pad-top-3"
                      type="file"
                      id="formFile"
                      onChange={(event) => firmwareUpdateChange(event)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger marb-15"
                onClick={(e) => {
                  e.preventDefault();
                  history.goBack();
                }}
              >
                Cancel
              </button>
              {props.customerData.Role === "Operator" ? (
                ""
              ) : (
                <button
                  className="btn btn-success marl-15 marb-15"
                  onClick={SubmitFirmwareUpdate}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FirmwareFiles;
