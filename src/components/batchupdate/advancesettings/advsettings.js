import React, { useState, useEffect } from "react";
import "./../batchupdate.css";
import "./adv.css";
import _ from "underscore";
import CommonUtils from "../../../common/CommonUtils"

let AdvSettings = (props) => {
  const [currentSelectedRegion, setCurrentSelectedRegion] = useState(-1);
  const [currentSelectedSystem, setCurrentSelectedSystem] = useState(-1);
  const [currentVideoMode, setCurrentVideoMode] = useState("");
  const [currentTsType, setCurrentTsType] = useState("");
  const [currentModel, setCurrentModel] = useState("");
  const [models, setModels] = useState([]);
  const [modelData, setModelData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [videoEncoder, setVideoEncoder] = useState("");
  const [componentsToShow, setComponentsToShow] = useState([]);
  const [option, setOption] = useState([
    "audiobitrate",
    "audiocodec",
    "audiodialnorm",
    "audiogain",
    "audiomode",
    "dashsegmentsize",
    "destinationip",
    "destinationport",
    "fwversion",
    "inputmode",
    "outputmode",
    "tsmode",
    "tsprotocol",
    "tstype",
    "uptime",
    "videobframecount",
    "videobitrate",
    "videocodec",
    "videoiframeinterval",
    "videomode",
    "videooutputresolution",
  ]);
  const [selectFilter, setSelectFilter] = useState("");
  const [selectedStreams, setSelectedStreams] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const selectAll = true;
  const [selectAllDevices, setSelectAllDevices] = useState(true);
  const changeSelects = true;
  const [changeSelectsDevices, setChangeSelectsDevices] = useState(true);
  const [videoBitrate, setVideoBitrate] = useState("");
  const [videoOutputResolution, setVideoOutputResolution] = useState("");
  const [videoIframeInterval, setVideoIframeInterval] = useState("");
  const [videoBframeCount, setVideoBframeCount] = useState("");
  const [audioCodec, setAudioCodec] = useState("");
  const [audioBitrate, setAudioBitrate] = useState("");
  const [audioMode, setAudioMode] = useState("");
  const [audioGain, setAudioGain] = useState("");
  const [audiodialnorm, setDialnorm] = useState("");
  const [tsProtocol, setTsProtocol] = useState("");
  const [destinationIP, setDestinationIP] = useState("");
  const [destinationPort, setDestinationPort] = useState("");
  const [dashSegmentSize, setDashSegmentSize] = useState("");
  const [inputMode, setInputMode] = useState("");
  const [outputMode, setOutputMode] = useState("");
  const [tsMode, setTsMode] = useState("");
  const [fwVersion, setFwVersion] = useState("");
  const [uptime, setUptime] = useState("");
  const [videoBitrateCondition, setVideoBitrateCondition] = useState("");
  const [uptimeCondition, setUptimeCondition] = useState("");
  const [regionAlert, setRegionAlert] = useState("hidden");
  const [systemAlert, setSystemAlert] = useState("hidden");
  const [modelAlert, setModelAlert] = useState("hidden");
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    if (props.regionList.length > 0 && props.systemList.length > 0) {
      let modelsTemp = {};
      for (let j = 0; j < props.deviceList.length; j++) {
        if (
          currentSelectedRegion !== -1 &&
          props.deviceList[j].RegionID ===
          props.regionList[currentSelectedRegion]._id
        ) {
          if (
            currentSelectedSystem !== -1 &&
            props.deviceList[j].SystemID ===
            props.systemList[currentSelectedSystem]._id
          ) {
            if (props.deviceList[j].DeviceType === "LEGACY" || props.deviceList[j].DeviceType === "ELLVIS9000V3") continue;
            if (modelsTemp.hasOwnProperty(props.deviceList[j].DeviceType)) {
              modelsTemp[props.deviceList[j].DeviceType].push({
                typedata: "device",
                device: props.deviceList[j],
                properties: {
                  model: props.deviceList[j].DeviceType.substring(0, 4),
                  devicename: props.deviceList[j].DeviceName
                },
                deviceindex: j,
              });
            } else {
              let temp = [];
              temp.push({
                typedata: "device",
                device: props.deviceList[j],
                properties: {
                  model: props.deviceList[j].DeviceType.substring(0, 4),
                  devicename: props.deviceList[j].DeviceNames
                },
                // ellvisindex: i,
                deviceindex: j,
              });
              modelsTemp[props.deviceList[j].DeviceType] = temp;
            }
          }
        }
      }
      let keys = _.keys(modelsTemp);
      setModels(CommonUtils.getDeviceTypeByModelArray(keys));
      // }
      setModelData(modelsTemp);
    }
  }, [
    currentSelectedRegion,
    currentSelectedSystem,
    currentVideoMode,
    currentTsType,
    videoEncoder,
    props.ellvisList,
    props.regionList,
    props.systemList,
    props.deviceList,
  ]);

  useEffect(() => {
    if (audioCodec !== "AC3") {
      let comp = [...componentsToShow];
      let index = null;
      for (let i = 0; i < comp.length; i++) {
        if (comp[i] === "audiodialnorm") {
          index = i;
          break;
        }
      }
      if (index !== null) {
        comp.splice(index, 1);
        let opt = [...option];
        opt.push("audiodialnorm");
        opt.sort();
        setDialnorm("");
        setOption(opt);
        setComponentsToShow(comp);
      }
    }
  }, [audioCodec, componentsToShow, option]);

  useEffect(() => {
    props.setCheckboxIdentifier(selectedStreams);
    props.setCheckedData(tableData);
    props.setCheckedDeviceData(devices);
    props.setCheckedDevicesIdentifier(selectedDevices);
  }, [tableData, selectedStreams, props, devices, selectedDevices]);

  useEffect(() => {
    if (changeSelects) {
      if (selectAll) {
        setSelectedStreams(new Array(tableData.length).fill(true));
      } else {
        setSelectedStreams(new Array(tableData.length).fill(false));
      }
    }
    if (changeSelectsDevices) {
      if (selectAllDevices) {
        setSelectedDevices(new Array(devices.length).fill(true));
      } else {
        setSelectedDevices(new Array(devices.length).fill(false));
      }
    }
  }, [
    selectAll,
    tableData,
    changeSelects,
    devices,
    selectAllDevices,
    changeSelectsDevices,
  ]);

  const videoBitrateCheck = (bitrate) => {
    if (
      videoBitrateCondition === "1" &&
      Number.parseInt(bitrate) > Number.parseInt(videoBitrate)
    ) {
      return true;
    }
    if (
      videoBitrateCondition === "-1" &&
      Number.parseInt(bitrate) < Number.parseInt(videoBitrate)
    ) {
      return true;
    }
    if (
      videoBitrateCondition === "0" &&
      Number.parseInt(bitrate) === Number.parseInt(videoBitrate)
    ) {
      return true;
    }
    return false;
  };

  const uptimeCheck = (passedUptime) => {
    let uptimeArr = passedUptime.split(":");
    let days = Number.parseInt(uptimeArr[0]);
    let hours = Number.parseInt(uptimeArr[1]);
    let minutes = Number.parseInt(uptimeArr[2]);
    let secs = Number.parseInt(uptimeArr[3]);
    let uptimeArrCurrent = uptime.split(":");
    let daysCurrent = Number.parseInt(uptimeArrCurrent[0]);
    let hoursCurrent = Number.parseInt(uptimeArrCurrent[1]);
    let minutesCurrent = Number.parseInt(uptimeArrCurrent[2]);
    let secsCurrent = Number.parseInt(uptimeArrCurrent[3]);

    if (uptimeCondition === "1") {
      if (days > daysCurrent) {
        return true;
      }
      else if (days === daysCurrent) {
        if (days > daysCurrent) {
          return true;
        }
        else if (days === daysCurrent) {
          if (hours > hoursCurrent) {
            return true;
          }
          else if (hours === hoursCurrent) {
            if (minutes > minutesCurrent) {
              return true;
            }
            else if (minutes === minutesCurrent) {
              if (secs > secsCurrent) {
                return true;
              }
              else if (secs === secsCurrent) {
                return true;
              }
              else return false;
            }
            else return false;
          }
          else return false;
        }
        else return false;
      }
      else return false;
    }
    if (uptimeCondition === "-1") {
      if (days < daysCurrent) {
        return true;
      }
      else if (days === daysCurrent) {
        if (days < daysCurrent) {
          return true;
        }
        else if (days === daysCurrent) {
          if (hours < hoursCurrent) {
            return true;
          }
          else if (hours === hoursCurrent) {
            if (minutes < minutesCurrent) {
              return true;
            }
            else if (minutes === minutesCurrent) {
              if (secs < secsCurrent) {
                return true;
              }
              else if (secs === secsCurrent) {
                return true;
              }
              else return false;
            }
            else return false;
          }
          else return false;
        }
        else return false;
      }
      else return false;

    }

    return true;
  };

  const addFilter = (event) => {
    event.preventDefault();
    if (selectFilter === "") {
      return;
    }

    let x = [...componentsToShow];
    x.push(selectFilter);
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

    if (x === "audiocodec") {
      let deleteindex = null;
      for (let i = 0; i < comp.length; i++) {
        if ("audiodialnorm" === comp[i]) {
          deleteindex = i;
          break;
        }
      }
      if (deleteindex !== null) {
        comp.splice(deleteindex, 1);
        opt.push("audiodialnorm");
      }
    }

    opt.push(x);
    if (x === "tstype") setCurrentTsType("");
    if (x === "videomode") setCurrentVideoMode("");
    if (x === "videocodec") setVideoEncoder("");
    if (x === "videobitrate") setVideoBitrate("");
    if (x === "videooutputresolution") setVideoOutputResolution("");
    if (x === "videoiframeinterval") setVideoIframeInterval("");
    if (x === "videobframecount") setVideoBframeCount("");
    if (x === "audiocodec") setAudioCodec("");
    if (x === "audiobitrate") setAudioBitrate("");
    if (x === "audiomode") setAudioMode("");
    if (x === "audiogain") setAudioGain("");
    if (x === "audiodialnorm") setDialnorm("");
    if (x === "tsprotocol") setTsProtocol("");
    if (x === "destinationip") setDestinationIP("");
    if (x === "destinationport") setDestinationPort("");
    if (x === "dashsegmentsize") setDashSegmentSize("");
    if (x === "inputmode") setInputMode("");
    if (x === "outputmode") setOutputMode("");
    if (x === "tsmode") setTsMode("");
    if (x === "fwversion") setFwVersion("");
    if (x === "uptime") setUptime("");
    opt.sort();
    setOption(opt);
    setComponentsToShow(comp);
  };
  const toggleSelectAllDevices = () => {
    setChangeSelectsDevices(true);
    setSelectAllDevices(!selectAllDevices);
  };

  const toggleSelectDevices = async (index) => {
    setChangeSelectsDevices(false);
    let x = selectedDevices.map((item, i) => (index === i ? !item : item));
    setSelectedDevices(x);
    for (let i = 0; i < devices.length; i++) {
      if (x[i] === false) {
        setSelectAllDevices(false);
        break;
      }
    }
  };

  const searchWithFilters = (event) => {
    let streams = [];
    event.preventDefault();
    if (
      currentModel === "" &&
      currentSelectedRegion === -1 &&
      currentSelectedSystem === -1
    ) {
      setModelAlert("");
      setRegionAlert("");
      setSystemAlert("");
      return;
    }

    if (currentModel === "" && currentSelectedRegion === -1) {
      setModelAlert("");
      setRegionAlert("");
      return;
    }

    if (currentSelectedRegion === -1 && currentSelectedSystem === -1) {
      setRegionAlert("");
      setSystemAlert("");
      return;
    }

    if (currentModel === "" && currentSelectedSystem === -1) {
      setModelAlert("");
      setSystemAlert("");
      return;
    }

    if (currentSelectedRegion === -1) {
      setRegionAlert("");
      return;
    }
    if (currentSelectedSystem === -1) {
      setSystemAlert("");
      return;
    }
    if (currentModel === "") {
      setModelAlert("");
      return;
    }

    for (let x in modelData) {
      if (currentModel !== "" && x === currentModel) {
        let arr1 = modelData[x];
        let arr = [];
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < props.encoders.length; j++) {
            if (arr1[i].device.IP === props.encoders[j].peerIP) {
              arr.push(props.encoders[j])
            }
          }
        }
        for (let i = 0; i < arr.length; i++) {
          if (
            currentSelectedRegion !== -1 &&
            props.regionList[currentSelectedRegion]._id ===
            arr1[i].device.RegionID
          ) {
            if (
              currentSelectedSystem !== -1 &&
              props.systemList[currentSelectedSystem]._id ===
              arr1[i].device.SystemID
            ) {
              if (
                currentModel !== "" &&
                currentModel.includes(arr[i].properties ? (arr[i].properties.model).substring(0, 3) : null)
              ) {
                if (
                  currentVideoMode === "" ||
                  currentVideoMode === arr[i].properties.video_mode
                ) {
                  if (
                    currentTsType === "" ||
                    currentTsType === arr[i].properties.ts_type
                  ) {
                    if (
                      videoEncoder === "" ||
                      videoEncoder === arr[i].properties.video1_encoder ||
                      videoEncoder === arr[i].properties.video2_encoder
                    ) {
                      if (
                        audioBitrate === "" ||
                        audioBitrate === arr[i].properties.audio1_bitrate ||
                        audioBitrate === arr[i].properties.audio2_bitrate
                      ) {
                        if (
                          audioCodec === "" ||
                          audioCodec === arr[i].properties.audio1_encoder
                        ) {
                          if (
                            audioGain === "" ||
                            audioGain === arr[i].properties.audio1_gain ||
                            audioGain === arr[i].properties.audio2_gain
                          ) {
                            if (
                              audioMode === "" ||
                              audioMode === arr[i].properties.audio1_channel ||
                              audioMode === arr[i].properties.audio2_channel
                            ) {
                              if (
                                dashSegmentSize === "" ||
                                dashSegmentSize ===
                                arr[i].properties.dash_segmentsize
                              ) {
                                if (
                                  destinationIP === "" ||
                                  destinationIP === arr[i].properties.ts1_ip ||
                                  destinationIP === arr[i].properties.ts2_ip
                                ) {
                                  if (
                                    destinationPort === "" ||
                                    destinationPort ===
                                    arr[i].properties.ts1_port ||
                                    destinationPort ===
                                    arr[i].properties.ts2_port
                                  ) {
                                    if (
                                      audiodialnorm === "" ||
                                      audiodialnorm ===
                                      arr[i].properties.audio1_dialnom ||
                                      audiodialnorm ===
                                      arr[i].properties.audio2_dialnom
                                    ) {
                                      if (
                                        fwVersion === "" ||
                                        fwVersion ===
                                        arr[i].properties.firmware_version
                                      ) {
                                        if (
                                          inputMode === "" ||
                                          inputMode ===
                                          arr[i].properties.input_mode
                                        ) {
                                          if (
                                            outputMode === "" ||
                                            outputMode ===
                                            arr[i].properties.output_mode
                                          ) {
                                            if (
                                              videoOutputResolution === "" ||
                                              videoOutputResolution ===
                                              arr[i].properties
                                                .video1_output_resolution ||
                                              videoOutputResolution ===
                                              arr[i].properties
                                                .video2_output_resolution
                                            ) {
                                              if (
                                                tsMode === "" ||
                                                tsMode ===
                                                arr[i].properties.ts_mode
                                              ) {
                                                if (
                                                  videoBframeCount === "" ||
                                                  videoBframeCount ===
                                                  arr[i].properties
                                                    .video1_bframe_count ||
                                                  videoBframeCount ===
                                                  arr[i].properties
                                                    .video2_bframe_count
                                                ) {
                                                  if (
                                                    videoBitrate === "" ||
                                                    videoBitrateCheck(
                                                      arr[i].properties
                                                        .video1_bitrate
                                                    ) ||
                                                    videoBitrateCheck(
                                                      arr[i].properties
                                                        .video2_bitrate
                                                    )
                                                  ) {
                                                    if (
                                                      videoIframeInterval ===
                                                      "" ||
                                                      videoIframeInterval ===
                                                      arr[i].properties
                                                        .video1_iframe_interval ||
                                                      videoIframeInterval ===
                                                      arr[i].properties
                                                        .video2_iframe_interval
                                                    ) {
                                                      if (
                                                        uptime === "" ||
                                                        uptimeCheck(
                                                          arr[i].properties
                                                            .uptime
                                                        )
                                                      ) {
                                                        if (
                                                          tsProtocol === "" ||
                                                          tsProtocol ===
                                                          arr[i].properties
                                                            .ts1_delivery ||
                                                          tsProtocol ===
                                                          arr[i].properties
                                                            .ts2_delivery
                                                        ) {
                                                          streams.push(arr[i]);
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    setDevices(streams);
  };

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Search</div>
          <div className="form-group top-filter-box">
            <label className="form-check-label filter-label float-left lineh30">
              Filters
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
                let text = "";
                if (value === "videomode") text = "Video Mode";
                if (value === "tstype") text = "TS Type";
                if (value === "videocodec") text = "Video Codec";
                if (value === "videobitrate") text = "Video Bitrate";
                if (value === "videooutputresolution")
                  text = "Video Output Resolution";
                if (value === "videoiframeinterval")
                  text = " Video I-Frame Interval";
                if (value === "videobframecount") text = "Video B-Frame Count";
                if (value === "audiocodec") text = "Audio Codec";
                if (value === "audiobitrate") text = "Audio Bitrate";
                if (value === "audiomode") text = "Audio Mode";
                if (value === "audiogain") text = "Audio Gain";
                if (value === "audiodialnorm" && audioCodec === "AC3")
                  text = "Audio Dialnorm";
                if (value === "tsprotocol") text = "TS Protocol";
                if (value === "destinationip") text = "Destination IP Address";
                if (value === "destinationport") text = "Destination Port";
                if (value === "dashsegmentsize") text = "Dash Segment Size";
                if (value === "inputmode") text = "Input Mode";
                if (value === "outputmode") text = "Output Mode";
                if (value === "tsmode") text = "TS Mode";
                if (value === "fwversion") text = "Firmware Version";
                if (value === "uptime") text = "Uptime";
                if (text !== "") return <option value={value}>{text}</option>;
                return '';
              })}
            </select>
            {/* <img 
              src={plusSrc}
              className="plus-svg"
              onClick={(event) => addFilter(event)}
              alt="plus"
            /> */}
            <span className="plus-box" onClick={(event) => addFilter(event)}>
              <i className="fa fa-plus"></i>
            </span>
          </div>
          <div className="user-form form-boxtopcont p-0">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Region<i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    value={currentSelectedRegion}
                    onChange={(event) => {
                      setRegionAlert("hidden");
                      setCurrentSelectedRegion(event.target.value);
                    }}
                  >
                    <option value={-1} hidden={true}>
                      Select
                    </option>

                    {props.regionList.map((value, index) => {
                      return (
                        <option key={"option" + index} value={index}>
                          {value.Region}
                        </option>
                      );
                    })}
                  </select>
                  <p className={regionAlert} style={{ color: "red" }}>
                    Please select region!
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    System<i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    value={currentSelectedSystem}
                    onChange={(event) => {
                      setSystemAlert("hidden");
                      setCurrentSelectedSystem(event.target.value);
                    }}
                  >
                    <option value={-1} hidden={true}>
                      Select
                    </option>
                    {props.systemList.map((value, index) => {
                      if (currentSelectedRegion === -1) {
                        return <></>;
                      }
                      if (
                        props.regionList[currentSelectedRegion]._id !==
                        value.RegionID
                      ) {
                        return <></>;
                      }
                      return <option value={index}>{value.System}</option>;
                    })}
                  </select>
                  <p className={systemAlert} style={{ color: "red" }}>
                    Please select system!
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">
                    Models<i style={{ color: "red" }}>*</i>
                  </label>
                  <select
                    className="form-control"
                    value={currentModel}
                    onChange={(event) => {
                      setModelAlert("hidden");
                      setCurrentModel(event.target.value);
                      props.setselectedModel(event.target.value);
                    }}
                  >
                    <option value="" hidden={false}>
                      Select
                    </option>
                    {models.map((value, index) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                  <p className={modelAlert} style={{ color: "red" }}>
                    Please select model!
                  </p>
                </div>
              </div>

              {componentsToShow.map((value, index) => {
                if (value === "videomode") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video Mode
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={currentVideoMode}
                          onChange={(event) =>
                            setCurrentVideoMode(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="1xHD">Single Stream(1xHD)</option>
                          <option value="1xHD+1xSD">
                            Dual Stream(1xHD+1xSD)
                          </option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "tstype") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          TS Types
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={currentTsType}
                          onChange={(event) =>
                            setCurrentTsType(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="MPTS">MPTS</option>
                          <option value="SPTS">SPTS</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "videocodec") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video Codec
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={videoEncoder}
                          onChange={(event) =>
                            setVideoEncoder(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="H264">H.264</option>
                          <option value="MPEG2">MPEG-2</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "videobitrate") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video Bitrate
                        </label>
                        <select
                          className="form-control form-select form-select2 form-select-custom"
                          value={videoBitrateCondition}
                          onChange={(event) =>
                            setVideoBitrateCondition(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="1">Greater</option>
                          <option value="0">Equal</option>
                          <option value="-1">Lesser</option>
                        </select>
                        <input
                          type="text"
                          className="form-control form-select form-select2 form-input-custom"
                          value={videoBitrate}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            setVideoBitrate(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "videooutputresolution") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video Output Resolution
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={videoOutputResolution}
                          onChange={(event) =>
                            setVideoOutputResolution(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="input">Follow Input</option>
                          <option value="1920_1080P">1920x1080P</option>
                          <option value="1920_1080I">1920x1080I</option>
                          <option value="1280_720P">1280x720P</option>
                          <option value="720_480P">720x480P</option>
                          <option value="720_480I">720x480I</option>
                          <option value="720_576I">720x576I</option>
                          <option value="640_480P">640x480P</option>
                          <option value="640_480I">640x480I</option>
                          <option value="480_320P">480x320P</option>
                          <option value="480_320I">480x320I</option>
                          <option value="320_256P">320x256P</option>
                          <option value="320_256I">320x256I</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "videoiframeinterval") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video I-Frame Interval
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={videoIframeInterval}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            setVideoIframeInterval(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "videobframecount") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Video B-Frame Count
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={videoBframeCount}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            setVideoBframeCount(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "audiocodec") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Audio Codec
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={audioCodec}
                          onChange={(event) =>
                            setAudioCodec(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="AAC_LC">AAC_LC</option>
                          <option value="AC3">AC3</option>
                          <option value="MP12">MP12</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "audiobitrate") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Audio Bitrate
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={audioBitrate}
                          onChange={(event) =>
                            setAudioBitrate(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="96000">96</option>
                          <option value="128000">128</option>
                          <option value="192000">192</option>
                          <option value="384000">384</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "audiomode") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Audio Mode
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={audioMode}
                          onChange={(event) => setAudioMode(event.target.value)}
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="STEREO">STEREO</option>
                          <option value="DUAL_MONO">DUAL MONO</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "audiogain") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Audio Gain(dB)
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={audioGain}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            if (
                              Number.parseInt(event.target.value) > 20 ||
                              Number.parseInt(event.target.value) < -20
                            )
                              return;
                            setAudioGain(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "audiodialnorm") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Audio Dialnorm(-dB)
                        </label>
                        <input
                          type="number"
                          className="form-control form-select form-select2"
                          value={audiodialnorm}
                          onChange={(event) => setDialnorm(event.target.value)}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "tsprotocol") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          TS Protocol
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={tsProtocol}
                          onChange={(event) =>
                            setTsProtocol(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="UDP">UDP</option>
                          <option value="SRT">SRT</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "destinationip") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Destination IP Address
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={destinationIP}
                          onChange={(event) => {
                            let string = event.target.value.split(":")[0];
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
                            setDestinationIP(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "destinationport") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Destination Port
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={destinationPort}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            setDestinationPort(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "dashsegmentsize") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Dash Segment Size
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={dashSegmentSize}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            setDashSegmentSize(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "inputmode") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Input Mode
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={inputMode}
                          onChange={(event) => setInputMode(event.target.value)}
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="1x3G">1X3G</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "outputmode") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Output Mode
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={outputMode}
                          onChange={(event) =>
                            setOutputMode(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="UDP">UDP</option>
                          <option value="ASI">ASI</option>
                          <option value="TCP">TCP</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "tsmode") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          TS Mode
                        </label>
                        <select
                          className="form-control form-select form-select2"
                          value={tsMode}
                          onChange={(event) => setTsMode(event.target.value)}
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="DVB">DVB</option>
                          <option value="ATSC">ATSC</option>
                        </select>
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "fwversion") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Firmware Version
                        </label>
                        <input
                          type="text"
                          className="form-control form-select form-select2"
                          value={fwVersion}
                          onChange={(event) => setFwVersion(event.target.value)}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                if (value === "uptime") {
                  return (
                    <div key={"filter" + index} className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label form-label-custom">
                          Uptime(dd:hh:mm:ss)
                        </label>
                        <select
                          className="form-control form-select form-select2 form-select-custom"
                          value={uptimeCondition}
                          onChange={(event) =>
                            setUptimeCondition(event.target.value)
                          }
                        >
                          <option value="" hidden={true}>
                            Select
                          </option>
                          <option value="1">Greater</option>
                          <option value="-1">Lesser</option>
                        </select>
                        <input
                          type="text"
                          className="form-control form-select form-select2 form-input-custom"
                          value={uptime}
                          onChange={(event) => {
                            if (event.target.value.match(/[^0-9:]/)) {
                              return;
                            }
                            setUptime(event.target.value);
                          }}
                        />
                        {/* <img
                          src={minusSrc}
                          className="minus-png"
                          onClick={(event) => removeFilter(event, index)}
                          alt="minus"
                        /> */}
                        <span
                          className="minus-box"
                          onClick={(event) => removeFilter(event, index)}
                        >
                          <i className="fa fa-minus"></i>
                        </span>
                      </div>
                    </div>
                  );
                }
                return '';
              })}
            </div>

            <div className="clear"></div>
          </div>
          <div className="row search-pos mt-0">
            <button
              className="btn btn-success"
              onClick={(event) => searchWithFilters(event)}
            >
              Search
            </button>
          </div>
          <div className="clear"></div>
          {/* {tableData.length > 0 && (
            <div className="pad-15 mar-20">
              <div className="form-boxdiv-gray">
                <div className="form-boxtopline7">Streams</div>
                <div className="stream-selectall">
                  <label className="form-check-label label-streams float-left">
                    All
                  </label>
                  <div className="sel-all-btnbox">
                    <input
                      type="checkbox"
                      className="checkbox-stream"
                      checked={selectAll}
                      onChange={() => toggleSelectAll()}
                    />
                  </div>
                </div>

                <div className="form-boxtopcont user-form">
                  <div className="ag-theme-alpine row">
                    {tableData.map((value, index) => {
                      return (
                        <div key={index} className="col-sm-3">
                          <div className="form-group">
                            <label
                              className="form-check-label enc-status"
                              for="firstAttribute"
                            >
                              {value.inputStream}
                            </label>
                            <input
                              type="checkbox"
                              className="enc-checkbox"
                              id="firstAttribute"
                              checked={selectedStreams[index]}
                              onChange={() => toggleSelect(index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )} */}
          {devices.length > 0 && (
            <div className="pad-15 mar-20">
              <div className="form-boxdiv-gray">
                <div className="form-boxtopline7">Devices</div>
                <div className="stream-selectall">
                  <label className="form-check-label label-streams float-left">
                    All
                  </label>
                  <div className="sel-all-btnbox">
                    <input
                      type="checkbox"
                      className="checkbox-stream"
                      checked={selectAllDevices}
                      onChange={() => toggleSelectAllDevices()}
                    />
                  </div>
                </div>

                <div className="form-boxtopcont user-form">
                  <div className="ag-theme-alpine row">
                    {devices.map((value, index) => {
                      return (
                        <div key={index} className="col-sm-3">
                          <div className="form-group">
                            <label
                              className="form-check-label enc-status"
                              for="firstAttribute"
                            >
                              {props.deviceList.map((val) => {
                                if ((val.IP.includes(value.peerIP))) { return <span>{val.DeviceName}</span> }
                                return '';
                              })}
                            </label>
                            <input
                              type="checkbox"
                              className="enc-checkbox"
                              id="firstAttribute"
                              checked={selectedDevices[index]}
                              onChange={() => toggleSelectDevices(index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvSettings;
