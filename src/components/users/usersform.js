import { useEffect, useState } from "react";
import "./users.css";
import HttpService from "../../services/http.service";
import Loader from "../../common/loader";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";

const UsersForm = (props) => {
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [username, setUsername] = useState("");
  let [role, setRole] = useState("");
  let [password, setPassword] = useState("");
  let [ID, setID] = useState(null);
  let [loading, setState] = useState(false);

  useEffect(() => {
    if (props.data) {
      setEmail(props.data.Email);
      setPhone(props.data.Phone);
      setUsername(
        props.data.Username
          ? props.data.Username
          : localStorage.getItem("Username")
            ? localStorage.getItem("Username")
            : ""
      );
      setRole(props.data.Role);
      setID(props.data._id);
    }
  }, [props.data]);

  if (props.data) {
  }

  function hideLoader() {
    setState(false);
  }

  function showLoader() {
    setState(true);
  }

  let handleValidSubmit = async () => {
    if (!props.customerData || !props.customerData.Username) return;
    if (email === "" || email === undefined) {
      ErrorMessage("Please enter EMAIL")
      return;
    }
    if (!email.includes("@") || !email.includes(".com") || email.split("@").shift() === "" || email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf(".com")) ===
      "") {
      ErrorMessage("Please enter a valid Email")
      return;
    }
    if (phone === "" || phone.toString().length !== 10) {
      ErrorMessage("Please enter Phone Number")
      return;
    }
    if (username?.trim() === "") {
      ErrorMessage("Please enter User name")
      return;
    }
    if (password === "" && ID === null) {
      ErrorMessage("Please enter Password")
      return;
    }
    if (role === "" || role === "-1") {
      ErrorMessage("Please select a Role")
      return;
    }
    showLoader();
    let data = {
      _id: ID,
      UserName: username.trim(),
      Password: password,
      Email: email,
      Phone: phone,
      Role: role,
      ActionType: ID ? "Update" : "Add",
      ActionTime: new Date(),
      Module: "User",
      Target: username.trim(),
      Username: props.customerData.Username,
    };
    let returnData = await HttpService.CreateUpdate(
      "saveregistration",
      data
    ).then((res) => res.data);
    if (returnData === "User has been created Successfully.") {
      setEmail("");
      setUsername("");
      setPassword("");
      setPhone("");
      setRole("");
      hideLoader();
      SuccessMessage("User has been created Successfully.")

      props.getUsers();
    } else {
      hideLoader();
      if (returnData === "User has been updated Successfully.") {
        SuccessMessage("User has been updated Successfully.")
      } else {
        ErrorMessage(returnData)
      }
    }
    if (props.getUsers) props.getUsers();
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  const cancelClickHandler = () => {
    if (props.changeContent) {
      props.changeContent();
    } else if (props.setformContent) {
      props.setformContent("list");
    }
  };

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">
            {props.data ? "Edit user" : "Add user"}
          </div>
          <div className="form-boxtopcont user-form">
            {loading ? <Loader /> : null}
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    User Name : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="user_name"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => {
                      if (e.target.value.match(/[^A-Za-z0-9\s]/gi, "")) {
                        return;
                      }
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Password : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
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
                    Role : <i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="-1">--Select--</option>
                    <option value="Admin">Admin</option>
                    <option value="Technician/Engineer">
                      Technician/Engineer
                    </option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Email : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    label="Email"
                    value={email}
                    placeholder="Enter Email"
                    type="text"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
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
                    Phone : <i style={{ color: "red" }}>*</i>
                  </label>
                  <input
                    className="form-control"
                    name="phone"
                    label="Phone"
                    value={phone}
                    placeholder="Enter Phone Number"
                    type="text"
                    onChange={(e) => {
                      if (e.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      setPhone(e.target.value);
                    }}
                    validate={{
                      required: { value: true, errorMessage: "Required" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger marb-15 marl-15"
            onClick={() => cancelClickHandler()}
          >
            Cancel
          </button>
          <button
            className="btn btn-success marl-15 marb-15"
            onClick={() => handleValidSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersForm;
