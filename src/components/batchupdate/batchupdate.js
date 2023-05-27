import React, { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Video from "./video/video";
import Audio from "./audio/audio";
import System from "./system/system";
import FirmwareUpdate from "./FirmwareUpdate/firmwareupdate";
import PcVision from './pcVision/pcVision';

import {
  handleAudioClick,
  handleTSClick,
  handleVideoClick,
  handleSystemClick,
  handleFirmwareUpdateClick,
  handlePcvisionClick,
} from "./clickhandler/clickhandler";
import TS from "./ts/ts";
import VCDMSservice from "../../services/http.service";
import "./batchupdate.css";
import _ from "underscore";
import AdvSettings from "./advancesettings/advsettings";
import { toast } from "react-toastify";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import Loader from "../../common/loader";

let defaultProperties = {
  model: "",
  audio1_bitrate: "",
  audio1_channel: "",
  audio1_ch: "",
  audio1_encoder: "",
  audio1_enc: "",
  audio1_gain: "",
  audio1_samplerate: "",
  audio1_source: "",
  audio1_dialnorm: "",
  audio2_bitrate: "",
  audio2_channel: "",
  audio2_ch: "",
  audio2_encoder: "",
  audio2_enc: "",
  audio2_gain: "",
  audio2_samplerate: "",
  audio2_source: "",
  audio2_dialnorm: "",
  audio3_bitrate: "",
  audio3_channel: "",
  audio3_ch: "",
  audio3_encoder: "",
  audio3_enc: "",
  audio3_gain: "",
  audio3_samplerate: "",
  audio3_source: "",
  audio3_dialnorm: "",
  audio4_bitrate: "",
  audio4_channel: "",
  audio4_ch: "",
  audio4_encoder: "",
  audio4_enc: "",
  audio4_gain: "",
  audio4_samplerate: "",
  audio4_source: "",
  audio4_dialnorm: "",
  current_enc_preset: "",
  dash_advsettings: "",
  dash_bufferdepth: "",
  dash_location: "",
  dash_minbuffertime: "",
  dash_minupdateperiod: "",
  dash_presentationdelay: "",
  dash_segmentsize: "",
  enabled_outofbandmanagement: "",
  enabled_snmp: "",
  enable_vlan: "",
  enable_ssh: "",
  enable_telnet: "",
  enabled_vlan: "",
  enabled_ssh: "",
  enabled_telnet: "",
  video_mode: "",
  encoder1_status: "",
  encoder2_status: "",
  encoder3_status: "",
  encoder4_status: "",
  encoder_count: "",
  firmware_version: "",
  httpstreaming: "",
  input_framerate: "",
  input_resolution: "",
  input_mode: "",
  output_mode: "",
  legacy_stb_support: "",
  max_encoder_count: "",
  max_input_count: "",
  mgmt_gateway: "",
  mgmt_ip: "",
  mgmt_mac: "",
  mgmt_netmask: "",
  opstate: "",
  output_bitrate_mode: "",
  preset1: "",
  preset2: "",
  preset3: "",
  preset4: "",
  preset5: "",
  preset6: "",
  preset7: "",
  preset8: "",
  program1_audio_pid: "",
  program1_id: "",
  program1_pcr_pid: "",
  program1_pmt_pid: "",
  program1_video_pid: "",
  program2_audio_pid: "",
  program2_id: "",
  program2_pcr_pid: "",
  program2_pmt_pid: "",
  program2_video_pid: "",
  program3_audio_pid: "",
  program3_id: "",
  program3_pcr_pid: "",
  program3_pmt_pid: "",
  program3_video_pid: "",
  program4_audio_pid: "",
  program4_id: "",
  program4_pcr_pid: "",
  program4_pmt_pid: "",
  program4_video_pid: "",
  ssh_port: "",
  status: "",
  devicename: "",
  syslog_dest_ip: "",
  syslog_dest_port: "",
  syslog_dest_type: "",
  ts1_bitrate: "",
  ts1_bitratemode: "",
  ts1_bwidthoverhead: "",
  ts1_delivery: "",
  ts1_enableadaptivebitrate: "",
  ts1_encryption: "0",
  ts1_id: "1",
  ts1_interface: "",
  ts1_ip: "",
  ts1_latency: "",
  ts1_networkid: "",
  ts1_networkname: "",
  ts1_noemptyaf: "",
  ts1_org_networkid: "",
  ts1_passphrase: "",
  ts1_port: "",
  ts1_ratecontrol: "",
  ts1_srcport: "",
  ts1_srtmode: "",
  ts1_timeToLive: "",
  ts2_bitrate: "",
  ts2_bitratemode: "",
  ts2_bwidthoverhead: "",
  ts2_delivery: "",
  ts2_enableadaptivebitrate: "",
  ts2_encryption: "",
  ts2_id: "",
  ts2_interface: "",
  ts2_ip: "",
  ts2_latency: "",
  ts2_networkid: "",
  ts2_networkname: "",
  ts2_noemptyaf: "",
  ts2_org_networkid: "",
  ts2_passphrase: "",
  ts2_port: "",
  ts2_ratecontrol: "",
  ts2_srcport: "",
  ts2_srtmode: "",
  ts2_timeToLive: "",
  ts3_bitrate: "",
  ts3_bitratemode: "",
  ts3_bwidthoverhead: "",
  ts3_delivery: "",
  ts3_enableadaptivebitrate: "",
  ts3_encryption: "",
  ts3_id: "",
  ts3_interface: "",
  ts3_ip: "",
  ts3_latency: "",
  ts3_networkid: "",
  ts3_networkname: "",
  ts3_noemptyaf: "",
  ts3_org_networkid: "",
  ts3_passphrase: "",
  ts3_port: "",
  ts3_ratecontrol: "",
  ts3_srcport: "",
  ts3_srtmode: "",
  ts3_timeToLive: "",
  ts4_bitrate: "",
  ts4_bitratemode: "",
  ts4_bwidthoverhead: "",
  ts4_delivery: "",
  ts4_enableadaptivebitrate: "",
  ts4_encryption: "",
  ts4_id: "",
  ts4_interface: "",
  ts4_ip: "",
  ts4_latency: "",
  ts4_networkid: "",
  ts4_networkname: "",
  ts4_noemptyaf: "",
  ts4_org_networkid: "",
  ts4_passphrase: "",
  ts4_port: "",
  ts4_ratecontrol: "",
  ts4_srcport: "",
  ts4_srtmode: "",
  ts4_timeToLive: "",
  ts_gateway: "",
  ts_ip: "",
  ts_mac: "",
  ts_netmask: "",
  ts_vlanid: "",
  ts_mode: "",
  ts_type: "",
  username: "",
  video1_aspectratio: "",
  video1_bframe_count: "",
  video1_bitrate: "",
  video1_encoder: "",
  video1_fieldorder: "",
  video1_framerate: "",
  video1_iframe_interval: "",
  video1_h264_hrd_buffersize: "",
  video1_h264_encodingmode: "",
  video1_input_resolution: "",
  video1_output_resolution: "",
  video1_ratecontrol: "",
  video1_scalingmode: "",
  video1_source: "",
  video2_aspectratio: "",
  video2_bframe_count: "",
  video2_bitrate: "",
  video2_encoder: "",
  video2_fieldorder: "",
  video2_framerate: "",
  video2_iframe_interval: "",
  video2_h264_hrd_buffersize: "",
  video2_h264_encodingmode: "",
  video2_input_resolution: "",
  video2_output_resolution: "",
  video2_ratecontrol: "",
  video2_scalingmode: "",
  video2_source: "",
  video3_aspectratio: "",
  video3_bframe_count: "",
  video3_bitrate: "",
  video3_encoder: "",
  video3_fieldorder: "",
  video3_framerate: "",
  video3_iframe_interval: "",
  video3_h264_hrd_buffersize: "",
  video3_h264_encodingmode: "",
  video3_input_resolution: "",
  video3_output_resolution: "",
  video3_ratecontrol: "",
  video3_scalingmode: "",
  video3_source: "",
  video4_aspectratio: "",
  video4_bframe_count: "",
  video4_bitrate: "",
  video4_encoder: "",
  video4_fieldorder: "",
  video4_framerate: "",
  video4_iframe_interval: "",
  video4_h264_hrd_buffersize: "",
  video4_h264_encodingmode: "",
  video4_input_resolution: "",
  video4_output_resolution: "",
  video4_ratecontrol: "",
  video4_scalingmode: "",
  video4_source: "",
  uptime: "",
  snmp_dest_ip: "",
  snmp_community: "",
  input1_resolution: "",
  input2_resolution: "",
  input3_resolution: "",
  input4_resolution: "",
  input1_framerate: "",
  input2_framerate: "",
  input3_framerate: "",
  input4_framerate: "",
  video1_in: "",
  video2_in: "",
  video3_in: "",
  video4_in: "",
  Admin_CanChangeInput: "",
  Admin_CanConfigure: "",
  Admin_CanControlIR: "",
  Admin_IdleTimeout: "",
  Tech_CanChangeInput: "",
  Tech_CanConfigur: "",
  Tech_CanControlIR: "",
  Tech_IdleTimeout: "",
  User_CanChangeInput: "",
  User_CanConfigure: "",
  User_CanControlIR: "",
  User_IdleTimeout: "",
  Input1_Brightness: "",
  Input1_Contrast: "",
  Input1_Hue: "",
  Input1_Name: "",
  Input1_Saturation: "",
  enableIPv6: "",
  ts_ip_mode: "",
  Admin_Pin: "",
  Tech_Pin: "",
  User_Pin: "",
  ts_ipv6: "",
  ts_ipv6_gateway: "",
  ts_ipv6_prefix_length: "",
  ssh_port: "",
};

let BatchUpdate = (props) => {
  const [content, setContent] = useState("video");
  const [properties, setProperties] = useState(defaultProperties);
  const [videoMode, setVideoMode] = useState("1xHD+1xSD");
  const [outputMode, setOutputMode] = useState("UDP");
  const [tsType, setTsType] = useState("SPTS");
  const [outputBitrateMode, setOutputBitrateMode] = useState("");
  const [tsMode, setTsMode] = useState("");
  const [legacyStbSupport, setLegacyStbSupport] = useState("");
  const [checkboxIdentifier, setCheckboxIdentifier] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
  const [checkedDeviceData, setCheckedDeviceData] = useState([]);
  const [checkedDevicesIdentifier, setCheckedDevicesIdentifier] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedModel, setselectedModel] = useState("");
  const [firmwareFileforupdate, setFirmwareFileForUpdate] = useState("");
  const [upDateText, setUpdateText] = useState(<>Update</>);
  const [disable, setDisable] = useState(false);
  const [saveText, setSaveText] = useState("Save");
  const [stopText, setStopText] = useState("Stop");
  const [startText, setStartText] = useState("Start");
  let data = {};

  useEffect(() => {
    props.getAllDevices();
    props.fetchEncodersList();
  }, [])
  useEffect(() => {
    setContent("video");
  }, [selectedModel])
  const startEncoders = async (event) => {
    event.preventDefault();
    setStartText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Start
      </>
    );
    let data = {
      ipArray: [],
    };
    let ips = new Set();
    for (let i = 0; i < checkboxIdentifier.length; i++) {
      if (checkboxIdentifier[i]) {
        ips.add(checkedData[i].peerIP);
      }
    }

    for (let i = 0; i < checkedDevicesIdentifier.length; i++) {
      if (checkedDevicesIdentifier[i]) {
        ips.add(checkedDeviceData[i].peerIP);
      }
    }

    ips.forEach((value) => {
      data.ipArray.push(value);
    });

    let res = await VCDMSservice.CreateUpdate("startencodingmultiple", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.updated > 0) {
        alert("Selected streams are started");
      } else {
        alert(
          "Either no stream is selected or an error occured during updation"
        );
      }
    }
    setStartText("Start");
  };
  const updateFirmwareByUploadedFiles = async (e) => {
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
    e.preventDefault()
    data = {
      ipArray: [],
      file: firmwareFileforupdate,
      DeviceType: selectedModel,
    };

    let ips = new Set();
    for (let i = 0; i < checkboxIdentifier.length; i++) {
      if (checkboxIdentifier[i]) {
        ips.add(checkedData[i].peerIP);
      }
    }

    for (let i = 0; i < checkedDevicesIdentifier.length; i++) {
      if (checkedDevicesIdentifier[i]) {
        ips.add(checkedDeviceData[i].peerIP);
      }
    }

    ips.forEach((value) => {
      data.ipArray.push(value);
    });

    let res = await VCDMSservice.updateFirmwareByUploadedFile("updatefirmwarebyuploadedfile", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        await getUpdateDeviceStatus(data.ipArray.length, '')
      } else if (res.ack === "0") {
        let ips = res.ips;
        let stringsip = "";
        for (let i = 0; i < ips.length; i++) {
          stringsip = stringsip + ips[i] + " ";
        }
        await getUpdateDeviceStatus(data.ipArray.length - ips.length, stringsip)
      } else {
        setDisable(false);
        ErrorMessage(res.msg || "Something went wrong please try again");
      }
    } else {
      setDisable(false);
      ErrorMessage("Something went wrong please try again");
    }
    setUpdateText(<>Update</>)
  }

  const getUpdateDeviceStatus = async (x1, ack) => {
    let promise = new Promise((resolve, reject) => {
      let x = setInterval(async () => {
        let response = await VCDMSservice.get('getfirmwareupgradestatus')
          .then((res) => res.data).catch(e => {})
        if (response && Object.values(response).filter((itm) => itm >= 3).length == x1) {
          resolve('1');
          if (ack)
            ErrorMessage("Unable to update " + ack);
          else
            SuccessMessage("Batch Updated Successfully");
          clearInterval(x)
        }
      }, 20 * 1000);
    })
    promise.then(() => {

    }).catch(() => {

    }).finally(() => {
      setDisable(false);
    })
  }

  const SubmitFirmwareUpdate = async (event) => {
    event.preventDefault();
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
      ipArray: [],
      file: formData,
    };

    let ips = new Set();
    for (let i = 0; i < checkboxIdentifier.length; i++) {
      if (checkboxIdentifier[i]) {
        ips.add(checkedData[i].peerIP);
      }
    }

    for (let i = 0; i < checkedDevicesIdentifier.length; i++) {
      if (checkedDevicesIdentifier[i]) {
        ips.add(checkedDeviceData[i].peerIP);
      }
    }

    ips.forEach((value) => {
      data.ipArray.push(value);
    });
    let res = await VCDMSservice.uploadFile("updatefirmwaremultiple", data)
      .then((res) => res.data)
      .catch((err) => null);
    if (res) {
      if (res.ack === "1") {
        SuccessMessage("Successfully Updated Batch");
      } else if (res.ack === "0") {
        let ips = res.ips;
        let stringsip = "";
        for (let i = 0; i < ips.length; i++) {
          stringsip = stringsip + ips[i] + " ";
        }
        ErrorMessage("Unable to update " + stringsip);

      } else if (res.ack === "2") {
        ErrorMessage(res.msg);
      }
    } else {
      ErrorMessage("Something went wrong please try again");
    }
    setDisable(false);
    setUpdateText(<>Update</>)
  };


  const stopEncoders = async (event) => {
    event.preventDefault();
    setStopText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Stop
      </>
    );
    let data = {
      ipArray: [],
    };

    let ips = new Set();
    for (let i = 0; i < checkboxIdentifier.length; i++) {
      if (checkboxIdentifier[i]) {
        ips.add(checkedData[i].peerIP);
      }
    }

    for (let i = 0; i < checkedDevicesIdentifier.length; i++) {
      if (checkedDevicesIdentifier[i]) {
        ips.add(checkedDeviceData[i].peerIP);
      }
    }

    ips.forEach((value) => {
      data.ipArray.push(value);
    });

    let res = await VCDMSservice.CreateUpdate("stopencodingmultiple", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.updated > 0) {
        SuccessMessage("Selected streams are stopped");
      } else {
        ErrorMessage("Either no stream is selected or an error occured during updation");
      }
    }
    setStopText("Stop");
  };

  const updateEncoders = async (event) => {
    event.preventDefault();
    setSaveText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        Save
      </>
    );
    let pids_arr = ['id', 'audio_pid', 'pmt_pid', 'video_pid'];
    if (!props.customerData && !props.customerData.Username) {
      return;
    }
    let data = {
      data: null,
      ipArray: [],
    };
    let keys = _.keys(properties);
    let finalproperties = {};
    for (let i = 0; i < keys.length; i++) {
      if (properties[keys[i]] !== "") {
        if (keys[i] === "video1_bitrate") {
          let reso = properties["video1_output_resolution"];
          let resoint = Number.parseInt(
            reso.split("_")[1].slice(0, reso.split("_")[1].length - 1)
          );
          if (resoint > 480) {
            if (properties["video1_source"] === "MPEG2") {
              if (
                Number.parseInt(properties[keys[i]]) < 7000 &&
                Number.parseInt(properties[keys[i]]) > 24000
              ) {
                alert("Bitrate should be between 7000 to 24000");
                return;
              }
            } else if (properties["video1_source"] === "H264") {
              if (
                Number.parseInt(properties[keys[i]]) < 2000 &&
                Number.parseInt(properties[keys[i]]) > 24000
              ) {
                alert("Bitrate should be between 2000 to 24000");
                return;
              }
            }
          } else {
            if (properties["video1_source"] === "MPEG2") {
              if (
                Number.parseInt(properties[keys[i]]) < 1000 &&
                Number.parseInt(properties[keys[i]]) > 15000
              ) {
                alert("Bitrate should be between 1000 to 15000");
                return;
              }
            } else if (properties["video1_source"] === "H264") {
              if (
                Number.parseInt(properties[keys[i]]) < 500 &&
                Number.parseInt(properties[keys[i]]) > 8000
              ) {
                alert("Bitrate should be between 500 to 8000");
                return;
              }
            }
          }
        }
        if (keys[i] === "video2_bitrate") {
          let reso = properties["video2_output_resolution"];
          let resoint = Number.parseInt(
            reso.split("_")[1].slice(0, reso.split("_")[1].length - 1)
          );
          if (resoint > 480) {
            if (properties["video2_source"] === "MPEG2") {
              if (
                Number.parseInt(properties[keys[i]]) < 7000 &&
                Number.parseInt(properties[keys[i]]) > 24000
              ) {
                alert("Bitrate should be between 7000 to 24000");
                return;
              }
            } else if (properties["video2_source"] === "H264") {
              if (
                Number.parseInt(properties[keys[i]]) < 2000 &&
                Number.parseInt(properties[keys[i]]) > 24000
              ) {
                alert("Bitrate should be between 2000 to 24000");
                return;
              }
            }
          } else {
            if (properties["video2_source"] === "MPEG2") {
              if (
                Number.parseInt(properties[keys[i]]) < 1000 &&
                Number.parseInt(properties[keys[i]]) > 15000
              ) {
                alert("Bitrate should be between 1000 to 15000");
                return;
              }
            } else if (properties["video2_source"] === "H264") {
              if (
                Number.parseInt(properties[keys[i]]) < 500 &&
                Number.parseInt(properties[keys[i]]) > 8000
              ) {
                alert("Bitrate should be between 500 to 8000");
                return;
              }
            }
          }
        }


        if (properties['ts_type'] === "MPTS") {
          for (let a = 1; a < 5; a++) {
            // Internal checking (start) 
            for (let b = 0; b < 3; b++) {
              if (properties[`program${a}_${pids_arr[b]}`] !== '') {
                for (let c = b + 1; c < 4; c++) {
                  if (properties[`program${a}_${pids_arr[c]}`] !== '') {
                    if (properties[`program${a}_${pids_arr[b]}`] === properties[`program${a}_${pids_arr[c]}`]) {
                      alert(`program${a}_${pids_arr[b]} And program${a}_${pids_arr[c]} can not be same`);
                      return;
                    }
                  }
                }
              }
            }// Internal checking (end)

            // External checking (start) 
            if (a < 4) {
              for (let a1 = a + 1; a1 < 5; a1++) {
                for (let b = 0; b < 4; b++) {
                  if (properties[`program${a}_${pids_arr[b]}`] !== '') {
                    for (let c = 0; c < 4; c++) {
                      if (properties[`program${a1}_${pids_arr[c]}`] !== '') {
                        if (properties[`program${a}_${pids_arr[b]}`] === properties[`program${a1}_${pids_arr[c]}`]) {
                          alert(`program${a}_${pids_arr[b]} And program${a1}_${pids_arr[c]} can not be same`);
                          return;
                        }
                      }
                    }
                  }
                }
              }
            }
            // External checking (end)
          }
        }
        else if (properties['ts_type'] === "SPTS") {
          // internal checking for program_id, audio_id, video_id, pmt_id
          for (let j = 1; j < 5; j++) {
            for (let k = 0; k < 3; k++) {
              if (properties[`program${j}_${pids_arr[k]}`] !== '') {
                for (let h = k + 1; h < 4; h++) {
                  if (properties[`program${j}_${pids_arr[h]}`] !== '') {
                    if (properties[`program${j}_${pids_arr[k]}`] === properties[`program${j}_${pids_arr[h]}`]) {
                      alert(`program${j}_${pids_arr[k]} And program${j}_${pids_arr[h]} can not be same`);
                      return;
                    }
                  }
                }
              }
            }
          }
        }


        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program1_id"] === properties["program1_pcr_pid"]
        // ) {
        //   alert("Program ID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program1_id"] === properties["program1_pmt_pid"]
        // ) {
        //   alert("PMT PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program1_id"] === properties["program1_audio_pid"]
        // ) {
        //   alert("AUDIO PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program1_id"] === properties["program1_video_pid"]
        // ) {
        //   alert("VIDEO PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program1_pcr_pid"]
        // ) {
        //   alert("PMT PID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program1_audio_pid"]
        // ) {
        //   alert("PMT PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program1_video_pid"]
        // ) {
        //   alert("PMT PID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program1_audio_pid"]
        // ) {
        //   alert("PCR PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program1_video_pid"] === properties["program1_audio_pid"]
        // ) {
        //   alert("VIDEO PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_id"] !== "" &&
        //   properties["program2_pcr_pid"] !== "" &&
        //   properties["program2_id"] === properties["program2_pcr_pid"]
        // ) {
        //   alert("Program ID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_id"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program2_id"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("PMT PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_id"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program2_id"] === properties["program2_audio_pid"]
        // ) {
        //   alert("AUDIO PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_id"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program2_id"] === properties["program2_video_pid"]
        // ) {
        //   alert("VIDEO PID and Program ID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program2_pcr_pid"] !== "" &&
        //   properties["program2_pmt_pid"] === properties["program2_pcr_pid"]
        // ) {
        //   alert("PMT PID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program2_pmt_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("PMT PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program2_pmt_pid"] === properties["program2_video_pid"]
        // ) {
        //   alert("PMT PID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_pcr_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program2_pcr_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("PCR PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program2_video_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("VIDEO PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program2_id"] !== "" &&
        //   properties["program1_id"] === properties["program2_id"]
        // ) {
        //   alert("Both program id cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program1_id"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("Program ID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program2_pcr_pid"] !== "" &&
        //   properties["program1_id"] === properties["program2_pcr_pid"]
        // ) {
        //   alert("Program ID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program1_id"] === properties["program2_audio_pid"]
        // ) {
        //   alert("Program ID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_id"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program1_id"] === properties["program2_video_pid"]
        // ) {
        //   alert("Program ID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program2_id"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program2_id"]
        // ) {
        //   alert("Program ID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("Both PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program2_pcr_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program2_pcr_pid"]
        // ) {
        //   alert("PCR PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("AUDIO PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pmt_pid"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program1_pmt_pid"] === properties["program2_video_pid"]
        // ) {
        //   alert("VIDEO PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program2_id"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program2_id"]
        // ) {
        //   alert("Program ID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("PCR PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program2_PCR_pid"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program2_PCR_pid"]
        // ) {
        //   alert("Both PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("PCR PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_pcr_pid"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program1_pcr_pid"] === properties["program2_video_pid"]
        // ) {
        //   alert("PCR PID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program2_id"] !== "" &&
        //   properties["program1_audio_pid"] === properties["program2_id"]
        // ) {
        //   alert("Program ID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program1_audio_pid"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("AUDIO PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program2_PCR_pid"] !== "" &&
        //   properties["program1_audio_pid"] === properties["program2_PCR_pid"]
        // ) {
        //   alert("AUDIO PID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program1_audio_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("Both AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_audio_pid"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program1_audio_pid"] === properties["program2_video_pid"]
        // ) {
        //   alert("AUDIO PID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program2_id"] !== "" &&
        //   properties["program1_video_pid"] === properties["program2_id"]
        // ) {
        //   alert("Program ID and VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program2_pmt_pid"] !== "" &&
        //   properties["program1_video_pid"] === properties["program2_pmt_pid"]
        // ) {
        //   alert("VIDEO PID and PMT PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program2_PCR_pid"] !== "" &&
        //   properties["program1_video_pid"] === properties["program2_PCR_pid"]
        // ) {
        //   alert("VIDEO PID and PCR PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program2_audio_pid"] !== "" &&
        //   properties["program1_video_pid"] === properties["program2_audio_pid"]
        // ) {
        //   alert("VIDEO PID and AUDIO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["program1_video_pid"] !== "" &&
        //   properties["program2_video_pid"] !== "" &&
        //   properties["program1_video_pid"] === properties["program2_video_pid"]
        // ) {
        //   alert("Both VIDEO PID cannot be same");
        //   return;
        // }
        // if (
        //   properties["ts1_srcport"] !== "" &&
        //   properties["ts1_port"] !== "" &&
        //   properties["ts1_srcport"] === properties["ts1_port"]
        // ) {
        //   alert("Source Port and Destination Port cannot be same");
        //   return;
        // }
        // if (
        //   properties["ts2_srcport"] !== "" &&
        //   properties["ts2_port"] !== "" &&
        //   properties["ts2_srcport"] === properties["ts2_port"]
        // ) {
        //   alert("Source Port and Destination Port cannot be same");
        //   return;
        // }
        finalproperties[keys[i]] = properties[keys[i]];
      }
    }
    // finalproperties["program1_pcr_pid"] = finalproperties["program1_video_pid"];
    // finalproperties["program2_pcr_pid"] = finalproperties["program2_video_pid"];
    data.data = finalproperties;
    data["ActionType"] = "Update";
    data["ActionTime"] = new Date();
    data["Module"] = "Batch Update";
    data["Target"] = data.ipArray.toString();
    data["Username"] = props.customerData.Username;

    let ips = new Set();
    for (let i = 0; i < checkboxIdentifier.length; i++) {
      if (checkboxIdentifier[i]) {
        ips.add(checkedData[i].peerIP);
      }
    }

    for (let i = 0; i < checkedDevicesIdentifier.length; i++) {
      if (checkedDevicesIdentifier[i]) {
        ips.add(checkedDeviceData[i].peerIP);
      }
    }

    ips.forEach((value) => {
      data.ipArray.push(value);
    });

    let res = await VCDMSservice.CreateUpdate("savemultiplesession", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.updated > 0) {
        SuccessMessage("Batch Updated Succesfully");
      }
      else {
        ErrorMessage("Either no stream is selected or an error occured while updating the batch");
      }
    }
    setSaveText("Save");
  };

  if (content === "audio")
    data = (
      <Audio
        properties={properties}
        selectedModel={selectedModel}
        setProperties={setProperties}
        tsType={tsType}
        videoMode={videoMode}
        outputMode={outputMode}
      />
    );

  if (content === "ts")
    data = (
      <TS
        properties={properties}
        selectedModel={selectedModel}
        setProperties={setProperties}
        tsType={tsType}
        videoMode={videoMode}
        outputMode={outputMode}
        tsMode={tsMode}
        outputBitrateMode={outputBitrateMode}
        legacyStbSupport={legacyStbSupport}
      />
    );

  if (content === "video")
    data = (
      <Video
        properties={properties}
        selectedModel={selectedModel}
        setProperties={setProperties}
        tsType={tsType}
        videoMode={videoMode}
        outputMode={outputMode}
      />
    );

  if (content === "system")
    data = (
      <System
        properties={properties}
        selectedModel={selectedModel}
        setProperties={setProperties}
        setTsType={setTsType}
        setVideoMode={setVideoMode}
        setOutputMode={setOutputMode}
        setOutputBitrateMode={setOutputBitrateMode}
        setTsMode={setTsMode}
        setLegacyStbSupport={setLegacyStbSupport}
      />
    );
  if (content === "pcvision")
    data = (
      <PcVision
        properties={properties}
        selectedModel={selectedModel}
        setProperties={setProperties}
        customerData={props.customerData}
      />
    );
  if (content === "firmware") {
    data = (
      <FirmwareUpdate
        setFormData={setFormData}
        formData={formData}
        SubmitFirmwareUpdate={SubmitFirmwareUpdate}
        selectedModel={selectedModel}
        updateFirmwareByUploadedFiles={updateFirmwareByUploadedFiles}
        setFirmwareFileForUpdate={setFirmwareFileForUpdate}
        upDateText={upDateText}
        disable={disable}
      />
    );
  }

  let product = (
    <div>
      <AdvSettings
        regionList={props.regionList}
        systemList={props.systemList}
        ellvisList={props.ellvisList}
        deviceList={props.deviceList}
        setCheckedData={setCheckedData}
        setCheckboxIdentifier={setCheckboxIdentifier}
        setCheckedDeviceData={setCheckedDeviceData}
        setCheckedDevicesIdentifier={setCheckedDevicesIdentifier}
        setselectedModel={setselectedModel}
        selectedModel={selectedModel}
        encoders={props.encoders}
      />
      <div className="marb-15 text-right">
        <button
          className="btn btn-primary marl-15"
          onClick={(event) => updateEncoders(event)}
        >
          {saveText}
        </button>

        <button
          className="btn btn-danger marl-15"
          onClick={(event) => stopEncoders(event)}
        >
          {stopText}
        </button>

        <button
          className="btn btn-success marl-15"
          onClick={(event) => startEncoders(event)}
        >
          {startText}
        </button>
      </div>
      <Navbar
        videoClick={() => handleVideoClick(setContent)}
        audioClick={() => handleAudioClick(setContent)}
        tsClick={() => handleTSClick(setContent)}
        systemClick={() => handleSystemClick(setContent)}
        firmwareClick={() => handleFirmwareUpdateClick(setContent)}
        pcvisionClick={() => handlePcvisionClick(setContent)}
        selectedModel={selectedModel}
      />{" "}
      {data}{" "}
    </div>
  );
  return <React.Fragment>
    {disable ? <Loader clss='loader-contentV1 full-width' /> : <></>}
    {product}</React.Fragment>;
};

export default BatchUpdate;
