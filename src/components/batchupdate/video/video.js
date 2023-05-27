import React, { useState, useEffect } from "react";
import "./../batchupdate.css";
let Video = (props) => {
  const [video1Source, setVideo1Source] = useState('');
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
  const [encodingModeClass1, setEncodingModeClass1] = useState('');
  const [iFrameIntervalMax1, setIFrameIntervalMax1] = useState('');

  const [video2Source, setVideo2Source] = useState('');
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
  const [encodingModeClass2, setEncodingModeClass2] = useState('');
  const [iFrameIntervalMax2, setIFrameIntervalMax2] = useState('');


  const [video3Source, setVideo3Source] = useState('');
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
  const [encodingModeClass3, setEncodingModeClass3] = useState('');
  const [iFrameIntervalMax3, setIFrameIntervalMax3] = useState('');

  const [video4Source, setVideo4Source] = useState('');
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
  const [encodingModeClass4, setEncodingModeClass4] = useState('');
  const [iFrameIntervalMax4, setIFrameIntervalMax4] = useState('');

  useEffect(() => {
    setVideo1Source(props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? props.properties.video1_source : props.properties.video1_in);
    setVideo1Encoder(props.properties.video1_encoder);
    setVideo1H264Encodingmode(props.properties.video1_h264_encodingmode);
    setVideo1H264HrdBuffersize(props.properties.video1_h264_hrd_buffersize);
    setVideo1BitRate(props.properties.video1_bitrate);
    setVideo1OutputResolution(props.properties.video1_output_resolution);
    setVideo1AspectRatio(props.properties.video1_aspectratio);
    setVideo1Scalingmode(props.properties.video1_scalingmode);
    setVideo1Fieldorder(props.properties.video1_fieldorder);
    setVideo1Ratecontrol(props.properties.video1_ratecontrol);
    setVideo1IframeInterval(props.properties.video1_iframe_interval);
    setVideo1BframeCount(props.properties.video1_bframe_count);
    setEncodingModeClass1(props.properties.video1_encoder === "H264" ? "" : "not-visible");
    setIFrameIntervalMax1(props.properties.video1_encoder === "H264" ? "240" : "60")

    setVideo2Source(props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? props.properties.video2_source : props.properties.video2_in);
    setVideo2Encoder(props.properties.video2_encoder);
    setVideo2H264Encodingmode(props.properties.video2_h264_encodingmode);
    setVideo2H264HrdBuffersize(props.properties.video2_h264_hrd_buffersize);
    setVideo2BitRate(props.properties.video2_bitrate);
    setVideo2OutputResolution(props.properties.video2_output_resolution);
    setVideo2AspectRatio(props.properties.video2_aspectratio);
    setVideo2Scalingmode(props.properties.video2_scalingmode);
    setVideo2Fieldorder(props.properties.video2_fieldorder);
    setVideo2Ratecontrol(props.properties.video2_ratecontrol);
    setVideo2IframeInterval(props.properties.video2_iframe_interval);
    setVideo2BframeCount(props.properties.video2_bframe_count);
    setEncodingModeClass2(props.properties.video2_encoder === "H264" ? "" : "not-visible");
    setIFrameIntervalMax2(props.properties.video2_encoder === "H264" ? "240" : "60")

    setVideo3Source(props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? props.properties.video3_source : props.properties.video3_in);
    setVideo3Encoder(props.properties.video3_encoder);
    setVideo3H264Encodingmode(props.properties.video3_h264_encodingmode);
    setVideo3H264HrdBuffersize(props.properties.video3_h264_hrd_buffersize);
    setVideo3BitRate(props.properties.video3_bitrate);
    setVideo3OutputResolution(props.properties.video3_output_resolution);
    setVideo3AspectRatio(props.properties.video3_aspectratio);
    setVideo3Scalingmode(props.properties.video3_scalingmode);
    setVideo3Fieldorder(props.properties.video3_fieldorder);
    setVideo3Ratecontrol(props.properties.video3_ratecontrol);
    setVideo3IframeInterval(props.properties.video3_iframe_interval);
    setVideo3BframeCount(props.properties.video3_bframe_count);
    setEncodingModeClass3(props.properties.video3_encoder === "H264" ? "" : "not-visible");
    setIFrameIntervalMax3(props.properties.video3_encoder === "H264" ? "240" : "60")

    setVideo4Source(props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? props.properties.video4_source : props.properties.video4_in);
    setVideo4Encoder(props.properties.video4_encoder);
    setVideo4H264Encodingmode(props.properties.video4_h264_encodingmode);
    setVideo4H264HrdBuffersize(props.properties.video4_h264_hrd_buffersize);
    setVideo4BitRate(props.properties.video4_bitrate);
    setVideo4OutputResolution(props.properties.video4_output_resolution);
    setVideo4AspectRatio(props.properties.video4_aspectratio);
    setVideo4Scalingmode(props.properties.video4_scalingmode);
    setVideo4Fieldorder(props.properties.video4_fieldorder);
    setVideo4Ratecontrol(props.properties.video4_ratecontrol);
    setVideo4IframeInterval(props.properties.video4_iframe_interval);
    setVideo4BframeCount(props.properties.video4_bframe_count);
    setEncodingModeClass4(props.properties.video4_encoder === "H264" ? "" : "not-visible");
    setIFrameIntervalMax4(props.properties.video4_encoder === "H264" ? "240" : "60")

  }, [props.properties]);

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
    let list = [];
    let start = 300;
    for (let i = 0; i < 18; i++) {
      list.push(<option value={start}>{start.toString() + "ms"}</option>);
      start += 100;
    }

    return list;
  };

  const changeHandler = (event, setContent, type = "") => {
    setContent(event.target.value);
    let sample = { ...props.properties };
    sample[type] = event.target.value;
    if (event.target.value === 'MPEG2') sample[`video${type.split('_')[0][5]}_h264_encodingmode`] = ''
    props.setProperties(sample);
  };

  return (
    <>
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
                    value={video1Source}
                    onChange={(event) => { props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? changeHandler(event, setVideo1Source, "video1_source") : changeHandler(event, setVideo1Source, "video1_in") }
                    }
                  >
                    <option value="">Select One</option>
                    {props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? <option value="1">HDMI-1</option> :
                      props.selectedModel.includes("VL45") ?
                        (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                          <option value="1">SDI-1</option> :
                          <>
                            <option value="1">SDI-1</option>
                            <option value="2">SDI-2</option>
                          </>) : ''
                    }
                  </select>
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
                    <option value="">Select One</option>
                    <option value="H264">H.264</option>
                    {props.selectedModel !== 'RM1121HD/CXF' ?
                      <option value="MPEG2">MPEG-2</option> : ''}
                  </select>
                </div>
              </div>
              {video1Encoder && props.selectedModel !== 'RM1121HD/CXF' &&
                <div className={"col-sm-6 " + encodingModeClass1}>
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
                      <option value="">Select One</option>
                      <option value="SPF">SPF</option>
                      <option value="ARF">ARF</option>
                      <option value="MBAFF">MBAFF</option>
                    </select>
                  </div>
                </div>}

              {props.selectedModel !== 'RM1121HD/CXF' &&
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
                      <option value="">Select One</option>
                      <option value="auto">Auto</option>
                      <option value="200">200ms</option>
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
                    <option value="">Select One</option>
                    <option value="input">Follow Input</option>
                    {props.selectedModel.includes('RM1121HD/CXF') ? <>
                      <option value="1920_1080P">1920x1080P</option>
                      <option value="1280_720P">1280x720P</option>
                      <option value="720_480P">720x480P</option>
                      <option value="640_480P">640x480P</option>
                      <option value="480_320P">480x320P</option>
                      <option value="320_256P">320x256P</option>
                    </> : <>
                      {(props.properties.input_mode === '1x3G' && props.properties.video_mode === '1xHD') ?
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
                    <option value="">Select One</option>
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

              {props.selectedModel !== "RM1121HD/CXF" && <div className="col-sm-6">
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
                    <option value="">Select One</option>
                    <option value={"TFF"}>TFF</option>
                    {video1H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                  </select>
                </div>
              </div>}

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
                    <option value="">Select One</option>
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
                        : (video1BframeCount === "" || video1IframeInterval === "" ? "not-visible" : "")
                    }
                  >
                    Please use multiple of B-frame Count + 1
                  </i>
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
                    <option value="">Select One</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* <option value="3">3</option> */}
                    {video1Encoder === "H264" || video1Encoder === "" ? (
                      <>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>) : (
                      <></>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      {props.selectedModel !== 'RM1121HD/CXF' && <>
        <div className={'pad-15 ' + (props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD" ? "" : "not-visible")} >
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Video-2 Input</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Input Source</label>
                    <select
                      className="form-control"
                      value={video2Source}
                      onChange={(event) => { props.selectedModel.includes("RM11") || props.selectedModel === "VL4510H" || props.selectedModel === "VL4510C" ? changeHandler(event, setVideo2Source, "video2_source") : changeHandler(event, setVideo2Source, "video2_in") }
                      }
                    >
                      <option value="">Select One</option>
                      {props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? <><option value="1">HDMI-1</option></> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD" ? "" : "not-visible")} >
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value="SPF">SPF</option>
                      <option value="ARF">ARF</option>
                      <option value="MBAFF">MBAFF</option>
                    </select>
                  </div>
                </div>

                {props.selectedModel !== 'RM1121HD/CXF' &&
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
                        <option value="">Select One</option>
                        <option value="auto">Auto</option>
                        <option value="200">200ms</option>
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
                        changeHandler(
                          event,
                          setVideo2OutputResolution,
                          "video2_output_resolution"
                        )
                      }
                    >
                      <option value="">Select One</option>
                      <option value="input">Follow Input</option>
                      {props.properties.input_mode === '1x3G' && props.properties.video_mode === '1xHD' ?
                        <>
                          <option value="1920_1080P">1920x1080P</option>
                          <option value="1920_1080I">1920x1080I</option>
                        </>
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value={"TFF"}>TFF</option>
                      {video2H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                    </select>
                  </div>
                </div>

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
                      <option value="">Select One</option>
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
                        Number.parseInt(video1IframeInterval) %
                          (Number.parseInt(video1BframeCount) + 1) ===
                          0
                          ? "not-visible"
                          : (video1BframeCount === "" || video1IframeInterval === "" ? "not-visible" : "")
                      }
                    >
                      Please use multiple of B-frame Count + 1
                    </i>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">B-Frame Count</label>
                    <select
                      className="form-control"
                      value={video2BframeCount}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setVideo2BframeCount,
                          "video2_bframe_count"
                        )
                      }
                    >
                      <option value="">Select One</option>
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
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>


        <div className={'pad-15 ' + (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Video-3 Input</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Input Source</label>
                    <select
                      className="form-control"
                      value={video3Source}
                      onChange={(event) => { props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? changeHandler(event, setVideo3Source, "video3_source") : changeHandler(event, setVideo3Source, "video3_in") }
                      }
                    >
                      <option value="">Select One</option>
                      {props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? <><option value="1">HDMI-1</option></> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value="SPF">SPF</option>
                      <option value="ARF">ARF</option>
                      <option value="MBAFF">MBAFF</option>
                    </select>
                  </div>
                </div>
                {props.selectedModel !== 'RM1121HD/CXF' &&
                  <div className={"col-sm-6 " + encodingModeClass1}>
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
                        <option value="">Select One</option>
                        <option value="auto">Auto</option>
                        <option value="200">200ms</option>
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
                      <option value="">Select One</option>
                      <option value="input">Follow Input</option>
                      {props.properties.input_mode === '1x3G' && props.properties.video_mode === '1xHD' ?
                        <>
                          <option value="1920_1080P">1920x1080P</option>
                          <option value="1920_1080I">1920x1080I</option>
                        </>
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value={"TFF"}>TFF</option>
                      {video3H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}

                    </select>
                  </div>
                </div>

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
                      <option value="">Select One</option>
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
                          : (video3BframeCount === "" || video3IframeInterval === "" ? "not-visible" : "")
                      }
                    >
                      Please use multiple of B-frame Count + 1
                    </i>
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
                      <option value="">Select One</option>
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
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>


        <div className={'pad-15 ' + (props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Video-4 Input</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Input Source</label>
                    <select
                      className="form-control"
                      value={video4Source}
                      onChange={(event) => { props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? changeHandler(event, setVideo4Source, "video4_source") : changeHandler(event, setVideo4Source, "video4_in") }
                      }
                    >
                      <option value="">Select One</option>
                      {props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? <><option value="1">HDMI-1</option></> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value="SPF">SPF</option>
                      <option value="ARF">ARF</option>
                      <option value="MBAFF">MBAFF</option>
                    </select>
                  </div>
                </div>

                {props.selectedModel !== 'RM1121HD/CXF' &&
                  <div className={"col-sm-6 " + encodingModeClass1}>
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
                        <option value="">Select One</option>
                        <option value="auto">Auto</option>
                        <option value="200">200ms</option>
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
                      <option value="">Select One</option>
                      <option value="input">Follow Input</option>
                      {props.properties.input_mode === '1x3G' && props.properties.video_mode === '1xHD' ?
                        <>
                          <option value="1920_1080P">1920x1080P</option>
                          <option value="1920_1080I">1920x1080I</option>
                        </>
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
                      <option value="">Select One</option>
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
                      <option value="">Select One</option>
                      <option value={"TFF"}>TFF</option>
                      {video4H264Encodingmode !== 'MBAFF' && <option value={"BFF"}>BFF</option>}
                    </select>
                  </div>
                </div>

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
                      <option value="">Select One</option>
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
                          : (video4BframeCount === "" || video4IframeInterval === "" ? "not-visible" : "")
                      }
                    >
                      Please use multiple of B-frame Count + 1
                    </i>
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
                      <option value="">Select One</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      {/* <option value="3">3</option> */}
                      {video4Encoder === "H264" ? (
                        <>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </>) : (
                        <></>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </>}
    </>
  );
};

export default Video;
