import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSlider from './navSlider';
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const Settings = (props) => {
  const history = useHistory();
  let [service, setService] = useState("");
  let [usermail, setUserMail] = useState("");
  let [password, setPassword] = useState("");
  let [portnumber, setPortNumber] = useState("");
  let [sendername, setSenderName] = useState("");
  let [tomail, setToMail] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const activeTab = "smtp"
  const [ticked, setTicked] = useState(false);
  const [encryptionMethod, setEncryptionMethod] = useState("none");
  let [loading, setState] = useState(false);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    let res = await HttpService.getByBoj("checksmtpdetails")
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.length > 0) {
        setCustomerData(res[0]);
        setSenderName(res[0].Sendername);
        setPortNumber(res[0].Portnumber);
        setPassword(res[0].Password);
        setService(res[0].Service);
        setUserMail(res[0].Usermail);
        setEncryptionMethod(res[0].isSecure);
      }
    }
  };

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let sendTestMail = async (event) => {
    if (!props.customerData || !props.customerData.Username) return;
    if (service === "") {
      ErrorMessage("Please enter SMTP Server")
      return;
    }
    if (usermail === "") {
      ErrorMessage("Please enter Email")
      return;
    }
    if (!usermail.includes("@") || !usermail.includes(".com")) {
      ErrorMessage("Please enter Valid Email adress")
      return;
    }
    if (password === "") {
      ErrorMessage("Please enter Password")
      return;
    }
    if (portnumber === "") {
      ErrorMessage("Please enter Portnumber")
      return;
    }
    if (sendername === "") {
      ErrorMessage("Please enter Sender Name")
      return;
    }
    if (tomail === "") {
      ErrorMessage("Please enter To mail")
      return;
    }
    if (!tomail.includes("@") || !tomail.includes(".com")) {
      ErrorMessage("Please enter Valid To Mail adress")
      return;
    }
    event.preventDefault();
    showLoader();
    let data = {
      _id: customerData ? customerData._id : null,
      Service: service,
      Usermail: usermail,
      Password: password,
      Portnumber: portnumber,
      Tomail: tomail,
      Sendername: sendername,
      isSecure: encryptionMethod,
    };
    let returnData = await HttpService.getByBoj("testmail", data).then(
      (res) => res.data
    );

    if (returnData === "Mail Sent") {
      hideLoader();
      SuccessMessage("Mail sent")
    } else {
      hideLoader();
      ErrorMessage(returnData)
    }
  };

  let handleOnclick = async (event) => {
    event.preventDefault();
    if (service === "") {
      ErrorMessage("Please enter SMTP Server")
      return;
    }
    if (usermail === "") {
      ErrorMessage("Please enter Usermail")
      return;
    }
    if (!usermail.includes("@") || !usermail.includes(".com")) {
      ErrorMessage("Please enter Valid Email address")
      return;
    }
    if (password === "") {
      ErrorMessage("Please enter Password")
      return;
    }
    if (portnumber === "") {
      ErrorMessage("Please enter Portnumber")
      return;
    }
    if (sendername === "") {
      ErrorMessage("Please enter Sender Name")
      return;
    }

    showLoader();
    let data = {
      _id: customerData ? customerData._id : null,
      Service: service,
      Usermail: usermail,
      Password: password,
      Portnumber: portnumber,
      Sendername: sendername,
      isSecure: encryptionMethod,
      ActionTime: new Date(),
      ActionType: customerData ? "Update" : "Add",
      Module: "SMTP",
      Target: usermail,
      Username: props.customerData.Username,
    };
    let returnData = await HttpService.CreateUpdate(
      "savesmtpdetails",
      data
    ).then((res) => res.data);
    if (returnData === "SMTP has been created Successfully.") {
      hideLoader();
      SuccessMessage("SMTP has been created Successfully")
    } else {
      hideLoader();
      SuccessMessage(returnData)
    }
  };

  const handleCheckChange = (setContent, content) => {
    setContent(!content);
  };

  const changeEncryption = (event) => {
    setEncryptionMethod(event.target.value);
  };

  return (
    <>
      <form>
        <NavSlider activeTab={activeTab} />

        <div className="pad-15" id="smtpTab">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">SMTP</div>
            <div className="form-boxtopcont ">
              {loading ? <Loader /> : null}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">SMTP Server</label>
                    <input
                      className="form-control"
                      type="text"
                      name="service_smtp"
                      placeholder="Enter SMTP Server"
                      value={service}
                      onChange={(e) => {
                        if (e.target.value.match(/[^A-Za-z0-9.]/gi, "")) {
                          return;
                        }
                        setService(e.target.value);
                      }}
                      // validate={{
                      //   required: { value: true, errorMessage: "Required" },
                      // }}
                      validate={{
                        required: { value: true, errorMessage: "Required" },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      Sender Email Address{" "}
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="usermail_smtp"
                      placeholder="Enter Email Address"
                      value={usermail}
                      onChange={(e) => setUserMail(e.target.value)}
                      // validate={{
                      //   required: { value: true, errorMessage: "Required" },
                      // }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password_smtp"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">SMTP Port Number</label>
                    <input
                      className="form-control"
                      type="text"
                      name="port_smtp"
                      placeholder="Enter Port Number"
                      value={portnumber}
                      onChange={(e) => {
                        if (e.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        // if(Number.parseInt(e.target.value) > 999) return;
                        setPortNumber(e.target.value);
                      }}
                      // validate={{
                      //   required: { value: true, errorMessage: "Required" },
                      // }}
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">
                      Encryption Method
                    </label>
                    <select
                      className="form-control"
                      value={encryptionMethod}
                      onChange={(event) => changeEncryption(event)}
                    >
                      <option value={"none"}>None</option>
                      <option value={"starttls"}>STARTTLS</option>
                      <option value={"ssltls"}>SSL/TLS</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Sender Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name_smtp"
                      placeholder="Enter Name"
                      value={sendername}
                      onChange={(e) => {
                        if (e.target.value.match(/[^A-Za-z\s]/gi, "")) {
                          return;
                        }
                        setSenderName(e.target.value);
                      }}
                      // validate={{
                      //   required: { value: true, errorMessage: "Required" },
                      // }}
                      required
                    />
                  </div>
                </div>
              </div>

              {props.customerData.Role === "Operator" ? (
                ""
              ) : (
                <>
                  <div>
                    <div className="test-mailbox custom-checkbox">
                      <input
                        type="checkbox"
                        id="testmail"
                        checked={ticked}
                        className="custom-control-input"
                        onChange={() => handleCheckChange(setTicked, ticked)}
                      // onChange={(event) => {event.preventDefault()}}/>
                      />
                      <label
                        className="custom-control-label padt-3 cursor-pointer"
                        htmlFor="testmail"
                      >
                        Test Mail
                      </label>
                    </div>
                    {ticked === true ? (
                      <div id="togglefield">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                Enter Email where you want to send test mail
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="testmail"
                                placeholder="Enter Email Address"
                                onChange={(e) => setToMail(e.target.value)}
                                // validate={{
                                //   required: { value: true, errorMessage: "Required" },
                                // }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}

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
                  onClick={(event) => handleOnclick(event)}
                >
                  Save
                </button>
              )}

              {ticked === true ? (
                <button
                  className="btn btn-info marl-15 marb-15"
                  onClick={(event) => {
                    event.preventDefault();
                    sendTestMail(event);
                  }}
                >
                  Test
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Settings;
