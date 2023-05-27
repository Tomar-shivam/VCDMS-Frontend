import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import VCDMSservice from "../../services/http.service";
import httpService from "../../services/http.service";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./settings.css";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import CommonUtils, { deviceTypesnames } from "../../common/CommonUtils";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadPresetJsonFiles = (props) => {
  const [activeTab] = useState("uploadPresetJsonfiles");
  const [fileDeleted, setfileDeleted] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const [devicetype, setDeviceType] = useState("");
  const [updateDevicetype, setUpdateDevicetype] = useState("");
  // const [autoUploadFileByDeviceType, setAutoUploadFileByDeviceType] = useState("");
  const [deviceIP, setDeviceIP] = useState("");
  // const [selectedDevice, setSelectedDevice] = useState({});
  // const [deviceIPs, setDeviceIPs] = useState([]);
  const [allAvailableDevices, setAllAvailableDevices] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [PresetFiles, setPresetFiles] = useState([]);
  const [modal, setModal] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [clicked2, setclicked2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [clicked3, setclicked3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [clicked4, setclicked4] = useState(false);
  const [presetFilesByIP, setPresetFilesByIP] = useState([]);
  const [autoUploadFilesByIP, setAutoUploadFilesByIP] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [autoUploadSelectedFile, setAutoUploadSelectedFile] = useState('')
  const [upDateText, setUpdateText] = useState(<>Update</>);
  const [disable, setDisable] = useState(false);
  // const [autoDeviceIP, setAutoDeviceIP] = useState();
  const [chooseFileToggle, setChooseFileToggle] = useState(true);
  const [option, setOption] = useState(['Device_IP', 'Device_Name', 'IP-Range']);
  const [selectFilter, setSelectFilter] = useState('');
  const [componentsToShow, setComponentsToShow] = useState([])
  const [selectRules, setSelectRules] = useState({ From: '', To: '', Device_IP: '', Device_Name: '' })
  // const [tempSelectRules, setTempSelectRules] = useState({ From: '', To: '', Device_IP: '', Device_Name: '' })
  //const [rangeFrom, setRangeFrom] = useState('')
  //const [rangeTo, setRangeTo] = useState('')
  const [Device_IP, setDevice_IP] = useState('');
  const [Device_Name, setDevice_Name] = useState('');
  // const [rulesValue, setRulesValue] = useState({ rangeFrom: '', rangeTo: '', Device_IP: '', Device_Name: '' })
  const [rulesDeviceType, setRulesDeviceType] = useState('')
  const [selectedRulesList, setSelectedRulesList] = useState([])
  const [editRulesId, setEditRulesId] = useState('')
  // const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  //const [CIDR, setCIDR] = useState(0);
  const [range, setRange] = useState('');

  let data = {};
  const clearForms = (event) => {
    event.preventDefault();
    setFormData({});
    document.getElementById('formFile').value = null
    setSelectedFile('');
    if (!chooseFileToggle) setChooseFileToggle(true);
  }

  const removefile = async (file, devicetype) => {
    setLoading(true);
    let data = {
      file: file,
      devicetype: devicetype,
    };
    let res = await VCDMSservice.delete("deletePresetfilebydevicetype", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setfileDeleted(true);
        SuccessMessage("File has been deleted.")
      } else if (res.ack === "0") {
        ErrorMessage("Unable to delete ");
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setLoading(false);
    setfileDeleted(false);
    setModal(!modal);
  };

  const PresetUpdateChange = (event) => {
    setFormData(event.target.files[0]);
  };
  // const AutoUploadChange = (event) => {
  //   setAutoUploadFormData(event.target.files[0]);
  // };
  useEffect(() => {
    getPresetFiles();
  }, [devicetype, fileDeleted, fileAdded]);

  useEffect(() => {
    getAllAvailableDevices();
    GetAllSelectedRules();
  }, [])

  const getPresetFiles = async () => {
    let data = { DeviceType: devicetype ? devicetype : null };
    let res = await httpService.getPresetfiles(
      "getPresetfilesbydevicetype",
      data
    );
    setPresetFiles(res.data);
  };
  // useEffect(() => {
  //   handleAutoUploadIPChange();
  // }, [rulesDeviceType])

  useEffect(() => {
    getPresetFileByDeviceType();
  }, [updateDevicetype, fileAdded, fileDeleted])

  useEffect(() => {
    getAutoUploadFileByDeviceType();
  }, [rulesDeviceType, fileAdded, fileDeleted])

  const getAllAvailableDevices = async () => {
    let res = await VCDMSservice.getAll("getallonboardingdevices")
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      setAllAvailableDevices(res);
    }
  }

  const getPresetFileByDeviceType = async () => {
    // e.preventDefault();
    if (updateDevicetype) {
      let data = { DeviceType: updateDevicetype ? updateDevicetype : null };
      let res = await httpService.getPresetfiles("getPresetfilesbydevicetype", data);
      if (res.data) {
        setPresetFilesByIP(res.data);
      }
    }
  }
  const getAutoUploadFileByDeviceType = async () => {
    // e.preventDefault();
    if (rulesDeviceType) {
      let data = { DeviceType: rulesDeviceType ? rulesDeviceType : null };
      let res = await httpService.getPresetfiles("getPresetfilesbydevicetype", data);
      if (res.data) {
        // let createArr = [];
        // let fileObject = {}
        // for (let i = 0; i < res.data.length; i++) {
        //   if (autoUploadSelectedFile.includes(res.data[i])) {
        //     fileObject = {
        //       file: res.data[i],
        //       isChecked: true,
        //     }
        //   } else {
        //     fileObject = {
        //       file: res.data[i],
        //       isChecked: false,
        //     }
        //   }
        //   createArr.push(fileObject)
        // }
        setAutoUploadFilesByIP(res.data);
      }
    }
  }
  const SubmitPresetUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (devicetype === "") {
      ErrorMessage("Please select a Device Type");
      setFileAdded(false);
      setLoading(false);
      return;
    }
    if (!formData) {
      ErrorMessage("Please select a File");
      setFileAdded(false);
      setLoading(false);
      return;
    }
    data = {
      devicetype: devicetype,
      file: formData,
    };

    let res = await VCDMSservice.uploadFileOnDir(
      "savePresetfilebydevicetype",
      data
    )
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        setFileAdded(true);
        setFormData({});
        SuccessMessage("File has been saved.")
        getPresetFileByDeviceType();
      } else if (res.ack === "0") {
        ErrorMessage("Unable to save");
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setFileAdded(false);
    setLoading(false);
    document.getElementById("formFile1").value = null;
  };

  const toggleCard = () => {
    toggleIcon();
    setCollapse(!collapse);
  };

  const toggleIcon = () => {
    setclicked(!clicked);
  };

  const handleUpdateDeviceIPChange = (e) => {
    e.preventDefault();
    setDeviceIP(e.target.value);
    let curreDevice = allAvailableDevices.find(device => device.IP === e.target.value);
    // setSelectedDevice(curreDevice);
    setUpdateDevicetype(curreDevice.DeviceType);
  }

  const handleAutoUploadIPChange = async (deviceType) => {
    setRulesDeviceType(deviceType);
    // setDevice_IP()
    // setDevice_Name()
    // setRangeFrom()
    // setRangeTo()
    setAutoUploadSelectedFile()
    setEditRulesId('')
    // setOption(option.concat(componentsToShow).sort());
    // setComponentsToShow([]);
    // let autoJSONdata = await httpService.getByBoj('getautouploadjsonrules', { DeviceType: deviceType })
    //   .then((res) => res.data)
    //   .catch(err => err)
    // if (autoJSONdata.ack === '1') {
    //   let data = autoJSONdata.msg;
    //   // setSelectedRulesList([data])
    //   setDevice_IP(data.IP)
    //   setDevice_Name(data.DeviceName)
    //   setRangeFrom(data.RangeFrom)
    //   setRangeTo(data.RangeTo)
    //   setAutoUploadSelectedFile(data.FileName)
    //   setRulesValue({ rangeFrom: data.RangeFrom, rangeTo: data.RangeTo, Device_IP: data.IP, Device_Name: data.DeviceName })
    //   let x = [];
    //   if (data) {
    //     Object.keys(data).map((e) => {
    //       if (data.RangeTo && e === 'RangeTO') return;
    //       if (data.RangeFrom && e === 'RangeFrom') x.push('IP-Range');
    //       if (data.IP && e === 'IP') x.push('Device_IP');
    //       if (data.DeviceName && e === 'DeviceName') x.push("Device_Name");
    //     })
    //   }
    //   x.sort();
    //   setOption(['Device_IP', 'Device_Name', 'IP-Range'].filter((el) => !x.includes(el)));
    //   setComponentsToShow(x)
    // }
    // if (autoJSONdata.ack === '2') {
    //   setComponentsToShow([]);
    //   setOption(['Device_IP', 'Device_Name', 'IP-Range'])
    //   setRulesValue({ rangeFrom: '', rangeTo: '', Device_IP: '', Device_Name: '' })
    //   setDevice_IP()
    //   setDevice_Name()
    //   setRangeFrom()
    //   setRangeTo()
    // }
  }

  const makeFormData = (event) => {
    setSelectedFile(event.target.value);
    setChooseFileToggle(false);
  }

  const makeAutoUploadFormData = (event) => {
    // let selectedFileArr = [...autoUploadSelectedFile]
    // if (event.target.checked) {
    //   selectedFileArr.push(file)
    setAutoUploadSelectedFile(event.target.value);
    // } else {
    //   let index = selectedFileArr.indexOf(file);
    //   if (index > -1) {
    //     selectedFileArr.splice(index, 1);
    //   }
    //   setAutoUploadSelectedFile(selectedFileArr);
    // }
    // let uploadedFileIpArray = [...autoUploadFilesByIP]
    // for (let i = 0; i < uploadedFileIpArray.length; i++) {
    //   if (uploadedFileIpArray[i].file == file) {
    //     uploadedFileIpArray[i].isChecked = event.target.checked
    //   }
    // }
    // setAutoUploadFilesByIP(uploadedFileIpArray)
  }

  const updatePresetByUploadedFiles = async (e) => {
    e.preventDefault()
    if (!deviceIP || !selectedFile || !updateDevicetype) {
      ErrorMessage("Please select DeviceIP or File");
      return;
    }
    setDisable(true);
    setUpdateText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Updating
      </>
    )

    data = {
      deviceIP: deviceIP,
      file: selectedFile,
      DeviceType: updateDevicetype,
    };

    let res = await VCDMSservice.updatePresetByUploadedFile("updatejsonPresetbyuploadedfile", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        SuccessMessage("Successfully Updated Preset");
      } else if (res.ack === "0") {
        ErrorMessage("Unable to update " + deviceIP);
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setDisable(false);
    setUpdateText(<>Update</>)
  }

  const UpdatePresetFileOnDeviceIP = async (event) => {
    event.preventDefault();
    if (!deviceIP || !formData.name) {
      ErrorMessage("Please select DeviceIP or File")
      return;
    }
    setDisable(true);
    setUpdateText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Updating
      </>
    )
    data = {
      deviceIP: deviceIP,
      deviceType: updateDevicetype,
      file: formData,
    };

    let res = await VCDMSservice.uploadFileOnDir("updatePresetFileOnDeviceIP", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        SuccessMessage("Successfully Updated Batch");
      } else if (res.ack === "0") {
        ErrorMessage("Unable to update " + deviceIP);
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setDisable(false);
    setUpdateText(<>Update</>)
  };

  const handleAutoUploadJSON = async (e) => {
    // e.preventDefault()
    // setDisableSaveBtn(true)
    if (autoUploadFilesByIP.length === 0) {
      ErrorMessage('Please Upload JOSN file first for the selected device type !');
      return;
    }
    if (!rulesDeviceType) {
      ErrorMessage('Please select a DeviceType !')
      return;
    }
    else if (!(Device_IP || Device_Name || range)) {
      ErrorMessage('Select at least one Rule Type !')
      return;
    }
    else if (!(autoUploadSelectedFile)) {
      ErrorMessage('Please select a file !')
      return;
    }
    // else if ((rangeFrom && !rangeTo) || (rangeTo && !rangeFrom)) {
    //   ErrorMessage('Please set both ( FROM and TO ) !!')
    //   return;
    // }
    else if ((range && range.split('/')[0].split('.').length !== 4) || (Device_IP && Device_IP.split('.').length !== 4)) {
      ErrorMessage('Please enter valid IP address.')
      return;
    }
    else if (range && (range.split('/').length !== 2 || (range.split('/').length === 2 && !range.split('/')[1].length))) {
      ErrorMessage('Please Enter IP-Range in CIDR format !!')
      return;
    }
    if (range && Device_IP) {
      ErrorMessage('You can not create a Rules with IP and Range !')
      return;
    }
    // if (rangeFrom.split('.')[3] >= rangeTo.split('.')[3]) {
    //   ErrorMessage('Enter a valid IP-Range.')
    //   return;
    // }

    // if (Device_IP) {
    //   for (let i = 0; i < selectedRulesList.length; i++) {
    //     if (rulesDeviceType === selectedRulesList[i].DeviceType && selectedRulesList[i].RangeFrom) {
    //       if (Device_IP.split('.')[3] >= selectedRulesList[i].RangeFrom.split('.')[3] &&
    //         Device_IP.split('.')[3] <= (Number(selectedRulesList[i].RangeFrom.split('.')[3]) + selectedRulesList[i].CIDR)) {
    //         ErrorMessage(`You can not create a Rules for DeviceType ${rulesDeviceType} with IP in the Range (${selectedRulesList[i].RangeFrom}/${selectedRulesList[i].CIDR})`)
    //         return;
    //       }
    //     }
    //   }
    // }
    // if(!editRulesId){
    for (let i = 0; i < selectedRulesList.length; i++) {
      if (rulesDeviceType === selectedRulesList[i].DeviceType) {
        if ((range && selectedRulesList[i].range && range === selectedRulesList[i].range)
          || (Device_Name && selectedRulesList[i].DeviceName && Device_Name === selectedRulesList[i].DeviceName)
          || (Device_IP && selectedRulesList[i].IP && Device_IP === selectedRulesList[i].IP)
        ) {
          if (editRulesId !== selectedRulesList[i]._id) {
            ErrorMessage('Rules already exist, Please Update existing Rule !!')
            return;
          }
        }
      }
      // if (rulesDeviceType === selectedRulesList[i].DeviceType) {
      //   let exist = false;
      //   if (Device_Name !== '' && selectedRulesList[i].DeviceName.toLowerCase() === Device_Name.toLowerCase()) exist = true;
      //   if (Device_IP !== '' && selectedRulesList[i].IP !== '') {
      //     if (selectedRulesList[i].IP === Device_IP) exist = true;
      //     else if (selectedRulesList[i].RangeFrom &&
      //       selectedRulesList[i].RangeFrom.split('.')[3] <= Device_IP.split('.')[3] &&
      //       (Number(selectedRulesList[i].RangeFrom.split('.')[3]) + Number(selectedRulesList[i].CIDR)) >= Device_IP.split('.')[3])
      //       exist = true;
      //   }
      //   if (rangeFrom !== '' && selectedRulesList[i].RangeFrom !== '') {
      //     let from = Number(rangeFrom.split('.')[3]);
      //     let to = Number(CIDR);
      //     let pfrom = Number(selectedRulesList[i].RangeFrom.split('.')[3]);
      //     let pto = Number(selectedRulesList[i].CIDR);
      //     if (from <= pfrom && (from + to) >= pfrom || from <= (pfrom + pto) && (from + to) >= (pfrom + pto) || from <= pfrom && (from + to) >= (pfrom + pto) || from >= pfrom && (from + to) <= (pfrom + pto)) exist = true;
      //   }
      //   if (rangeFrom && selectedRulesList[i].Device_IP !== '') {
      //     if (selectedRulesList[i].IP.split('.')[3] >= rangeFrom.split('.')[3] &&
      //       selectedRulesList[i].IP.split('.')[3] <= (Number(rangeFrom.split('.')[3]) + Number(CIDR))) exist = true;
      //   }
      //   // else if(rangeFrom !== '' && selectedRulesList[i].RangeFrom == rangeFrom && selectedRulesList[i].RangeTo == rangeTo) exist = true
      //   // exist = exist && Boolean(selectedRulesList[i].DeviceName) == Boolean(Device_Name)
      //   // exist = exist && Boolean(selectedRulesList[i].IP) == Boolean(Device_IP)
      //   // exist = exist && Boolean(selectedRulesList[i].RangeFrom) == Boolean(rangeFrom)
      //   if (exist && editRulesId != selectedRulesList[i]._id) {
      //     ErrorMessage('Rules already exist, Please Update existing Rule !!')
      //     return;
      //   }
      // }
      // Object.keys(selectedRulesList[i]).forEach((ele)=>{
      //   exist = ele == 
      // })
    }

    data = {
      Id: editRulesId,
      DeviceName: Device_Name,
      deviceIP: Device_IP,
      Range: range,
      // RangeTo: rangeTo,
      // CIDR: CIDR,
      DeviceType: rulesDeviceType,
      FileName: autoUploadSelectedFile,
    };
    let res = await httpService.getByBoj('createupdaterules', data)
      .then((res) => res.data)
      .catch((err) => { return { ack: '2', msg: null } });

    if (res) {
      if (res.ack === "1") {
        SuccessMessage(res.msg);
        GetAllSelectedRules();
        setDevice_IP('')
        setDevice_Name('')
        // setRangeFrom('')
        // setRangeTo('')
        setAutoUploadSelectedFile('')
        setOption(option.concat(componentsToShow).sort());
        setComponentsToShow([]);
        setEditRulesId('')
        setRange('')
        // setCIDR(0);
      } else if (res.ack === "0") {
        ErrorMessage("Unable to update " + Device_IP);
      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
      // setDisableSaveBtn(false)
    } else {
      ErrorMessage("Something went wrong please try again");
      // setDisableSaveBtn(false)
    }
  }

  const addFilter = (event) => {
    event.preventDefault();
    if (selectFilter === "") {
      return;
    }
    if ((componentsToShow.includes('IP-Range') && selectFilter === 'Device_IP') ||
      (componentsToShow.includes('Device_IP') && selectFilter === 'IP-Range')) {
      ErrorMessage('You cannot create a rule by the combination of DeviceIP & IP-Range !')
      return;
    }
    let x = [...componentsToShow];
    x.push(selectFilter);
    let y = { ...selectRules };
    y[selectFilter] = event.target.value;
    setSelectRules(y);
    setComponentsToShow(x);
    let opt = [...option];
    let index;
    for (let i = 0; i < opt.length; i++) {
      if (opt[i] === selectFilter) {
        index = i;
        break;
      }
    }
    opt.splice(index, 1);
    setSelectFilter("");
    setOption(opt);
  };

  const removeFilter = (event, index) => {
    event.preventDefault();
    let comp = [...componentsToShow];
    let x = comp[index];
    let opt = [...option];
    comp.splice(index, 1);
    opt.push(x);
    opt.sort();
    setOption(opt);
    setComponentsToShow(comp);
    if (x === 'IP-Range') {
      // setRangeFrom('');
      // setRangeTo('')
      setRange('')
      // setCIDR(0);
    }
    if (x === 'Device_IP')
      setDevice_IP('');
    else if (x === 'Device_Name') setDevice_Name('')
  };

  const deleteSelecteRules = async (Object) => {
    let alert = window.confirm('Do you want to delete these set of Rules !')
    if (alert) {
      let data = await httpService.getByBoj("deleteselectrules", { id: Object._id })
        .then(res => res.data)
        .catch(err => err)

      if (data && data.ack === '1') {
        console.log(data.msg)
        await GetAllSelectedRules();
        // SuccessMessage('Rules deleted Successfully !!');
      }
      else {
        ErrorMessage(data.msg || 'Something went wrong !!')
      }
    }
  }

  const editSelecteRules = async (object) => {
    document.getElementById('autouploadjson').scrollIntoView({ behavior: "smooth" })
    let tempComponentToShow = [];
    if (object.IP)
      tempComponentToShow.push('Device_IP')
    if (object.DeviceName)
      tempComponentToShow.push('Device_Name')
    if (object.Range)
      tempComponentToShow.push('IP-Range')
    setDevice_IP(object.IP)
    setDevice_Name(object.DeviceName)
    setAutoUploadSelectedFile(object.FileName)
    setRulesDeviceType(object.DeviceType);
    // setRangeFrom(object.RangeFrom)
    // setRangeTo(object.RangeTo)
    setRange(object.Range)
    // setCIDR(object.CIDR);
    setCollapse3(true)
    setclicked3(true)
    setComponentsToShow(tempComponentToShow)
    setOption(option.filter(e => !tempComponentToShow.includes(e)))
    setEditRulesId(object._id)
  }

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    resizable: true,
  };
  // const RangeGetter = (params) => {
  //   return params.data.RangeFrom ? params.data.RangeFrom + '/' + params.data.CIDR
  //     : ' - ';
  // }
  const columns = [
    {
      headerName: "Device Type",
      field: "DeviceType",
    },
    {
      headerName: "Device Name",
      field: "DeviceName",
      valueGetter: (params) => params.data.DeviceName ? params.data.DeviceName : ' - '
    },
    {
      headerName: "Device IP",
      field: "IP",
      valueGetter: (params) => params.data.IP ? params.data.IP : ' - '
    },
    {
      headerName: "IP-Range",
      field: "Range",
      valueGetter: (params) => params.data.Range ? params.data.Range : ' - ',
    },
    {
      headerName: "JSON File Name",
      field: "FileName"
    },
    {
      headerName: " ",
      field: " ",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        let span = document.createElement("div");
        span.className = "spanEditname";
        let img = document.createElement("i");
        img.className = "fa fa-edit stream-icons";
        img.addEventListener("click", () => editSelecteRules(params.data));
        span.appendChild(img);
        return span;
      },
      maxWidth: 70,
    },
    {
      headerName: " ",
      field: " ",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        let span = document.createElement("div");
        span.className = "spanname";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
        img.addEventListener("click", () => deleteSelecteRules(params.data));
        span.appendChild(img);
        return span;
      },
      maxWidth: 70,
    },
  ];

  const GetAllSelectedRules = async () => {
    try {
      let data = await httpService.get('getallselectedrules')
        .then(res => res.data)
        .catch(err => { return { ack: '2', msg: err } });
      if (data.ack === '1') {
        setSelectedRulesList(data.msg);
      }
      else {
        ErrorMessage(data.msg)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const CancelUpdateRules = async (e) => {
    e.preventDefault();
    setDevice_IP('')
    setDevice_Name('')
    // setRangeFrom('')
    // setRangeTo('')
    setAutoUploadSelectedFile('')
    setOption(option.concat(componentsToShow).sort());
    setComponentsToShow([]);
    setEditRulesId('')
    setRange('')
    // setCIDR(0);
  }
  const IPValidationWithCIDR = (string) => {
    let array = string.split('/');
    if (array.length > 2) return true;

    let ip = array[0];
    if (ip.match(/[^0-9.]/)) {
      return true;
    }
    let count = 0;
    for (let i = 0; i < ip.length; i++) {
      if (ip.charAt(i) === ".") {
        count++;
      }
    }
    if (count > 3) {
      return true;
    }
    let x = ip.split(".");
    for (let i = 0; i < x.length; i++) {
      if (x[i].length > 3) {
        return true;
      }
      if ((i > 0 && x[i - 1] === '') || Number.parseInt(x[i]) > 255) {
        return true;
      }
    }
    if (array.length === 2) {
      if (array[0].split('.').length === 4 && array[0].split('.')[3] === '') return true
      if (array[0].split('.').length !== 4) return true;
      let port = array[1];
      if (port !== '' && (isNaN(port) || (!isNaN(port) && (port <= 0 || port > 31)))) return true;
    }
    return false;
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('On submit....')
      }}>
        <NavSlider activeTab={activeTab} />
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
                <span>Upload Preset File</span>
                <FontAwesomeIcon
                  icon={clicked ? faAngleDown : faAngleRight}
                  onClick={toggleIcon}
                />
              </div>
            </div>
            {/* <div className="form-boxtopline5">PRESET FILES</div> */}
            <Collapse isOpen={collapse}>
              <div className="form-boxtopcont ">
                {loading ? <Loader /> : null}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device Type :<i style={{ color: "red" }}>*</i></label>
                      <select
                        className="form-control"
                        name="select_type"
                        id="select_type"
                        value={devicetype}
                        onChange={(e) => {
                          setDeviceType(e.target.value);
                          document.getElementById("formFile1").value = null;
                        }}>
                        <option value="" hidden={true}>
                          Select One
                        </option>
                        {deviceTypesnames.map((item, index) => item !== 'ELLVIS9000V3' && <option value={item}>{item}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled firmware-file-list">
                      {PresetFiles.map((file, index) => (
                        <li key={index}>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>{file}</div>
                            <i
                              className="fa fa-trash file-delete"
                              onClick={(e) => {
                                setModal(file)
                              }}
                            ></i>
                            <Modal id={file} isOpen={modal === file} className="file-del-popup" style={{ width: '500px' }}>
                              <ModalHeader>Delete Preset File</ModalHeader>
                              <ModalBody className="font-size-16">
                                Are you sure you want to delete this file.{" "}
                              </ModalBody>
                              <ModalFooter>
                                <button
                                  className="btn btn-success"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removefile(file, devicetype);
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    setModal(!modal);
                                  }}
                                >
                                  No
                                </button>
                              </ModalFooter>
                            </Modal>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">File :<i style={{ color: "red" }}>*</i></label>
                      <input
                        className="form-control pad-top-3"
                        type="file"
                        id="formFile1"
                        accept="application/json"
                        multiple
                        onChange={(event) => PresetUpdateChange(event)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-danger marb-15"
                  onClick={(e) => {
                    // e.preventDefault();
                    // history.goBack();
                    // setFileAdded(false);
                    setDeviceType('')
                    setFormData({})
                    setCollapse(false);
                    setclicked(false)
                  }}
                >
                  Cancel
                </button>
                {props.customerData.Role === "Operator" ? (
                  ""
                ) : (
                  <button
                    className="btn btn-success marl-15 marb-15"
                    onClick={SubmitPresetUpdate}
                  >
                    Save
                  </button>
                )}
              </div>
            </Collapse>
          </div>
        </div>

        <div className="pad-15">
          <div className="form-boxdiv">
            <div
              className="form-boxtopline5"
              onClick={() => {
                setCollapse2(!collapse2);
                setclicked2(!clicked2)
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Load Preset File</span>
              <FontAwesomeIcon
                icon={clicked2 ? faAngleDown : faAngleRight}
                onClick={() => setclicked2(!clicked2)}
              />
            </div>
            <Collapse isOpen={collapse2}>
              <div className="form-boxtopcont ">
                {loading ? <Loader /> : null}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device IP :<i style={{ color: "red" }}>*</i></label>
                      <select
                        className="form-control"
                        name="select_type"
                        id="select_type"
                        value={deviceIP}
                        onChange={(e) => { handleUpdateDeviceIPChange(e) }}>
                        <option value="" hidden={true}>
                          Select One
                        </option>
                        {allAvailableDevices.map((item, index) => <option value={item.IP}>{item.IP}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device Type :<i style={{ color: "red" }}>*</i></label>
                      <input type="text" className="form-control" value={updateDevicetype} disabled />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {(presetFilesByIP.length > 0) &&
                    <>
                      <div className="w-100 avail-files mt-4">
                        <h4>Available Files : {presetFilesByIP.length}</h4>
                        <form>
                          <div className="row" >
                            {presetFilesByIP.map((files, index) => (
                              <div className="col-6" key={index}>
                                <div className="form-check d-flex justify-content-center">
                                  <label className="form-check-label">
                                    <input type="radio" className="form-check-input" disabled={formData && formData.name} name="optradio" checked={selectedFile === files} onChange={(e) => makeFormData(e)} value={files} />
                                    <span>{files}</span>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="text-center mt-3">
                          </div>
                        </form>
                      </div>

                      <div className="col-md-12 mx-auto">
                        <h4 className="firmware-seperator"><span>OR</span></h4>
                      </div>
                    </>
                  }
                  <div className="col-md-12 mx-auto">
                    <div className="file-upload-box">
                      <div>
                        <input type="file" accept="application/json" id="formFile" disabled={!chooseFileToggle} onChange={(event) => PresetUpdateChange(event)} />
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex justify-content-center mx-auto my-4">
                    <button className="btn btn-danger mr-2" disabled={disable} onClick={(e) => clearForms(e)}>Cancel</button>
                    <button className="btn btn-success" disabled={disable} onClick={selectedFile.length > 0 ? updatePresetByUploadedFiles : UpdatePresetFileOnDeviceIP} >{upDateText}</button>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="pad-15" id="autouploadjson">
          <div className="form-boxdiv">
            <div
              className="form-boxtopline5"
              onClick={() => {
                setCollapse3(!collapse3);
                setclicked3(!clicked3)
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Auto Configured JSON</span>
              <FontAwesomeIcon
                icon={clicked3 ? faAngleDown : faAngleRight}
                onClick={() => setclicked3(!clicked3)}
              />
            </div>
            <Collapse isOpen={collapse3}>
              <div className="form-boxtopcont ">
                {loading ? <Loader /> : null}
                <div className="form-group top-filter-box top-filter-box-uploadPreset">
                  <label className="form-check-label filter-label float-left">
                    Rule Type
                  </label>
                  <select
                    value={selectFilter}
                    className="form-control float-left width"
                    onChange={(event) => setSelectFilter(event.target.value)}
                  >
                    <option value="" hidden={false}>
                      Select
                    </option>
                    {option.map((value) => {
                      if (value !== "") return <option value={value}>{value.replace('_', ' ')}</option>;
                      return '';
                    })}
                  </select>
                  <span className="plus-box" onClick={(event) => addFilter(event)}>
                    <i className="fa fa-plus"></i>
                  </span>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device Type :<i style={{ color: "red" }}>*</i></label>
                      <select
                        className="form-control"
                        name="select_type"
                        id="select_type"
                        value={rulesDeviceType}
                        onChange={(e) => {
                          handleAutoUploadIPChange(e.target.value);
                        }}>
                        <option value="" hidden={true}>
                          Select One
                        </option>
                        {deviceTypesnames.map((item, index) => item !== 'ELLVIS9000V3' && <option value={item}>{item}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="user-form form-boxtopcont p-0">
                  <div className="row">
                    {componentsToShow.map((value, index) => {
                      if (value === 'IP-Range')
                        return (
                          <div key={"filter1" + index} className="col-sm-6">
                            <div className="row form-group">
                              <div className="d-flex align-items-center flex-fill">
                                <div className="flex-fill" style={{ marginRight: '15px' }}>
                                  <label className="form-check-label form-label-custom">
                                    IPRange(CIDR)
                                  </label>
                                  <div className="d-flex align-items-center">
                                    <input type="text" className="form-control" placeholder="XXX.XXX.XXX.XXX/XX" value={range}
                                      onChange={(e) => {
                                        if (IPValidationWithCIDR(e.target.value)) return;
                                        setRange(e.target.value)
                                        // setRangeFrom(e.target.value.split('/')[0])
                                        // setCIDR(e.target.value.split('/')[1]);
                                      }} />
                                    <div>
                                      <span
                                        className="minus-box"
                                        onClick={(event) => removeFilter(event, index)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>)
                      else
                        return (
                          <div key={"filter1" + index} className="col-sm-6">
                            <div className="row form-group">
                              <div className="d-flex align-items-center flex-fill">
                                <div className="flex-fill" style={{ marginRight: '15px' }}>
                                  <label className="form-check-label form-label-custom">
                                    {value.replace('_', ' ')}
                                  </label>
                                  <div className="d-flex align-items-center">
                                    <input type="text" className="form-control" value={value === 'Device_IP' ? Device_IP : Device_Name}//selectRules[value] ? selectRules[value]: tempSelectRules[value]}
                                      onChange={(e) => {
                                        if (value === 'Device_IP') {
                                          if (CommonUtils.IPValidation(e.target.value)) return;
                                          setDevice_IP(e.target.value)
                                        }
                                        else {
                                          setDevice_Name(e.target.value)
                                        }
                                      }} />
                                    <div>
                                      <span
                                        className="minus-box"
                                        onClick={(event) => removeFilter(event, index)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>)
                    })
                    }
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device IP :<i style={{ color: "red" }}>*</i></label>
                      <select
                        className="form-control"
                        name="select_type"
                        id="select_type"
                        value={autoDeviceIP}
                        onChange={(e) => { handleAutoUploadIPChange(e) }}>
                        <option value="" hidden={true}>
                          Select One
                        </option>
                        {allAvailableDevices.map((item, index) => <option value={item.IP}>{item.IP}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-check-label">Device Type :<i style={{ color: "red" }}>*</i></label>
                      <input type="text" className="form-control" value={autoUploadDevicetype} disabled />
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-sm-6">
                    <label className="form-check-label">Auto Upload JSON : </label>
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={autoUploadJSON}
                      disabled={
                        props.customerData.Role === "Operator" ? true : false
                      }
                      onChange={(event) => {
                        setAutoUploadJSON(!autoUploadJSON)
                        data = {
                          ip: autoDeviceIP,
                          autoUploadJSON: event.target.checked ? true : false
                        };
                      }}
                    />
                  </div>
                </div> */}
                {/* <br></br> */}
                <div className="row">
                  {(autoUploadFilesByIP.length > 0) &&
                    <div className="w-100 avail-files mt-4">
                      <h4>Available Files : {autoUploadFilesByIP.length}</h4>
                      <form>
                        <div className="row" >
                          {autoUploadFilesByIP.map((files, index) => {
                            return (
                              <div className="col-6" key={index}>
                                <div className="form-check d-flex justify-content-center">
                                  <label className="form-check-label">
                                    <input type="radio" className="form-check-input" checked={autoUploadSelectedFile === files} name="autoptradio" onChange={(e) => makeAutoUploadFormData(e)} value={files} />
                                    <span>{files}</span>
                                  </label>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <div className="text-center mt-3">
                        </div>
                      </form>
                    </div>
                  }
                </div>
                {/* <div className="col-md-12 mx-auto">
                        <h4 className="firmware-seperator"><span>OR</span></h4>
                      </div>
                   </>
                  }  */}
                {/* <div className="col-md-12 mx-auto">
                    <div className="file-upload-box">
                      <div>
                        <input type="file" accept="application/json" id="autoformFile" disabled={autoUploadSelectedFile} onChange={(event) => AutoUploadChange(event)} />
                      </div>
                      <div>
                      </div>
                    </div>
                  </div> */}
                <div className="row">
                  <div className="col-md-6 d-flex justify-content-center mx-auto my-4">
                    {
                      editRulesId &&
                      <button className="btn btn-danger mr-2" disabled={disable} onClick={(e) => CancelUpdateRules(e)}>Cancel</button>
                    }
                    <button className="btn btn-success" onClick={(e) => handleAutoUploadJSON(e)} >{editRulesId ? 'Update' : 'Save'}</button>
                  </div>

                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="pad-15">
          <div className="form-boxdiv">
            <div
              className="form-boxtopline5"
              onClick={() => {
                setCollapse4(!collapse4);
                setclicked4(!clicked4)
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Rules</span>
              <FontAwesomeIcon
                icon={clicked4 ? faAngleDown : faAngleRight}
                onClick={() => setclicked4(!clicked4)}
              />
            </div>
            <Collapse isOpen={collapse4}>
              <div className="form-boxtopcont ">
                {loading ? <Loader /> : null}
                <div className="form-boxtopcont user-form">
                  <div
                    className="ag-theme-alpine custom-row-bg"
                    style={{ height: "calc(100vh - 205px)" }}
                  >
                    <AgGridReact
                      pagination={true}
                      paginationPageSize={20}
                      columnDefs={columns}
                      defaultColDef={defaultColDef}
                      enableBrowserTooltips={true}
                      tooltipShowDelay={{ tooltipShowDelay: 0 }}
                      rowData={selectedRulesList}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadPresetJsonFiles;
