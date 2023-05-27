import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../profile/profile.css";
import pUsername from "../../images/profile-username.png";
import pRole from "../../images/profile-role.png";
import pEmail from "../../images/profile-email.png";
import pPhone from "../../images/profile-phone.png";
import profileImg from "../../images/profileImg.png";
import { Link } from "react-router-dom";
import httpService from "../../services/http.service";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Profile = (props) => {
  const [loading, setloader] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [firstName, setfirstName] = useState("");
  const [Username, setUsername] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState("admin");
  const [editing, setEditing] = useState(false);
  const [saveClicked, setsaveClicked] = useState(false);
  const activeTab = "profile";
  const [submitText, setsubmitText] = useState(<div>Update Profile</div>);
  const [submitTextPhoto, setsubmitTextPhoto] = useState(
    <div>Update Profile Image</div>
  );
  const [profilepic, setprofilepic] = useState({
    selectedFile: "",
  });
  const [listingData, setListingData] = useState({
    selectedFile: "",
  });
  const [toggleModal, setToggleModal] = useState(false);

  const toggle = () => setToggleModal(!toggleModal);
  useEffect(() => {
    setprofilepic({ selectedFile: "" })
  }, [toggleModal])


  useEffect(() => {
    var username_ = localStorage.getItem("Username");
    const getUser = async () => {
      let data = { Username: username_ };
      var user = await httpService
        .getByUsername("getuserdatabyusername", data)
        .catch((err) => {
          return;
        });
      if (user !== undefined && user !== null) {
        setfirstName(user.data.Firstname);
        setlastName(user.data.Lastname);
        setEmail(user.data.Email);
        setContactNo(user.data.Phone);
        setUsername(user.data.Username);
        setrole(user.data.Role);
        setListingData(user.data.Photo);
      }
    };
    getUser();
  }, []);

  const setUser = async () => {
    let data = {
      Username: Username,
      Phone: contactNo,
      Email: email,
      Firstname: firstName,
      Lastname: lastName,
      Role: role,
    };
    const user = await httpService
      .updateData("updateuserdata", data)
      .catch((err) => {
        return;
      });

    setfirstName(user.data.data.Firstname);
    setlastName(user.data.data.Lastname);
    setEmail(user.data.data.Email);
    setContactNo(user.data.data.Phone);
    setUsername(user.data.data.Username);
    setrole(user.data.data.Role);
  };

  useEffect(() => { }, [saveClicked]);

  useEffect(() => { }, [editing]);

  const updateProfile = async () => {
    await setUser();

    setloader(false);
    setsubmitText(<div>Update Profile</div>);
    setEditing(false);
    setsaveClicked(true);
  };
  const formProfile = () => {
    setEditing(true);
    setfirstName(firstName);
    setlastName(lastName);
    setEmail(email);
    setContactNo(contactNo);
    setUsername(Username);
    setrole(role);
  };

  const cancelClickHandler = () => {
    setContactNo(props.customerData.Phone);
    setUsername(props.customerData.Username);
    setfirstName(props.customerData.Firstname);
    setlastName(props.customerData.Lastname);
    setEmail(props.customerData.Email);
    setrole(props.customerData.Role);
    setEditing(false);
  };

  const submitButton = async (event) => {
    if (email === null || email === undefined || email === "") {
      ErrorMessage("Please enter an EMAIL");
      return;
    }
    else if (!email.includes("@") || !email.includes(".com")
      || email.split("@").shift() === ""
      || email.split("@").shift() === ""
      || email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf(".com")) === "") {
      ErrorMessage("Please enter Valid Email address");
      return;
    }
    else if (contactNo !== null && contactNo !== undefined && contactNo !== "" && (contactNo.length < 10 || contactNo.length > 10)) {
      ErrorMessage("Please enter Valid Contact number");
      return;
    } else {
      setloader(true);
      setsubmitText(
        <div>
          <span
            className="spinner-border spinner-border-sm mr-1"
            role="status"
            aria-hidden="true"
          ></span>
          Updating
        </div>
      );
      await updateProfile();

    }
  };

  useEffect(() => {
    setContactNo(props.customerData.Phone);
    setUsername(props.customerData.Username);
    setfirstName(props.customerData.Firstname);
    setlastName(props.customerData.Lastname);
    setEmail(props.customerData.Email);
    setrole(props.customerData.Role);
    setListingData(props.customerData.Photo);
  }, [props.customerData.Phone, props.customerData.Username, props.customerData.Firstname, props.customerData.Lastname, props.customerData.Email, props.customerData.Role, props.customerData.Photo]);

  const handleSubmitPhoto = async (e) => {
    e.preventDefault();
    if (
      profilepic.selectedFile === undefined ||
      profilepic.selectedFile === "" ||
      profilepic.selectedFile === null
    ) {
      ErrorMessage("Please Upload a valid Image");
      return;
    }

    setsubmitTextPhoto(
      <div>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Updating
      </div>
    );

    setUsername(localStorage.getItem("Username"));
    let data = {
      Username: Username,
      Photo: profilepic,
    };
    const user = await httpService
      .CreateUpdate("UpdateProfilePhoto", data)
      .catch((err) => {
        return;
      });
    setListingData(profilepic);

    setsubmitTextPhoto(<div>Update Profile Image</div>);
    toggle();
    setprofilepic({ selectedFile: "" });

    if (user !== undefined && user.data !== undefined && user.data.msg === "user image has been updated succesfully") {
      SuccessMessage("Image uploaded successfully");
      return;
    }
  };

  const convertToBase64 = (file) => {
    if (file !== undefined) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  const handleFileUpload = async (e) => {
    if (e.target.files[0] !== undefined && e.target.files[0] !== null && e.target.files[0].size !== undefined && e.target.files[0].size > 1000000) {
      ErrorMessage("Please select a image of size less than 1Mb");
      setprofilepic({ selectedFile: "" })
      return;
    } else if (e.target.files[0] === undefined) {
      ErrorMessage("Please select a image");
      setprofilepic({ selectedFile: "" })
      return;
    }
    if (
      e.target.files[0] !== undefined ||
      e.target.files[0] !== null ||
      e.target.files[0] !== ""
    ) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setprofilepic({ ...profilepic, selectedFile: base64 });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light p-0 my-3">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav custom-tabs dashboard-navbar">
            <li className="nav-item">
              <Link
                to="/content/profile"
                className={
                  "nav-link " + (activeTab === "profile" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <i className="fa fa-user"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/content/changepassword"
                className={
                  "nav-link " + (activeTab === "cpassword" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <i className="fa fa-key"></i>
                Account Security
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="form-boxdiv">
        <div className="form-boxtopline5">Profile</div>
        <div className="form-boxtopcont">
          <div className="row my-4 align-items-center">
            <div className="col-sm-6 profile-details">
              <div className="profile-img ">
                <figure>
                  {listingData !== undefined &&
                    listingData !== null &&
                    listingData.selectedFile !== "" ? (
                    <img src={listingData.selectedFile} alt='' />
                  ) : (
                    <img src={profileImg} alt="" />
                  )}

                  <div className="profile-img-update">
                    <button
                      onClick={toggle}
                      className="profile-img-update-button"
                    >
                      <i className="fa fa-camera"></i>
                    </button>
                    <Modal isOpen={toggleModal} toggle={toggle} style={{ "width": "30%" }} className="modal-dialog-centered">
                      <ModalHeader toggle={toggle}>Please Upload a ".jpeg"/ ".png"/ ".jpg" file{" "}</ModalHeader>
                      <ModalBody>
                        <form onSubmit={(e) => handleSubmitPhoto(e)}>
                          <input
                            className="marb-15"
                            type="file"
                            label="Image"
                            name="myFile"
                            accept=".jpeg, .png, .jpg"
                            onChange={(e) => handleFileUpload(e)}
                          />
                          <div style={{ "color": "red" }}>*Note: Image size should be less than 1 MB.</div>
                          <ModalFooter>
                            <Button color="primary">{submitTextPhoto}</Button>{' '}
                          </ModalFooter>

                        </form>
                      </ModalBody>
                    </Modal>
                  </div>
                </figure>
              </div>

            </div>
            {
              <div className="col-lg-6 profile-details">
                {!editing ? (
                  <h3>{`${firstName ? firstName : ""} ${lastName ? lastName : ""
                    }`}</h3>
                ) : (
                  <div className="row">
                    <div className="col-sm-5 col-md-4 first-last first">
                      <input
                        className="input-class"
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                        onChange={(event) => {
                          if (event.target.value.match(/[^A-Za-z\s]/gi, "")) {
                            return;
                          }
                          setfirstName(event.target.value);
                        }}
                        value={firstName}
                      />
                    </div>
                    <div className="col-sm-5 col-md-4 first-last last">
                      <input
                        className="input-class"
                        type="text"
                        name="last-name"
                        placeholder="Last Name"
                        onChange={(event) => {
                          if (event.target.value.match(/[^A-Za-z\s]/gi, "")) {
                            return;
                          }
                          setlastName(event.target.value);
                        }}
                        value={lastName}
                      />
                    </div>
                  </div>
                )}
                <ul>
                  {!editing ? (
                    <li>
                      <img src={pUsername} alt="" />
                      <p>
                        Username : <span>{Username}</span>
                      </p>
                    </li>
                  ) : (
                    <li>
                      <img src={pUsername} alt="" />
                      <p>
                        Username : <span>{Username}</span>
                      </p>
                    </li>
                  )}
                  {!editing ? (
                    <li>
                      <img src={pRole} alt="" />
                      <p>
                        Role : <span>{role}</span>
                      </p>
                    </li>
                  ) : (
                    <li>
                      <img src={pRole} alt="" />
                      <p>
                        Role : <span>{role}</span>
                      </p>
                    </li>
                  )}

                  {!editing ? (
                    <li>
                      <img src={pEmail} alt="" />
                      <p>
                        Email : <span>{email ? email : ""}</span>
                      </p>
                    </li>
                  ) : (
                    <li>
                      <img src={pEmail} alt="" />
                      <p>
                        Email : <sup className="text-danger">*</sup> {" "}
                        <span>
                          <input
                            className="input-class"
                            type="email"
                            name="email"
                            placeholder="example1@abc.com"
                            value={email}
                            onChange={(event) => {
                              if (
                                event.target.value.match(
                                  /[^A-Za-z0-9@.,]/gi,
                                  ""
                                )
                              ) {
                                return;
                              }

                              setEmail(event.target.value);
                            }}
                          />
                        </span>
                      </p>
                    </li>
                  )}
                  {!editing ? (
                    <li>
                      <img src={pPhone} alt="" />
                      <p>
                        Contact No. : <span>{contactNo ? contactNo : ""}</span>
                      </p>
                    </li>
                  ) : (
                    <li>
                      <img src={pPhone} alt="" />
                      <p>
                        Contact No. :
                        <span>
                          <input
                            className="input-class"
                            type="text"
                            name="contactno"
                            placeholder="Contact Information"
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
                        </span>
                      </p>
                    </li>
                  )}
                </ul>
                {!editing ? (
                  <button
                    className="btn change-pwd-btn"
                    onClick={() => {
                      formProfile();
                    }}
                    disabled={loading}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div>
                    <button
                      className="btn change-pwd-btn"
                      onClick={cancelClickHandler}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn change-pwd-btn marl-15"
                      onClick={submitButton}
                    >
                      {submitText}
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
