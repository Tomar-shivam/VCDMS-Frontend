import { useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";
import { Collapse } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faBell, faLaptop } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './report.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
const Report = (props) => {
  const [activeTab, setActiveTab] = useState("alarmreport");
  const [createdtimefrom, setcreatedtimefrom] = useState("");
  const [clearedtimefrom, setclearedtimefrom] = useState("");
  const [createdtimeto, setcreatedtimeto] = useState("");
  const [clearedtimeto, setclearedtimeto] = useState("");
  const [createdtimefrompurge, setcreatedtimefrompurge] = useState("");
  const [clearedtimefrompurge, setclearedtimefrompurge] = useState("");
  const [createdtimetopurge, setcreatedtimetopurge] = useState("");
  const [clearedtimetopurge, setclearedtimetopurge] = useState("");
  const [email, setemail] = useState("");
  const [alarmtype, setalarmtype] = useState("");
  const [notified, setnotified] = useState("");
  const [toggle, setToggle] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [loading, setLoading] = useState("");
  const [clicked, setclicked] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [timeZone, setTimeZone] = useState();

  useEffect(() => {
    setTimeZone(props.currentTimeZone);
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
    resizable: true,
  };

  const columns = [
    {
      headerName: "Stream ID",
      field: "StreamID",
      tooltipField: "StreamID",
    },
    {
      headerName: "Region",
      field: "Region",
      tooltipField: "Region",
    },
    {
      headerName: "System",
      field: "System",
      tooltipField: "System",
    },
    {
      headerName: "Alarm Type",
      field: "AlarmType",
      tooltipField: "AlarmType",
    },
    {
      headerName: "Date Occured",
      field: "TimeCreated",
      tooltipField: "TimeCreated",
      filter: "agDateColumnFilter",
      minWidth: 200,
    },
    {
      headerName: "Date Cleared",
      field: "TimeCleared",
      tooltipField: "TimeCleared",
      minWidth: 200,
    },
    {
      headerName: "Time Interval",
      field: "TimeInterval",
      tooltipField: "TimeInterval",
      minWidth: 150,
    },
    {
      headerName: "Notified To",
      field: "MailInformed",
      cellRenderer: (props) => {
        if (!props.value) return " ";
        if (props.value.split(",").length > 1) {
          var link = document.createElement("a");
          link.className = "linka";
          link.innerText = props.value.split(",").length;
          link.addEventListener("click", () => {
            setemail(props.value);
            setToggle(!toggle);
          });
          return link;
        } else {
          return props.value;
        }
      },
      tooltipField: "MailInformed",
      maxWidth: 210,
    },
  ];

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  let handleExport = async (e) => {
    gridApi.exportDataAsCsv()
  }

  // const onFilterTextChange = (e) => {
  //   e.preventDefault();
  //   gridApi.setQuickFilter(e.target.value);
  // };

  let handleClear = async (e) => {
    e.preventDefault();
    setcreatedtimefrom("");
    setcreatedtimeto("");
    setclearedtimefrom("");
    setclearedtimeto("");
    setnotified("");
    setalarmtype("");
    let data = {
      TimeCreatedFrom: "",
      TimeCreatedTo: "",
      TimeClearedFrom: "",
      TimeClearedTo: "",
      AlarmType: "",
      MailInformed: "",
    };
    let returnData = await HttpService.CreateUpdate(
      "getsearchdetails",
      data
    ).then((res) => res.data);
    if (returnData !== undefined || returnData !== null) {
      returnData.map(entry => {
        if (entry.TimeCreated !== "" && entry.TimeCreated !== undefined && entry.TimeCreated != null) {
          entry.TimeCreated = new Date(new Date(entry.TimeCreated).getTime() + timeZone * 3600000).toISOString();
          entry.TimeCreated = entry.TimeCreated.substring(0, 10) + " " + entry.TimeCreated.substring(11, 19);
        }
        if (entry.TimeCleared !== "" && entry.TimeCleared !== undefined && entry.TimeCleared !== null) {
          entry.TimeCleared = new Date(new Date(entry.TimeCleared).getTime() + timeZone * 3600000 * 2).toISOString();
          entry.TimeCleared = entry.TimeCleared.substring(0, 10) + " " + entry.TimeCleared.substring(11, 19);
        }
      })
    }
    gridApi.setRowData(returnData);
  };

  useEffect(() => {
    props.getAlarmReport();
  }, []);

  let handlePurge = async () => {
    if ((createdtimefrompurge === "" && createdtimetopurge !== "") || (clearedtimefrompurge === "" && clearedtimetopurge !== "") || (createdtimefrompurge !== "" && createdtimetopurge === "") || (clearedtimefrompurge !== "" && clearedtimetopurge === "") || (clearedtimefrompurge === "" && clearedtimetopurge === "" && createdtimefrompurge === "" && createdtimetopurge === "")) {
      ErrorMessage("'From' and 'To' Fields are required");
      return;
    } else if ((createdtimetopurge < createdtimefrompurge) || (clearedtimetopurge < clearedtimefrompurge)) {
      ErrorMessage("'From' cannot be greater than 'To' field");
      return;
    } else {
      if (createdtimefrompurge !== "" && createdtimetopurge !== "" && clearedtimefrompurge !== "" && clearedtimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Occured Time) from ${createdtimefrompurge} to ${createdtimetopurge} & (Cleared Time) from ${clearedtimefrompurge} to ${clearedtimetopurge}?`);
        if (answer) {

          let data = {
            TimeCreatedFrom: "",
            TimeCreatedTo: "",
            TimeClearedFrom: "",
            TimeClearedTo: "",
            AlarmType: "",
            MailInformed: "",
            Timezone: timeZone,
          };
          let returnData = await HttpService.CreateUpdate(
            "getsearchdetails",
            data
          ).then((res) => res.data);

          data = returnData.map(row => ({
            StreamID: row.StreamID,
            Region: row.Region,
            System: row.System,
            AlarmType: row.AlarmType ? row.AlarmType : "",
            TimeCreated: row.TimeCreated ? row.TimeCreated : "",
            TimeCleared: row.TimeCleared ? row.TimeCleared : "",
            TimeInterval: row.TimeInterval ? row.TimeInterval : "",
            MailInformed: row.MailInformed ? row.MailInformed : "",
            Timezone: timeZone,
          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
              flag = "returned"
            }

          })
          data.map(async (elem) => {
            if ((elem.TimeCleared).substring(0, 10) >= clearedtimefrompurge && (elem.TimeCleared).substring(0, 10) <= clearedtimetopurge) {
              flag = "returned";
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
                 await HttpService.CreateUpdate(
                  "purgeDataAlarm", elem
                ).then((res) => res.data);
              }

            })
            data.map(async (elem) => {
              if ((elem.TimeCleared).substring(0, 10) >= clearedtimefrompurge && (elem.TimeCleared).substring(0, 10) <= clearedtimetopurge) {
                 await HttpService.CreateUpdate(
                  "purgeDataAlarmCleared", elem
                ).then((res) => res.data);
              }

            })
            SuccessMessage("Reports Deleted Successfully");
            props.getAlarmReport();
            return;
          }
        }
      } else if (clearedtimefrompurge !== "" && clearedtimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Cleared Time) from ${clearedtimefrompurge} to ${clearedtimetopurge}?`);
        if (answer) {

          let data = {
            TimeCreatedFrom: "",
            TimeCreatedTo: "",
            TimeClearedFrom: "",
            TimeClearedTo: "",
            AlarmType: "",
            MailInformed: "",
            Timezone: timeZone,

          };
          let returnData = await HttpService.CreateUpdate(
            "getsearchdetails",
            data
          ).then((res) => res.data);

          data = returnData.map(row => ({
            StreamID: row.StreamID,
            Region: row.Region,
            System: row.System,
            AlarmType: row.AlarmType ? row.AlarmType : "",
            TimeCreated: row.TimeCreated ? row.TimeCreated : "",
            TimeCleared: row.TimeCleared ? row.TimeCleared : "",
            TimeInterval: row.TimeInterval ? row.TimeInterval : "",
            MailInformed: row.MailInformed ? row.MailInformed : "",
            Timezone: timeZone,
          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.TimeCleared).substring(0, 10) >= clearedtimefrompurge && (elem.TimeCleared).substring(0, 10) <= clearedtimetopurge) {
              flag = "returned"
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.TimeCleared).substring(0, 10) >= clearedtimefrompurge && (elem.TimeCleared).substring(0, 10) <= clearedtimetopurge) {
                 await HttpService.CreateUpdate(
                  "purgeDataAlarmCleared", elem
                ).then((res) => res.data);
              }

            })
            SuccessMessage("Reports Deleted Successfully");
            props.getAlarmReport();
            return;
          }
        }
      } else if (createdtimefrompurge !== "" && createdtimetopurge !== "") {
        let answer = window.confirm(`Are you sure you want to purge data (Occured Time) from ${createdtimefrompurge} to ${createdtimetopurge}?`);
        if (answer) {

          let data = {
            TimeCreatedFrom: "",
            TimeCreatedTo: "",
            TimeClearedFrom: "",
            TimeClearedTo: "",
            AlarmType: "",
            MailInformed: "",
            Timezone: timeZone,

          };
          let returnData = await HttpService.CreateUpdate(
            "getsearchdetails",
            data
          ).then((res) => res.data);

          data = returnData.map(row => ({
            StreamID: row.StreamID,
            Region: row.Region,
            System: row.System,
            AlarmType: row.AlarmType ? row.AlarmType : "",
            TimeCreated: row.TimeCreated ? row.TimeCreated : "",
            TimeCleared: row.TimeCleared ? row.TimeCleared : "",
            TimeInterval: row.TimeInterval ? row.TimeInterval : "",
            MailInformed: row.MailInformed ? row.MailInformed : "",
            Timezone: timeZone,

          }));
          let flag = "";
          data.map(async (elem) => {
            if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
              flag = "returned"
            }

          })

          if (flag === "") {
            ErrorMessage("No Report Found in this Interval");
            return;
          } else {
            data.map(async (elem) => {
              if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
                 await HttpService.CreateUpdate(
                  "purgeDataAlarm", elem
                ).then((res) => res.data);
              }

            })
            setclearedtimefrompurge("");
            setcreatedtimefrompurge("");
            setcreatedtimetopurge("");
            setclearedtimetopurge("");
            SuccessMessage("Reports Deleted Successfully");
            props.getAlarmReport();
            return;
          }
        }

      }
    }
  };

  const handlePurgeClose = (e) => {
    e.preventDefault();
    setclearedtimefrompurge("");
    setcreatedtimefrompurge("");
    setcreatedtimetopurge("");
    setclearedtimetopurge("");
  }

  let handleClick = async (e) => {
    e.preventDefault();

    let data = {
      TimeCreatedFrom: createdtimefrom,
      TimeCreatedTo: createdtimeto,
      TimeClearedFrom: clearedtimefrom,
      TimeClearedTo: clearedtimeto,
      AlarmType: alarmtype,
      MailInformed: notified,
      Timezone: timeZone,

    };
    let returnData = await HttpService.CreateUpdate(
      "getsearchdetails",
      data
    ).then((res) => res.data);

    if (returnData !== undefined || returnData !== null) {
      returnData.map(entry => {
        if (entry.TimeCreated !== "" && entry.TimeCreated !== undefined && entry.TimeCreated !== null) {
          entry.TimeCreated = entry.TimeCreated.substring(0, 10) + " " + entry.TimeCreated.substring(11, 19);
        }
        if (entry.TimeCleared !== "" && entry.TimeCleared !== undefined && entry.TimeCleared !== null) {
          entry.TimeCleared = entry.TimeCleared.substring(0, 10) + " " + entry.TimeCleared.substring(11, 19);
        }
      })
    }
    gridApi.setRowData(returnData);
  };


  let handleExportPdf = async () => {

    let datanew = {
      TimeCreatedFrom: createdtimefrom,
      TimeCreatedTo: createdtimeto,
      TimeClearedFrom: clearedtimefrom,
      TimeClearedTo: clearedtimeto,
      AlarmType: alarmtype,
      MailInformed: notified,
      Timezone: timeZone,

    };
    let returnData = await HttpService.CreateUpdate(
      "getsearchdetails",
      datanew
    ).then((res) => res.data);

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 50;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(16);

    const title = "Alarm Report";
    const headers = [["Stream ID", "Region", "System", "Alarm Type", "Date Occured", "Date Cleared", "Time Interval", "Notified To"]];

    let data;
    if (returnData === null || returnData === undefined || returnData === [] || returnData === "") {
      data = [];
    } else {
      data = returnData.map(row => ({
        StreamID: row.StreamID,
        Region: row.Region,
        System: row.System,
        AlarmType: row.AlarmType ? row.AlarmType : "",
        TimeCreated: row.TimeCreated ? row.TimeCreated : "",
        TimeCleared: row.TimeCleared ? row.TimeCleared : "",
        TimeInterval: row.TimeInterval ? row.TimeInterval : "",
        MailInformed: row.MailInformed ? row.MailInformed : ""
      }));
    }


    const updatedData = data.map(elt => [elt.StreamID, elt.Region, elt.System, elt.AlarmType, elt.TimeCreated, elt.TimeCleared, elt.TimeInterval, elt.MailInformed])

    let content = {
      startY: 50,
      head: headers,
      body: updatedData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("UserReport.pdf")

  }
  // const onFilterTextChange=(e)=>{
  //   gridApi.setQuickFilter(e.target.value)
  // }

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
                  alignItems: "center",
                }}
              >
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Alarm Type
                    </label>
                    <select
                      className="form-control"
                      name="alarm_type"
                      id="alarm_type"
                      value={alarmtype}
                      onChange={(e) => setalarmtype(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Critical">Critical</option>
                      <option value="Major">Major</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Date Occured
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
                          htmlFor="timecreatedfrom"
                          className="inline-date-label"
                        >
                          From:
                        </label>
                        <input
                          id="timecreatedfrom"
                          type="date"
                          className="form-control"
                          value={createdtimefrom}
                          placeholder="Search"
                          onChange={(e) => setcreatedtimefrom(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="timecreatedto"
                          className="inline-date-label"
                        >
                          To:{" "}
                        </label>
                        <input
                          id="timecreatedto"
                          type="date"
                          className="form-control"
                          value={createdtimeto}
                          placeholder="Search"
                          onChange={(e) => setcreatedtimeto(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Notified To
                    </label>
                    <input
                      type="text"
                      value={notified}
                      className="form-control"
                      placeholder="Search through Usermail"
                      onChange={(e) => setnotified(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Date Cleared
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
                          htmlFor="timeclearedfrom"
                          className="inline-date-label"
                        >
                          From:
                        </label>
                        <input
                          id="timeclearedfrom"
                          type="date"
                          className="form-control"
                          value={clearedtimefrom}
                          placeholder="Search"
                          onChange={(e) => setclearedtimefrom(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="timeclearedto"
                          className="inline-date-label"
                        >
                          To:
                        </label>
                        <input
                          id="timeclearedto"
                          type="date"
                          className="form-control"
                          value={clearedtimeto}
                          placeholder="Search"
                          onChange={(e) => setclearedtimeto(e.target.value)}
                        />
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

                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-check-label form-label-custom form-label-bold">
                                Date Occured
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
                                    htmlFor="timecreatedfrom"
                                    className="inline-date-label"
                                  >
                                    From:
                                  </label>
                                  <input
                                    id="timecreatedfrom"
                                    type="date"
                                    className="form-control"
                                    value={createdtimefrompurge}
                                    placeholder="Search"
                                    onChange={(e) => setcreatedtimefrompurge(e.target.value)}
                                  />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                  <label
                                    htmlFor="timecreatedto"
                                    className="inline-date-label"
                                  >
                                    To:{" "}
                                  </label>
                                  <input
                                    id="timecreatedto"
                                    type="date"
                                    className="form-control"
                                    value={createdtimetopurge}
                                    placeholder="Search"
                                    onChange={(e) => setcreatedtimetopurge(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-check-label form-label-custom form-label-bold">
                                Date Cleared
                              </label>
                              <div className="form-group row">
                                <div className="col-md-6 d-flex align-items-center">
                                  <label
                                    htmlFor="timeclearedfrom"
                                    className="inline-date-label"
                                  >
                                    From:
                                  </label>
                                  <input
                                    id="timeclearedfrom"
                                    type="date"
                                    className="form-control"
                                    value={clearedtimefrompurge}
                                    placeholder="Search"
                                    onChange={(e) => setclearedtimefrompurge(e.target.value)}
                                  />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                  <label
                                    htmlFor="timeclearedto"
                                    className="inline-date-label"
                                  >
                                    To:
                                  </label>
                                  <input
                                    id="timeclearedto"
                                    type="date"
                                    className="form-control"
                                    value={clearedtimetopurge}
                                    placeholder="Search"
                                    onChange={(e) => setclearedtimetopurge(e.target.value)}
                                  />
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
                    Save as PDF
                  </button>
                </div>

              </div>
            </div>
          </Collapse>
        </div>
      </div>

      <div>
        <div className="text-right">
          <div className="clear"></div>
        </div>
        {loading ? <Loader /> : null}
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Alarm Report</div>
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
                  rowData={props.alarmreport}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
          <ModalHeader toggle={() => setToggle(!toggle)}>Emails</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="form-check-label font-weight-600">
                    Persons Notified :{" "}
                  </label>
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Report;
