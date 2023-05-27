import { useEffect, useState } from "react";
import "./addregion.css";
import HttpService from "../../../services/http.service";
import Loader from "../../../common/loader";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../../../common/errorMsg";

let AddRegionForm = (props) => {
  const [loading, setState] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  useEffect(() => {
    if (props.data) {
      setContactNo(props.data.Contact);
      setRegion(props.data.Region);
      setEmail(props.data.Email);
      document.getElementsByName('regionname')[0].disabled = props.data.Region === 'OnBoardingRegion';
    }
  }, [props.data]);

  const cancelClickHandler = () => {
    setContactNo("");
    setRegion("");
    setEmail("");
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  const submitButton = async (event) => {
    event.preventDefault();
    if (!props.customerData) {
      return;
    }
    if (!props.customerData.Username) {
      return;
    }

    if (region?.trim() === "") {
      ErrorMessage("Please enter region");
      return;
    }
    if (contactNo?.trim() === "") {
      ErrorMessage("Please enter Contact number");
      return;
    }
    if (email === "") {
      ErrorMessage("Please enter EMAIL");
      return;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      ErrorMessage("Please enter Valid Email address");
      return;
    }
    if (email.split("@").shift() === "") {
      ErrorMessage("Please enter Valid Email address");
      return;
    }
    if (
      email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf(".com")) ===
      ""
    ) {
      ErrorMessage("Please enter Valid Email address");
      return;
    }
    if (contactNo?.trim().length < 10) {
      ErrorMessage("Please enter Valid Contact number");
      return;
    }
    if (region?.trim().toLowerCase() === 'onboardingregion' && !document.getElementsByName('regionname')[0].disabled) {
      ErrorMessage("You can't Create a Region by name 'OnBoardingRegion' !");
      return;
    }
    showLoader();
    let data = {
      _id: props.data ? props.data._id : null,
      Email: email,
      Region: region?.trim(),
      Contact: contactNo,
      ActionType: props.data ? (props.data._id ? "Update" : "Add") : "Add",
      Module: "Region",
      ActionTime: new Date(),
      Username: props.customerData.Username,
      Target: region?.trim(),
    };

    let res = await HttpService.CreateUpdate("createregion", data)
      .then((res) => res.data)
      .catch((err) => { return });

    var split = res.split(" ");
    var result = split[1];
    if (result === "Successfully") {
      setRegion("");
      setContactNo("");
      setEmail("");

      if (props.changeContent) {
        props.getRegions();
        props.changeContent();
      } else if (props.setformContent) {
        props.setformContent("list");
        props.getRegions();
      }
    } else if (res) {
      hideLoader();
      ErrorMessage("Region" + res);
    } else {
      hideLoader();
      ErrorMessage("Unable to process data please try again!!!");
    }
  };

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            {props.data ? "Edit Region" : "Add Region"}
          </div>
          <div className="form-boxtopcont user-form">
            {loading ? <Loader /> : null}
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Region Name: <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="regionname"
                    placeholder="Region Name"
                    onChange={(event) => {
                      if (event.target.value.match(/[^A-Za-z0-9\s]/gi, "")) {
                        return;
                      }
                      setRegion(event.target.value);
                    }}
                    value={region}
                  />
                </div>
              </div>
            </div>

            <div className="row">


              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Phone No. : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="contactno"
                    placeholder="Phone No."
                    onChange={(event) => {
                      if (
                        event.target.value.match(/[^0-9]/) === null &&
                        event.target.value.length <= 10
                      ) {
                        setContactNo(event.target.value);
                      }
                    }}
                    value={contactNo}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Email Targets for Critical Alarms:{" "}
                    <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="example1@abc.com, example2@pqr.com"
                    onChange={(event) => {
                      if (event.target.value.match(/[^A-Za-z0-9@.,]/gi, "")) {
                        return;
                      }

                      setEmail(event.target.value);
                    }}
                    value={email}
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
    </>
  );
};

export default AddRegionForm;
