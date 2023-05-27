import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import { Link } from "react-router-dom";
// import Loader from "../../common/loader";
import { Collapse } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import _ from "underscore";
import { faAngleDown, faAngleRight, faBell, faLaptop } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";

const Devicereport = (props) => {
  const [activeTab] = useState("devicereport");
  const [createdtimefrom, setcreatedtimefrom] = useState("");
  const [createdtimefrompurge, setcreatedtimefrompurge] = useState("");
  const [createdtimetopurge, setcreatedtimetopurge] = useState("");
  const [createdtimeto, setcreatedtimeto] = useState("");
  const [actionperformed, setactionperformed] = useState("");
  const [devicetype, setdevicetype] = useState("");
  const [userdevicereport, setuserdevicereport] = useState("");
  const [deviceipdevicereport, setDeviceIPdevicereport] = useState("");
  const [toggle, setToggle] = useState(false);
  //   const [gridApi, setGridApi] = useState(null);
  //   const [gridColumnApi, setGridColumnApi] = useState(null);
  //   const [loading, setLoading] = useState("");
  const [clicked, setclicked] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [deviceActionData, setdeviceActionData] = useState([]);
  const [devicereportarray, setDevicereportarray] = useState([]);
  const [devicereport, setDeviceReport] = useState([]);
  const [timeZone, setTimeZone] = useState();

  //   let selectedTimezone =0;

  useEffect(() => {
    getDeviceReport();
  }, []);

  useEffect(() => {
    setTimeZone(props.currentTimeZone);
  }, [props.currentTimeZone])

  const getDeviceReport = async () => {
    try {
      let dataPass = {
        Timezone: props.currentTimeZone,
      };
      const data = await HttpService.CreateUpdate("getdevicereport",
        dataPass
      ).then(
        (res) => res.data
      );
      if (data.Obj !== undefined || data.Obj !== null) {
        Object.entries(data.Obj).map((row) => {
          row[1].map(entry => {
            entry.TimeCreated = entry.TimeCreated.substring(0, 10) + " " + entry.TimeCreated.substring(11, 19);
          })
          return '';
        })
      }

      if (data) {
        setDevicereportarray(data.Array.sort((a, b) => {
          let aName = a.DeviceName, bName = b.DeviceName;
          if (aName < bName) return -1;
          if (aName > bName) return 1;
          return 0;
        }));
        setDeviceReport(data.Obj);
      }
    } catch (e) {
      return;
    }
  };

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

  const actioncolumns = [
    {
      headerName: "Device Type",
      field: "DeviceType",
      tooltipField: "DeviceType",
    },
    {
      headerName: "Device IP",
      field: "DeviceIP",
      tooltipField: "DeviceIP",
    },
    {
      headerName: "Region",
      field: "Region",
      tooltipField: "Region",
    },
    {
      headerName: "Time Occured",
      field: "TimeCreated",
      tooltipField: "TimeCreated",
      minWidth: 200,
    },
    {
      headerName: "Action Performed",
      field: "ActionType",
      tooltipField: "ActionType",
    },
    {
      headerName: "User",
      field: "Username",
      tooltipField: "Username",
    },
  ];

  const columns = [
    {
      headerName: "Device Name",
      field: "DeviceName",
      tooltipField: "DeviceName",
    },
    {
      headerName: "View",
      field: "View",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = "View";
        link.addEventListener("click", () => {
          setToggle(!toggle);
          let paranthesis = params.data.DeviceName.toString().indexOf('(');
          let paranthesis1 = params.data.DeviceName.toString().indexOf(')');
          let name = params.data.DeviceName.toString().slice(paranthesis + 1, paranthesis1);
          setdeviceActionData(name);
        });
        return link;
      },
    },
  ];



  function onGridReady(params) {
    // setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  }

  const download = function (data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.setAttribute('hidden', '')
    a.setAttribute('href', url);
    a.setAttribute('download', 'devicereport.csv');
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
      "getdevicecsv",
      dataPass
    ).then((res) => res.data);

    const data = returnData.map(row => ({
      DeviceName: row.DeviceName,
      DeviceType: row.DeviceType,
      DeviceIP: row.DeviceIP,
      Region: row.Region,
      ActionType: row.ActionType,
      TimeCreated: row.TimeCreated,
      Username: row.Username,
    }));

    const csvData = objectToCsv(data)
    download(csvData)
  };


  let handlePurge = async () => {
    if (createdtimefrompurge === "") {
      ErrorMessage("'From' and 'To' fields are required");
      return;
    } else if (createdtimetopurge === "") {
      ErrorMessage("'From' and 'To' fields are required");
      return;
    } else if (createdtimetopurge < createdtimefrompurge) {
      ErrorMessage("'From' Date cannot be greater than 'To' Date");
      return;
    } else {
      let datapass = {
        Timezone: timeZone
      }
      let returnData = await HttpService.CreateUpdate(
        "getdevicecsv",
        datapass
      ).then((res) => res.data);
      const data = returnData.map(row => ({
        DeviceName: row.DeviceName,
        DeviceType: row.DeviceType,
        DeviceIP: row.DeviceIP,
        Region: row.Region,
        ActionType: row.ActionType,
        TimeCreated: row.TimeCreated,
        Username: row.Username,
        Timezone: timeZone,
      }));
      let flag = "";
      data.map(async (elem) => {
        if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
          flag = "returned"
          // let returned = await HttpService.CreateUpdate(
          //   "purgeData", elem
          // ).then((res) => res.data);
        }

      })
      if (flag === "") {
        ErrorMessage("No Reports Found in this Interval");
        return;
      } else {
        var answer = window.confirm(`Are you sure you want to purge date from ${createdtimefrompurge} to ${createdtimetopurge}?`);
        if (answer) {
          //some code
          data.map(async (elem) => {
            if ((elem.TimeCreated).substring(0, 10) >= createdtimefrompurge && (elem.TimeCreated).substring(0, 10) <= createdtimetopurge) {
              // flag = "returned"
              await HttpService.CreateUpdate(
                "purgeData", elem
              ).then((res) => res.data);
            }

          })

          let refreshdata = {
            TimeCreatedFrom: createdtimefrompurge,
            TimeCreatedTo: createdtimetopurge,
            DeviceType: devicetype,
            ActionType: actionperformed,
            Username: userdevicereport,
            DeviceIP: deviceipdevicereport,
            Timezone: timeZone,

          };
          let returnData = await HttpService.CreateUpdate(
            "getdevicereportsearchdetails",
            refreshdata
          ).then((res) => res.data);

          if (returnData) {
            setDeviceReport(returnData.Obj);
            setDevicereportarray(returnData.Array);
          }
          setcreatedtimefrompurge("");
          setcreatedtimetopurge("");
          SuccessMessage("Reports Purged Successfully");
          getDeviceReport();
          return;
        }
      }
    }
  };




  let handleExportpdf = async () => {

    let dataPass = {
      Timezone: timeZone,
    }

    let returnData = await HttpService.CreateUpdate(
      "getdevicecsv",
      dataPass
    ).then((res) => res.data);

    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 50;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(16);

    const title = "Device Report";
    const headers = [["Device Name", "Type", "DeviceIP", "Region", "Action", "Time Created", "Username"]];


    const data = returnData.map(row => ({
      DeviceName: row.DeviceName,
      DeviceType: row.DeviceType,
      DeviceIP: row.DeviceIP,
      Region: row.Region,
      ActionType: row.ActionType,
      TimeCreated: row.TimeCreated,
      Username: row.Username
    }));


    const updatedData = data.map(elt => [elt.DeviceName, elt.DeviceType, elt.DeviceIP, elt.Region, elt.ActionType, elt.TimeCreated, elt.Username])
    // const data = this.state.people.map(elt=> [elt.name, elt.profession]);

    let content = {
      startY: 30,
      head: headers,
      body: updatedData
    };

    doc.text(title, marginLeft, 20);
    doc.autoTable(content);
    doc.save("deviceReport.pdf")

  }




  const handlePurgeClose = (e) => {
    e.preventDefault();
    setcreatedtimefrompurge("");
    setcreatedtimetopurge("");

  }

  let handleClear = async (e) => {
    e.preventDefault();
    setcreatedtimefrom("");
    setcreatedtimeto("");
    setuserdevicereport("");
    setDeviceIPdevicereport("");
    setdevicetype("");
    setactionperformed("");

    let data = {
      TimeCreatedFrom: "",
      TimeCreatedTo: "",
      DeviceType: "",
      ActionType: "",
      Username: "",
      DeviceIP: "",
      Timezone: timeZone
    };
    let returnData = await HttpService.CreateUpdate(
      "getdevicereportsearchdetails",
      data
    ).then((res) => res.data);
    if (returnData) {
      setDeviceReport(returnData.Obj);
      setDevicereportarray(returnData.Array);
    }
  };
  let handleClick = async (e) => {
    e.preventDefault();
    if (deviceipdevicereport !== "") {
      if (deviceipdevicereport.length < 7) {
        ErrorMessage("Enter a valid IP");
        return;
      }
    }

    let data = {
      TimeCreatedFrom: createdtimefrom,
      TimeCreatedTo: createdtimeto,
      DeviceType: devicetype,
      ActionType: actionperformed,
      Username: userdevicereport,
      DeviceIP: deviceipdevicereport,
      Timezone: timeZone,
    };
    let returnData = await HttpService.CreateUpdate(
      "getdevicereportsearchdetails",
      data
    ).then((res) => res.data);
    if (returnData.Obj !== undefined || returnData.Obj !== null) {
      Object.entries(returnData.Obj).map((row) => {
        row[1].map(entry => {
          entry.TimeCreated = entry.TimeCreated.substring(0, 10) + " " + entry.TimeCreated.substring(11, 19); return '';
        })
        return '';
      })
    }
    if (returnData) {
      setDeviceReport(returnData.Obj);
      setDevicereportarray(returnData.Array);
    }
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
                  cursor: "pointer",
                }}
              >
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Device Type
                    </label>
                    <select
                      className="form-control"
                      name="device_type"
                      id="device_type"
                      value={devicetype}
                      onChange={(e) => setdevicetype(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="LEGACY">LEGACY</option>
                      <option value="ELLVIS9000V3|VL45|RM11">
                        NON LEGACY
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      User
                    </label>
                    <input
                      type="text"
                      value={userdevicereport}
                      className="form-control"
                      placeholder="Search through Username"
                      onChange={(e) => setuserdevicereport(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Date
                    </label>
                    <div
                      className="form-group">
                      <div className="row">
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
                            onChange={(e) =>
                              setcreatedtimefrom(e.target.value)
                            }
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
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-check-label form-label-custom form-label-bold">
                      Device IP
                    </label>
                    <input
                      type="text"
                      value={deviceipdevicereport}
                      className="form-control"
                      placeholder=""
                      onChange={(e) => {
                        let string = e.target.value.split(":")[0];
                        if (string.match(/[^0-9.]/)) {
                          return;
                        }
                        let count = 0;
                        for (let i = 0; i < string.length; i++) {
                          if (string.charAt(i) === ".") {
                            count++;
                          }
                        }
                        if (count > 3) {
                          return;
                        }
                        let x = string.split(".");
                        for (let i = 0; i < x.length; i++) {
                          if (x[i].length > 3) {
                            return;
                          }
                          if (Number.parseInt(x[i]) > 255) {
                            return;
                          }
                        }
                        setDeviceIPdevicereport(e.target.value);


                      }}
                    ></input>
                  </div>
                </div>
                <div className="col-md-6"></div>
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
                                Date
                              </label>
                              <div
                                className="form-group">
                                <div className="row">
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
                                      onChange={(e) =>
                                        setcreatedtimefrompurge(e.target.value)
                                      }
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
                    onClick={(e) => handleExportpdf(e)}
                  >
                    Save as pdf
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
        {/* {loading ? <Loader /> : null} */}
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Device Report</div>
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
                  rowData={devicereportarray}
                ></AgGridReact>
              </div>
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
          View
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
                    rowData={devicereport[deviceActionData]}
                    masterDetail={true}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Devicereport;
