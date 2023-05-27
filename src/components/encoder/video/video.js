import React, { useState, useEffect } from "react";
import "./../encoder.css";
let Video = (props) => {
  const [video1Source, setVideo1Source] = useState('');
  const [video1SourceIn, setVideo1SourceIn] = useState('');
  const [video1Framerate, setVideo1Framerate] = useState('');
  const [video1InputResolution, setVideo1InputResolution] = useState('');
  const [video1Encoder, setVideo1Encoder] = useState('');
  const [video1H264Encodingmode, setVideo1H264Encodingmode] = useState('');
  const [video1H264HrdBuffersize, setVideo1H264HrdBuffersize] = useState('');
  const [video1BitRate, setVideo1BitRate] = useState('');
  const [video1OutputResolution, setVideo1OutputResolution] = useState('');
  const [video1AspectRatio, setVideo1AspectRatio] = useState('');
  const [video1Scalingmode, setVideo1Scalingmode] = useState('');
  const [video1Fieldorder, setVideo1Fieldorder] = useState('');
  const [video1Ratecontrol, setVideo1Ratecontrol] = useState('');
  const [video1IframeInterval, setVideo1IframeInterval] = useState('');
  const [video1BframeCount, setVideo1BframeCount] = useState('');
  const [encoder1Status, setEncoder1Status] = useState('');
  const [encodingModeClass1, setEncodingModeClass1] = useState('');
  const [QBAbox1, setQBAbox1] = useState('');
  const [closedCaption1, setclosedCaption1] = useState('');
  const [video1ccmode1, setvideo1ccmode1] = useState('');
  const [enableafd1, setenableafd1] = useState('');
  const [enableafdmode1, setenableafdmode1] = useState('');
  const [enableafddata1, setenableafddata1] = useState('');
  const [iFrameIntervalMax1, setIFrameIntervalMax1] = useState('');
  const [video2Source, setVideo2Source] = useState('');
  const [video2SourceIn, setVideo2SourceIn] = useState('');
  const [video2Framerate, setVideo2Framerate] = useState('');
  const [video2InputResolution, setVideo2InputResolution] = useState('');
  const [video2Encoder, setVideo2Encoder] = useState('');
  const [video2H264Encodingmode, setVideo2H264Encodingmode] = useState('');
  const [video2H264HrdBuffersize, setVideo2H264HrdBuffersize] = useState('');
  const [video2BitRate, setVideo2BitRate] = useState('');
  const [video2OutputResolution, setVideo2OutputResolution] = useState('');
  const [video2AspectRatio, setVideo2AspectRatio] = useState('');
  const [video2Scalingmode, setVideo2Scalingmode] = useState('');
  const [video2Fieldorder, setVideo2Fieldorder] = useState('');
  const [video2Ratecontrol, setVideo2Ratecontrol] = useState('');
  const [video2IframeInterval, setVideo2IframeInterval] = useState('');
  const [video2BframeCount, setVideo2BframeCount] = useState('');
  const [encoder2Status, setEncoder2Status] = useState('');
  const [encodingModeClass2, setEncodingModeClass2] = useState('');
  const [QBAbox2, setQBAbox2] = useState('');
  const [closedCaption2, setclosedCaption2] = useState('');
  const [video1ccmode2, setvideo1ccmode2] = useState('');
  const [enableafd2, setenableafd2] = useState('');
  const [enableafdmode2, setenableafdmode2] = useState('');
  const [enableafddata2, setenableafddata2] = useState('');
  const [iFrameIntervalMax2, setIFrameIntervalMax2] = useState('');
  const [video3Source, setVideo3Source] = useState('');
  const [video3SourceIn, setVideo3SourceIn] = useState('');
  const [video3Framerate, setVideo3Framerate] = useState('');
  const [video3InputResolution, setVideo3InputResolution] = useState('');
  const [video3Encoder, setVideo3Encoder] = useState('');
  const [video3H264Encodingmode, setVideo3H264Encodingmode] = useState('');
  const [video3H264HrdBuffersize, setVideo3H264HrdBuffersize] = useState('');
  const [video3BitRate, setVideo3BitRate] = useState('');
  const [video3OutputResolution, setVideo3OutputResolution] = useState('');
  const [video3AspectRatio, setVideo3AspectRatio] = useState('');
  const [video3Scalingmode, setVideo3Scalingmode] = useState('');
  const [video3Fieldorder, setVideo3Fieldorder] = useState('');
  const [video3Ratecontrol, setVideo3Ratecontrol] = useState('');
  const [video3IframeInterval, setVideo3IframeInterval] = useState('');
  const [video3BframeCount, setVideo3BframeCount] = useState('');
  const [encoder3Status, setEncoder3Status] = useState('');
  const [encodingModeClass3, setEncodingModeClass3] = useState('');
  const [QBAbox3, setQBAbox3] = useState('');
  const [closedCaption3, setclosedCaption3] = useState('');
  const [video1ccmode3, setvideo1ccmode3] = useState('');
  const [enableafd3, setenableafd3] = useState('');
  const [enableafdmode3, setenableafdmode3] = useState('');
  const [enableafddata3, setenableafddata3] = useState('');
  const [iFrameIntervalMax3, setIFrameIntervalMax3] = useState('');
  const [video4Source, setVideo4Source] = useState('');
  const [video4SourceIn, setVideo4SourceIn] = useState('');
  const [video4Framerate, setVideo4Framerate] = useState('');
  const [video4InputResolution, setVideo4InputResolution] = useState('');
  const [video4Encoder, setVideo4Encoder] = useState('');
  const [video4H264Encodingmode, setVideo4H264Encodingmode] = useState('');
  const [video4H264HrdBuffersize, setVideo4H264HrdBuffersize] = useState('');
  const [video4BitRate, setVideo4BitRate] = useState('');
  const [video4OutputResolution, setVideo4OutputResolution] = useState('');
  const [video4AspectRatio, setVideo4AspectRatio] = useState('');
  const [video4Scalingmode, setVideo4Scalingmode] = useState('');
  const [video4Fieldorder, setVideo4Fieldorder] = useState('');
  const [video4Ratecontrol, setVideo4Ratecontrol] = useState('');
  const [video4IframeInterval, setVideo4IframeInterval] = useState('');
  const [video4BframeCount, setVideo4BframeCount] = useState('');
  const [encoder4Status, setEncoder4Status] = useState('');
  const [encodingModeClass4, setEncodingModeClass4] = useState('');
  const [QBAbox4, setQBAbox4] = useState('');
  const [closedCaption4, setclosedCaption4] = useState('');
  const [video1ccmode4, setvideo1ccmode4] = useState('');
  const [enableafd4, setenableafd4] = useState('');
  const [enableafdmode4, setenableafdmode4] = useState('');
  const [enableafddata4, setenableafddata4] = useState('');
  const [iFrameIntervalMax4, setIFrameIntervalMax4] = useState('');
  useEffect(() => {
    setVideo1Source(props.properties1.video1_source);
    setVideo1Framerate((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_framerate) : (props.properties1.input1_framerate));
    setVideo1InputResolution((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_resolution) : (props.properties1.input1_resolution));
    setVideo1Encoder(props.properties1.video1_encoder);
    setVideo1H264Encodingmode(props.properties1.video1_encoder === 'MPEG2' ? '' : props.properties1.video1_h264_encodingmode);
    setVideo1H264HrdBuffersize(props.properties1.video1_h264_hrd_buffersize);
    setVideo1BitRate(props.properties1.video1_bitrate);
    setVideo1OutputResolution(props.properties1.video1_output_resolution);
    setVideo1AspectRatio(props.properties1.video1_aspectratio);
    setVideo1Scalingmode(props.properties1.video1_scalingmode);
    setVideo1Fieldorder(props.properties1.video1_fieldorder);
    setVideo1Ratecontrol(props.properties1.video1_ratecontrol);
    setVideo1IframeInterval(props.properties1.video1_iframe_interval);
    setVideo1BframeCount(props.properties1.video1_bframe_count);
    setEncoder1Status(props.properties1.encoder1_status);
    setQBAbox1(props.properties1.video1_qba);
    setclosedCaption1(props.properties1.video1_cc_enabled);
    setvideo1ccmode1(props.properties1.video1_ccmode);
    setenableafd1(props.properties1.video1_enable_afd);
    setenableafdmode1(props.properties1.video1_afdmode);
    setenableafddata1(props.properties1.video1_afd);
    setEncodingModeClass1(props.properties1.video1_encoder === "H264" ? "" : "not-visible");
    setVideo2Source(props.properties1.video2_source);
    setVideo2Framerate((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_framerate) : (props.properties1.input2_framerate));
    setVideo2InputResolution((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_resolution) : (props.properties1.input2_resolution));
    setVideo2Encoder(props.properties1.video2_encoder);
    setVideo2H264Encodingmode(props.properties1.video2_encoder === 'MPEG2' ? '' : props.properties1.video2_h264_encodingmode);
    setVideo2H264HrdBuffersize(props.properties1.video2_h264_hrd_buffersize);
    setVideo2BitRate(props.properties1.video2_bitrate);
    setVideo2OutputResolution(props.properties1.video2_output_resolution);
    setVideo2AspectRatio(props.properties1.video2_aspectratio);
    setVideo2Scalingmode(props.properties1.video2_scalingmode);
    setVideo2Fieldorder(props.properties1.video2_fieldorder);
    setVideo2Ratecontrol(props.properties1.video2_ratecontrol);
    setVideo2IframeInterval(props.properties1.video2_iframe_interval);
    setVideo2BframeCount(props.properties1.video2_bframe_count);
    setEncoder2Status(props.properties1.encoder2_status);
    setQBAbox2(props.properties1.video2_qba);
    setclosedCaption2(props.properties1.video2_cc_enabled);
    setvideo1ccmode2(props.properties1.video2_ccmode);
    setenableafd2(props.properties1.video2_enable_afd);
    setenableafdmode2(props.properties1.video2_afdmode);
    setenableafddata2(props.properties1.video2_afd);
    setEncodingModeClass2(props.properties1.video2_encoder === "H264" ? "" : "not-visible");
    setVideo3Source(props.properties1.video3_source);
    setVideo3Framerate((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_framerate) : (props.properties1.input3_framerate));
    setVideo3InputResolution((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_resolution) : (props.properties1.input3_resolution));
    setVideo3Encoder(props.properties1.video3_encoder);
    setVideo3H264Encodingmode(props.properties1.video3_encoder === 'MPEG2' ? '' : props.properties1.video3_h264_encodingmode);
    setVideo3H264HrdBuffersize(props.properties1.video3_h264_hrd_buffersize);
    setVideo3BitRate(props.properties1.video3_bitrate);
    setVideo3OutputResolution(props.properties1.video3_output_resolution);
    setVideo3AspectRatio(props.properties1.video3_aspectratio);
    setVideo3Scalingmode(props.properties1.video3_scalingmode);
    setVideo3Fieldorder(props.properties1.video3_fieldorder);
    setVideo3Ratecontrol(props.properties1.video3_ratecontrol);
    setVideo3IframeInterval(props.properties1.video3_iframe_interval);
    setVideo3BframeCount(props.properties1.video3_bframe_count);
    setEncoder3Status(props.properties1.encoder3_status);
    setQBAbox3(props.properties1.video3_qba);
    setclosedCaption3(props.properties1.video3_cc_enabled);
    setvideo1ccmode3(props.properties1.video3_ccmode);
    setenableafd3(props.properties1.video3_enable_afd);
    setenableafdmode3(props.properties1.video3_afdmode);
    setenableafddata3(props.properties1.video3_afd);
    setEncodingModeClass3(props.properties1.video3_encoder === "H264" ? "" : "not-visible");
    setVideo4Source(props.properties1.video4_source);
    setVideo4Framerate((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_framerate) : (props.properties1.input4_framerate));
    setVideo4InputResolution((props.properties1.model.substring(0, 4) === "RM11" || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4510C")) ? (props.properties1.input_resolution) : (props.properties1.input4_resolution));
    setVideo4Encoder(props.properties1.video4_encoder);
    setVideo4H264Encodingmode(props.properties1.video4_encoder === 'MPEG2' ? '' : props.properties1.video4_h264_encodingmode);
    setVideo4H264HrdBuffersize(props.properties1.video4_h264_hrd_buffersize);
    setVideo4BitRate(props.properties1.video4_bitrate);
    setVideo4OutputResolution(props.properties1.video4_output_resolution);
    setVideo4AspectRatio(props.properties1.video4_aspectratio);
    setVideo4Scalingmode(props.properties1.video4_scalingmode);
    setVideo4Fieldorder(props.properties1.video4_fieldorder);
    setVideo4Ratecontrol(props.properties1.video4_ratecontrol);
    setVideo4IframeInterval(props.properties1.video4_iframe_interval);
    setVideo4BframeCount(props.properties1.video4_bframe_count);
    setEncoder4Status(props.properties1.encoder4_status);
    setQBAbox4(props.properties1.video4_qba);
    setclosedCaption4(props.properties1.video4_cc_enabled);
    setvideo1ccmode4(props.properties1.video4_ccmode);
    setenableafd4(props.properties1.video4_enable_afd);
    setenableafdmode4(props.properties1.video4_afdmode);
    setenableafddata4(props.properties1.video4_afd);
    setEncodingModeClass4(props.properties1.video4_encoder === "H264" ? "" : "not-visible");
    setIFrameIntervalMax1(props.properties1.video1_encoder === "H264" ? "240" : "60");
    setIFrameIntervalMax2(props.properties1.video2_encoder === "H264" ? "240" : "60");
    setIFrameIntervalMax3(props.properties1.video3_encoder === "H264" ? "240" : "60");
    setIFrameIntervalMax4(props.properties1.video4_encoder === "H264" ? "240" : "60");
    setVideo1SourceIn(props.properties1.video1_in);
    setVideo2SourceIn(props.properties1.video2_in);
    setVideo3SourceIn(props.properties1.video3_in);
    setVideo4SourceIn(props.properties1.video4_in);
  }, [props.properties1, props.properties]);

  const getEncoderStatus = (encoding) => {
    let list = {
      0: { message: "Idle", classname: "enc-status-inside-blue" },
      1: {
        message: "Loading and Checking Parameters",
        classname: "enc-status-inside-yellow",
      },
      2: {
        message: "Valid video Input",
        classname: "enc-status-inside-orange",
      },
      3: { message: "Running", classname: "enc-status-inside-green" },
      4: { message: "Error", classname: "enc-status-inside-red" },
    };
    if (encoding) {
      return (
        <span className={list[encoding]["classname"]}>
          {list[encoding]["message"]}
        </span>
      );
    }
  };

  const getScalingMode = (aspect_ration) => {
    if (aspect_ration === "16_9") {
      return <option value="anamorphic">Anamorphic</option>;
    } else {
      return (
        <>
          <option value="anamorphic">Anamorphic</option>
          <option value="letterbox">Letterbox</option>
          <option value="centercut">Center cut </option>
        </>
      );
    }
  };

  const getBufferSizeList = () => {
    let list = [<option value="auto">Auto</option>];
    let start = 250;
    for (let i = 0; i < 19; i++) {
      list.push(<option value={start}>{start.toString() + "ms"}
      </option>);
      i > 0 ? start += 100 : start += 50;
    }
    return list;
  };

  const changeHandler = (event, setContent, type = "") => {
    let sample = { ...props.properties1 };
    let arr = ["video1_qba", "video1_cc_enabled", "video1_enable_afd", "video2_qba", "video2_cc_enabled", "video2_enable_afd", "video2_enable_afd", "video2_enable_afd", "video3_qba", "video3_cc_enabled", "video3_enable_afd", "video4_qba", "video4_cc_enabled", "video4_enable_afd"];
    for (let i = 0; i < arr.length; i++) {
      if (type === arr[i]) {
        event.target.checked ? setContent("Y") : setContent("N");
        sample[type] = event.target.checked ? "Y" : "N";
        return;
      }
    }
    if (event.target.value === 'MPEG2') sample[`video${type.split('_')[0][5]}_h264_encodingmode`] = 'SPF'
    setContent(event.target.value);
    sample[type] = event.target.value;
    props.setProperties1(sample);
  };

  return (
    <div>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-1 Input</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? video1SourceIn : video1Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setVideo1SourceIn, "video1_in")
                        : changeHandler(event, setVideo1Source, "video1_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes('VL4510C') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Frame Rate(fps):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video1Framerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Resolution:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video1InputResolution ? video1InputResolution.replace("_", "x") : ""}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-1 Output</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Codec</label>
                  <select
                    className="form-control"
                    value={video1Encoder}
                    onChange={(event) =>
                      changeHandler(event, setVideo1Encoder, "video1_encoder")
                    }
                  >
                    {props.properties.model.includes("RM1121CXF") ?
                      <option value="H264">H.264</option> :
                      <>
                        <option value="H264">H.264</option>
                        <option value="MPEG2">MPEG-2</option>
                      </>
                    }

                  </select>
                </div>
              </div>
              {!props.properties.model.includes("RM1121CXF") ?
                <><div className={"col-sm-6 " + encodingModeClass1}>
                  <div className="form-group">
                    <label className="form-check-label">Encoding Mode</label>
                    <select
                      className="form-control"
                      value={video1H264Encodingmode}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo1H264Encodingmode,
                          "video1_h264_encodingmode"
                        )
                      }
                    >
                      <option value="SPF">SPF</option>
                      <option value="ARF">ARF</option>
                      <option value="MBAFF">MBAFF</option>
                    </select>
                  </div>
                </div>

                  {!props.properties.model.includes("RM1121CXF") ?
                    <div className={"col-sm-6 " + encodingModeClass1}>
                      <div className="form-group">
                        <label className="form-check-label">HRD Buffer Size</label>
                        <select
                          className="form-control"
                          value={video1H264HrdBuffersize}
                          onChange={(event) =>
                            changeHandler(
                              event,
                              setVideo1H264HrdBuffersize,
                              "video1_h264_hrd_buffersize"
                            )
                          }
                        >
                          <option className="hidden" disabled>{video1H264HrdBuffersize}ms</option>
                          {getBufferSizeList()}
                        </select>
                      </div>
                    </div> : <></>}
                </> : <></>
              }
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video1BitRate}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setVideo1BitRate, "video1_bitrate")
                    }
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Output Resolution</label>
                  <select
                    className="form-control"
                    value={video1OutputResolution}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo1OutputResolution,
                        "video1_output_resolution"
                      )
                    }
                  >
                    <option value="input">Follow Input</option>
                    {props.properties1.model.includes('RM1121CXF') ? <>
                      <option value="1920_1080P">1920x1080P</option>
                      <option value="1280_720P">1280x720P</option>
                      <option value="720_480P">720x480P</option>
                      <option value="640_480P">640x480P</option>
                      <option value="480_320P">480x320P</option>
                      <option value="320_256P">320x256P</option>
                    </> : <>
                      {(props.properties1.input_mode === '1x3G' && props.properties1.video_mode === '1xHD') ?
                        <>
                          <option value="1920_1080P">1920x1080P</option>
                          <option value="1920_1080I">1920x1080I</option></>
                        : ''}
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
                    </>}

                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Aspect Ratio</label>
                  <select
                    className="form-control"
                    value={video1AspectRatio}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo1AspectRatio,
                        "video1_aspectratio"
                      )
                    }
                  >
                    <option value="4_3">4:3</option>
                    <option value="16_9">16:9</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Scaling Mode</label>
                  <select
                    className="form-control"
                    value={video1Scalingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo1Scalingmode,
                        "video1_scalingmode"
                      )
                    }
                  >
                    {getScalingMode(video1AspectRatio)}
                  </select>
                </div>
              </div>
              {!props.properties.model.includes("RM1121CXF") ?
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Field Order</label>
                    <select
                      className="form-control"
                      value={video1Fieldorder}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo1Fieldorder,
                          "video1_fieldorder"
                        )
                      }
                    >
                      {video1H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                      <option value={"TFF"}>TFF</option>
                    </select>
                  </div>
                </div> : <></>
              }


              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Rate Control</label>
                  <select
                    className="form-control"
                    value={video1Ratecontrol}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo1Ratecontrol,
                        "video1_ratecontrol"
                      )
                    }
                  >
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">I-Frame Interval</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video1IframeInterval}
                    min="10"
                    max={iFrameIntervalMax1}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setVideo1IframeInterval,
                        "video1_iframe_interval"
                      );
                    }}
                  />
                  <i
                    style={{ color: "red" }}
                    className={
                      Number.parseInt(video1IframeInterval) %
                        (Number.parseInt(video1BframeCount) + 1) ===
                        0
                        ? "not-visible"
                        : video1BframeCount === "" ||
                          video1IframeInterval === ""
                          ? "not-visible"
                          : ""
                    }
                  >
                    Please use multiple of (B-frame Count + 1)
                  </i>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Encoding Status:
                    {getEncoderStatus(encoder1Status)}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">B-Frame Count</label>
                  <select
                    className="form-control"
                    value={video1BframeCount}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo1BframeCount,
                        "video1_bframe_count"
                      )
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* <option value="3">3</option> */}
                    {video1Encoder === "H264" ? (
                      <>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>
              {props.properties1.model === "VL4510" || props.properties1.model.includes("VL4510C") || props.properties1.model.substring(0, 6) === "VL4522" ? (
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Closed Caption
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={closedCaption1 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setclosedCaption1,
                                "video1_cc_enabled"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {closedCaption1 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-check-label">Closed Caption Mode</label>
                          <select
                            className="form-control"
                            value={video1ccmode1}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setvideo1ccmode1,
                                "video1_ccmode"
                              )
                            }
                          >
                            <option value="default">Default</option>
                            <option value="608">CEA 608</option>
                            <option value="708">CEA 708</option>
                            <option value="input">Input</option>
                          </select>
                        </div>
                      </div>
                    }
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          AFD
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={enableafd1 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setenableafd1,
                                "video1_enable_afd"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {enableafd1 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Mode</label>
                              <select
                                className="form-control"
                                value={enableafdmode1}
                                onChange={(event) =>
                                  changeHandler(
                                    event,
                                    setenableafdmode1,
                                    "video1_afdmode"
                                  )
                                }
                              >
                                <option value="" disabled>Select</option>
                                <option value="scale">Auto resize</option>
                                <option value="userdata">User Data</option>
                                <option value="bypass">Bypass</option>
                              </select>
                            </div>
                          </div>

                          {enableafdmode1 !== "userdata" ? <div className="col-sm-6"></div> : <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Code</label>
                              <input
                                type="number"
                                className="form-control"
                                value={enableafddata1}
                                min="0"
                                max={15}
                                onChange={(event) => {
                                  if (event.target.value.match(/[^0-9]/) || event.target.value > 15) { return; }
                                  changeHandler(
                                    event,
                                    setenableafddata1,
                                    "video1_afd"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          }
                        </div>
                      </div>
                    }

                    {!props.properties1.model.includes("VL4522Q") && <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Quad-Byte Alignment
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={QBAbox1 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setQBAbox1,
                                "video1_qba"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>}
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              ) : <div></div>}
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      <div
        className={
          "pad-15 " + (props.videoMode !== "1xHD+1xSD" && props.videoMode !== "2xHD" && props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-2 Input</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? video2SourceIn : video2Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setVideo2SourceIn, "video2_in")
                        : changeHandler(event, setVideo2Source, "video2_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes("VL4510C") ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Frame Rate(fps):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video2Framerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Resolution:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video2InputResolution ? video2InputResolution.replace("_", "x") : ""}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div
        className={
          "pad-15 " + (props.videoMode !== "1xHD+1xSD" && props.videoMode !== "2xHD" && props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-2 Output</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Codec</label>
                  <select
                    className="form-control"
                    value={video2Encoder}
                    onChange={(event) =>
                      changeHandler(event, setVideo2Encoder, "video2_encoder")
                    }
                  >
                    <option value="H264">H.264</option>
                    <option value="MPEG2">MPEG-2</option>
                  </select>
                </div>
              </div>

              <div className={"col-sm-6 " + encodingModeClass2}>
                <div className="form-group">
                  <label className="form-check-label">Encoding Mode</label>
                  <select
                    className="form-control"
                    value={video2H264Encodingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo2H264Encodingmode,
                        "video2_h264_encodingmode"
                      )
                    }
                  >
                    <option value="SPF">SPF</option>
                    <option value="ARF">ARF</option>
                    <option value="MBAFF">MBAFF</option>
                  </select>
                </div>
              </div>

              {!props.properties.model.includes("RM1121CXF") &&
                <div className={"col-sm-6 " + encodingModeClass2}>
                  <div className="form-group">
                    <label className="form-check-label">HRD Buffer Size</label>
                    <select
                      className="form-control"
                      value={video2H264HrdBuffersize}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo2H264HrdBuffersize,
                          "video2_h264_hrd_buffersize"
                        )
                      }
                    >
                      <option className="hidden" disabled>{video2H264HrdBuffersize}ms</option>
                      {getBufferSizeList()}
                    </select>
                  </div>
                </div>}
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video2BitRate}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setVideo2BitRate, "video2_bitrate")
                    }
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Output Resolution</label>
                  <select
                    className="form-control"
                    value={video2OutputResolution}
                    onChange={(event) =>
                      changeHandler(event, setVideo2OutputResolution, "video2_output_resolution")}
                  >
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
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Aspect Ratio</label>
                  <select
                    className="form-control"
                    value={video2AspectRatio}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo2AspectRatio,
                        "video2_aspectratio"
                      )
                    }
                  >
                    <option value="4_3">4:3</option>
                    <option value="16_9">16:9</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Scaling Mode</label>
                  <select
                    className="form-control"
                    value={video2Scalingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo2Scalingmode,
                        "video2_scalingmode"
                      )
                    }
                  >
                    {getScalingMode(video2AspectRatio)}
                  </select>
                </div>
              </div>
              {!props.properties.model.includes("RM1121CXF") &&
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Field Order</label>
                    <select
                      className="form-control"
                      value={video2Fieldorder}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo2Fieldorder,
                          "video2_fieldorder"
                        )
                      }
                    >
                      <option value={"TFF"}>TFF</option>
                      {video2H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                    </select>
                  </div>
                </div>}

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Rate Control</label>
                  <select
                    className="form-control"
                    value={video2Ratecontrol}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo2Ratecontrol,
                        "video2_ratecontrol"
                      )
                    }
                  >
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">I-Frame Interval</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video2IframeInterval}
                    min="10"
                    max={iFrameIntervalMax2}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setVideo2IframeInterval,
                        "video2_iframe_interval"
                      );
                    }}
                  />
                  <i
                    style={{ color: "red" }}
                    className={
                      Number.parseInt(video2IframeInterval) %
                        (Number.parseInt(video2BframeCount) + 1) ===
                        0
                        ? "not-visible"
                        : video2BframeCount === "" ||
                          video2IframeInterval === ""
                          ? "not-visible"
                          : ""
                    }
                  >
                    Please use multiple of B-frame Count + 1
                  </i>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Encoding Status:
                    {getEncoderStatus(encoder2Status)}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">B-Frame Count</label>
                  <select
                    className="form-control"
                    value={video2BframeCount}
                    onChange={(event) => changeHandler(event, setVideo2BframeCount, "video2_bframe_count")}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {video2Encoder === "H264" ? (
                      <>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>

              {props.properties1.model === "VL4510" || props.properties1.model === "VL4510C" || props.properties1.model.substring(0, 6) === "VL4522" ? (
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Closed Caption
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={closedCaption2 === "N" ? false : true}
                            onChange={(event) => changeHandler(event, setclosedCaption2, "video2_cc_enabled")}
                          />
                        </label>
                      </div>
                    </div>

                    {closedCaption2 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-check-label">Closed Caption Mode</label>
                          <select
                            className="form-control"
                            value={video1ccmode2}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setvideo1ccmode2,
                                "video2_ccmode"
                              )
                            }
                          >
                            <option value="default">Default</option>
                            <option value="608">CEA 608</option>
                            <option value="708">CEA 708</option>
                            <option value="input">Input</option>
                          </select>
                        </div>
                      </div>
                    }
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          AFD
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={enableafd2 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setenableafd2,
                                "video2_enable_afd"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {enableafd2 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Mode</label>
                              <select
                                className="form-control"
                                value={enableafdmode2}
                                onChange={(event) =>
                                  changeHandler(
                                    event,
                                    setenableafdmode2,
                                    "video2_afdmode"
                                  )
                                }
                              >
                                <option value="scale" selected>Auto resize</option>
                                <option value="userdata">User Data</option>
                                <option value="bypass">Bypass</option>
                              </select>
                            </div>
                          </div>

                          {enableafdmode2 !== "userdata" ? <div className="col-sm-6"></div> : <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Code</label>
                              <input
                                type="number"
                                className="form-control"
                                value={enableafddata2}
                                min="0"
                                max={15}
                                onChange={(event) => {
                                  if (event.target.value.match(/[^0-9]/) || event.target.value > 15) { return; }
                                  changeHandler(
                                    event,
                                    setenableafddata2,
                                    "video2_afd"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          }
                        </div>
                      </div>}

                    {!props.properties1.model.includes("VL4522Q") && <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Quad-Byte Alignment
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={QBAbox2 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setQBAbox2,
                                "video2_qba"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>}
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              ) : <div></div>}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "pad-15 " + (props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-3 Input</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? video3SourceIn : video3Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setVideo3SourceIn, "video3_in")
                        : changeHandler(event, setVideo3Source, "video3_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model.includes('VL4510') && !props.properties1.model.includes("VL4510H") ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Frame Rate(fps):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video3Framerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Resolution:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video3InputResolution ? video3InputResolution.replace("_", "x") : ""}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      <div
        className={
          "pad-15 " + (props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-3 Output</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Codec</label>
                  <select
                    className="form-control"
                    value={video3Encoder}
                    onChange={(event) =>
                      changeHandler(event, setVideo3Encoder, "video3_encoder")
                    }
                  >
                    <option value="H264">H.264</option>
                    <option value="MPEG2">MPEG-2</option>
                  </select>
                </div>
              </div>

              <div className={"col-sm-6 " + encodingModeClass3}>
                <div className="form-group">
                  <label className="form-check-label">Encoding Mode</label>
                  <select
                    className="form-control"
                    value={video3H264Encodingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3H264Encodingmode,
                        "video3_h264_encodingmode"
                      )
                    }
                  >
                    <option value="SPF">SPF</option>
                    <option value="ARF">ARF</option>
                    <option value="MBAFF">MBAFF</option>
                  </select>
                </div>
              </div>

              {!props.properties.model.includes("RM1121CXF") &&
                <div className={"col-sm-6 " + encodingModeClass3}>
                  <div className="form-group">
                    <label className="form-check-label">HRD Buffer Size</label>
                    <select
                      className="form-control"
                      value={video3H264HrdBuffersize}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo3H264HrdBuffersize,
                          "video3_h264_hrd_buffersize"
                        )
                      }
                    >
                      <option className="hidden" disabled>{video3H264HrdBuffersize}ms</option>
                      {getBufferSizeList()}
                    </select>
                  </div>
                </div>}

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video3BitRate}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setVideo3BitRate, "video3_bitrate")
                    }
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Output Resolution</label>
                  <select
                    className="form-control"
                    value={video3OutputResolution}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3OutputResolution,
                        "video3_output_resolution"
                      )
                    }
                  >
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
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Aspect Ratio</label>
                  <select
                    className="form-control"
                    value={video3AspectRatio}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3AspectRatio,
                        "video3_aspectratio"
                      )
                    }
                  >
                    <option value="4_3">4:3</option>
                    <option value="16_9">16:9</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Scaling Mode</label>
                  <select
                    className="form-control"
                    value={video3Scalingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3Scalingmode,
                        "video3_scalingmode"
                      )
                    }
                  >
                    {getScalingMode(video3AspectRatio)}
                  </select>
                </div>
              </div>

              {!props.properties.model.includes("RM1121CXF") &&
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Field Order</label>
                    <select
                      className="form-control"
                      value={video3Fieldorder}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo3Fieldorder,
                          "video3_fieldorder"
                        )
                      }
                    >
                      <option value={"TFF"}>TFF</option>
                      {video3H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                    </select>
                  </div>
                </div>}

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Rate Control</label>
                  <select
                    className="form-control"
                    value={video3Ratecontrol}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3Ratecontrol,
                        "video3_ratecontrol"
                      )
                    }
                  >
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">I-Frame Interval</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video3IframeInterval}
                    min="10"
                    max={iFrameIntervalMax3}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setVideo3IframeInterval,
                        "video3_iframe_interval"
                      );
                    }}
                  />
                  <i
                    style={{ color: "red" }}
                    className={
                      Number.parseInt(video3IframeInterval) %
                        (Number.parseInt(video3BframeCount) + 1) ===
                        0
                        ? "not-visible"
                        : video3BframeCount === "" ||
                          video3IframeInterval === ""
                          ? "not-visible"
                          : ""
                    }
                  >
                    Please use multiple of B-frame Count + 1
                  </i>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Encoding Status:
                    {getEncoderStatus(encoder3Status)}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">B-Frame Count</label>
                  <select
                    className="form-control"
                    value={video3BframeCount}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo3BframeCount,
                        "video3_bframe_count"
                      )
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* <option value="3">3</option> */}
                    {video3Encoder === "H264" ? (
                      <>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>


              {props.properties1.model === "VL4510" || props.properties1.model === "VL4510C" || props.properties1.model.substring(0, 6) === "VL4522" ? (
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Closed Caption
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={closedCaption3 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setclosedCaption3,
                                "video3_cc_enabled"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {closedCaption3 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-check-label">Closed Caption Mode</label>
                          <select
                            className="form-control"
                            value={video1ccmode3}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setvideo1ccmode3,
                                "video3_ccmode"
                              )
                            }
                          >
                            <option value="default">Default</option>
                            <option value="608">CEA 608</option>
                            <option value="708">CEA 708</option>
                            <option value="input">Input</option>
                          </select>
                        </div>
                      </div>
                    }
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          AFD
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={enableafd3 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setenableafd3,
                                "video3_enable_afd"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {enableafd3 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Mode</label>
                              <select
                                className="form-control"
                                value={enableafdmode3}
                                onChange={(event) =>
                                  changeHandler(
                                    event,
                                    setenableafdmode3,
                                    "video3_afdmode"
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option value="scale">Auto resize</option>
                                <option value="userdata">User Data</option>
                                <option value="bypass">Bypass</option>
                              </select>
                            </div>
                          </div>

                          {enableafdmode3 !== "userdata" ? <div className="col-sm-6"></div> : <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Code</label>
                              <input
                                type="number"
                                className="form-control"
                                value={enableafddata3}
                                min="0"
                                max={15}
                                onChange={(event) => {
                                  if (event.target.value.match(/[^0-9]/) || event.target.value > 15) { return; }
                                  changeHandler(
                                    event,
                                    setenableafddata3,
                                    "video3_afd"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          }
                        </div>
                      </div>
                    }
                    {!props.properties1.model.includes("VL4522Q") && <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Quad-Byte Alignment
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={QBAbox3 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setQBAbox3,
                                "video3_qba"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>}
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              ) : <div></div>}

            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div
        className={
          "pad-15 " + (props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-4 Input</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? video4SourceIn : video4Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setVideo4SourceIn, "video4_in")
                        : changeHandler(event, setVideo4Source, "video4_source")
                    }
                    }
                  >
                    {props.properties1.model.includes('VL4522') ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model.includes("VL4510") && !props.properties1.model.includes('VL4510H') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Frame Rate(fps):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video4Framerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Input Resolution:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video4InputResolution ? video4InputResolution.replace("_", "x") : ""}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>

      <div
        className={
          "pad-15 " + (props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Video-4 Output</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Codec</label>
                  <select
                    className="form-control"
                    value={video4Encoder}
                    onChange={(event) =>
                      changeHandler(event, setVideo4Encoder, "video4_encoder")
                    }
                  >
                    <option value="H264">H.264</option>
                    <option value="MPEG2">MPEG-2</option>
                  </select>
                </div>
              </div>

              <div className={"col-sm-6 " + encodingModeClass4}>
                <div className="form-group">
                  <label className="form-check-label">Encoding Mode</label>
                  <select
                    className="form-control"
                    value={video4H264Encodingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4H264Encodingmode,
                        "video4_h264_encodingmode"
                      )
                    }
                  >
                    <option value="SPF">SPF</option>
                    <option value="ARF">ARF</option>
                    <option value="MBAFF">MBAFF</option>
                  </select>
                </div>
              </div>
              {!props.properties.model.includes("RM1121CXF") &&
                <div className={"col-sm-6 " + encodingModeClass4}>
                  <div className="form-group">
                    <label className="form-check-label">HRD Buffer Size</label>
                    <select
                      className="form-control"
                      value={video4H264HrdBuffersize}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo4H264HrdBuffersize,
                          "video4_h264_hrd_buffersize"
                        )
                      }
                    >
                      <option className="hidden" disabled>{video4H264HrdBuffersize}ms</option>
                      {getBufferSizeList()}
                    </select>
                  </div>
                </div>}

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video4BitRate}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setVideo4BitRate, "video4_bitrate")
                    }
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Output Resolution</label>
                  <select
                    className="form-control"
                    value={video4OutputResolution}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4OutputResolution,
                        "video4_output_resolution"
                      )
                    }
                  >
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
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Aspect Ratio</label>
                  <select
                    className="form-control"
                    value={video4AspectRatio}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4AspectRatio,
                        "video4_aspectratio"
                      )
                    }
                  >
                    <option value="4_3">4:3</option>
                    <option value="16_9">16:9</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Scaling Mode</label>
                  <select
                    className="form-control"
                    value={video4Scalingmode}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4Scalingmode,
                        "video4_scalingmode"
                      )
                    }
                  >
                    {getScalingMode(video4AspectRatio)}
                  </select>
                </div>
              </div>

              {!props.properties.model.includes("RM1121CXF") &&
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Field Order</label>
                    <select
                      className="form-control"
                      value={video4Fieldorder}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo4Fieldorder,
                          "video4_fieldorder"
                        )
                      }
                    >
                      <option value={"TFF"}>TFF</option>
                      {video4H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                    </select>
                  </div>
                </div>}

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Rate Control</label>
                  <select
                    className="form-control"
                    value={video4Ratecontrol}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4Ratecontrol,
                        "video4_ratecontrol"
                      )
                    }
                  >
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">I-Frame Interval</label>
                  <input
                    type="text"
                    className="form-control"
                    value={video4IframeInterval}
                    min="10"
                    max={iFrameIntervalMax4}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setVideo4IframeInterval,
                        "video4_iframe_interval"
                      );
                    }}
                  />
                  <i
                    style={{ color: "red" }}
                    className={
                      Number.parseInt(video4IframeInterval) %
                        (Number.parseInt(video4BframeCount) + 1) ===
                        0
                        ? "not-visible"
                        : video4BframeCount === "" ||
                          video4IframeInterval === ""
                          ? "not-visible"
                          : ""
                    }
                  >
                    Please use multiple of B-frame Count + 1
                  </i>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Encoding Status:
                    {getEncoderStatus(encoder4Status)}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">B-Frame Count</label>
                  <select
                    className="form-control"
                    value={video4BframeCount}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setVideo4BframeCount,
                        "video4_bframe_count"
                      )
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* <option value="3">3</option> */}
                    {video2Encoder === "H264" ? (
                      <>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>


              {props.properties1.model === "VL4510" || props.properties1.model === "VL4510C" || props.properties1.model.substring(0, 6) === "VL4522" ? (
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Closed Caption
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={closedCaption4 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setclosedCaption4,
                                "video4_cc_enabled"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {closedCaption4 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-check-label">Closed Caption Mode</label>
                          <select
                            className="form-control"
                            value={video1ccmode4}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setvideo1ccmode4,
                                "video4_ccmode"
                              )
                            }
                          >
                            <option value="default">Default</option>
                            <option value="608">CEA 608</option>
                            <option value="708">CEA 708</option>
                            <option value="input">Input</option>
                          </select>
                        </div>
                      </div>
                    }
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          AFD
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={enableafd4 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setenableafd4,
                                "video4_enable_afd"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    {enableafd4 === "N" ? <div className="col-sm-6"></div> :
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Mode</label>
                              <select
                                className="form-control"
                                value={enableafdmode4}
                                onChange={(event) =>
                                  changeHandler(
                                    event,
                                    setenableafdmode4,
                                    "video4_afdmode"
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option value="scale">Auto resize</option>
                                <option value="userdata">User Data</option>
                                <option value="bypass">Bypass</option>
                              </select>
                            </div>
                          </div>

                          {enableafdmode4 !== "userdata" ? <div className="col-sm-6"></div> : <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">AFD Code</label>
                              <input
                                type="number"
                                className="form-control"
                                value={enableafddata4}
                                min="0"
                                max={15}
                                onChange={(event) => {
                                  if (event.target.value.match(/[^0-9]/) || event.target.value > 15) { return; }
                                  changeHandler(
                                    event,
                                    setenableafddata4,
                                    "video4_afd"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          }
                        </div>
                      </div>
                    }
                    {!props.properties1.model.includes("VL4522Q") && <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label enc-status">
                          Quad-Byte Alignment
                          <input
                            type="checkbox"
                            className="enc-checkbox"
                            checked={QBAbox4 === "N" ? false : true}
                            onChange={(event) =>
                              changeHandler(
                                event,
                                setQBAbox4,
                                "video4_qba"
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>}
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              ) : <div></div>}

            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
};

export default Video;