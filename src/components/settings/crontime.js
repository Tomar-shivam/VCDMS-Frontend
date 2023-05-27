import React from "react";
import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/loader";
import NavSlider from './navSlider';
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const Crontime = (props) => {
  const history = useHistory();
  let [cronData, setCronData] = useState(null);
  const [cronTime, setCronTime] = useState("");
  const [saveHistory, setSaveHistory] = useState("");
  const [activeTab] = useState("cron");
  let [loading, setState] = useState(false);
  useEffect(() => {
    getCron();
  }, []);

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  const getCron = async () => {
    let res = await HttpService.get("getcron")
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setCronTime(res.Cron.CronTime);
        setSaveHistory(res.Cron.SaveHistory);
        setCronData(res.Cron);
      }
    }
  };

  const submitCron = async (event) => {
    event.preventDefault();

    if (cronTime === 0 || cronTime === "") {
      ErrorMessage("Please enter the Duration");
      return;
    }
    showLoader();
    if (!props.customerData || !props.customerData.Username) return;
    let data = {
      _id: cronData ? cronData._id : null,
      CronTime: cronTime,
      SaveHistory: saveHistory,
      ActionType: cronData ? "Update" : "Add",
      ActionTime: new Date(),
      Module: "Scheduler",
      Target:
        "Duration to update VCDMS : " +
        cronTime +
        " " +
        "Duration to save statistic history :" +
        saveHistory,
      Username: props.customerData.Username,
    };

    let res = await HttpService.CreateUpdate("savecron", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setCronData(res.Cron);
        hideLoader();
        SuccessMessage("Scheduler Info updated successfully")
      } else {
        hideLoader();
        ErrorMessage("Something went wrong please try again");
      }
    } else {
      hideLoader();
      ErrorMessage("Something went wrong please try again");
    }
  };

  return (
    <>
      <form>

        <NavSlider activeTab={activeTab} />
        <div className="pad-15" >
          <div className="form-boxdiv">
            <div className="form-boxtopline5">CRON</div>
            <div className="form-boxtopcont ">
              {loading ? <Loader /> : null}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      Duration to update VCDMS information (mins) :
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Cron Time"
                      value={cronTime}
                      onChange={(event) => {
                        let string = event.target.value.toString();
                        if (string.match(/[^0-9]/) === null && event.target.value.length <= 3) {
                          setCronTime(string);
                        }

                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      Duration to Save Statistic History (mins) :
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Cron Time"
                      value={saveHistory}
                      onChange={(event) => {
                        let string = event.target.value.toString();
                        if (string.match(/[^0-9]/) === null && event.target.value.length <= 3) {
                          setSaveHistory(string);
                        }
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
                  onClick={(event) => submitCron(event)}
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

export default Crontime;
