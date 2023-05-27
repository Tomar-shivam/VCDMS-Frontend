import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import VCDMSservice from "../../services/http.service";
import Header from "./header/header";
import SideBar from "./sidebar/sidebar";
import Content from "./content/content";
import Dashboard from "../dashboard/dashboard";
import Ellvis from "../elivis/ellvis";
import Encoder from "../encoder/encoder";
import BatchUpdate from "../batchupdate/batchupdate";
import Configurations from "../configurations/configurations";
import Users from "../users/users";
import Settings from "../settings/settings";
import SetTime from "../settings/timezone";
import SNMPManager from "../settings/snmpManageAlarms";
import HotBackup from "../settings/hotBackup";
import HttpHttps from "../settings/httphttps";
import Report from "../report/report";
import Userreport from "../report/userreport";
import Version from "../versions/version";
import Profile from "../profile/profile";
import Crontime from "../settings/crontime";
import LegacyDevice from "../../legacydevice/legacydevice";
import { ToastContainer } from "react-toastify";
import Majoralarm from "../settings/majoralarm";
import FirmwareFiles from "../settings/firmwarefiles";
import Devicereport from "../report/devicereport";
import "react-toastify/dist/ReactToastify.css";
import Backup from "../settings/backup";
import ChangePassword from "../profile/changePassword"
import DeviceAuthentication from "../authentication/device/deviceauthentication";
import BackupLocation from "../settings/backuplocation";
import httpService from "../../services/http.service"
import DeviceTypes from "../settings/deviceTypes";
import UploadPresetJsonFiles from "../settings/uploadPresetJsonfiles";
import { set } from "shelljs";
import { CHECK_KEYLOK } from '../../config';
import ErrorMessage from "../../common/errorMsg";
import LicenseInfo from "../settings/licenseInfo";
let interval = setInterval(() => { }, 3000);
let sessionInterval = setInterval(() => { }, 3000);
let warningInterval = setInterval(() => { }, 3000);
let Layout = (props) => {
  const [ChangePassRedirect, setChangePassRedirect] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const [customerData, setcustomerData] = useState({});
  const [alarmreport, setAlarmReport] = useState([]);
  const [userreport, setUserReport] = useState([]);
  const [peerIP, setPeerIP] = useState("");
  const [ellvisList, setEllvisList] = useState([]);
  const [startState, setStartState] = useState(false);
  const [IP, setIP] = useState("");
  const [CardData, setCardData] = useState([]);
  const [formState, setFormState] = useState("form");
  const [clickedEllvis, setClickedEllvis] = useState({});
  const [indexSelected, setIndexSelected] = useState(0);
  const [content, setContent] = useState("dashboard");
  const [regionList, setRegionList] = useState([]);
  const [systemList, setSystemList] = useState([]);
  const [renderContent, setRenderContent] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [callCheckSession, setCallCheckSession] = useState(true);
  const [deviceFormState, setDeviceFormState] = useState("list");
  const [sidebarClassesRegion, setSidebarClassesRegion] = useState([]);
  const [sidebarClassesSystem, setSidebarClassesSystem] = useState([]);
  const [sidebarClassesDevices, setSidebarClassesDevices] = useState([]);
  const [selectedStreams, setSelectedStreams] = useState([]);
  const [streamIndexSum, setStreamIndexSum] = useState([]);
  const [peerIPs, setPeerIPs] = useState([]);
  const [regionButtons, setRegionButtons] = useState([]);
  const [systemButtons, setSystemButtons] = useState([]);
  const [deviceButtons, setDeviceButtons] = useState([]);
  const [deviceList, setDevicesList] = useState([]);
  const [callInterval, setCallInterval] = useState("3");
  const [clickedStream, setClickedStream] = useState({});
  const [update, setUpdate] = useState(false);
  const [resetDashboard, setResetDashboard] = useState(false);
  const [updateEncoderDashboardCheckbox, setUpdateEncoderDashboardCheckbox] = useState(true);
  const [RegionCount, setRegionCount] = useState({});
  const [SystemCount, setSystemCount] = useState({});
  const [DeviceCount, setDeviceCount] = useState({});
  const [show404, setShow404] = useState(true);
  const [saveHistoryCheckbox, setSaveHistoryCheckbox] = useState(false);
  const [backupLocation, setBackupLocation] = useState({});
  const [saved, setSaved] = useState(false);
  const [encoders, setEncodersList] = useState([]);

  const [checkEncoderRefresh, setEncoderRefresh] = useState(false);
  const [checkStreamsStatsRefresh, setCheckStreamsStatsRefresh] = useState(false);
  const [checkEllvisStreamRefresh, setCheckEllvisStreamRefresh] = useState(false);
  const [getalldevicesApi, setgetalldevicesApi] = useState(false);
  const [currentTimeZone, setCurrentTimeZone] = useState(-5);

  useEffect(() => {
    setRedirect(false);
    if (localStorage.getItem("customerData")) {
      setcustomerData(localStorage.getItem("customerData"));
    }
    setRenderContent(<></>);
    setClasses();
    clearInterval(sessionInterval);
    setTimeout(() => { checkSession() }, 3000);
    sessionInterval = setInterval(() => {
      checkSession();
    }, 100000);
    return () => {
      clearInterval(sessionInterval);
    };
  }, []);
  useEffect(() => {
    if (window.localStorage.getItem('IsEqual')) {
      if (window.localStorage.getItem('IsEqual') === "true") {
        if (!window.localStorage.getItem("change")) {
          let x = window.confirm("Please Change your default admin password for security reasons");
          if (x) { window.localStorage.setItem("change", "true"); setChangePassRedirect(true) }
          else { window.localStorage.setItem("change", "true"); setChangePassRedirect(false) };
        }
        else {
          setChangePassRedirect(false);
        }
      }
      else {
        setChangePassRedirect(false);
      }
    }
  }, [])

  const setClasses = () => {
    if (localStorage.getItem("deviceClasses"))
      setSidebarClassesDevices(
        localStorage.getItem("deviceClasses").split(",")
      );
    if (localStorage.getItem("regionClasses"))
      setSidebarClassesRegion(localStorage.getItem("regionClasses").split(","));
    if (localStorage.getItem("systemClasses"))
      setSidebarClassesSystem(localStorage.getItem("systemClasses").split(","));
    if (localStorage.getItem("regionButtons"))
      setRegionButtons(localStorage.getItem("regionButtons").split(","));
    if (localStorage.getItem("systemButtons"))
      setSystemButtons(localStorage.getItem("systemButtons").split(","));
    if (localStorage.getItem("deviceButtons"))
      setDeviceButtons(localStorage.getItem("deviceButtons").split(","));
  };

  useEffect(() => {
    if (JSON.stringify(customerData) !== JSON.stringify({})) {
      clearInterval(interval);
      interval = setInterval(() => {
        getDevicesRegionsAndSystems();
      }, 40000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [customerData]);

  useEffect(() => {
    warningInterval = setInterval(() => {
      if (CHECK_KEYLOK) {
        checkDeviceLimitFromLicense()
      }
    }, 30 * 60 * 1000);
    return () => {
      clearInterval(warningInterval);
    };
  });

  useEffect(() => {
    let systemClasses = [...sidebarClassesSystem];
    let regionClasses = [...sidebarClassesRegion];
    let deviceClasses = [...sidebarClassesDevices];
    let regionButtonsTemp = [...regionButtons];
    let systemButtonsTemp = [...systemButtons];
    let deviceButtonsTemp = [...deviceButtons];
    if (localStorage.getItem("deviceClasses"))
      deviceClasses = localStorage.getItem("deviceClasses").split(",");
    if (localStorage.getItem("regionClasses"))
      regionClasses = localStorage.getItem("regionClasses").split(",");
    if (localStorage.getItem("systemClasses"))
      systemClasses = localStorage.getItem("systemClasses").split(",");
    if (localStorage.getItem("regionButtons"))
      regionButtonsTemp = localStorage.getItem("regionButtons").split(",");
    if (localStorage.getItem("systemButtons"))
      systemButtonsTemp = localStorage.getItem("systemButtons").split(",");
    if (localStorage.getItem("deviceButtons"))
      deviceButtonsTemp = localStorage.getItem("deviceButtons").split(",");

    for (let i = 0; i < regionList.length; i++) {
      if (i >= regionClasses.length) {
        regionClasses.push("0");
        regionButtonsTemp.push("fa-plus-circle");
      }
    }

    for (let i = 0; i < systemList.length; i++) {
      if (i >= systemClasses.length) {
        systemClasses.push("0");
        systemButtonsTemp.push("fa-plus-circle");
      }
    }

    for (let i = 0; i < deviceList.length; i++) {
      if (i >= deviceClasses.length) {
        deviceClasses.push("0");
        deviceButtonsTemp.push("fa-plus-circle");
      }
    }

    let streamSelectedTemp = [...selectedStreams];
    let streamIndexSumTemp = [...streamIndexSum];
    let peerIPsTemp = [...peerIPs];
    let count = 0;
    for (let i = 0; i < ellvisList.length; i++) {
      for (let j = 0; j < ellvisList[i].ConnectedDevice.length; j++) {
        if (count >= streamSelectedTemp.length) {
          streamSelectedTemp.push(false);
          peerIPsTemp.push("");
        }
        count++;
      }
      if (i >= streamIndexSumTemp.length) {
        streamIndexSumTemp.push(count);
      }
    }
    setRegionButtons(regionButtonsTemp);
    setSystemButtons(systemButtonsTemp);
    setDeviceButtons(deviceButtonsTemp);
    setStreamIndexSum(streamIndexSumTemp);
    setSelectedStreams(streamSelectedTemp);
    setSidebarClassesDevices(deviceClasses);
    setSidebarClassesRegion(regionClasses);
    setSidebarClassesSystem(systemClasses);
    setPeerIPs(peerIPsTemp);
    localStorage.setItem("deviceClasses", deviceClasses);
    localStorage.setItem("regionClasses", regionClasses);
    localStorage.setItem("systemClasses", systemClasses);
    localStorage.setItem("regionButtons", regionButtonsTemp);
    localStorage.setItem("systemButtons", systemButtonsTemp);
    localStorage.setItem("deviceButtons", deviceButtonsTemp);
  }, [regionList, systemList, ellvisList]);

  const getDevicesRegionsAndSystems = () => {
    getAllDevices();
    fetchEllvisList();
  };

  const checkDeviceLimitFromLicense = () => {
    if (parseInt(props.license) < deviceList.length) {
      alert('Your license limit does not allow for more device. please contact your vender to delete some device.')
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await getRegions();
    await getSystems();
    await getAllDevices();
    await fetchEllvisList();
    await fetchEncodersList();
    await getTimeZone();
  }

  useEffect(() => {
    if (getalldevicesApi) {
      getAllDevices();
      setgetalldevicesApi(false);
    }
  }, [getalldevicesApi]);

  useEffect(() => {
    const getBackupLocation = async () => {
      let data = { user: localStorage.getItem("Username") };
      let res = await httpService
        .getLocation("getbackupLocation", data)
        .then((res) => res.data)
        .catch((err) => null);
      if (res) {
        setBackupLocation(res);
      }
    };
    getBackupLocation();
  }, [saved]);

  const getTimeZone = async () => {
    let returnData = await VCDMSservice.getByBoj("gettimezone");
    if (returnData.data.offset) {
      setCurrentTimeZone(returnData.data.offset)
    }
  }

  const checkSession = async () => {
    let session = sessionStorage.getItem("session");
    if (session === null) {
      setCallCheckSession(true);
      setRedirect(true);
    }
    let data = {
      Session: session,
    };
    let res = await VCDMSservice.getByBoj("checksession", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        setShow404((prev) => {
          return false;
        });
        return customerData;
      });

    if (JSON.stringify(res) === JSON.stringify({})) {
      setShow404(false);
      return;
    }
    if (res === 'not found') {
      localStorage.clear();
      setShow404(true);
      setRedirect(true);
      setRenderContent(false);
    }
    else if (res !== "" && res !== undefined) {
      localStorage.setItem("customerData", res);
      if (res.Username !== undefined) {
        localStorage.setItem("Username", res.Username);
      }
      setcustomerData(res);
      props.setcustomerData(res.Username);
      setCallCheckSession(false);
      setRenderContent(true);
      setShow404(true);
    } else {
      localStorage.clear();
      sessionStorage.clear();
      setShow404(true);
      setRedirect(true);
      setRenderContent(false);
    }
  };

  let handleEncoderClick = () => {
    setContent("encoder");
  };
  let handleEllvisClick = () => {
    setContent("ellvis");
  };
  let handleAddElementClick = () => {
    setFormState("form");
    setContent("addelement");
  };

  let handleDeviceClick = () => {
    setFormState("list");
    setContent("addelement");
  };

  let handleDashboardClick = () => {
    setContent("dashboard");
  };

  const getRegions = async () => {
    let data = {};
    let res = await VCDMSservice.getByBoj("getallregions", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.length >= 0) {
        setRegionList(res);
        setIndexSelected(0);
      }
    }
  };
  const getUsers = async () => {
    try {
      const data = await VCDMSservice.getByBoj("getallusers").then(
        (res) => res.data
      );
      setUsersList(data);
    } catch (e) {
      return
    }
  };

  const getAlarmReport = async () => {
    try {
      let dataPass = {
        Timezone: currentTimeZone,
      }
      const returnData = await VCDMSservice.CreateUpdate("getalarmreport", dataPass).then(
        (res) => res.data
      );
      if (returnData !== undefined || returnData !== null) {
        returnData.map(entry => {
          if (entry.TimeCreated !== "" && entry.TimeCreated !== undefined && entry.TimeCreated != null) {
            entry.TimeCreated = entry.TimeCreated.substring(0, 10) + " " + entry.TimeCreated.substring(11, 19);
          }
          if (entry.TimeCleared !== "" && entry.TimeCleared !== undefined && entry.TimeCleared !== null) {
            entry.TimeCleared = entry.TimeCleared.substring(0, 10) + " " + entry.TimeCleared.substring(11, 19);
          }
        })
      }


      setAlarmReport(returnData.reverse());
    } catch (e) {
      return;
    }
  };

  const getUserReport = async () => {
    try {

      let dataPass = {
        Timezone: currentTimeZone,
      }
      const returnData = await VCDMSservice.CreateUpdate("getuserreport",
        dataPass
      ).then(
        (res) => res.data
      );
      if (returnData !== undefined || returnData !== null) {
        returnData.map(entry => {
          if (entry.LoginTime !== "" && entry.LoginTime !== undefined && entry.LoginTime !== null) {
            entry.LoginTime = entry.LoginTime.substring(0, 10) + " " + entry.LoginTime.substring(11, 19);
          }
          if (entry.LogoutTime !== "" && entry.LogoutTime !== undefined && entry.LogoutTime !== null) {
            entry.LogoutTime = entry.LogoutTime.substring(0, 10) + " " + entry.LogoutTime.substring(11, 19);
          }
          entry.Actions.map(row => {
            if (Object.keys(row).length > 0) {
              row.ActionTime = new Date(new Date(row.ActionTime).getTime() + currentTimeZone * 3600000).toISOString();
              row.ActionTime = row.ActionTime.substring(0, 10) + " " + row.ActionTime.substring(11, 19);
            }
          })
        })
      }
      setUserReport(returnData.reverse());
    } catch (e) {
      return;
    }
  };

  const getAllDevices = async () => {
    let data = {};
    let res = await VCDMSservice.getByBoj("getalldevices", data)
      .then((res) => res.data)
      .catch((err) => {
        if (sessionStorage.getItem("session") && err.response && err.response.status == 401) {
          ErrorMessage("Session expired, please login again")
          sessionStorage.removeItem("session")
          sessionStorage.removeItem("token")
        }
        return
      });
    if (res) {
      setDevicesList(res);
    }
  };

  const getSystems = async () => {
    let data = {};

    let res = await VCDMSservice.getByBoj("getallsystems", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      setSystemList(res);
    }
  };

  const fetchEncodersList = async () => {
    let data = {}
    let list = await VCDMSservice.getByBoj("getallencoders", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (list) {
      setEncodersList(list);
    }
  }
  const fetchEllvisList = async () => {
    let data = {};

    let list = await VCDMSservice.getByBoj("getdevices", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (list) {
      setEllvisList(list);
      let RegionCountTemp = {};
      let SystemCountTemp = {};
      let DeviceCountTemp = {};

      for (let k = 0; k < deviceList.length; k++) {
        if (deviceList[k].DeviceType === "ELLVIS9000V3") {
          let found = false;
          if (list.length === 0) {
            found = true;
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Critical++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Critical++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Critical++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            continue;
          }
          for (let i = 0; i < list.length; i++) {
            if (list[i].deviceip !== deviceList[k].IP) {
              continue;
            }
            found = true;
            if (list[i].ConnectedDevice) {
              if (list[i].ConnectedDevice.length === 0) {
                if (RegionCountTemp[deviceList[k].RegionID]) {
                  RegionCountTemp[deviceList[k].RegionID].Critical++;
                } else {
                  RegionCountTemp[deviceList[k].RegionID] = {
                    Nominal: 0,
                    Critical: 1,
                    Major: 0,
                  };
                }
                if (SystemCountTemp[deviceList[k].SystemID]) {
                  SystemCountTemp[deviceList[k].SystemID].Critical++;
                } else {
                  SystemCountTemp[deviceList[k].SystemID] = {
                    Nominal: 0,
                    Critical: 1,
                    Major: 0,
                  };
                }
                if (DeviceCountTemp[deviceList[k]._id]) {
                  DeviceCountTemp[deviceList[k]._id].Critical++;
                } else {
                  DeviceCountTemp[deviceList[k]._id] = {
                    Nominal: 0,
                    Critical: 1,
                    Major: 0,
                  };
                }
                continue;
              }
              for (let j = 0; j < list[i].ConnectedDevice.length; j++) {
                if (list[i].ConnectedDevice[j].MailStatus === "connected") {
                  if (RegionCountTemp[list[i].ConnectedDevice[j].RegionID]) {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID]
                      .Nominal++;
                  } else {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID] = {
                      Nominal: 1,
                      Critical: 0,
                      Major: 0,
                    };
                  }
                  if (SystemCountTemp[list[i].ConnectedDevice[j].SystemID]) {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID]
                      .Nominal++;
                  } else {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID] = {
                      Nominal: 1,
                      Critical: 0,
                      Major: 0,
                    };
                  }
                  if (DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]) {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]
                      .Nominal++;
                  } else {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID] = {
                      Nominal: 1,
                      Critical: 0,
                      Major: 0,
                    };
                  }
                }
                if (list[i].ConnectedDevice[j].MailStatus === "disconnected") {
                  if (RegionCountTemp[list[i].ConnectedDevice[j].RegionID]) {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID]
                      .Critical++;
                  } else {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID] = {
                      Nominal: 0,
                      Critical: 1,
                      Major: 0,
                    };
                  }
                  if (SystemCountTemp[list[i].ConnectedDevice[j].SystemID]) {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID]
                      .Critical++;
                  } else {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID] = {
                      Nominal: 0,
                      Critical: 1,
                      Major: 0,
                    };
                  }
                  if (DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]) {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]
                      .Critical++;
                  } else {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID] = {
                      Nominal: 0,
                      Critical: 1,
                      Major: 0,
                    };
                  }
                }
                if (list[i].ConnectedDevice[j].MailStatus === "major") {
                  if (RegionCountTemp[list[i].ConnectedDevice[j].RegionID]) {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID]
                      .Major++;
                  } else {
                    RegionCountTemp[list[i].ConnectedDevice[j].RegionID] = {
                      Nominal: 0,
                      Critical: 0,
                      Major: 1,
                    };
                  }
                  if (SystemCountTemp[list[i].ConnectedDevice[j].SystemID]) {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID]
                      .Major++;
                  } else {
                    SystemCountTemp[list[i].ConnectedDevice[j].SystemID] = {
                      Nominal: 0,
                      Critical: 0,
                      Major: 1,
                    };
                  }
                  if (DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]) {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID]
                      .Major++;
                  } else {
                    DeviceCountTemp[list[i].ConnectedDevice[j].DeviceID] = {
                      Nominal: 0,
                      Critical: 0,
                      Major: 1,
                    };
                  }
                }
              }
            } else {
              if (RegionCountTemp[deviceList[k].RegionID]) {
                RegionCountTemp[deviceList[k].RegionID].Critical++;
              } else {
                RegionCountTemp[deviceList[k].RegionID] = {
                  Nominal: 0,
                  Critical: 1,
                  Major: 0,
                };
              }
              if (SystemCountTemp[deviceList[k].SystemID]) {
                SystemCountTemp[deviceList[k].SystemID].Critical++;
              } else {
                SystemCountTemp[deviceList[k].SystemID] = {
                  Nominal: 0,
                  Critical: 1,
                  Major: 0,
                };
              }
              if (DeviceCountTemp[deviceList[k]._id]) {
                DeviceCountTemp[deviceList[k]._id].Critical++;
              } else {
                DeviceCountTemp[deviceList[k]._id] = {
                  Nominal: 0,
                  Critical: 1,
                  Major: 0,
                };
              }
            }
          }
          if (!found) {
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Critical++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Critical++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Critical++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
          }
        } else if (deviceList[k].DeviceType === "LEGACY") {
          if (
            deviceList[k].status &&
            deviceList[k].status.status === "connected"
          ) {
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Nominal++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Nominal++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Nominal++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
          } else {
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Critical++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Critical++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Critical++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
          }
        } else {
          if (
            !deviceList[k].status ||
            deviceList[k].status.status === "error" ||
            deviceList[k].status.status === "NA"
          ) {
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Critical++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Critical++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Critical++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 0,
                Critical: 1,
                Major: 0,
              };
            }
          } else if (
            deviceList[k].status &&
            deviceList[k].status.opstate === "Running"
          ) {
            if (RegionCountTemp[deviceList[k].RegionID]) {
              RegionCountTemp[deviceList[k].RegionID].Nominal++;
            } else {
              RegionCountTemp[deviceList[k].RegionID] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
            if (SystemCountTemp[deviceList[k].SystemID]) {
              SystemCountTemp[deviceList[k].SystemID].Nominal++;
            } else {
              SystemCountTemp[deviceList[k].SystemID] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
            if (DeviceCountTemp[deviceList[k]._id]) {
              DeviceCountTemp[deviceList[k]._id].Nominal++;
            } else {
              DeviceCountTemp[deviceList[k]._id] = {
                Nominal: 1,
                Critical: 0,
                Major: 0,
              };
            }
          }
        }
      }

      setDeviceCount(DeviceCountTemp);
      setSystemCount(SystemCountTemp);
      setRegionCount(RegionCountTemp);
    }
  };

  useEffect(() => {
    if (props.logoutUser) {
      handleLogoutClick();
      props.setLogoutUser(false);
    }
  }, [props.logoutUser])

  const handleLogoutClick = async () => {
    let data = {
      Username: customerData
        ? customerData.Username
        : localStorage.getItem("Username")
          ? localStorage.getItem("Username")
          : "",
    };
    let res = await VCDMSservice.getByBoj("logoutcustomer", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.status === "success") {
        sessionStorage.removeItem("session");
        sessionStorage.removeItem("token")
        localStorage.clear();
        setRedirect(true);
        props.setToggle(false);
      }
    }
    if (data.Username === "") {
      sessionStorage.removeItem("session");
      sessionStorage.removeItem("token")
      localStorage.clear();
      props.setToggle(false);
      setRedirect(true);
    }
  };

  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <>
      <div>
        <Header
          addElementClick={handleAddElementClick}
          dashboardClick={handleDashboardClick}
          logoutClick={handleLogoutClick}
          username={
            localStorage.getItem("Username") ? localStorage.getItem("Username") : ""
          }
          handleDeviceClick={handleDeviceClick}
          customerData={customerData}
          regionList={regionList}
          deviceList={deviceList}
          indexSelected={indexSelected}
          setIndexSelected={setIndexSelected}
          setContent={setContent}
          setDeviceFormState={setDeviceFormState}
        />
        <SideBar
          setResetDashboard={setResetDashboard}
          regionButtons={regionButtons}
          systemButtons={systemButtons}
          deviceButtons={deviceButtons}
          setRegionButtons={setRegionButtons}
          setSystemButtons={setSystemButtons}
          setDeviceButtons={setDeviceButtons}
          encoderClick={handleEncoderClick}
          selectedStreams={selectedStreams}
          streamIndexSum={streamIndexSum}
          peerIPs={peerIPs}
          setPeerIPs={setPeerIPs}
          setSelectedStreams={setSelectedStreams}
          ellvisClick={handleEllvisClick}
          setPeerIP={setPeerIP}
          setIp={setIP}
          setCardData={setCardData}
          getRegions={getRegions}
          regionList={regionList}
          systemList={systemList}
          ellvisList={ellvisList}
          setEllvisList={setEllvisList}
          setClickedEllvis={setClickedEllvis}
          sidebarClassesDevices={sidebarClassesDevices}
          sidebarClassesRegion={sidebarClassesRegion}
          sidebarClassesSystem={sidebarClassesSystem}
          setSidebarClassesDevices={setSidebarClassesDevices}
          setSidebarClassesRegion={setSidebarClassesRegion}
          setSidebarClassesSystem={setSidebarClassesSystem}
          setUpdateEncoderDashboardCheckbox={setUpdateEncoderDashboardCheckbox}
          customerData={customerData}
          deviceList={deviceList}
          encoders={encoders}
          setEncoderRefresh={setEncoderRefresh}
          setCheckStreamsStatsRefresh={setCheckStreamsStatsRefresh}
          setCheckEllvisStreamRefresh={setCheckEllvisStreamRefresh}
          setgetalldevicesApi={setgetalldevicesApi}
          fetchEllvisList={fetchEllvisList}
          // streamSortClickHandler={streamSortClickHandler}
          // dropDownenable={dropDownenable}
          // setDropDownenable={setDropDownenable}
          getAllDevices={getAllDevices}
        />
        {ChangePassRedirect ? <Redirect to="/content/changepassword" /> : null}
        <Switch>
          <Route
            path="/content/dashboard"
            render={(props) => {
              return (
                <Content
                  content={
                    <Dashboard
                      regionButtons={regionButtons}
                      systemButtons={systemButtons}
                      deviceButtons={deviceButtons}
                      setRegionButtons={setRegionButtons}
                      setSystemButtons={setSystemButtons}
                      setDeviceButtons={setDeviceButtons}
                      regionList={regionList}
                      systemList={systemList}
                      getDevicesRegionsAndSystems={getDevicesRegionsAndSystems}
                      sidebarClassesDevices={sidebarClassesDevices}
                      sidebarClassesRegion={sidebarClassesRegion}
                      sidebarClassesSystem={sidebarClassesSystem}
                      setSidebarClassesDevices={setSidebarClassesDevices}
                      setSidebarClassesRegion={setSidebarClassesRegion}
                      setSidebarClassesSystem={setSidebarClassesSystem}
                      RegionCount={RegionCount}
                      SystemCount={SystemCount}
                      DeviceCount={DeviceCount}
                      deviceList={deviceList}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/encoder/:ellvisindex/:encoderindex/:activetab"
            render={(props) => {
              let tab = props.match.params.activetab;
              let deviceindex = Number.parseInt(props.match.params.ellvisindex);
              let encoderindex = Number.parseInt(
                props.match.params.encoderindex
              );
              let ellvisindex = undefined;
              if (deviceList.length > 0) {
                if (deviceList[deviceindex] && deviceList[deviceindex].DeviceType === "ELLVIS9000V3") {
                  setIP(deviceList[deviceindex].IP);
                  for (let i = 0; i < ellvisList.length; i++) {
                    if (ellvisList[i].deviceip === deviceList[deviceindex].IP) {
                      ellvisindex = i;
                      localStorage.setItem("elvisIndex", deviceindex);
                      if (ellvisList[i].ConnectedDevice[encoderindex]) {
                        if (
                          ellvisList[i].ConnectedDevice[encoderindex].peerIP
                        ) {
                          setPeerIP(
                            ellvisList[i].ConnectedDevice[encoderindex].peerIP
                          );
                        }
                        setCallInterval(
                          ellvisList[i].ConnectedDevice[encoderindex].interval
                            ? ellvisList[i].ConnectedDevice[encoderindex]
                              .interval
                            : "3"
                        );
                        break;
                      }
                    }
                  }
                } else {
                  localStorage.removeItem("elvisIndex");
                  ellvisindex = deviceindex;
                  localStorage.removeItem("encoderId");
                  setPeerIP(deviceList[ellvisindex].IP);
                }
              }
              return (
                <Content
                  content={
                    <Encoder
                      match={props.match}
                      activeTab={tab}
                      resetDashboard={resetDashboard}
                      setResetDashboard={setResetDashboard}
                      ellvisindex={ellvisindex}
                      deviceindex={deviceindex}
                      encoderindex={encoderindex}
                      peerip={peerIP}
                      setStartState={setStartState}
                      startState={startState}
                      ip={IP}
                      ellvisList={ellvisList}
                      setEllvisList={setEllvisList}
                      customerData={customerData}
                      callInterval={callInterval}
                      setClickedStream={setClickedStream}
                      setUpdate={setUpdate}
                      saveHistoryCheckbox={saveHistoryCheckbox}
                      encoders={encoders}
                      setSaveHistoryCheckbox={setSaveHistoryCheckbox}
                      fetchEllvisList={fetchEllvisList}
                      setUpdateEncoderDashboardCheckbox={
                        setUpdateEncoderDashboardCheckbox
                      }
                      checkEncoderRefresh={checkEncoderRefresh}
                      setEncoderRefresh={setEncoderRefresh}
                      checkStreamsStatsRefresh={checkStreamsStatsRefresh}
                      setCheckStreamsStatsRefresh={setCheckStreamsStatsRefresh}
                      getAllDevices={getAllDevices}
                      RegionID={
                        localStorage.getItem("RegionID")
                          ? localStorage.getItem("RegionID")
                          : null
                      }
                      SystemID={
                        localStorage.getItem("SystemID")
                          ? localStorage.getItem("SystemID")
                          : null
                      }
                      deviceip={
                        localStorage.getItem("deviceip")
                          ? localStorage.getItem("deviceip")
                          : null
                      }
                      deviceList={deviceList}
                      updateEncoderDashboardCheckbox={
                        updateEncoderDashboardCheckbox
                      }
                      encoderId={
                        localStorage.getItem("encoderId")
                          ? localStorage.getItem("encoderId")
                          : ""
                      }
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/legacy/:deviceindex"
            render={(props) => {
              let status = "NA";
              let deviceindex = props.match.params.deviceindex;
              if (deviceList !== null && deviceList !== undefined && deviceList.length > 0) {
                if (deviceList[deviceindex] !== undefined && deviceList[deviceindex].status) {
                  if (deviceList[deviceindex].status.status === "connected") {
                    status = "Connected";
                  } else if (
                    deviceList[deviceindex].status.status === "disconnected"
                  ) {
                    status = "Disconnected";
                  }
                }

                return (
                  <Content
                    content={
                      <LegacyDevice
                        status={status}
                        deviceList={deviceList}
                        deviceindex={deviceindex}
                        customerData={customerData}
                        getAllDevices={getAllDevices}
                      />
                    }
                  />
                );
              }
              else {
                return (
                  <Redirect from="/" to={"/content/dashboard"} />
                )
              }
            }}
          />

          <Route
            path="/content/batchupdate"
            render={() => {
              return (
                <Content
                  content={
                    <BatchUpdate
                      selectedStreams={selectedStreams}
                      peerIPs={peerIPs}
                      regionList={regionList}
                      systemList={systemList}
                      ellvisList={ellvisList}
                      customerData={customerData}
                      deviceList={deviceList}
                      encoders={encoders}
                      getAllDevices={getAllDevices}
                      fetchEncodersList={fetchEncodersList}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/users"
            render={() => {
              return (
                <Content
                  content={
                    <Users
                      customerData={customerData}
                      usersList={usersList}
                      getUsers={getUsers}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/report"
            render={() => {
              return (
                <Content
                  content={
                    <Report
                      alarmreport={alarmreport}
                      getAlarmReport={getAlarmReport}
                      currentTimeZone={currentTimeZone}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/userreport"
            render={() => {
              return (
                <Content
                  content={
                    <Userreport
                      getUserReport={getUserReport}
                      userreport={userreport}
                      currentTimeZone={currentTimeZone}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/devicereport"
            render={() => {
              return (
                <Content
                  content={
                    <Devicereport
                      currentTimeZone={currentTimeZone}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/majoralarm"
            render={() => {
              return (
                <Content
                  content={
                    <Majoralarm
                      customerData={customerData}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/firmwarerefiles"
            render={() => {
              return (
                <Content
                  content={<FirmwareFiles customerData={customerData} />}
                />
              );
            }}
          />
          <Route
            path="/content/uploadPresetJsonfiles"
            render={() => {
              return (
                <Content
                  content={<UploadPresetJsonFiles customerData={customerData} />}
                />
              );
            }}
          />
          <Route
            path="/content/licenseinformation"
            render={() => {
              return (
                <Content
                  content={<LicenseInfo customerData={customerData} />}
                />
              );
            }}
          />
          <Route
            path="/content/users"
            render={() => {
              return (
                <Content
                  content={
                    <Users
                      customerData={customerData}
                      usersList={usersList}
                      getUsers={getUsers}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/scheduler"
            render={() => {
              return (
                <Content content={<Crontime customerData={customerData} />} />
              );
            }}
          />

          <Route
            path="/content/SMTP"
            render={() => {
              return (
                <Content content={<Settings customerData={customerData} />} />
              );
            }}
          />
          <Route
            path="/content/setTime"
            render={() => {
              return (
                <Content content={<SetTime
                  getTimeZone={getTimeZone}
                  customerData={customerData}
                />} />
              );
            }}
          />
          <Route
            path="/content/setSNMPManagerAlarm"
            render={() => {
              return (
                <Content content={<SNMPManager
                  customerData={customerData}
                />} />
              );
            }}
          />
          <Route
            path="/content/hotbackup"
            render={() => {
              return (
                <Content content={<HotBackup
                  customerData={customerData}
                />} />
              );
            }}
          />
          <Route
            path="/content/backup"
            render={() => {
              return (
                <Content content={<Backup
                  backupLocation={backupLocation}
                  currentTimeZone={currentTimeZone}
                  getAllData={getAllData}
                />} />
              );
            }}
          />
          <Route
            path="/content/devicetype"
            render={() => {
              return (
                <Content content={<DeviceTypes
                  customerData={customerData}
                />} />
              );
            }}
          />
          <Route
            path="/content/backupLocation"
            render={() => {
              return (
                <Content
                  content={
                    <BackupLocation
                      setBackupLocation={setBackupLocation}
                      setSaved={setSaved}
                      backupLocation={backupLocation}
                      saved={saved}
                    />
                  }
                />
              );
            }}
          />
          <Route
            path="/content/httphttps"
            render={() => {
              return (
                <Content
                  content={
                    <HttpHttps
                      customerData={customerData}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/version"
            render={() => {
              return (
                <Content content={<Version deviceList={deviceList} customerData={customerData} />} />
              );
            }}
          />

          <Route
            path="/content/changepassword"
            render={() => {
              return (
                <Content content={<ChangePassword
                  logoutClick={handleLogoutClick}
                  customerData={customerData}
                  username={
                    customerData
                      ? customerData.Username
                      : localStorage.getItem("Username")
                        ? localStorage.getItem("Username")
                        : ""
                  } />} />
              );
            }}
          />


          <Route
            path="/content/profile"
            render={() => {
              return (
                <Content content={<Profile
                  customerData={customerData}
                  username={
                    customerData
                      ? customerData.Username
                      : localStorage.getItem("Username")
                        ? localStorage.getItem("Username")
                        : ""
                  }
                />} />
              );
            }}
          />


          <Route
            path="/content/ellvis/:IP/:tab"
            render={(props) => {
              setIP(props.match.params["IP"]);
              for (let i = 0; i < ellvisList.length; i++) {
                if (ellvisList[i].deviceip === props.match.params["IP"]) {
                  setClickedEllvis(ellvisList[i]);
                  break;
                }
              }
              return (
                <Content
                  content={
                    <Ellvis
                      {...props}
                      ip={IP}
                      CardData={CardData}
                      setClickedEllvis={setClickedEllvis}
                      clickedEllvis={clickedEllvis}
                      customerData={customerData}
                      clickedStream={clickedStream}
                      setClickedStream={setClickedStream}
                      update={update}
                      setUpdate={setUpdate}
                      checkEllvisStreamRefresh={checkEllvisStreamRefresh}
                      setCheckEllvisStreamRefresh={setCheckEllvisStreamRefresh}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/configurations/:tab"
            render={(props) => {
              return (
                <Content
                  content={
                    <Configurations
                      {...props}
                      deviceFormState={deviceFormState}
                      regionList={regionList}
                      customerData={customerData}
                      deviceList={deviceList}
                      getAllDevices={getAllDevices}
                      getRegions={getRegions}
                      getSystems={getSystems}
                      systemList={systemList}
                      setDeviceFormState={setDeviceFormState}
                    />
                  }
                />
              );
            }}
          />

          <Route
            path="/content/setpassword/:device"
            render={(props) => {
              return (
                <Content
                  content={
                    <DeviceAuthentication
                      device={props.match.params["device"]}
                      IP={
                        localStorage.getItem("SetPasswordIP")
                          ? localStorage.getItem("SetPasswordIP")
                          : null
                      }
                      ID={
                        localStorage.getItem("SetPasswordID")
                          ? localStorage.getItem("SetPasswordID")
                          : null
                      }
                      customerData={customerData}
                      getAllDevices={getAllDevices}
                    />
                  }
                />
              );
            }}
          />
          <Redirect from="/" to={"/content/dashboard"} />
        </Switch>
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
