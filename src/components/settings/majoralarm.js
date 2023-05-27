import React from "react";
import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSlider from './navSlider';
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";

const Majoralarm = (props) => {
  const history = useHistory();
  const [packetloss, setpacketloss] = useState("");
  const [majortype, setMajortype] = useState("");
  const [customerMajorAlarm, setCustomerMajorAlarm] = useState(null);
  let [loading, setState] = useState(false);
  const [displayValue, setDisplay] = useState("");
  const [activeTab] = useState("majoralarm");

  useEffect(() => {
    getmajorAlarm();
  }, []);

  const getmajorAlarm = async (e) => {
    let res = await HttpService.getByBoj("checkmajoralarm")
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.length > 0) {
        setMajortype(res[0].Type);
        setpacketloss(res[0].Value);
        setDisplay(res[0].Value);
        setCustomerMajorAlarm(res[0]);
      }
    }
  };
  const changeValueEvent = async (e) => {
    let res = await HttpService.getByBoj("checkmajoralarm")
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.length > 0) {
        if (e.target.value === res[0].Type) {
          setDisplay(res[0].Value);
        } else {
          setDisplay("");
        }
      }
    }
  };
  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let submitMajoralarm = async (event) => {
    event.preventDefault();
    showLoader();

    if (displayValue === "" || !displayValue) {
      setpacketloss("0");
      setDisplay("0");
    } else {
      setpacketloss(displayValue);
    }
    setMajortype(majortype);
    let data = {
      _id: customerMajorAlarm ? customerMajorAlarm._id : null,
      Type: majortype,
      Value: displayValue,
      ActionTime: new Date(),
      ActionType: customerMajorAlarm ? "Update" : "Add",
      Module: "Major Alarm Threshold",
      //   Target: "Type : " + majortype + ", " + "Value :" + packetloss + "%",
      Target: `Type : ${majortype}, Value : ${packetloss}%`,
      Username: props.customerData.Username,
    };
    let returnData = await HttpService.CreateUpdate(
      "savemajoralarm",
      data
    ).then((res) => res.data);
    if (returnData === "Major Alarm Details have been saved successfully") {
      hideLoader();
      getmajorAlarm();
      SuccessMessage("Major Alarm Details have been saved successfully")

    } else if (
      returnData === "Major Alarm Details have been updated Successfully."
    ) {
      hideLoader();
      SuccessMessage("Major Alarm Details have been updated Successfully.")
    } else {
      hideLoader();
      ErrorMessage(returnData)
    }
  };

  return (
    <>
      <form>
        <NavSlider activeTab={activeTab} />

        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">MAJOR ALARM THRESHOLDS</div>
            <div className="form-boxtopcont ">
              {loading ? <Loader /> : null}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Method</label>
                    <select
                      className="form-control"
                      value={majortype}
                      onChange={(e) => {
                        setMajortype(e.target.value);
                        changeValueEvent(e);
                      }}
                    >
                      <option value="">Select One</option>
                      <option value="PacketLoss">% Packet Loss</option>
                      <option value="LinkEfficiency">% Link Efficiency</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Enter Value</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Value"
                      value={displayValue}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        if (
                          Number.parseFloat(event.target.value) > 100.0 ||
                          Number.parseFloat(event.target.value) < 0.0
                        )
                          return;
                        let string = event.target.value.substring(
                          event.target.value.indexOf(".")
                        );
                        if (string.length > 3) {
                          return;
                        }
                        setDisplay(event.target.value);
                      }}
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
                  onClick={(event) => submitMajoralarm(event)}
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

export default Majoralarm;
