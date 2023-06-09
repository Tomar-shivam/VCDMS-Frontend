import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../../common/loader";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import TimePicker from "react-time-picker";
import httpService from "../../services/http.service";
import classnames from "classnames";
import { toast } from "react-toastify";
import SuccessMessage from "../../common/successMsg";

const Backup = (props) => {
  const activeTab = "backup";
  const [oldBackups, setoldBackups] = useState([]);
  const [localBackups, setLocalBackups] = useState([]);
  const [formdata, setFormData] = useState({})
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  //   const [dailyCron, setCron] = useState("");
  //   const [weeklycron, setWeekCron] = useState("");
  const [dailyTime, setdailyTime] = useState("10:00");
  const [day, setday] = useState("Sunday");
  const [mode, setmode] = useState("daily");
  const [nowChecked, setNowChecked] = useState("");
  const [tab, setTab] = useState("local");
  const [dailychecked, setDailyChecked] = useState("");
  const [weeklyChecked, setWeeklyChecked] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [modallocal, setModalLocal] = useState(null);
  const [modalremote, setModalRemote] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //   const [err,setErr] = useState(false);
  const [timeZone, setTimeZone] = useState();

  let selectedTimezone = 0;

  useEffect(() => {
    setTimeZone(props.currentTimeZone);
  }, [props.currentTimeZone])

  useEffect(() => {
    async function fetchOldBackups() {
      let returnDatanew = await httpService.getByBoj(
        "gettimezone"
      );
      selectedTimezone = returnDatanew.data.offset;

      const getOldBackups = async () => {
        let data = {};
        let res = await httpService
          .getByBoj("listallbackups", data)
          .then((res) => res.data)
          .catch((err) => { return });
        if (!res) return;
        let resdata = res.map((row, index) => {
          let datetime = row.name.split("_")[2];
          let month = datetime.substring(0, 2);
          let day = datetime.substring(2, 4);
          let year = datetime.substring(4, 8);
          let hour = datetime.substring(8, 10);
          let minutes = datetime.substring(10, 12);
          let seconds = datetime.substring(12, 14);
          let localeoffset = new Date().getTimezoneOffset() / 60;
          let date = new Date(new Date(year, month, day, hour, minutes, seconds, 0).getTime() + (selectedTimezone + localeoffset) * 3600000);
          let p = "DB_BACKUP_" + date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getFullYear() + date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
          return { [p]: row.name };
        });
        setoldBackups(resdata);
      };

      const getLocalBackups = async () => {
        let data = {};
        let res = await httpService
          .getByBoj("listlocalbackups", data)
          .then((res) => res.data)
          .catch((err) => { return });
        if (!res) return;
        let resdata = res.map((row, index) => {
          let datetime = row.split("_")[2];
          let month = datetime.substring(0, 2);
          let day = datetime.substring(2, 4);
          let year = datetime.substring(4, 8);
          let hour = datetime.substring(8, 10);
          let minutes = datetime.substring(10, 12);
          let seconds = datetime.substring(12, 14);
          let localeoffset = new Date().getTimezoneOffset() / 60;
          let date = new Date(new Date(year, month, day, hour, minutes, seconds, 0).getTime() + (selectedTimezone + localeoffset) * 3600000);
          let p = "DB_BACKUP_" + date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getFullYear() + date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
          return { [p]: row };
        })
        setLocalBackups(resdata);
      };
      getOldBackups();
      getLocalBackups();
    }
    fetchOldBackups();
  }, [uploaded]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setTab(tab);
  };
  const toggleUploadModal = () => {
    setUploadModal(!uploadModal);
  }
  const getListings = async () => {
    setRefresh(true);

    const getOldBackups = async () => {
      let data = {};
      let res = await httpService.getByBoj('listallbackups', data).then(res => res.data).catch(err => { return })
      if (!res) return;
      let resdata = res.map((row, index) => {
        let datetime = row.name.split("_")[2];
        let month = datetime.substring(0, 2);
        let day = datetime.substring(2, 4);
        let year = datetime.substring(4, 8);
        let hour = datetime.substring(8, 10);
        let minutes = datetime.substring(10, 12);
        let seconds = datetime.substring(12, 14);
        let localeoffset = new Date().getTimezoneOffset() / 60;
        let date = new Date(new Date(year, month, day, hour, minutes, seconds, 0).getTime() + (timeZone + localeoffset) * 3600000);
        let p = "DB_BACKUP_" + date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getFullYear() + date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        return { [p]: row.name };
      })
      setoldBackups(resdata);
    }
    const getLocalBackups = async () => {
      let data = {};
      let res = await httpService
        .getByBoj("listlocalbackups", data)
        .then((res) => res.data)
        .catch((err) => { return });
      if (!res) return;
      let resdata = res.map((row, index) => {
        let datetime = row.split("_")[2];
        let month = datetime.substring(0, 2);
        let day = datetime.substring(2, 4);
        let year = datetime.substring(4, 8);
        let hour = datetime.substring(8, 10);
        let minutes = datetime.substring(10, 12);
        let seconds = datetime.substring(12, 14);
        let localeoffset = new Date().getTimezoneOffset() / 60;
        let date = new Date(new Date(year, month, day, hour, minutes, seconds, 0).getTime() + (timeZone + localeoffset) * 3600000);
        let p = "DB_BACKUP_" + date.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getFullYear() + date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + date.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        return { [p]: row };
      })
      setLocalBackups(resdata);
    };
    await getOldBackups();
    await getLocalBackups();
    setRefresh(false);
  }

  const restoreHandler = async (folderName) => {
    setLoading(true);
    let data = {
      user: localStorage.getItem("Username"),
      foldername: folderName,
    };
    let res = await httpService
      .getByBoj("restore", data)
      .then((res) => res.data)
      .catch((err) => { setLoading(false) });
    if (res) {
      setLoading(false);
      if (res.ack === "1") {
        toast.success("Databse Restored successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => { props.getAllData() }, 4000);
      }
      else {
        toast.success("Databse could not be restored", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  };
  const restoreRemote = async (folderName) => {
    setLoading(true);
    let data = {
      user: localStorage.getItem("Username"),
      foldername: folderName,
    };
    let res = await httpService
      .getByBoj("restoreremote", data)
      .then((res) => res.data)
      .catch((err) => { setLoading(false) });
    if (res) {
      setLoading(false);
      if (res.ack === "Success") {
        toast.success("Databse Restored successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if (res.ack === 'Fail') {
        toast.success("Databse could not be restored", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  };
  const uploadbackup = async (e) => {
    e.preventDefault();
    toggleUploadModal();
    let data = {
      file: formdata,
      user: localStorage.getItem('Username'),
    }
    setLoading(true);
    let res = await httpService.uploadBackup('uploadbackup', data).then(res => res.data).catch(err => { setLoading(false); });
    if (res) {
      setLoading(false);
      if (res.ack === '1') {
        toast.success(res.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if (res.ack === '0') {
        ErrorMessage(res.msg)
      }
    }
    setUploaded(!uploaded);
    return;
  }
  const downloadHandler = async (folderName, downloadName) => {
    let res = await httpService.getBackup("downloadbackup/" + folderName)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${downloadName}.zip`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => { setLoading(false); });
    if (res) {
      if (res.ack) {
        SuccessMessage(res.msg)
      }
      if (res.err) {
        ErrorMessage(res.err)
      }
    }
  };
  const saveBackupNow = async () => {
    if (!nowChecked) {
      ErrorMessage('Please select storage location')
      return;
    }
    setLoading(true);
    let data = { storage: nowChecked, user: localStorage.getItem("Username"), };
    let res = await httpService
      .getByBoj("savebackupnow", data)
      .then((res) => res.data)
      .catch((err) => {
        setNowChecked(''); setLoading(false);
        ErrorMessage("Network Error")
      });
    if (res) {
      setNowChecked('');
      setLoading(false);
      if (res.ack === '1') {
        toast.success(res.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if (res.ack === '0') {
        ErrorMessage(res.msg)
      }
      if (res.ack === '2') {
        ErrorMessage(res.msg)
      }
    }
  };

  const rescheduleHandler = async () => {
    if (mode === "daily") {
      if (!dailyTime) {
        ErrorMessage("Please set the correct time for backup")
        return
      };

      let localeoffsetnew = new Date().getTimezoneOffset() / 60;
      let localeoffset = Math.trunc(localeoffsetnew);
      let minuteLocal = Math.floor((localeoffsetnew - localeoffset) * 60);
      let hours = dailyTime.substring(0, 2);
      hours = parseInt(hours);
      if (hours - timeZone - localeoffset >= 0 && hours - timeZone - localeoffset < 24) {
        hours = hours - timeZone - localeoffset;
      } else if (hours - timeZone - localeoffset < 0) {
        hours = 24 + (hours - timeZone - localeoffset);
      } else if (hours - timeZone - localeoffset > 23) {
        hours = hours - timeZone - localeoffset - 24;
      }
      let mins = parseInt(dailyTime.substring(3, 5));
      if (mins - minuteLocal < 60 && mins - minuteLocal >= 0) {
        mins = mins - minuteLocal;
      } else if (mins - minuteLocal > 60) {
        mins = mins - minuteLocal - 60;
        if (hours + 1 > 23) {
          hours = hours + 1 - 24;
        } else {
          hours++;
        }
      } else if (mins - minuteLocal < 0) {
        mins = 60 + (mins - minuteLocal);
        if (hours - 1 < 0) {
          hours = 23;
        } else {
          hours--;
        }
      }
      var expression = "" + mins + " " + hours + " " + "* * *";
      //   setCron(expression);
      const setDailyCron = async () => {
        if (!(expression && dailychecked)) {
          ErrorMessage("Please Fill all the deatils")
          return;
        }
        setLoading(true);
        let data = {
          expression: expression,
          storage: dailychecked,
          user: localStorage.getItem("Username"),
        };
        let res = await httpService
          .CreateUpdate("savedailycron", data)
          .then((res) => res.data)
          .catch((err) => { setLoading(false); });
        if (res) {
          setLoading(false);
          cancelHandler();
          toast.success("Daily db backup rescheduled", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      };
      setDailyCron();
    } else if (mode === "weekly") {
      if (!dailyTime) {
        ErrorMessage("Please set the correct time for backup")
        return
      };

      let days = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };
      let weekDay = days[day];

      let localeoffsetnew = new Date().getTimezoneOffset() / 60;
      let localeoffset = Math.trunc(localeoffsetnew);
      let minuteLocal = Math.floor((localeoffsetnew - localeoffset) * 60);
      let hours = dailyTime.substring(0, 2);
      hours = parseInt(hours);
      if (hours - timeZone - localeoffset >= 0 && hours - timeZone - localeoffset < 24) {
        hours = hours - localeoffset - timeZone;
      } else if (hours - timeZone - localeoffset < 0) {
        hours = 24 + (hours - timeZone - localeoffset);
        if (weekDay === 0) {
          weekDay = 6;
        } else {
          weekDay--;
        }
      } else if (hours - timeZone - localeoffset > 23) {
        if (weekDay === 6) {
          weekDay = 0;
        } else {
          weekDay++;
        }
        hours = hours - timeZone - localeoffset - 24;
      }
      let mins = parseInt(dailyTime.substring(3, 5));
      if (mins - minuteLocal < 60 && mins - minuteLocal >= 0) {
        mins = mins - minuteLocal;
      } else if (mins - minuteLocal > 60) {
        mins = mins - minuteLocal - 60;
        if (hours + 1 > 23) {
          hours = 0;
          if (weekDay === 6) {
            weekDay = 0;
          } else {
            weekDay++;
          }
        } else {
          hours++;
        }
      } else if (mins - minuteLocal < 0) {
        mins = 60 + (mins - minuteLocal);
        if (hours - 1 < 0) {
          hours = 23;
          if (weekDay === 0) {
            weekDay = 6;
          } else {
            weekDay--;
          }
        } else {
          hours--;
        }
      }

      expression = "" + mins + " " + hours + " " + "* * " + weekDay;
      const setWeeklyCron = async () => {
        if (!(expression && weeklyChecked)) {
          ErrorMessage("Please Fill all the deatils")
          return;
        }
        setLoading(true);
        let data = {
          expression: expression,
          storage: weeklyChecked,
          user: localStorage.getItem("Username"),
        };
        let res = await httpService
          .CreateUpdate("saveweeklycron", data)
          .then((res) => res.data)
          .catch((err) => { setLoading(false); });
        if (res) {
          setLoading(false);
          toast.success("Weekly db backup rescheduled", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      };
      setWeeklyCron();
    }
  };
  const cancelHandler = async () => {
    setday("Sunday");
    setdailyTime("10:00");
    setmode("daily");
    setDailyChecked('');
    setWeeklyChecked('');
  };
  return (
    <>
      <form>
        <NavSlider activeTab={activeTab} />
      </form>
      {isloading ? <Loader /> : null}
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5 d-flex justify-content-between">
            <div>Previous Backups <span><button onClick={(e) => { getListings() }} className='btn'><i className={'fa fa-refresh ' + (refresh ? 'fa-spin' : "")} ></i></button></span></div>
            <div className='row' style={{ alignItems: "flex-end" }}>
              <button className='btn btn-md btn-primary  mr-2' style={{ height: '28px' }} onClick={toggleUploadModal}>Upload Backup</button>
              <Modal isOpen={uploadModal} toggle={toggleUploadModal}>
                <ModalHeader toggle={toggleUploadModal}>
                  Upload Backup
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={(e) => { uploadbackup(e); }}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">

                          <label className="form-check-label">File :</label>
                          <input
                            className="form-control pad-top-3"
                            type="file"
                            required={true}
                            id="formFile"
                            accept=".zip,.rar,.7zip"
                            onChange={(event) => { if (!event.target.files[0].name.startsWith('DB_BACKUP_')) { return } setFormData(event.target.files[0]) }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        className="btn btn-danger marb-15"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleUploadModal();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success marl-15 marb-15"
                        type='submit'
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
              <Dropdown
                className="backup-dropdown"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle className="btn btn-primary mt-1">
                  Schedule DB Backup
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    center
                    data-toggle="modal"
                    data-target="#nowModal"
                    onClick={() => {
                      setmode("now");
                    }}
                  >
                    Now
                  </DropdownItem>
                  <DropdownItem
                    center
                    data-toggle="modal"
                    data-target="#dailyModal"
                    onClick={() => {
                      setmode("daily");
                    }}
                  >
                    Daily Backup
                  </DropdownItem>
                  <DropdownItem
                    center
                    data-toggle="modal"
                    data-target="#weeklyModal"
                    onClick={() => {
                      setmode("weekly");
                    }}
                  >
                    Weekly Backup
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="card-body">

            <div className="font-size-16 mb-3">
              {
                !props.backupLocation.IP ? (<h5 style={{ color: 'red' }}>You have not configured any remote storage for database backup </h5>) : (<h5>Current Backup Location: IP: {props.backupLocation.IP} Location on remote: {props.backupLocation.location}</h5>)
              }
            </div>

            <Nav tabs className="backup-tabs mb-3">
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === "local" })}
                  onClick={() => {
                    toggleTab("local");
                  }}
                >
                  Local Backups
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: tab === "remote" })}
                  onClick={() => {
                    toggleTab("remote");
                  }}
                >
                  Remote Backups
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={tab}>
              <TabPane tabId="local">
                <table className="table table-bordered backup-table">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col" colSpan="2">
                        Backups
                      </th>
                      <th scope="col">
                        <span style={{ float: "right", paddingRight: "4rem" }}>
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {localBackups
                      ? localBackups.slice(0).reverse().map((p, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td colSpan="2">{Object.keys(p)[0]}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              style={{ float: "right", marginLeft: "10px" }}
                              onClick={() => setModalLocal(Object.values(p)[0])}
                            >
                              Restore
                            </button>
                            <Modal id={Object.values(p)[0]} isOpen={modallocal === Object.values(p)[0]} className="file-del-popup">
                              <ModalHeader>Database Restore</ModalHeader>
                              <ModalBody className="font-size-16">
                                Are you sure you want to Restore the database, this action is irreversible.
                              </ModalBody>
                              <ModalFooter>
                                <button
                                  className="btn btn-success"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    restoreHandler(Object.values(p)[0]);
                                    setModalLocal(!modallocal);
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setModalLocal(!modallocal);
                                  }}
                                >
                                  No
                                </button>
                              </ModalFooter>
                            </Modal>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              style={{ float: "right" }}
                              onClick={() => downloadHandler(Object.values(p)[0], Object.keys(p)[0])}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </table>
              </TabPane>
              <TabPane tabId="remote">
                <table className="table table-bordered backup-table">
                  <thead>
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col" colSpan="2">
                        Backups
                      </th>

                      <th scope="col">
                        <span className='pr-3' style={{ float: "right" }}>
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldBackups
                      ? oldBackups.map((p, index) => (
                        <tr key={index}>
                          <td >{index + 1}</td>
                          <td colSpan="2">{Object.keys(p)[0]}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              style={{ float: "right" }}

                              onClick={() => setModalRemote(Object.values(p)[0])}
                            >
                              Restore
                            </button>
                            <Modal id={Object.values(p)[0]} isOpen={modalremote === Object.values(p)[0]} className="file-del-popup">
                              <ModalHeader>Database Restore</ModalHeader>
                              <ModalBody className="font-size-16">
                                Are you sure you want to Restore the database, this action is irreversible.
                              </ModalBody>
                              <ModalFooter>
                                <button
                                  className="btn btn-success"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModalRemote(!modalremote);
                                    restoreRemote(Object.values(p)[0]);
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setModalRemote(!modallocal);
                                  }}
                                >
                                  No
                                </button>
                              </ModalFooter>
                            </Modal>

                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </table>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="nowModal"
        tabIndex="-1"
        aria-labelledby="nowModal"
        aria-hidden="true"
      >
        <div
          className="modal-dialog-centered modal-dialog"
          style={{ width: "35%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="nowModal">
                Save database backup now
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="mb-3">
                Where do you want to store your Databse Backup
              </h5>
              <div>
                <label className="form-check-label">
                  <input
                    value="local"
                    className="enc-checkbox mr-2"
                    checked={nowChecked === "local"}
                    onChange={(e) => setNowChecked(e.target.value)}
                    type="radio"
                    required
                  />
                  Local Location
                </label>
              </div>
              <div>
                <label className="form-check-label">
                  <input
                    value="remote"
                    className="enc-checkbox mr-2"
                    disabled={!Object.keys(props.backupLocation).length}
                    checked={nowChecked === "remote"}
                    onChange={(e) => setNowChecked(e.target.value)}
                    type="radio"
                    required
                  />
                  {!Object.keys(props.backupLocation).length ? (<span style={{ opacity: '0.8', color: 'tomato' }} className="red">Remote Server (Add a remote server to select this option.)</span>) : (`Remote Server :${props.backupLocation.IP}`)}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setNowChecked("");
                }}
              >
                No
              </button>
              <button
                type="button"
                onClick={saveBackupNow}
                className="btn btn-success"
                disabled={isloading}
                data-dismiss='modal'
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="dailyModal"
        tabIndex="-1"
        aria-labelledby="dailyModal"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ width: "35%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dailyModal">
                Schedule Your backup time!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="timepicker backup_timepicker">
                <TimePicker
                  format="hh:mm a"
                  onChange={setdailyTime}
                  value={dailyTime}
                  closeClock={false}
                  openClockOnFocus={false}
                  maxDetail={"second"}
                />
              </div>
              <div>
                <h5 className="mb-2">
                  Where do you want to store your Databse Backup
                </h5>
                <div>
                  <label className="form-check-label">
                    <input
                      className="enc-checkbox mr-2"
                      value="local"
                      checked={dailychecked === "local"}
                      onChange={(e) => setDailyChecked(e.target.value)}
                      type="radio"
                    />
                    Local Location
                  </label>
                </div>
                <div>
                  <label className="form-check-label">
                    <input
                      className="enc-checkbox mr-2"
                      value="remote"
                      disabled={!Object.keys(props.backupLocation).length}
                      checked={dailychecked === "remote"}
                      onChange={(e) => setDailyChecked(e.target.value)}
                      type="radio"
                    />
                    {!Object.keys(props.backupLocation).length ? (<span style={{ opacity: '0.8', color: 'tomato' }}>Remote Server (Add a remote server to select this option.)</span>) : (`Remote Server :${props.backupLocation.IP}`)}
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => cancelHandler()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                disabled={isloading}
                onClick={() => rescheduleHandler()}
                data-dismiss='modal'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="weeklyModal"
        tabIndex="-1"
        aria-labelledby="weeklyModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ width: "35%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="weeklyModalLabel">
                Schedule Your backup Day and Time!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-7">
                  <select
                    className="form-control"
                    name="WeekDays"
                    id="week-day"
                    onChange={(e) => {
                      setday(e.target.value);
                    }}
                    value={day}
                  >
                    Select Day
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
                <div className="col-lg-5">
                  <div className="timepicker backup_timepicker">
                    <TimePicker
                      format="hh:mm a"
                      onChange={setdailyTime}
                      value={dailyTime}
                      closeClock={false}
                      openClockOnFocus={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h5 className="mb-2">
                  Where do you want to store your Databse Backup
                </h5>
                <div>
                  <label className="form-check-label">
                    <input
                      className="enc-checkbox mr-2"
                      value="local"
                      checked={weeklyChecked === "local"}
                      onChange={(e) => setWeeklyChecked(e.target.value)}
                      type="radio"
                    />
                    Local Location
                  </label>
                </div>
                <div>
                  <label className="form-check-label">
                    <input
                      className="enc-checkbox mr-2"
                      value="remote"
                      disabled={!Object.keys(props.backupLocation).length}
                      checked={weeklyChecked === "remote"}
                      onChange={(e) => setWeeklyChecked(e.target.value)}
                      type="radio"
                    />
                    {!Object.keys(props.backupLocation).length ? (<span style={{ opacity: '0.8', color: 'tomato' }} >Remote Server (Add a remote server to select this option.)</span>) : (`Remote Server :${props.backupLocation.IP}`)}
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={(e) => {
                  cancelHandler();
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                disabled={isloading}
                data-dismiss='modal'
                onClick={() => rescheduleHandler()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Backup;