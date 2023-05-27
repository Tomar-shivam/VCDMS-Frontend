import { useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faBell, faLaptop } from "@fortawesome/free-solid-svg-icons";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const Userreport = (props) => {
  const [activeTab] = useState("userreport");
  const [username, setusername] = useState("");
  const [logintimefrom, setlogintimefrom] = useState("");
  const [logouttimefrom, setlogouttimefrom] = useState("");
  const [logintimeto, setlogintimeto] = useState("");
  const [logouttimeto, setlogouttimeto] = useState("");
  const [logintimefrompurge, setlogintimefrompurge] = useState("");
  const [logouttimefrompurge, setlogouttimefrompurge] = useState("");
  const [logintimetopurge, setlogintimetopurge] = useState("");
  const [logouttimetopurge, setlogouttimetopurge] = useState("");
  const [actionperformed, setactionperformed] = useState("");
  const [role, setrole] = useState("");
  const [toggle, setToggle] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [actionData, setActionData] = useState([]);
  const [timeZone, setTimeZone] = useState();

  useEffect(() => {
    setTimeZone(props.currentTimeZone)
  }, [props.currentTimeZone])

  const toggleCard = () => {
    toggleIcon();
    setCollapse(!collapse);
  };

  const toggleIcon = () => {
    setclicked(!clicked);
  };

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
  };

  const actioncolumns = [
    {
      headerName: "Action Type",
      field: "ActionType",
      tooltipField: "ActionType",
    },
    {
      headerName: "Action Time",
      field: "ActionTime",
      tooltipField: "ActionTime",
    },
    {
      headerName: "Module",
      field: "Module",
      tooltipField: "Module",
    },
    {
      headerName: "Target",
      field: "Target",
      tooltipField: "Target",
    },
  ];

  const columns = [
    {
      headerName: "Username",
      field: "Username",
      tooltipField: "Usernam",
    },
    {
      headerName: "User Role",
      field: "Role",
      tooltipField: "Role",
    },
    {
      headerName: "Login Time",
      field: "LoginTime",
      tooltipField: "LoginTime",
      minWidth: 200,
    },
    {
      headerName: "Logout Time",
      field: "LogoutTime",
      tooltipField: "LogoutTime",
      minWidth: 200,
    },
    {
      headerName: "Login Interval ",
      field: "LoginInterval",
      tooltipField: "LoginInterval",
    },
    {
      headerName: "Actions",
      field: "Actions",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = "Actions";
        link.addEventListener("click", () => {
          setToggle(!toggle);
          setActionData(params.value.reverse());
        });
        return link;
      },
    },
  ];

  useEffect(() => {
    props.getUserReport();
  }, [])

  const download = function (data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.setAttribute('hidden', '')
    a.setAttribute('href', url);
    a.setAttribute('download', 'userreport.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const objectToCsv = function (data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      })
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

  let handleExport = async () => {

    let dataPass = {
      Timezone: timeZone,
    }
    let returnData = await HttpService.CreateUpdate(
      "getuserreportexport",
      dataPass
    ).then((res) => res.data);



    const data = returnData.map(row => ({
      Username: row.Username,
      Role: row.Role,
      LoginTime: row.LoginTime,
      LoginInterval: row.LoginInterval ? row.LoginInterval : "",
      LogoutTime: row.LogoutTime ? row.LogoutTime : "",
      ActionType: row.ActionType ? row.ActionType : "",
      ActionTime: row.ActionTime ? row.ActionTime : "",
      Module: row.Module ? row.Module : "",
      Target: row.Target ? row.Target : "",

    }));


    const csvData = objectToCsv(data)
    download(csvData)

  };
  let handlePurge = async () => {
    if ((logintimefrompurge === "" && logintimetopurge !== "") || (logouttimefrompurge === "" && logouttimetopurge !== "") || (logintimefrompurge !== "" && logintimetopurge === "") || (logouttimefrompurge !== "" && logouttimetopurge === "") || (logouttimefrompurge === "" && logouttimetopurge === "" && logintimefrompurge === "" && logintimetopurge === "")) {
      ErrorMessage("'From' and 'To' Fields are required");
      return;
    } else if ((logintimetopurge < logintimefrompurge) || (logouttimetopurge < logouttimefrompurge)) {
      ErrorMessage("'From' cannot be greater than 'To' field");
      return;
    } else {
      if (logintimefrompurge !== "" && logintimetopurge !== "" && logouttimefrompurge !== "" && logouttimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Login Time) from  ${logintimefrompurge} to ${logintimetopurge} & data(Logout Time) from ${logouttimefrompurge} to ${logouttimetopurge}?`);
        if (answer) {

          let datapass = {
            Timezone: timeZone
          }
          let returnData = await HttpService.CreateUpdate(
            "GetUserReport",
            datapass
          ).then((res) => res.data);

          let data = returnData.map(row => ({
            Username: row.Username,
            Role: row.Role,
            LoginTime: row.LoginTime,
            LoginInterval: row.LoginInterval ? row.LoginInterval : "",
            LogoutTime: row.LogoutTime ? row.LogoutTime : "",
            ActionType: row.ActionType ? row.ActionType : "",
            ActionTime: row.ActionTime ? row.ActionTime : "",
            Module: row.Module ? row.Module : "",
            Target: row.Target ? row.Target : "",
            Timezone: timeZone,
          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.LoginTime).substring(0, 10) >= logintimefrompurge && (elem.LoginTime).substring(0, 10) <= logintimetopurge) {
              flag = "returned"
            }

          })
          data.map(async (elem) => {
            if ((elem.LogoutTime).substring(0, 10) >= logouttimefrompurge && (elem.LogoutTime).substring(0, 10) <= logouttimetopurge) {
              flag = "returned";
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.LoginTime).substring(0, 10) >= logintimefrompurge && (elem.LoginTime).substring(0, 10) <= logintimetopurge) {
                await HttpService.CreateUpdate(
                  "purgeDataUser", elem
                ).then((res) => res.data);
              }

            })
            data.map(async (elem) => {
              if ((elem.LogoutTime).substring(0, 10) >= logouttimefrompurge && (elem.LogoutTime).substring(0, 10) <= logouttimetopurge) {
                await HttpService.CreateUpdate(
                  "purgeDataUserLogout", elem
                ).then((res) => res.data);
              }

            })
            SuccessMessage("Reports Deleted Successfully");
            props.getUserReport();
            return;
          }
        }
      } else if (logouttimefrompurge !== "" && logouttimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Logout Time) from ${logouttimefrompurge} to ${logouttimetopurge}?`);
        if (answer) {

          let datapass = {
            Timezone: timeZone
          }
          let returnData = await HttpService.CreateUpdate(
            "GetUserReport",
            datapass
          ).then((res) => res.data);

          let data = returnData.map(row => ({
            Username: row.Username,
            Role: row.Role,
            LoginTime: row.LoginTime,
            LoginInterval: row.LoginInterval ? row.LoginInterval : "",
            LogoutTime: row.LogoutTime ? row.LogoutTime : "",
            ActionType: row.ActionType ? row.ActionType : "",
            ActionTime: row.ActionTime ? row.ActionTime : "",
            Module: row.Module ? row.Module : "",
            Target: row.Target ? row.Target : "",
            Timezone: timeZone,
          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.LogoutTime).substring(0, 10) >= logouttimefrompurge && (elem.LogoutTime).substring(0, 10) <= logouttimetopurge) {
              flag = "returned"
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.LogoutTime).substring(0, 10) >= logouttimefrompurge && (elem.LogoutTime).substring(0, 10) <= logouttimetopurge) {
                await HttpService.CreateUpdate(
                  "purgeDataUserLogout", elem
                ).then((res) => res.data);
              }
            })
            SuccessMessage("Reports Deleted Successfully");
            props.getUserReport()
            return;
          }
        }
      } else if (logintimefrompurge !== "" && logintimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Login Time) from ${logintimefrompurge} to ${logintimetopurge}?`);
        if (answer) {

          let datapass = {
            Timezone: timeZone,
          };
          let returnData = await HttpService.CreateUpdate(
            "GetUserReport",
            datapass
          ).then((res) => res.data);


          const data = returnData.map(row => ({
            Username: row.Username,
            Role: row.Role,
            LoginTime: row.LoginTime,
            LoginInterval: row.LoginInterval ? row.LoginInterval : "",
            LogoutTime: row.LogoutTime ? row.LogoutTime : "",
            ActionType: row.ActionType ? row.ActionType : "",
            ActionTime: row.ActionTime ? row.ActionTime : "",
            Module: row.Module ? row.Module : "",
            Target: row.Target ? row.Target : "",
            Timezone: timeZone,
          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.LoginTime).substring(0, 10) >= logintimefrompurge && (elem.LoginTime).substring(0, 10) <= logintimetopurge && elem.LoginInterval !== "") {
              flag = "returned"
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.LoginTime).substring(0, 10) >= logintimefrompurge && (elem.LoginTime).substring(0, 10) <= logintimetopurge && elem.LoginInterval !== "") {
                await HttpService.CreateUpdate(
                  "purgeDataUser", elem
                ).then((res) => res.data);
              }

            })
            setlogintimefrompurge("");
            setlogintimetopurge("");
            setlogouttimefrompurge("");
            setlogouttimetopurge("");
            SuccessMessage("Reports Deleted Successfully");
            props.getUserReport();
            return;
          }
        }

      }
    }


  };


  let handleExportPdf = async () => {

    let dataPass = {
      Timezone: timeZone,
    }
    let returnData = await HttpService.CreateUpdate(
      "getuserreportexport",
      dataPass
    ).then((res) => res.data);

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 50;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(16);

    const title = "User Report";
    const headers = [["Username", "Role", "Login Time", "Re -Login Interval", "Logout Time", "Action", "Action Time", "Module", "Target"]];


    const data = returnData.map(row => ({
      Username: row.Username,
      Role: row.Role,
      LoginTime: row.LoginTime,
      LoginInterval: row.LoginInterval ? row.LoginInterval : "",
      LogoutTime: row.LogoutTime ? row.LogoutTime : "",
      ActionType: row.ActionType ? row.ActionType : "",
      ActionTime: row.ActionTime ? row.ActionTime : "",
      Module: row.Module ? row.Module : "",
      Target: row.Target ? row.Target : "",
    }));


    const updatedData = data.map(elt => [elt.Username, elt.Role, elt.LoginTime, elt.LoginInterval, elt.LogoutTime, elt.ActionType, elt.ActionTime, elt.Module, elt.Target])

    let content = {
      startY: 30,
      head: headers,
      body: updatedData
    };

    doc.text(title, marginLeft, 20);
    doc.autoTable(content);
    doc.save("UserReport.pdf")

  }


  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  let handleClear = async (e) => {
    e.preventDefault();
    setlogintimefrom("");
    setlogintimeto("");
    setlogouttimefrom("");
    setlogouttimeto("");
    setusername("");
    setactionperformed("");
    let data = {
      TimeLoginFrom: "",
      TimeLoginTo: "",
      TimeLogoutFrom: "",
      TimeLogoutTo: "",
      Role: "",
      Username: "",
      Actions: "",
    };

    let returnData = await HttpService.CreateUpdate(
      "getusersearchdetails",
      data
    ).then((res) => res.data);
    if (returnData !== undefined && returnData !== null && returnData !== "") {
      returnData.map(entry => {
        if (entry.LoginTime !== "" && entry.LoginTime !== undefined && entry.LoginTime != null) {
          entry.LoginTime = new Date(new Date(entry.LoginTime).getTime() + timeZone * 3600000).toISOString();
          entry.LoginTime = entry.LoginTime.substring(0, 10) + " " + entry.LoginTime.substring(11, 19);
        }
        if (entry.LogoutTime !== "" && entry.LogoutTime !== undefined && entry.LogoutTime !== null) {
          entry.LogoutTime = new Date(new Date(entry.LogoutTime).getTime() + timeZone * 3600000).toISOString();
          entry.LogoutTime = entry.LogoutTime.substring(0, 10) + " " + entry.LogoutTime.substring(11, 19);
        }
        entry.Actions.map(row => {
          if (Object.keys(row).length > 0) {
            row.ActionTime = new Date(new Date(row.ActionTime).getTime() + timeZone * 3600000).toISOString();
            row.ActionTime = row.ActionTime.substring(0, 10) + " " + row.ActionTime.substring(11, 19);
          }
        })
      })
    }
    gridApi.setRowData(returnData);
  };
  const handlePurgeClose = (e) => {
    e.preventDefault();
    setlogintimefrompurge("");
    setlogintimetopurge("");
    setlogouttimefrompurge("");
    setlogouttimetopurge("");
  }
  let handleClick = async () => {
    // e.preventDefault();
    let data = {
      TimeLoginFrom: logintimefrom,
      TimeLoginTo: logintimeto,
      TimeLogoutFrom: logouttimefrom,
      TimeLogoutTo: logouttimeto,
      Role: role,
      Username: username,
      Actions: actionperformed,
      Timezone: timeZone,
    };
    let returnData = await HttpService.CreateUpdate(
      "getusersearchdetails",
      data
    ).then((res) => res.data);
    if (returnData !== undefined && returnData !== null && returnData !== "") {
      returnData.map(entry => {
        if (entry.LoginTime !== "" && entry.LoginTime !== undefined && entry.LoginTime != null) {
          entry.LoginTime = entry.LoginTime.substring(0, 10) + " " + entry.LoginTime.substring(11, 19);
        }
        if (entry.LogoutTime !== "" && entry.LogoutTime !== undefined && entry.LogoutTime !== null) {
          entry.LogoutTime = entry.LogoutTime.substring(0, 10) + " " + entry.LogoutTime.substring(11, 19);
        }
        entry.Actions.map(row => {
          if (Object.keys(row).length > 0) {
            row.ActionTime = new Date(new Date(row.ActionTime).getTime() + timeZone * 3600000).toISOString();
            row.ActionTime = row.ActionTime.substring(0, 10) + " " + row.ActionTime.substring(11, 19);
          }
        })
      })
    }
    gridApi.setRowData(returnData);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light p-0 my-2">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav custom-tabs dashboard-navbar">
            <li className="nav-item">
              <Link
                to="/content/report"
                className={
                  "nav-link " + (activeTab === "alarmreport" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <FontAwesomeIcon icon={faBell} />
                Alarm Report
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/content/userreport"
                className={
                  "nav-link " + (activeTab === "userreport" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <i className="fa fa-users"></i>
                User Report
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/content/devicereport"
                className={
                  "nav-link " + (activeTab === "devicereport" ? "active" : "")
                }
                aria-current="page"
                href="#"
              >
                <FontAwesomeIcon icon={faLaptop} />
                Device Report
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <div className="pad-15">
          <div className="form-boxdiv">
            <div>
              <div
                className="form-boxtopline5"
                onClick={toggleCard}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>Search</span>
                <FontAwesomeIcon
                  icon={clicked ? faAngleDown : faAngleRight}
                  onClick={toggleIcon}
                />
              </div>
            </div>
            <Collapse isOpen={collapse}>
              <div className="py-3 px-0">
                <div
                  className="form-boxtopcont user-form form-boxcontent row p-0"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "start",
                  }}
                >
                  <div className="col-md-6 p-0">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom form-label-bold">
                          User Name
                        </label>
                        <input
                          type="text"
                          value={username}
                          className="form-control"
                          placeholder="Search through Username"
                          onChange={(e) => setusername(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom form-label-bold">
                          Role
                        </label>
                        <select
                          className="form-control"
                          name="role_type"
                          id="role_type"
                          value={role}
                          onChange={(e) => setrole(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Admin">Admin</option>
                          <option value="Technician/Engineer">
                            Technician/Engineer
                          </option>
                          <option value="Operator">Operator</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom form-label-bold">
                          Actions Performed
                        </label>
                        <select
                          className="form-control"
                          name="actionperformed"
                          id="actionperformed"
                          value={actionperformed}
                          onChange={(e) => setactionperformed(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Add">Add</option>
                          <option value="Update">Update</option>
                          <option value="Delete">Delete</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 p-0">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom mb-2 form-label-bold">
                          Login Time
                        </label>
                        <div
                          className="form-group row"
                        // style={{
                        //   border: "1px solid lightgrey",
                        //   padding: "10px",
                        // }}
                        >
                          <div className="col-md-6 d-flex align-items-center">
                            <label
                              htmlFor="timeloginfrom"
                              className="inline-date-label"
                            >
                              From:
                            </label>
                            <input
                              id="timeloginfrom"
                              type="date"
                              className="form-control"
                              value={logintimefrom}
                              placeholder="Search"
                              onChange={(e) =>
                                setlogintimefrom(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            <label
                              htmlFor="timeloginto"
                              className="inline-date-label"
                            >
                              To:{" "}
                            </label>
                            <input
                              id="timeloginto"
                              type="date"
                              className="form-control"
                              value={logintimeto}
                              placeholder="Search"
                              onChange={(e) => setlogintimeto(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom mb-2 form-label-bold">
                          Logout Time
                        </label>
                        <div
                          className="form-group row"
                        // style={{
                        //   border: "1px solid lightgrey",
                        //   padding: "10px",
                        // }}
                        >
                          <div className="col-md-6 d-flex align-items-center">
                            <label
                              htmlFor="timelogoutfrom"
                              className="inline-date-label"
                            >
                              From:
                            </label>
                            <input
                              id="timelogoutfrom"
                              type="date"
                              className="form-control"
                              value={logouttimefrom}
                              placeholder="Search"
                              onChange={(e) =>
                                setlogouttimefrom(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            <label
                              htmlFor="timelogoutto"
                              className="inline-date-label"
                            >
                              To:
                            </label>
                            <input
                              id="timelogoutto"
                              type="date"
                              className="form-control"
                              value={logouttimeto}
                              placeholder="Search"
                              onChange={(e) =>
                                setlogouttimeto(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      className="btn btn-success marb-15"
                      onClick={(e) => handleClick(e)}
                    >
                      Search
                    </button>

                    <button
                      className="btn btn-primary marb-15 marl-15"
                      onClick={(e) => handleClear(e)}
                    >
                      Clear
                    </button>

                    <button
                      className="btn btn-primary marb-15 marl-15"
                      onClick={(e) => handleExport(e)}
                    >
                      Export
                    </button>
                    <button
                      type="button" className="btn btn-danger marl-15 marb-15" data-toggle="modal" data-target="#exampleModal"
                    // onClick={(e) => handlePurge(e)}
                    >
                      Purge
                    </button>
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                      <div className="modal-dialog modal-dialog-centered" role="document" style={{ "width": "40%", "justifyContent": "center" }}>
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Date Range: </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handlePurgeClose}>
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="col-md-12 p-0">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-check-label form-label-custom mb-2 form-label-bold">
                                    Login Time
                                  </label>
                                  <div
                                    className="form-group row"
                                  // style={{
                                  //   border: "1px solid lightgrey",
                                  //   padding: "10px",
                                  // }}
                                  >
                                    <div className="col-md-6 d-flex align-items-center">
                                      <label
                                        htmlFor="timeloginfrom"
                                        className="inline-date-label"
                                      >
                                        From:
                                      </label>
                                      <input
                                        id="timeloginfrom"
                                        type="date"
                                        className="form-control"
                                        value={logintimefrompurge}
                                        placeholder="Search"
                                        onChange={(e) =>
                                          setlogintimefrompurge(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center">
                                      <label
                                        htmlFor="timeloginto"
                                        className="inline-date-label"
                                      >
                                        To:{" "}
                                      </label>
                                      <input
                                        id="timeloginto"
                                        type="date"
                                        className="form-control"
                                        value={logintimetopurge}
                                        placeholder="Search"
                                        onChange={(e) => setlogintimetopurge(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-check-label form-label-custom mb-2 form-label-bold">
                                    Logout Time
                                  </label>
                                  <div
                                    className="form-group row"
                                  // style={{
                                  //   border: "1px solid lightgrey",
                                  //   padding: "10px",
                                  // }}
                                  >
                                    <div className="col-md-6 d-flex align-items-center">
                                      <label
                                        htmlFor="timelogoutfrom"
                                        className="inline-date-label"
                                      >
                                        From:
                                      </label>
                                      <input
                                        id="timelogoutfrom"
                                        type="date"
                                        className="form-control"
                                        value={logouttimefrompurge}
                                        placeholder="Search"
                                        onChange={(e) =>
                                          setlogouttimefrompurge(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center">
                                      <label
                                        htmlFor="timelogoutto"
                                        className="inline-date-label"
                                      >
                                        To:
                                      </label>
                                      <input
                                        id="timelogoutto"
                                        type="date"
                                        className="form-control"
                                        value={logouttimetopurge}
                                        placeholder="Search"
                                        onChange={(e) =>
                                          setlogouttimetopurge(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(e) => handlePurgeClose(e)}>Close</button>
                            <button type="button" className="btn btn-danger" onClick={(e) => handlePurge(e)}>Purge Reports</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary marb-15 marl-15"
                      onClick={(e) => handleExportPdf(e)}
                    >
                      Save as pdf
                    </button>

                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="text-right">
          <div className="clear"></div>
        </div>
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">User Report</div>
            <div className="form-boxtopcont user-form">
              <div
                className="ag-theme-alpine"
                style={{ height: "calc(100vh - 325px)" }}
              >
                <AgGridReact
                  onGridReady={onGridReady}
                  pagination={true}
                  paginationPageSize={20}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
                  enableBrowserTooltips={true}
                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                  rowData={props.userreport}
                  masterDetail={true}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
          <ModalHeader
            toggle={() => {
              setToggle(!toggle);
            }}
          >
            Actions
          </ModalHeader>
          <ModalBody>
            <div className="pad-15">
              <div className="form-boxdiv">
                <div className="form-boxtopline5">Actions Performed</div>
                <div className="form-boxtopcont user-form">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: "390px", minHeight: "390px" }}
                  >
                    <AgGridReact
                      onGridReady={onGridReady}
                      pagination={true}
                      paginationPageSize={20}
                      columnDefs={actioncolumns}
                      defaultColDef={defaultColDef}
                      enableBrowserTooltips={true}
                      tooltipShowDelay={{ tooltipShowDelay: 0 }}
                      rowData={actionData}
                      masterDetail={true}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </div>

            {/* <table style={{width:"100%"}}>
              <thead>
              <tr>
              <th>Type</th>
              <th>Time</th>
              <th>Module</th>
              <th>Target</th>
            </tr>
              </thead>
              <tbody>
                {
                  actionData.map((value, index) => {
                    return <tr>
                      <td>
                        {value.ActionType}
                      </td>
                      <td>
                        {value.ActionTime}
                      </td>
                      <td>
                        {value.Module}
                      </td>
                      <td>
                        {value.Target}
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table> */}
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Userreport;
