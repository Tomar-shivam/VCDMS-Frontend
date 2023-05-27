import React from "react";
import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSlider from './navSlider';
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const Httphttps = (props) => {
  const history = useHistory();
  const [httpstate, sethttpstate] = useState("");
  let [loading, setState] = useState(false);
  const [customerSetting, setCustomerSetting] = useState(null);
  const [activeTab] = useState("http");

  useEffect(() => {
    getCustomerSetting();
  }, []);

  const getCustomerSetting = async () => {
    let res = await HttpService.getByBoj("checksettingdetails")
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.length > 0) {
        setCustomerSetting(res[0]);
        sethttpstate(res[0].HttpHttps);
      }
    }
  };
  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let handleOnclick = async (e) => {
    e.preventDefault();
    if (httpstate === "") {
      ErrorMessage("Please select a type ")
      return;
    }
    showLoader();
    let data = {
      _id: customerSetting ? customerSetting._id : null,
      HttpHttps: httpstate,
      ActionTime: new Date(),
      ActionType: customerSetting ? "Update" : "Add",
      Module: "Http/Https",
      Username: props.customerData.Username,
      Target: httpstate,
    };
    let returnData = await HttpService.CreateUpdate(
      "savesettingdetails",
      data
    ).then((res) => res.data);
    if (returnData === "Http/Https have been saved successfully") {
      hideLoader();
      getCustomerSetting();
      SuccessMessage("Protocol has been saved successfully")
    } else if (returnData === "Http/Https has been updated Successfully.") {
      hideLoader();
      getCustomerSetting();
      SuccessMessage("Protocol has been updated Successfully.")

    } else {
      hideLoader();
      ErrorMessage(returnData)
    }
  };

  return (
    <>
      <form>

        <NavSlider activeTab={activeTab} />
        <div className="pad-15" id="httpTab">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">HTTP/HTTPS</div>
            <div className="form-boxtopcont ">
              {loading ? <Loader /> : null}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Protocol :</label>
                    <select
                      className="form-control"
                      name="select_type"
                      id="select_type"
                      value={httpstate}
                      onChange={(e) => sethttpstate(e.target.value)}
                    >
                      <option value="" hidden={true}>
                        Select One
                      </option>
                      <option value="http">http</option>
                      <option value="https">https</option>
                    </select>
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
                  onClick={(e) => handleOnclick(e)}
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

export default Httphttps;
