import React, { useState, useEffect } from "react";
import Navbar from "./navbar/navbar";
import Video from "./video/video";
import Audio from "./audio/audio";
import NetworkSettings from "./network/network";
import System from "./system/system";
import Preset from "./preset/preset";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./dashboard/dashboard";
import PcVison from "./pcVison/pcVisonSetting";
import ErrorMessage from "../../common/errorMsg";


import {
  handleAudioClick,
  handleNetworkClick,
  handlePresetClick,
  handleSystemClick,
  handleTSClick,
  handleVideoClick,
  handleDashboardClick,
  handlePcVisonClick,
} from "./clickhandler/clickhandler";
import TS from "./ts/ts";
import VCDMSservice from "../../services/http.service";
import Topinfo from "../topinfo/topinfo";
import "./encoder.css";

let defaultProperties = {
  model: "",
  audio1_bitrate: "",
  audio1_channel: "",
  audio1_encoder: "",
  audio1_gain: "",
  audio1_samplerate: "",
  audio1_source: "",
  audio1_dialnorm: "",
  audio2_bitrate: "",
  audio2_channel: "",
  audio2_encoder: "",
  audio2_gain: "",
  audio2_samplerate: "",
  audio2_source: "",
  audio2_dialnorm: "",
  audio3_bitrate: "",
  audio3_channel: "",
  audio3_encoder: "",
  audio3_gain: "",
  audio3_samplerate: "",
  audio3_source: "",
  audio3_dialnorm: "",
  audio4_bitrate: "",
  audio4_channel: "",
  audio4_encoder: "",
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
  Input1_IRLibrary: "",
  Input2_Brightness: "",
  Input2_Contrast: "",
  Input2_Hue: "",
  Input2_Name: "",
  Input2_Saturation: "",
  Input2_IRLibrary: "",
  Input3_Brightness: "",
  Input3_Contrast: "",
  Input3_Hue: "",
  Input3_Name: "",
  Input3_Saturation: "",
  Input3_IRLibrary: "",
  Input4_Brightness: "",
  Input4_Contrast: "",
  Input4_Hue: "",
  Input4_Name: "",
  Input4_Saturation: "",
  Input4_IRLibrary: "",
  enableIPv6: "",
  ts_ip_mode: "",
  Admin_Pin: "",
  Tech_Pin: "",
  User_Pin: "",
  ts_ipv6: "",
  ts_ipv6_gateway: "",
  ts_ipv6_prefix_length: "",
  ssh_port: "",
  push_enabled: '',
  push_interval_sec: '',
  push_url: '',
};

let defaultStatus = {
  current_enc_preset: "",
  encoder1_status: "5",
  encoder2_status: "5",
  encoder3_status: "5",
  encoder4_status: "5",
  encoder_count: "",
  input_framerate: "",
  input_resolution: "",
  mgmt_mac: "",
  opstate: "",
  status: "",
  ts_mac: "",
  uptime: "",
};
let interval = setInterval(() => { }, 3000);

let Encoder = (props) => {
  const [content, setContent] = useState("dashboard");
  const [response1Came, setResponse1Came] = useState(false);
  const [response2Came, setResponse2Came] = useState(false);
  const [status, setStatus] = useState(defaultStatus);
  const [properties, setProperties] = useState(defaultProperties);
  const [properties1, setProperties1] = useState(defaultProperties);
  const [loading, setLoading] = useState(false);
  const [presetState, setPresetState] = useState(false);

  const [videoMode, setVideoMode] = useState("1xHD");
  const [outputMode, setOutputMode] = useState("ASI");
  const [tsType, setTsType] = useState("SPTS");
  const [editProperties, setEditProperties] = useState(true);
  const [outputBitrateMode, setOutputBitrateMode] = useState("");
  const [tsMode, setTsMode] = useState("");
  const [legacyStbSupport, setLegacyStbSupport] = useState("");
  const [startState, setStartState] = useState(true);
  const [stopState, setStopState] = useState(false);
  const [encoderId, setEncoderId] = useState("");
  const [isStopped, SetisStopped] = useState(false);
  const [ircode, setircode] = useState("");
  const [remotetype, setremotetype] = useState("");
  const [inputport, setinputport] = useState("");
  const [srtOptimization, setSrtOptimization] = useState(false);
  const [presetOptimization, setPresetOptimization] = useState(false);
  const [enableOutOfBondMgmt, setEnableOutOfBondMgmt] = useState("Y");
  const [enableSnmp, setEnableSnmp] = useState("Y");
  const [enableIpv6, setEnableIpv6] = useState("Y");
  const [enableVlan, setEnableVlan] = useState('N');
  const [inputMode, setInputMode] = useState();
  const [warningMessages, setWarningMessages] = useState([]);
  const [spareIps, setSpareIps] = useState('');
  const [hotBackup, setHotBackup] = useState();
  const [enablePush, setEnablePush] = useState('')



  useEffect(() => {
    if (properties && properties.model !== "") {
      setProperties1(properties);
      setVideoMode(properties.video_mode);
      setOutputMode(properties.output_mode);
      setTsType(properties.ts_type);
      setEditProperties(false);
      setEnableOutOfBondMgmt(properties.enabled_outofbandmanagement);
      setEnableSnmp(properties.enabled_snmp);
      setEnableIpv6(properties.enableIPv6)
      setInputMode(properties.input_mode);
      setEnablePush(properties.push_enabled);
      setEnableVlan(properties.enableVlan)
    }
  }, [properties]);

  useEffect(() => {
    if (props.checkEncoderRefresh) {
      setTimeout(() => { getProperties() }, 4000);
    }
  }, [props.checkEncoderRefresh])

  useEffect(() => {
    if (props.resetDashboard) {
      setContent("dashboard");
      props.setResetDashboard(false);
    }
  }, [props.resetDashboard, props.setResetDashboard]);

  useEffect(() => {
    setContent(props.activeTab)
  }, [props.activeTab])

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
  }

  useEffect(() => {
    setProperties(defaultProperties);
    setProperties1(defaultProperties);
    setStatus(defaultStatus);
    setResponse1Came(false);
    setResponse2Came(false);
    setEditProperties(true);
    if (props.peerip) {
      getProperties();
    } else {
      setTimeout(() => {
        if (props.peerip === undefined) {
          clearInterval(interval);
        }
        setLoading(false);
      }, 2000);
    }
  }, [props.peerip]);

  useEffect(() => {
    decideLoaderState();
  }, [response1Came, response2Came]);

  useEffect(() => {
    clearInterval(interval);
    setEncoderId(props.encoderId);
    interval = setInterval(() => {
      // getProperties();
    }, 9000);
    return () => {
      clearInterval(interval);
    };
  }, [props.peerip, props.encoderId, props.callInterval]);

  const decideLoaderState = () => {
    if (response1Came && response2Came) {
      setLoading(false);
    }
  };

  const getStatus = async () => {
    let data = {
      ip: props.peerip,
    };

    VCDMSservice.getByBoj("getencoderstatus", data)
      .then((stat) => {
        if (stat.data) {
          setStatus(stat.data.devicestatus);
          setResponse1Came(true);
        } else {
          ErrorMessage("No Stream Information Found!!!");
          setStatus(defaultStatus);
          setResponse1Came(true);
        }
        if (stat.data.devicestatus) {
          if (stat.data.devicestatus.opstate === "Running") {
            setPresetState(true);
          } else if (stat.data.devicestatus.opstate === "Idle") {
            setPresetState(false);
          }
          if (stat.data.devicestatus.status === "active") {
            props.setStartState(false);
          } else if (
            stat.data.devicestatus.status === "stopped" ||
            stat.data.devicestatus.status === "stopping"
          ) {
            props.setStartState(true);
          }
        }
      })
      .catch((error) => {
        ErrorMessage(error);
        setStatus(defaultStatus);
        setResponse1Came(true);
      });
  };

  const getProperties = async () => {
    if (!props.peerip) return;
    if (props.encoderId) return;
    let data = {
      ip: props.peerip,
    };
    props.setEncoderRefresh(false);
    VCDMSservice.getByBoj("getencoderproperties", data)
      .then((prop) => {
        if (prop) {
          if (prop.data) {
            setSrtOptimization(prop.data.srtOptimization);
            setHotBackup(prop.data.hotBackup);
            setSpareIps(prop.data.spareIp ? prop.data.spareIp : '');
            setPresetOptimization(prop.data.presetOptimization);
            if (prop.data.warningMessagesArray) {
              setWarningMessages(prop.data.warningMessagesArray);
            }
            if (prop.data.properties) {
              setProperties(prop.data.properties);
            }
            setResponse2Came(true);
            if (prop.data.status) {
              setStatus(prop.data.status);
            }
            if (prop.data.ircode) {
              setircode(prop.data.ircode);
            }
            else {
              setircode('')
            }
            if (prop.data.remotetype) {
              setremotetype(prop.data.remotetype);
            } else {
              setremotetype('');
            }
            if (prop.data.inputport) {
              setinputport(prop.data.inputport);
            }
            else {
              setinputport('');
            }
            setResponse1Came(true);
            if (prop.data.status) {

              if (prop.data.status.opstate === "Running" || prop.data.status.rtsp_state === 'Running') {
                setPresetState(true);
                setStopState(true);
                setStartState(false);
              } else {
                setPresetState(false);
                setStopState(false);
                setStartState(true);
              }
            }
          }
        }
      })
      .catch((err) => {
        return;
      });
  };
  let data = (
    <Dashboard
      setUpdateEncoderDashboardCheckbox={
        props.setUpdateEncoderDashboardCheckbox
      }
      saveHistoryCheckbox={props.saveHistoryCheckbox}
      setSaveHistoryCheckbox={props.setSaveHistoryCheckbox}
      updateEncoderDashboardCheckbox={props.updateEncoderDashboardCheckbox}
      status={status}
      running={status ? (status.opstate === "Running" ? true : false) : false}
      encoderindex={props.encoderindex}
      model={properties.model}
      getProperties={getProperties}
      properties1={properties1}
      properties={properties}
      inputport={inputport}
      ircode={ircode}
      remotetype={remotetype}
      setProperties1={setProperties1}
      setProperties={setProperties}
      ellvisindex={props.ellvisindex}
      ellvisList={props.ellvisList}
      customerData={props.customerData}
      setClickedStream={props.setClickedStream}
      setUpdate={props.setUpdate}
      peerip={props.peerip}
      deviceList={props.deviceList}
      deviceindex={props.deviceindex}
      encoderId={props.encoderId}
      callInterval={props.callInterval}
      ip={props.ip}
      srtOptimization={srtOptimization}
      presetOptimization={presetOptimization}
      warningMessages={warningMessages}
      checkStreamsStatsRefresh={props.checkStreamsStatsRefresh}
      setCheckStreamsStatsRefresh={props.setCheckStreamsStatsRefresh}
      getAllDevices={props.getAllDevices}
      fetchEllvisList={props.fetchEllvisList}
      hotBackup={hotBackup}
      spareIps={spareIps}
    />
  );

  if (content === "audio")
    data = (
      <Audio
        properties={properties}
        properties1={properties1}
        setProperties1={setProperties1}
        outputMode={outputMode}
        videoMode={videoMode}
        inputMode={inputMode}
      />
    );
  if (content === "ts")
    data = (
      <TS
        properties={properties}
        properties1={properties1}
        setProperties1={setProperties1}
        outputMode={outputMode}
        videoMode={videoMode}
        tsType={tsType}
        tsMode={tsMode}
        outputBitrateMode={outputBitrateMode}
        legacyStbSupport={legacyStbSupport}
        allEncoders={props.encoders}
      />
    );
  if (content === "network")
    data = (
      <NetworkSettings
        enablePush={enablePush}
        properties={properties}
        properties1={properties1}
        setProperties1={setProperties1}
        enableOutOfBondMgmt={enableOutOfBondMgmt}
        enableSnmp={enableSnmp}
        enableIpv6={enableIpv6}
        enableVlan={enableVlan}
      />
    );

  if (content === "system")
    data = (
      <System
        setEnablePush={setEnablePush}
        properties={properties}
        peerip={props.peerip}
        setEllvisList={props.setEllvisList}
        IP={props.ip}
        properties1={properties1}
        setProperties1={setProperties1}
        setVideoMode={setVideoMode}
        setOutputMode={setOutputMode}
        setTsType={setTsType}
        setOutputBitrateMode={setOutputBitrateMode}
        setTsMode={setTsMode}
        setLegacyStbSupport={setLegacyStbSupport}
        customerData={props.customerData}
        setStartState={setStartState}
        startState={startState}
        stopState={stopState}
        setStopState={stopState}
        isStopped={isStopped}
        SetisStopped={SetisStopped}
        setEnableOutOfBondMgmt={setEnableOutOfBondMgmt}
        setEnableSnmp={setEnableSnmp}
        setInputMode={setInputMode}
        setEnableIpv6={setEnableIpv6}
        setEnableVlan={setEnableVlan}
      />
    );

  if (content === "preset")
    data = (
      <Preset
        properties={properties}
        peerip={props.peerip}
        setProperties={setProperties}
        properties1={properties1}
        setProperties1={setProperties1}
        customerData={props.customerData}
      />
    );
  if (content === "pcVision")
    data = (
      <PcVison
        properties={properties}
        peerip={props.peerip}
        setProperties={setProperties}
        properties1={properties1}
        setProperties1={setProperties1}
        customerData={props.customerData}
      />
    );
  if (content === "video")
    data = (
      <Video
        status={status}
        properties={properties}
        running={status ? (status.opstate === "Running" ? true : false) : false}
        properties1={properties1}
        setProperties1={setProperties1}
        outputMode={outputMode}
        videoMode={videoMode}
        inputMode={inputMode}
      />
    );
  let top = <></>;
  if (props.deviceList.length > 0) {
    if (props.deviceindex !== undefined) {
      if (
        props.deviceList[props.deviceindex].DeviceType !== "ELLVIS9000V3" ||
        (props.ellvisList.length > 0 &&
          props.ellvisindex !== undefined &&
          props.ellvisList[props.ellvisindex].ConnectedDevice &&
          props.encoderindex !== undefined &&
          props.ellvisList[props.ellvisindex].ConnectedDevice[
          props.encoderindex
          ] !== undefined &&
          props.ellvisList[props.ellvisindex].ConnectedDevice[
            props.encoderindex
          ].IsEncoderNeeded !== false && (props.ellvisList[props.ellvisindex].ConnectedDevice[props.encoderindex].properties !== null && props.ellvisList[props.ellvisindex].ConnectedDevice[props.encoderindex].properties === null))
      ) {
        top = (
          <>
            <Topinfo
              startState={startState}
              stopState={stopState}
              setStartState={setStartState}
              setStopState={setStopState}
              properties={properties}
              peerip={props.peerip}
              setStatus={setStatus}
              statusvar={status}
              properties1={properties1}
              setProperties1={setProperties1}
              setProperties={setProperties}
              presetState={presetState}
              setPresetState={setPresetState}
              getProperties={getProperties}
              getStatus={getStatus}
              customerData={props.customerData}
              RegionID={props.RegionID}
              SystemID={props.SystemID}
              deviceip={props.deviceip}
              SetisStopped={SetisStopped}
              isStopped={isStopped}
            />
            <Navbar
              videoClick={() => handleVideoClick(setContent)}
              audioClick={() => handleAudioClick(setContent)}
              tsClick={() => handleTSClick(setContent)}
              networkClick={() => handleNetworkClick(setContent)}
              systemClick={() => handleSystemClick(setContent)}
              presetClick={() => handlePresetClick(setContent)}
              dashboardClick={() => handleDashboardClick(setContent)}
              pcVisonClick={() => handlePcVisonClick(setContent)}
              match={props.match}
              properties={properties}
            />
          </>
        );
      }
    }
  }
  let product = (
    <div>
      {top}
      {data}
    </div>
  );

  return <React.Fragment>{product}</React.Fragment>;
};

export default Encoder;