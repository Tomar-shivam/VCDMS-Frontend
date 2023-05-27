import React, { useState, useEffect } from "react";
import "../batchupdate.css";
import CommonUtils from "../../../common/CommonUtils";

let TS = (props) => {
  let deviceModelCondition = CommonUtils.DeviceModelCondition(props.selectedModel);
  const [ts1NetworkId, setTs1NetworkId] = useState("");
  const [ts1Networkname, setTs1Networkname] = useState("");
  const [ts1OrgNetworkid, setTs1OrgNetworkid] = useState("");
  const [ts1Id, setTs1Id] = useState("");
  const [ts1Ratecontrol, setTs1Ratecontrol] = useState("");
  const [ts1Bitrate, setTs1Bitrate] = useState("");
  const [ts1Noemptyaf, setTs1Noemptyaf] = useState("");
  const [ts1Delivery, setTs1Delivery] = useState("");
  const [ts1Ip, setTs1Ip] = useState("");
  const [ts1Srcport, setTs1Srcport] = useState("");
  const [ts1Port, setTs1Port] = useState("");
  const [ts1TimeToLive, setTs1TimeToLive] = useState("");
  const [httpstreaming, setHttpstreaming] = useState("");
  const [dashSegmentsize, setDashSegmentsize] = useState("");
  const [dashAdvsettings, setDashAdvsettings] = useState("");
  const [dashBufferdepth, setDashBufferdepth] = useState("");
  const [dashMinbuffertime, setDashMinbuffertime] = useState("");
  const [dashMinupdateperiod, setDashMinupdateperiod] = useState("");
  const [dashPresentationdelay, setDashPresentationdelay] = useState("");
  const [ts1Latency, setTs1Latency] = useState("");
  const [program1Id, setProgram1Id] = useState("");
  const [program1PmtPid, setProgram1PmtPid] = useState("");
  const [program1AudioPid, setProgram1AudioPid] = useState("");
  const [program1VideoPid, setProgram1VideoPid] = useState("");
  const [httpStreamingClass, setHttpStreamingClass] = useState("not-visible");
  const [ts1Srtmode, setTs1Srtmode] = useState("");
  const [ts1BwidthOverHead, setTs1BwidthOverHead] = useState("");
  const [ts1Encryption, setTs1Encryption] = useState("");
  const [ts1Passphrase, setTs1Passphrase] = useState("");
  const [ts1EnableAdaptiveBitrate, setTs1EnableAdaptiveBitrate] = useState("");
  const [ts2NetworkId, setTs2NetworkId] = useState("");
  const [ts2Ratecontrol, setTs2Ratecontrol] = useState("");
  const [ts2Delivery, setTs2Delivery] = useState("");
  const [ts2Ip, setTs2Ip] = useState("");
  const [ts2Srcport, setTs2Srcport] = useState("");
  const [ts2Port, setTs2Port] = useState("");
  const [ts2TimeToLive, setTs2TimeToLive] = useState("");
  const [ts2Latency, setTs2Latency] = useState("");
  const [program2Id, setProgram2Id] = useState("");
  const [program2PmtPid, setProgram2PmtPid] = useState("");
  const [program2AudioPid, setProgram2AudioPid] = useState("");
  const [program2VideoPid, setProgram2VideoPid] = useState("");
  const [ts2BwidthOverHead, setTs2BwidthOverHead] = useState("");
  const [ts2Encryption, setTs2Encryption] = useState("");
  const [ts2Passphrase, setTs2Passphrase] = useState("");
  const [ts2EnableAdaptiveBitrate, setTs2EnableAdaptiveBitrate] = useState("");
  const [ts2Srtmode, setTs2Srtmode] = useState("");
  const [ts2Networkname, setTs2Networkname] = useState("");
  const [ts2OrgNetworkid, setTs2OrgNetworkid] = useState("");
  const [ts2Id, setTs2Id] = useState("");
  const [ts2Bitrate, setTs2Bitrate] = useState("");
  const [ts2Noemptyaf, setTs2Noemptyaf] = useState("");

  const [ts3NetworkId, setTs3NetworkId] = useState("");
  const [ts3Networkname, setTs3Networkname] = useState("");
  const [ts3OrgNetworkid, setTs3OrgNetworkid] = useState("");
  const [ts3Id, setTs3Id] = useState("");
  const [ts3Ratecontrol, setTs3Ratecontrol] = useState("");
  const [ts3Bitrate, setTs3Bitrate] = useState("");
  const [ts3Noemptyaf, setTs3Noemptyaf] = useState("");
  const [ts3Delivery, setTs3Delivery] = useState("");
  const [ts3Ip, setTs3Ip] = useState("");
  const [ts3Srcport, setTs3Srcport] = useState("");
  const [ts3Port, setTs3Port] = useState("");
  const [ts3TimeToLive, setTs3TimeToLive] = useState("");
  const [ts3Latency, setTs3Latency] = useState("");
  const [program3Id, setProgram3Id] = useState("");
  const [program3PmtPid, setProgram3PmtPid] = useState("");
  //   const [program3PcrPid, setProgram3PcrPid] = useState("");
  const [program3AudioPid, setProgram3AudioPid] = useState("");
  const [program3VideoPid, setProgram3VideoPid] = useState("");
  const [ts3Srtmode, setTs3Srtmode] = useState("");
  const [ts3BwidthOverHead, setTs3BwidthOverHead] = useState("");
  const [ts3Encryption, setTs3Encryption] = useState("");
  const [ts3Passphrase, setTs3Passphrase] = useState("");
  const [ts3EnableAdaptiveBitrate, setTs3EnableAdaptiveBitrate] = useState("");


  const [ts4NetworkId, setTs4NetworkId] = useState("");
  const [ts4Ratecontrol, setTs4Ratecontrol] = useState("");
  const [ts4Delivery, setTs4Delivery] = useState("");
  const [ts4Ip, setTs4Ip] = useState("");
  const [ts4Srcport, setTs4Srcport] = useState("");
  const [ts4Port, setTs4Port] = useState("");
  const [ts4TimeToLive, setTs4TimeToLive] = useState("");
  const [ts4Latency, setTs4Latency] = useState("");
  const [program4Id, setProgram4Id] = useState("");
  const [program4PmtPid, setProgram4PmtPid] = useState("");
  const [program4AudioPid, setProgram4AudioPid] = useState("");
  const [program4VideoPid, setProgram4VideoPid] = useState("");
  const [ts4BwidthOverHead, setTs4BwidthOverHead] = useState("");
  const [ts4Encryption, setTs4Encryption] = useState("");
  const [ts4Passphrase, setTs4Passphrase] = useState("");
  const [ts4EnableAdaptiveBitrate, setTs4EnableAdaptiveBitrate] = useState("");
  const [ts4Srtmode, setTs4Srtmode] = useState("");
  const [ts4Networkname, setTs4Networkname] = useState("");
  const [ts4OrgNetworkid, setTs4OrgNetworkid] = useState("");
  const [ts4Id, setTs4Id] = useState("");
  const [ts4Bitrate, setTs4Bitrate] = useState("");
  const [ts4Noemptyaf, setTs4Noemptyaf] = useState("");

  useEffect(() => {
    setTs1NetworkId(props.properties.ts1_networkid);
    setTs1Networkname(props.properties.ts1_networkname);
    setTs1OrgNetworkid(props.properties.ts1_org_networkid);
    setTs1Id(props.properties.ts1_id);
    setTs1Ratecontrol(props.properties.ts1_ratecontrol);
    setTs1Bitrate(props.properties.ts1_bitrate);
    setTs1Noemptyaf(props.properties.ts1_noemptyaf);
    setTs1Delivery(props.properties.ts1_delivery);
    setTs1Ip(props.properties.ts1_ip);
    setTs1Srcport(props.properties.ts1_srcport);
    setTs1Port(props.properties.ts1_port);
    setTs1TimeToLive(props.properties.ts1_timeToLive);
    setHttpstreaming(props.properties.httpstreaming);
    setDashSegmentsize(props.properties.dash_segmentsize);
    setDashAdvsettings(props.properties.dash_advsettings);
    setDashBufferdepth(props.properties.dash_bufferdepth);
    setDashMinbuffertime(props.properties.dash_minbuffertime);
    setDashMinupdateperiod(props.properties.dash_minupdateperiod);
    setDashPresentationdelay(props.properties.dash_presentationdelay);
    setProgram1Id(props.properties.program1_id);
    setProgram1PmtPid(props.properties.program1_pmt_pid);
    setProgram1AudioPid(props.properties.program1_audio_pid);
    setProgram1VideoPid(props.properties.program1_video_pid);
    setHttpStreamingClass(
      props.properties.dash_advsettings === "manual" ? "" : "not-visible"
    );
    setTs1Srtmode(props.properties["ts1_strmode="]);
    setTs1Latency(props.properties.ts1_latency);
    setTs1BwidthOverHead(props.properties.ts1_bwidthoverhead);
    setTs1Encryption(props.properties.ts1_encryption);
    setTs1Passphrase(props.properties.ts1_passphrase);
    setTs1EnableAdaptiveBitrate(props.properties.ts1_enableadaptivebitrate);
    setTs2NetworkId(props.properties.ts2_networkid);
    setTs2Ratecontrol(props.properties.ts2_ratecontrol);
    setTs2Delivery(props.properties.ts2_delivery);
    setTs2Ip(props.properties.ts2_ip);
    setTs2Srcport(props.properties.ts2_srcport);
    setTs2Port(props.properties.ts2_port);
    setTs2TimeToLive(props.properties.ts2_timeToLive);
    setTs2Latency(props.properties.ts2_latency);
    setProgram2Id(props.properties.program2_id);
    setProgram2PmtPid(props.properties.program2_pmt_pid);
    setProgram2AudioPid(props.properties.program2_audio_pid);
    setProgram2VideoPid(props.properties.program2_video_pid);
    setTs2BwidthOverHead(props.properties.ts2_bwidthoverhead);
    setTs2Encryption(props.properties.ts2_encryption);
    setTs2Passphrase(props.properties.ts2_passphrase);
    setTs2EnableAdaptiveBitrate(props.properties.ts2_enableadaptivebitrate);
    setTs2Srtmode(props.properties.ts2_strmode);
    setTs2Networkname(props.properties.ts2_networkname);
    setTs2OrgNetworkid(props.properties.ts2_org_networkid);
    setTs2Id(props.properties.ts2_id);
    setTs2Bitrate(props.properties.ts2_bitrate);
    setTs2Noemptyaf(props.properties.ts2_noemptyaf);

    setTs3NetworkId(props.properties.ts3_networkid);
    setTs3Networkname(props.properties.ts3_networkname);
    setTs3OrgNetworkid(props.properties.ts3_org_networkid);
    setTs3Id(props.properties.ts3_id);
    setTs3Ratecontrol(props.properties.ts3_ratecontrol);
    setTs3Bitrate(props.properties.ts3_bitrate);
    setTs3Noemptyaf(props.properties.ts3_noemptyaf);
    setTs3Delivery(props.properties.ts3_delivery);
    setTs3Ip(props.properties.ts3_ip);
    setTs3Srcport(props.properties.ts3_srcport);
    setTs3Port(props.properties.ts3_port);
    setTs3TimeToLive(props.properties.ts3_timeToLive);
    setProgram3Id(props.properties.program3_id);
    setProgram3PmtPid(props.properties.program3_pmt_pid);
    setProgram3AudioPid(props.properties.program3_audio_pid);
    setProgram3VideoPid(props.properties.program3_video_pid);
    setTs3Srtmode(props.properties["ts3_strmode="]);
    setTs3Latency(props.properties.ts3_latency);
    setTs3BwidthOverHead(props.properties.ts3_bwidthoverhead);
    setTs3Encryption(props.properties.ts3_encryption);
    setTs3Passphrase(props.properties.ts3_passphrase);
    setTs3EnableAdaptiveBitrate(props.properties.ts3_enableadaptivebitrate);

    setTs4NetworkId(props.properties.ts4_networkid);
    setTs4Ratecontrol(props.properties.ts4_ratecontrol);
    setTs4Delivery(props.properties.ts4_delivery);
    setTs4Ip(props.properties.ts4_ip);
    setTs4Srcport(props.properties.ts4_srcport);
    setTs4Port(props.properties.ts4_port);
    setTs4TimeToLive(props.properties.ts4_timeToLive);
    setTs4Latency(props.properties.ts4_latency);
    setProgram4Id(props.properties.program4_id);
    setProgram4PmtPid(props.properties.program4_pmt_pid);
    setProgram4AudioPid(props.properties.program4_audio_pid);
    setProgram4VideoPid(props.properties.program4_video_pid);
    setTs4BwidthOverHead(props.properties.ts4_bwidthoverhead);
    setTs4Encryption(props.properties.ts4_encryption);
    setTs4Passphrase(props.properties.ts4_passphrase);
    setTs4EnableAdaptiveBitrate(props.properties.ts4_enableadaptivebitrate);
    setTs4Srtmode(props.properties.ts4_strmode);
    setTs4Networkname(props.properties.ts4_networkname);
    setTs4OrgNetworkid(props.properties.ts4_org_networkid);
    setTs4Id(props.properties.ts4_id);
    setTs4Bitrate(props.properties.ts4_bitrate);
    setTs4Noemptyaf(props.properties.ts4_noemptyaf);
  }, [props.properties]);

  const changeHandler = (event, setContent, type) => {
    let sample = { ...props.properties };
    if (type === "ts1_enableadaptivebitrate" || type === "ts2_enableadaptivebitrate") {
      setContent(event.target.checked ? "Y" : "N");
      sample[type] = event.target.checked ? "Y" : "N";
      props.setProperties(sample);
      return;
    }
    if (type === "ts1_noemptyaf" || type === "ts2_noemptyaf") {
      setContent(event.target.checked ? "1" : "0");
      sample[type] = event.target.checked ? "1" : "0";
      props.setProperties(sample);
      return
    }
    setContent(event.target.value);
    sample[type] = event.target.value;
    props.setProperties(sample);
    if (type === "dash_advsettings") {
      if (event.target.value === "manual") {
        setHttpStreamingClass("");
      } else {
        setHttpStreamingClass("not-visible");
      }
    }
  };

  const getProtocol = () => {
    if (props.outputMode === "UDP") {
      return (
        <>
          <option value="UDP">UDP</option>
          <option value="SRT">SRT</option>
        </>
      );
    }

    if (props.outputMode === "TCP") {
      return (
        <>
          <option value="HTTP">HTTP</option>
        </>
      );
    }

    if (props.outputMode === "RTSP") {
      return (
        <>
          <option value="RTSP">RTSP</option>
        </>
      );
    }
  };

  return (
    <>
      <div
        className={
          "pad-15 " + (props.outputMode === "TCP" ? "" : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">HTTP Streaming</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Mode</label>
                  <select
                    className="form-control"
                    value={httpstreaming}
                    onChange={(event) =>
                      changeHandler(event, setHttpstreaming, "httpstreaming")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="DASH">DASH</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Segment Size(sec)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={dashSegmentsize}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashSegmentsize,
                        "dash_segmentsize"
                      )
                    }
                    min="0"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Advanced Settings</label>
                  <select
                    className="form-control"
                    value={dashAdvsettings}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashAdvsettings,
                        "dash_advsettings"
                      )
                    }
                  >
                    <option value="">Select One</option>
                    <option value="auto">AUTO</option>
                    <option value="manual">MANUAL</option>
                  </select>
                </div>
              </div>

              <div className={"col-sm-6 " + httpStreamingClass}>
                <div className="form-group">
                  <label className="form-check-label">
                    Time Shift Buffer Depth(sec)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={dashBufferdepth}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashBufferdepth,
                        "dash_bufferdepth"
                      )
                    }
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + httpStreamingClass}>
                <div className="form-group">
                  <label className="form-check-label">
                    Minimum Buffer Time(sec)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={dashMinbuffertime}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashMinbuffertime,
                        "dash_minbuffertime"
                      )
                    }
                    min="0"
                    max="60"
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + httpStreamingClass}>
                <div className="form-group">
                  <label className="form-check-label">
                    Minimum Update Period(sec)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={dashMinupdateperiod}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashMinupdateperiod,
                        "dash_minupdateperiod"
                      )
                    }
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + httpStreamingClass}>
                <div className="form-group">
                  <label className="form-check-label">
                    Presentation Delay(sec)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={dashPresentationdelay}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setDashPresentationdelay,
                        "dash_presentationdelay"
                      )
                    }
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-1</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts1NetworkId}
                    onChange={(event) =>
                      changeHandler(event, setTs1NetworkId, "ts1_networkid")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ts1Networkname}
                    onChange={(event) =>
                      changeHandler(event, setTs1Networkname, "ts1_networkname")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">
                    Original Network ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts1OrgNetworkid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setTs1OrgNetworkid,
                        "ts1_org_networkid"
                      )
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.outputBitrateMode === "MANUAL" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Bit Rate(kbps)</label>
                  <input
                    type="number"
                    className="form-control"
                    size="12"
                    maxLength="12"
                    value={ts1Bitrate}
                    onChange={(event) =>
                      changeHandler(event, setTs1Bitrate, "ts1_bitrate")
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">TS ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts1Id}
                    onChange={(event) =>
                      changeHandler(event, setTs1Id, "ts1_id")
                    }
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts1Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs1Ratecontrol, "ts1_ratecontrol")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              {/* {props.selectedModel && props.selectedModel.includes("VL4522Q") &&
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">IP version</label>
                    <select
                      className="form-control"
                      value={''}
                    // onChange={(event) => }
                    // changeHandler(event, setTs1Ratecontrol, "ts1_ratecontrol")
                    >
                      <option value="IPv4">IPv4</option>
                    </select>
                  </div>
                </div>
              } */}
              <div
                className={
                  "col-sm-6 " +
                  (props.outputMode === "ASI" ? "not-visible" : "")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Protocol</label>
                  <select
                    className="form-control"
                    value={ts1Delivery}
                    onChange={(event) =>
                      changeHandler(event, setTs1Delivery, "ts1_delivery")
                    }
                  >
                    <option value="">Select One</option>
                    {getProtocol()}
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">SRT Mode</label>
                  <select
                    className="form-control"
                    value={ts1Srtmode}
                    onChange={(event) =>
                      changeHandler(event, setTs1Srtmode, "ts1_srtmode=")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="caller">Caller</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {deviceModelCondition ? <>
                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">
                      Destination IP Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts1Ip}
                      onChange={(event) =>
                        changeHandler(event, setTs1Ip, "ts1_ip")
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Source Port</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        if (Number.parseInt(event.target.value) > 65536 || Number.parseInt(event.target.value) < 1) return;
                        changeHandler(event, setTs1Srcport, "ts1_srcport")
                      }}
                      value={ts1Srcport}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Destination Port</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts1Port}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs1Port, "ts1_port")
                      }
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Time To Live</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts1TimeToLive}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs1TimeToLive, "ts1_timeToLive")
                      }}
                    />
                  </div>
                </div>
              </> : <></>}

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">
                    Bandwidth Overhead(%)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setTs1BwidthOverHead,
                        "ts1_bwidthoverhead"
                      )
                    }}
                    value={ts1BwidthOverHead}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Latency(ms)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs1Latency, "ts1_latency")
                    }}
                    value={ts1Latency}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Encryption</label>
                  <select
                    className="form-control"
                    value={ts1Encryption}
                    onChange={(event) =>
                      changeHandler(event, setTs1Encryption, "ts1_encryption")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="0">None</option>
                    <option value="16">AES-128</option>
                    <option value="24">AES-196</option>
                    <option value="32">AES-256</option>
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Passphrase</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      changeHandler(event, setTs1Passphrase, "ts1_passphrase")
                    }
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Adaptive Bitrate:
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={ts1EnableAdaptiveBitrate === "Y" ? true : false}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setTs1EnableAdaptiveBitrate,
                          "ts1_enableadaptivebitrate"
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div className={"col-sm-6 " + (props.legacyStbSupport === "1" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">No Empty AF</label>
                  <input
                    type="checkbox"
                    checked={ts1Noemptyaf === "1" ? true : false}
                    className="enc-checkbox"
                    onChange={(event) =>
                      changeHandler(event, setTs1Noemptyaf, "ts1_noemptyaf")
                    }
                  />
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Program-1</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Program ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program1Id}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      if (Number.parseInt(event.target.value) > 65535 || Number.parseInt(event.target.value) < 1) return;
                      changeHandler(event, setProgram1Id, "program1_id")
                    }}
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PMT PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program1PmtPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram1PmtPid,
                        "program1_pmt_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program1AudioPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      changeHandler(
                        event,
                        setProgram1AudioPid,
                        "program1_audio_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program1VideoPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram1VideoPid,
                        "program1_video_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className={"pad-15 " +
        (props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD"
          ? props.tsType === "SPTS" ? "" : "not-visible"
          : "not-visible")
      }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-2</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts2NetworkId}
                    onChange={(event) =>
                      changeHandler(event, setTs2NetworkId, "ts2_networkid")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ts2Networkname}
                    onChange={(event) =>
                      changeHandler(event, setTs2Networkname, "ts2_networkname")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">
                    Original Network ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts2OrgNetworkid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setTs2OrgNetworkid,
                        "ts2_org_networkid"
                      )
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.outputBitrateMode === "MANUAL" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Bit Rate(kbps)</label>
                  <input
                    type="number"
                    className="form-control"
                    size="12"
                    maxLength="12"
                    value={ts2Bitrate}
                    onChange={(event) =>
                      changeHandler(event, setTs2Bitrate, "ts2_bitrate")
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">TS ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts2Id}
                    onChange={(event) =>
                      changeHandler(event, setTs2Id, "ts2_id")
                    }
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts2Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs2Ratecontrol, "ts2_ratecontrol")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " +
                  (props.outputMode === "ASI" ? "not-visible" : "")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Protocol</label>
                  <select
                    className="form-control"
                    value={ts2Delivery}
                    onChange={(event) =>
                      changeHandler(event, setTs2Delivery, "ts2_delivery")
                    }
                  >
                    <option value="">Select One</option>
                    {getProtocol()}
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">SRT Mode</label>
                  <select
                    className="form-control"
                    value={ts2Srtmode}
                    onChange={(event) =>
                      changeHandler(event, setTs2Srtmode, "ts2_srtmode")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="caller">Caller</option>
                  </select>
                </div>
              </div>

              {deviceModelCondition ? <>
                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">
                      Destination IP Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts2Ip}
                      onChange={(event) =>
                        changeHandler(event, setTs2Ip, "ts2_ip")
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Source Port</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        if (Number.parseInt(event.target.value) > 65536 || Number.parseInt(event.target.value) < 1) return;
                        changeHandler(event, setTs2Srcport, "ts2_srcport")
                      }}
                      value={ts2Srcport}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Destination Port</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts2Port}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs2Port, "ts2_port")
                      }}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Time To Live</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts2TimeToLive}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs2TimeToLive, "ts2_timeToLive")
                      }}
                    />
                  </div>
                </div>
              </> : <></>}

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">
                    Bandwidth Overhead(%)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setTs2BwidthOverHead,
                        "ts2_bwidthoverhead"
                      )
                    }}
                    value={ts2BwidthOverHead}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Latency(ms)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs2Latency, "ts2_latency")
                    }}
                    value={ts2Latency}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Encryption</label>
                  <select
                    className="form-control"
                    value={ts2Encryption}
                    onChange={(event) =>
                      changeHandler(event, setTs2Encryption, "ts2_encryption")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="0">None</option>
                    <option value="16">AES-128</option>
                    <option value="24">AES-196</option>
                    <option value="32">AES-256</option>
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Passphrase</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      changeHandler(event, setTs2Passphrase, "ts2_passphrase")
                    }
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts2Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Adaptive Bitrate:
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={ts2EnableAdaptiveBitrate === "Y" ? true : false}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setTs2EnableAdaptiveBitrate,
                          "ts2_enableadaptivebitrate"
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div className={"col-sm-6 " + (props.legacyStbSupport === "1" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">No Empty AF</label>
                  <input
                    type="checkbox"
                    checked={ts2Noemptyaf === "1" ? true : false}
                    className="enc-checkbox"
                    onChange={(event) =>
                      changeHandler(event, setTs2Noemptyaf, "ts2_noemptyaf")
                    }
                  />
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div className={"pad-15 " + ((props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD") ? "" : "not-visible")}>
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Program-2</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Program ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program2Id}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      if (Number.parseInt(event.target.value) > 65535 || Number.parseInt(event.target.value) < 1) return;
                      changeHandler(event, setProgram2Id, "program2_id")
                    }}
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PMT PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program2PmtPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram2PmtPid,
                        "program2_pmt_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program2AudioPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      changeHandler(
                        event,
                        setProgram2AudioPid,
                        "program2_audio_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program2VideoPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram2VideoPid,
                        "program2_video_pid"
                      )
                    }}
                    min="16"
                    max="8190"
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
          "pad-15 " +
          (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD"
            ? props.tsType === "SPTS"
              ? ""
              : "not-visible"
            : "not-visible")
        }
      >
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Transport Stream-3</div>
            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                  <div className="form-group">
                    <label className="form-check-label">Network ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={ts3NetworkId}
                      onChange={(event) =>
                        changeHandler(event, setTs3NetworkId, "ts3_networkid")
                      }
                    />
                  </div>
                </div>

                <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                  <div className="form-group">
                    <label className="form-check-label">Network Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts3Networkname}
                      onChange={(event) =>
                        changeHandler(event, setTs3Networkname, "ts3_networkname")
                      }
                    />
                  </div>
                </div>

                <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                  <div className="form-group">
                    <label className="form-check-label">
                      Original Network ID
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={ts3OrgNetworkid}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setTs3OrgNetworkid,
                          "ts3_org_networkid"
                        )
                      }
                    />
                  </div>
                </div>

                <div className={"col-sm-6 " + (props.outputBitrateMode === "MANUAL" ? "" : "not-visible")}>
                  <div className="form-group">
                    <label className="form-check-label">Bit Rate(kbps)</label>
                    <input
                      type="number"
                      className="form-control"
                      size="12"
                      maxLength="12"
                      value={ts3Bitrate}
                      onChange={(event) =>
                        changeHandler(event, setTs3Bitrate, "ts3_bitrate")
                      }
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">TS ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={ts3Id}
                      onChange={(event) =>
                        changeHandler(event, setTs3Id, "ts3_id")
                      }
                      min="1"
                      max="65535"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Bit Rate Control</label>
                    <select
                      className="form-control"
                      value={ts3Ratecontrol}
                      onChange={(event) =>
                        changeHandler(event, setTs3Ratecontrol, "ts3_ratecontrol")
                      }
                    >
                      <option value="">Select One</option>
                      <option value="CBR">CBR</option>
                      <option value="VBR">VBR</option>
                    </select>
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "ASI" ? "not-visible" : "")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Protocol</label>
                    <select
                      className="form-control"
                      value={ts3Delivery}
                      onChange={(event) =>
                        changeHandler(event, setTs3Delivery, "ts3_delivery")
                      }
                    >
                      <option value="">Select One</option>
                      {getProtocol()}
                    </select>
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">SRT Mode</label>
                    <select
                      className="form-control"
                      value={ts3Srtmode}
                      onChange={(event) =>
                        changeHandler(event, setTs3Srtmode, "ts3_srtmode=")
                      }
                    >
                      <option value="">Select One</option>
                      <option value="caller">Caller</option>
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                {deviceModelCondition ? <>

                  <div
                    className={
                      "col-sm-6 " +
                      (props.outputMode === "UDP" ? "" : "not-visible")
                    }
                  >
                    <div className="form-group">
                      <label className="form-check-label">
                        Destination IP Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ts3Ip}
                        onChange={(event) =>
                          changeHandler(event, setTs3Ip, "ts3_ip")
                        }
                      />
                    </div>
                  </div>

                  <div
                    className={
                      "col-sm-6 " +
                      (props.outputMode === "UDP" ? "" : "not-visible")
                    }
                  >
                    <div className="form-group">
                      <label className="form-check-label">Source Port</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          if (event.target.value.match(/[^0-9]/)) {
                            return;
                          }
                          if (Number.parseInt(event.target.value) > 65536 || Number.parseInt(event.target.value) < 1) return;
                          changeHandler(event, setTs3Srcport, "ts3_srcport")
                        }}
                        value={ts3Srcport}
                      />
                    </div>
                  </div>

                  <div
                    className={
                      "col-sm-6 " +
                      (props.outputMode === "UDP" ? "" : "not-visible")
                    }
                  >
                    <div className="form-group">
                      <label className="form-check-label">Destination Port</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ts3Port}
                        onChange={(event) => {
                          if (event.target.value.match(/[^0-9]/)) { return; }
                          changeHandler(event, setTs3Port, "ts3_port")
                        }
                        }
                      />
                    </div>
                  </div>

                  <div
                    className={
                      "col-sm-6 " +
                      (props.outputMode === "UDP" ? "" : "not-visible")
                    }
                  >
                    <div className="form-group">
                      <label className="form-check-label">Time To Live</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ts3TimeToLive}
                        onChange={(event) => {
                          if (event.target.value.match(/[^0-9]/)) { return; }
                          changeHandler(event, setTs3TimeToLive, "ts3_timeToLive")
                        }}
                      />
                    </div>
                  </div>
                </> : <></>}

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">
                      Bandwidth Overhead(%)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(
                          event,
                          setTs3BwidthOverHead,
                          "ts3_bwidthoverhead"
                        )
                      }}
                      value={ts3BwidthOverHead}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Latency(ms)</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs3Latency, "ts3_latency")
                      }}
                      value={ts3Latency}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Encryption</label>
                    <select
                      className="form-control"
                      value={ts3Encryption}
                      onChange={(event) =>
                        changeHandler(event, setTs3Encryption, "ts3_encryption")
                      }
                    >
                      <option value="">Select One</option>
                      <option value="0">None</option>
                      <option value="16">AES-128</option>
                      <option value="24">AES-196</option>
                      <option value="32">AES-256</option>
                    </select>
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Passphrase</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(event) =>
                        changeHandler(event, setTs3Passphrase, "ts3_passphrase")
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " + (ts3Delivery === "SRT" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label enc-status">
                      Adaptive Bitrate:
                      <input
                        type="checkbox"
                        className="enc-checkbox"
                        checked={ts3EnableAdaptiveBitrate === "Y" ? true : false}
                        onChange={(event) =>
                          changeHandler(
                            event,
                            setTs3EnableAdaptiveBitrate,
                            "ts3_enableadaptivebitrate"
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className={"col-sm-6 " + (props.legacyStbSupport === "1" ? "" : "not-visible")}>
                  <div className="form-group">
                    <label className="form-check-label">No Empty AF</label>
                    <input
                      type="checkbox"
                      checked={ts3Noemptyaf === "1" ? true : false}
                      className="enc-checkbox"
                      onChange={(event) =>
                        changeHandler(event, setTs3Noemptyaf, "ts3_noemptyaf")
                      }
                    />
                  </div>
                </div>

                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
      <div
        className={
          "pad-15 " +
          (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD"
            ? ""
            : "not-visible")
        }
      >
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Program-3</div>

            <div className="form-boxtopcont user-form">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Program ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={program3Id}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        if (Number.parseInt(event.target.value) > 65535 || Number.parseInt(event.target.value) < 1) return;
                        changeHandler(event, setProgram3Id, "program3_id")
                      }}
                      min="1"
                      max="65535"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">PMT PID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={program3PmtPid}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(
                          event,
                          setProgram3PmtPid,
                          "program3_pmt_pid"
                        )
                      }}
                      min="16"
                      max="8190"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Audio PID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={program3AudioPid}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        changeHandler(
                          event,
                          setProgram3AudioPid,
                          "program3_audio_pid"
                        )
                      }}
                      min="16"
                      max="8190"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">Video PID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={program3VideoPid}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(
                          event,
                          setProgram3VideoPid,
                          "program3_video_pid"
                        )
                      }}
                      min="16"
                      max="8190"
                    />
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
      <div
        className={
          "pad-15 " +
          (props.videoMode === "2xHD+2xSD"
            ? props.tsType === "SPTS"
              ? ""
              : "not-visible"
            : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-4</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts4NetworkId}
                    onChange={(event) =>
                      changeHandler(event, setTs4NetworkId, "ts4_networkid")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Network Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ts4Networkname}
                    onChange={(event) =>
                      changeHandler(event, setTs4Networkname, "ts4_networkname")
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">
                    Original Network ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts4OrgNetworkid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setTs4OrgNetworkid,
                        "ts4_org_networkid"
                      )
                    }
                  />
                </div>
              </div>

              <div className={"col-sm-6 " + (props.outputBitrateMode === "MANUAL" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">Bit Rate(kbps)</label>
                  <input
                    type="number"
                    className="form-control"
                    size="12"
                    maxLength="12"
                    value={ts4Bitrate}
                    onChange={(event) =>
                      changeHandler(event, setTs4Bitrate, "ts4_bitrate")
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">TS ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ts4Id}
                    onChange={(event) =>
                      changeHandler(event, setTs4Id, "ts4_id")
                    }
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts4Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs4Ratecontrol, "ts4_ratecontrol")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="CBR">CBR</option>
                    <option value="VBR">VBR</option>
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " +
                  (props.outputMode === "ASI" ? "not-visible" : "")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Protocol</label>
                  <select
                    className="form-control"
                    value={ts4Delivery}
                    onChange={(event) =>
                      changeHandler(event, setTs4Delivery, "ts4_delivery")
                    }
                  >
                    <option value="">Select One</option>
                    {getProtocol()}
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">SRT Mode</label>
                  <select
                    className="form-control"
                    value={ts4Srtmode}
                    onChange={(event) =>
                      changeHandler(event, setTs4Srtmode, "ts4_srtmode")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="caller">Caller</option>
                  </select>
                </div>
              </div>

              {deviceModelCondition ? <>
                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">
                      Destination IP Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts4Ip}
                      onChange={(event) =>
                        changeHandler(event, setTs4Ip, "ts4_ip")
                      }
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Source Port</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        if (Number.parseInt(event.target.value) > 65536 || Number.parseInt(event.target.value) < 1) return;
                        changeHandler(event, setTs4Srcport, "ts4_srcport")
                      }}
                      value={ts4Srcport}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Destination Port</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts4Port}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs4Port, "ts4_port")
                      }}
                    />
                  </div>
                </div>

                <div
                  className={
                    "col-sm-6 " +
                    (props.outputMode === "UDP" ? "" : "not-visible")
                  }
                >
                  <div className="form-group">
                    <label className="form-check-label">Time To Live</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ts4TimeToLive}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs4TimeToLive, "ts4_timeToLive")
                      }}
                    />
                  </div>
                </div>
              </> : <></>}

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">
                    Bandwidth Overhead(%)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setTs4BwidthOverHead,
                        "ts4_bwidthoverhead"
                      )
                    }}
                    value={ts4BwidthOverHead}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Latency(ms)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs4Latency, "ts4_latency")
                    }}
                    value={ts4Latency}
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Encryption</label>
                  <select
                    className="form-control"
                    value={ts4Encryption}
                    onChange={(event) =>
                      changeHandler(event, setTs4Encryption, "ts4_encryption")
                    }
                  >
                    <option value="">Select One</option>
                    <option value="0">None</option>
                    <option value="16">AES-128</option>
                    <option value="24">AES-196</option>
                    <option value="32">AES-256</option>
                  </select>
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label">Passphrase</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      changeHandler(event, setTs4Passphrase, "ts4_passphrase")
                    }
                  />
                </div>
              </div>

              <div
                className={
                  "col-sm-6 " + (ts4Delivery === "SRT" ? "" : "not-visible")
                }
              >
                <div className="form-group">
                  <label className="form-check-label enc-status">
                    Adaptive Bitrate:
                    <input
                      type="checkbox"
                      className="enc-checkbox"
                      checked={ts4EnableAdaptiveBitrate === "Y" ? true : false}
                      onChange={(event) =>
                        changeHandler(
                          event,
                          setTs4EnableAdaptiveBitrate,
                          "ts4_enableadaptivebitrate"
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div className={"col-sm-6 " + (props.legacyStbSupport === "1" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">No Empty AF</label>
                  <input
                    type="checkbox"
                    checked={ts4Noemptyaf === "1" ? true : false}
                    className="enc-checkbox"
                    onChange={(event) =>
                      changeHandler(event, setTs4Noemptyaf, "ts4_noemptyaf")
                    }
                  />
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      <div
        className={
          "pad-15 " + (props.videoMode === "2xHD+2xSD" ? "" : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Program-4</div>

          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Program ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program4Id}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      if (Number.parseInt(event.target.value) > 65535 || Number.parseInt(event.target.value) < 1) return;
                      changeHandler(event, setProgram4Id, "program4_id")
                    }}
                    min="1"
                    max="65535"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PMT PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program4PmtPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram4PmtPid,
                        "program4_pmt_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program4AudioPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) {
                        return;
                      }
                      changeHandler(
                        event,
                        setProgram4AudioPid,
                        "program4_audio_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program4VideoPid}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(
                        event,
                        setProgram4VideoPid,
                        "program4_video_pid"
                      )
                    }}
                    min="16"
                    max="8190"
                  />
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </>
  );
};

export default TS;
