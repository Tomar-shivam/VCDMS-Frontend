import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./settings.css";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";

const SetTime = (props) => {
  const [activeTab] = useState("setTime");
  const [data, setdata] = useState({});
  const [offset, setoffset] = useState(0);

  useEffect(() => {
    async function fetchCurrenttimezone() {
      let currenttimezone = await HttpService.getByBoj("getcurrenttimezone");
      setdata(currenttimezone.data.Timezone);
      let returnData = await HttpService.getByBoj("gettimezone");
      setoffset((returnData.data.offset));

      
    }
    fetchCurrenttimezone();
  }, []);

  useEffect(() => {
    async function fetchData() {
      
      let returnData = await HttpService.getByBoj("gettimezone");
      setoffset((returnData.data.offset));
    }
    fetchData()
  }, []);

  useEffect(() => {
  }, [data])
  
  const SubmitClickHandler = async (e) => {
    e.preventDefault();
    
    let timezonedata;
    for (let index = 0; index < Object.entries(data).length; index++) {
      if (Object.entries(data)[index][1].offset.toString() === offset.toString()) {
        timezonedata = Object.entries(data)[index][1];
        break;
      }
    }

    await HttpService.CreateUpdate(
      "settimezone",
      timezonedata
    ).then((res) => res.data)
      .catch((e) => {
        ErrorMessage("Something went wrong, Please try again!")
      }
      );
    SuccessMessage("Timezone has been changed successfully")
    props.getTimeZone();
    
  };
  const cancelClickHandler = async (e) => {
    e.preventDefault();
    
    let returnData = await HttpService.getByBoj("gettimezone");
    setoffset((returnData.data.offset).toString());
    
  };
  return (
    <div>
      <form>
        <NavSlider activeTab={activeTab} tabNumber={8} />

        <div>
          <div className="pad-15" >
            <div className="form-boxdiv">
              <div className="form-boxtopline5">Timezone</div>
              <div className="form-boxtopcont ">
                {/* {loading ? <Loader /> : null} */}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">TimeZone :</label>
                      <div className="select-wrapper">
                        <select
                          className="form-control"
                          name="select_type"
                          id="select_type"
                          value={offset}
                          onChange={(e) => {
                            setoffset(e.target.value);
                          }}
                        >
                          {Object.entries(data).map((entry) => {
                            return (
                              <option value={entry[1].offset}>{entry[1].label}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-danger marb-15"
                  onClick={(e) => {
                    cancelClickHandler(e);
                  }}
                >
                  Cancel
                </button>
                {props.customerData.Role === "Operator" ? (
                  ""
                ) : (
                  <button
                    className="btn btn-success marl-15 marb-15"
                    onClick={(e) => {
                      SubmitClickHandler(e);
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetTime;
