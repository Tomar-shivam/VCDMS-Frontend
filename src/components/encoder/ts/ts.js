import React, { useState, useEffect } from "react";
import "../encoder.css";
import CommonUtils from "../../../common/CommonUtils";

let TS = (props) => {
  let deviceModelCondition = CommonUtils.DeviceModelCondition(props.properties.model);
  const [ts1NetworkId, setTs1NetworkId] = useState(props.properties1.ts1_networkid);
  const [ts1Networkname, setTs1Networkname] = useState(props.properties1.ts1_networkname);
  const [ts1OrgNetworkid, setTs1OrgNetworkid] = useState(props.properties1.ts1_org_networkid);
  const [ts1Id, setTs1Id] = useState(props.properties1.ts1_id);
  const [ts1Ratecontrol, setTs1Ratecontrol] = useState(props.properties1.ts1_ratecontrol);
  const [ts1Bitrate, setTs1Bitrate] = useState(props.properties1.ts1_bitrate);
  const [ts1Noemptyaf, setTs1Noemptyaf] = useState(props.properties1.ts1_noemptyaf);
  const [ts1Delivery, setTs1Delivery] = useState(props.properties1.ts1_delivery);
  const [ts1Ip, setTs1Ip] = useState(props.properties1.ts1_ip);
  const [ts1Srcport, setTs1Srcport] = useState(props.properties1.ts1_srcport);
  const [ts1Port, setTs1Port] = useState(props.properties1.ts1_port);
  const [ts1TimeToLive, setTs1TimeToLive] = useState(props.properties1.ts1_timeToLive);
  const [httpstreaming, setHttpstreaming] = useState(props.properties1.httpstreaming);
  const [dashSegmentsize, setDashSegmentsize] = useState(props.properties1.dash_segmentsize);
  const [dashAdvsettings, setDashAdvsettings] = useState(props.properties1.dash_advsettings);
  const [dashBufferdepth, setDashBufferdepth] = useState(props.properties1.dash_bufferdepth);
  const [dashMinbuffertime, setDashMinbuffertime] = useState(props.properties1.dash_minbuffertime);
  const [dashMinupdateperiod, setDashMinupdateperiod] = useState(props.properties1.dash_minupdateperiod);
  const [dashPresentationdelay, setDashPresentationdelay] = useState(props.properties1.dash_presentationdelay);
  const [ts1Latency, setTs1Latency] = useState(props.properties1.ts1_latency);
  const [program1Id, setProgram1Id] = useState(props.properties1.program1_id);
  const [program1PmtPid, setProgram1PmtPid] = useState(props.properties1.program1_pmt_pid);
  const [program1PcrPid, setProgram1PcrPid] = useState(props.properties1.program1_pcr_pid);
  const [program1AudioPid, setProgram1AudioPid] = useState(props.properties1.program1_audio_pid);
  const [program1VideoPid, setProgram1VideoPid] = useState(props.properties1.program1_video_pid);
  const [httpStreamingClass, setHttpStreamingClass] = useState(props.properties1.dash_advsettings === "manual" ? "" : "not-visible");
  const [ts1Srtmode, setTs1Srtmode] = useState(props.properties1["ts1_srtmode="]);
  const [ts1BwidthOverHead, setTs1BwidthOverHead] = useState(props.properties1.ts1_bwidthoverhead);
  const [ts1Encryption, setTs1Encryption] = useState(props.properties1.ts1_encryption);
  const [ts1Passphrase, setTs1Passphrase] = useState(props.properties.ts1_passphrase ? props.properties1.ts1_passphrase : "");
  const [ts1EnableAdaptiveBitrate, setTs1EnableAdaptiveBitrate] = useState(props.properties1.ts1_enableadaptivebitrate);
  const [ts2NetworkId, setTs2NetworkId] = useState(props.properties1.ts2_networkid);
  const [ts2Ratecontrol, setTs2Ratecontrol] = useState(props.properties1.ts2_ratecontrol);
  const [ts2Delivery, setTs2Delivery] = useState(props.properties1.ts2_delivery);
  const [ts2Ip, setTs2Ip] = useState(props.properties1.ts2_ip);
  const [ts2Srcport, setTs2Srcport] = useState(props.properties1.ts2_srcport);
  const [ts2Port, setTs2Port] = useState(props.properties1.ts2_port);
  const [ts2TimeToLive, setTs2TimeToLive] = useState(props.properties1.ts2_timeToLive);
  const [ts2Latency, setTs2Latency] = useState(props.properties1.ts2_latency);
  const [program2Id, setProgram2Id] = useState(props.properties1.program2_id);
  const [program2PmtPid, setProgram2PmtPid] = useState(props.properties1.program2_pmt_pid);
  const [program2PcrPid, setProgram2PcrPid] = useState(props.properties1.program2_pcr_pid);
  const [program2AudioPid, setProgram2AudioPid] = useState(props.properties1.program2_audio_pid);
  const [program2VideoPid, setProgram2VideoPid] = useState(props.properties1.program2_video_pid);
  const [ts2BwidthOverHead, setTs2BwidthOverHead] = useState(props.properties1.ts2_bwidthoverhead);
  const [ts2Encryption, setTs2Encryption] = useState(props.properties1.ts2_encryption);
  const [ts2Passphrase, setTs2Passphrase] = useState(props.properties1.ts2_passphrase ? props.properties1.ts2_passphrase : "");
  const [ts2EnableAdaptiveBitrate, setTs2EnableAdaptiveBitrate] = useState(props.properties1.ts2_enableadaptivebitrate);
  const [ts2Srtmode, setTs2Srtmode] = useState(props.properties1.ts2_strmode);
  const [ts2Networkname, setTs2Networkname] = useState(props.properties1.ts2_networkname);
  const [ts2OrgNetworkid, setTs2OrgNetworkid] = useState(props.properties1.ts2_networkname);
  const [ts2Id, setTs2Id] = useState(props.properties1.ts2_id);
  const [ts2Bitrate, setTs2Bitrate] = useState(props.properties1.ts2_bitrate);
  const [ts2Noemptyaf, setTs2Noemptyaf] = useState(props.properties1.ts2_noemptyaf);
  const [ts3NetworkId, setTs3NetworkId] = useState(props.properties1.ts3_networkid);
  const [ts3Ratecontrol, setTs3Ratecontrol] = useState(props.properties1.ts3_ratecontrol);
  const [ts3Delivery, setTs3Delivery] = useState(props.properties1.ts3_delivery);
  const [ts3Ip, setTs3Ip] = useState(props.properties1.ts3_ip);
  const [ts3Srcport, setTs3Srcport] = useState(props.properties1.ts3_srcport);
  const [ts3Port, setTs3Port] = useState(props.properties1.ts3_port);
  const [ts3TimeToLive, setTs3TimeToLive] = useState(props.properties1.ts3_timeToLive);
  const [ts3Latency, setTs3Latency] = useState(props.properties1.ts3_latency);
  const [program3Id, setProgram3Id] = useState(props.properties1.program3_id);
  const [program3PmtPid, setProgram3PmtPid] = useState(props.properties1.program3_pmt_pid);
  const [program3PcrPid, setProgram3PcrPid] = useState(props.properties1.program3_pcr_pid);
  const [program3AudioPid, setProgram3AudioPid] = useState(props.properties1.program3_audio_pid);
  const [program3VideoPid, setProgram3VideoPid] = useState(props.properties1.program3_video_pid);
  const [ts3BwidthOverHead, setTs3BwidthOverHead] = useState(props.properties1.ts3_bwidthoverhead);
  const [ts3Encryption, setTs3Encryption] = useState(props.properties1.ts3_encryption);
  const [ts3Passphrase, setTs3Passphrase] = useState(props.properties1.ts3_passphrase ? props.properties1.ts3_passphrase : "");
  const [ts3EnableAdaptiveBitrate, setTs3EnableAdaptiveBitrate] = useState(props.properties1.ts3_enableadaptivebitrate);
  const [ts3Srtmode, setTs3Srtmode] = useState(props.properties1.ts3_strmode);
  const [ts3Networkname, setTs3Networkname] = useState(props.properties1.ts3_networkname);
  const [ts3OrgNetworkid, setTs3OrgNetworkid] = useState(props.properties1.ts3_networkname);
  const [ts3Id, setTs3Id] = useState(props.properties1.ts3_id);
  const [ts3Bitrate, setTs3Bitrate] = useState(props.properties1.ts3_bitrate);
  const [ts3Noemptyaf, setTs3Noemptyaf] = useState(props.properties1.ts3_noemptyaf);
  const [ts4NetworkId, setTs4NetworkId] = useState(props.properties1.ts4_networkid);
  const [ts4Ratecontrol, setTs4Ratecontrol] = useState(props.properties1.ts4_ratecontrol);
  const [ts4Delivery, setTs4Delivery] = useState(props.properties1.ts4_delivery);
  const [ts4Ip, setTs4Ip] = useState(props.properties1.ts4_ip);
  const [ts4Srcport, setTs4Srcport] = useState(props.properties1.ts4_srcport);
  const [ts4Port, setTs4Port] = useState(props.properties1.ts4_port);
  const [ts4TimeToLive, setTs4TimeToLive] = useState(props.properties1.ts4_timeToLive);
  const [ts4Latency, setTs4Latency] = useState(props.properties1.ts4_latency);
  const [program4Id, setProgram4Id] = useState(props.properties1.program4_id);
  const [program4PmtPid, setProgram4PmtPid] = useState(props.properties1.program4_pmt_pid);
  const [program4PcrPid, setProgram4PcrPid] = useState(props.properties1.program4_pcr_pid);
  const [program4AudioPid, setProgram4AudioPid] = useState(props.properties1.program4_audio_pid);
  const [program4VideoPid, setProgram4VideoPid] = useState(props.properties1.program4_video_pid);
  const [ts4BwidthOverHead, setTs4BwidthOverHead] = useState(props.properties1.ts4_bwidthoverhead);
  const [ts4Encryption, setTs4Encryption] = useState(props.properties1.ts4_encryption);
  const [ts4Passphrase, setTs4Passphrase] = useState(props.properties1.ts4_passphrase ? props.properties1.ts4_passphrase : "");
  const [ts4EnableAdaptiveBitrate, setTs4EnableAdaptiveBitrate] = useState(props.properties1.ts4_enableadaptivebitrate);
  const [ts4Srtmode, setTs4Srtmode] = useState(props.properties1.ts4_srtmode);
  const [ts4Networkname, setTs4Networkname] = useState(props.properties1.ts4_networkname);
  const [ts4OrgNetworkid, setTs4OrgNetworkid] = useState(props.properties1.ts4_networkname);
  const [ts4Id, setTs4Id] = useState(props.properties1.ts4_id);
  const [ts4Bitrate, setTs4Bitrate] = useState(props.properties1.ts4_bitrate);
  const [ts4Noemptyaf, setTs4Noemptyaf] = useState(props.properties1.ts4_noemptyaf);

  useEffect(() => {
    setTs1NetworkId(props.properties1.ts1_networkid);
    setTs1Networkname(props.properties1.ts1_networkname);
    setTs1OrgNetworkid(props.properties1.ts1_org_networkid);
    setTs1Id(props.properties1.ts1_id);
    setTs1Ratecontrol(props.properties1.ts1_ratecontrol);
    setTs1Bitrate(props.properties1.ts1_bitrate);
    setTs1Noemptyaf(props.properties1.ts1_noemptyaf);
    setTs1Delivery(props.properties1.ts1_delivery);
    setTs1Ip(props.properties1.ts1_ip);
    setTs1Srcport(props.properties1.ts1_srcport);
    setTs1Port(props.properties1.ts1_port);
    setTs1TimeToLive(props.properties1.ts1_timeToLive);
    setHttpstreaming(props.properties1.httpstreaming);
    setDashSegmentsize(props.properties1.dash_segmentsize);
    setDashAdvsettings(props.properties1.dash_advsettings);
    setDashBufferdepth(props.properties1.dash_bufferdepth);
    setDashMinbuffertime(props.properties1.dash_minbuffertime);
    setDashMinupdateperiod(props.properties1.dash_minupdateperiod);
    setDashPresentationdelay(props.properties1.dash_presentationdelay);
    setProgram1Id(props.properties1.program1_id);
    setProgram1PmtPid(props.properties1.program1_pmt_pid);
    setProgram1PcrPid(props.properties1.program1_pcr_pid);
    setProgram1AudioPid(props.properties1.program1_audio_pid);
    setProgram1VideoPid(props.properties1.program1_video_pid);
    setHttpStreamingClass(props.properties1.dash_advsettings === "manual" ? "" : "not-visible");
    setTs1Srtmode(props.properties1["ts1_srtmode="]);
    setTs1Latency(props.properties1.ts1_latency);
    setTs1BwidthOverHead(props.properties1.ts1_bwidthoverhead);
    setTs1Encryption(props.properties1.ts1_encryption);
    setTs1Passphrase(props.properties1.ts1_passphrase ? props.properties1.ts1_passphrase : "");
    setTs1EnableAdaptiveBitrate(props.properties1.ts1_enableadaptivebitrate);
    setTs2NetworkId(props.properties1.ts2_networkid);
    setTs2Ratecontrol(props.properties1.ts2_ratecontrol);
    setTs2Delivery(props.properties1.ts2_delivery);
    setTs2Ip(props.properties1.ts2_ip);
    setTs2Srcport(props.properties1.ts2_srcport);
    setTs2Port(props.properties1.ts2_port);
    setTs2TimeToLive(props.properties1.ts2_timeToLive);
    setTs2Latency(props.properties1.ts2_latency);
    setProgram2Id(props.properties1.program2_id);
    setProgram2PmtPid(props.properties1.program2_pmt_pid);
    setProgram2PcrPid(props.properties1.program2_pcr_pid);
    setProgram2AudioPid(props.properties1.program2_audio_pid);
    setProgram2VideoPid(props.properties1.program2_video_pid);
    setTs2BwidthOverHead(props.properties1.ts2_bwidthoverhead);
    setTs2Encryption(props.properties1.ts2_encryption);
    setTs2Passphrase(props.properties1.ts2_passphrase ? props.properties1.ts2_passphrase : "");
    setTs2EnableAdaptiveBitrate(props.properties1.ts2_enableadaptivebitrate);
    setTs2Srtmode(props.properties1.ts2_srtmode);
    setTs2Networkname(props.properties1.ts2_networkname);
    setTs2OrgNetworkid(props.properties1.ts2_org_networkid);
    setTs2Id(props.properties1.ts2_id);
    setTs2Bitrate(props.properties1.ts2_bitrate);
    setTs2Noemptyaf(props.properties1.ts2_noemptyaf);

    setTs3NetworkId(props.properties1.ts3_networkid);
    setTs3Ratecontrol(props.properties1.ts3_ratecontrol);
    setTs3Delivery(props.properties1.ts3_delivery);
    setTs3Ip(props.properties1.ts3_ip);
    setTs3Srcport(props.properties1.ts3_srcport);
    setTs3Port(props.properties1.ts3_port);
    setTs3TimeToLive(props.properties1.ts3_timeToLive);
    setTs3Latency(props.properties1.ts3_latency);
    setProgram3Id(props.properties1.program3_id);
    setProgram3PmtPid(props.properties1.program3_pmt_pid);
    setProgram3PcrPid(props.properties1.program3_pcr_pid);
    setProgram3AudioPid(props.properties1.program3_audio_pid);
    setProgram3VideoPid(props.properties1.program3_video_pid);
    setTs3BwidthOverHead(props.properties1.ts3_bwidthoverhead);
    setTs3Encryption(props.properties1.ts3_encryption);
    setTs3Passphrase(props.properties1.ts3_passphrase ? props.properties1.ts3_passphrase : "");
    setTs3EnableAdaptiveBitrate(props.properties1.ts3_enableadaptivebitrate);
    setTs3Srtmode(props.properties1.ts3_srtmode);
    setTs3Networkname(props.properties1.ts3_networkname);
    setTs3OrgNetworkid(props.properties1.ts3_org_networkid);
    setTs3Id(props.properties1.ts3_id);
    setTs3Bitrate(props.properties1.ts3_bitrate);
    setTs3Noemptyaf(props.properties1.ts3_noemptyaf);

    setTs4NetworkId(props.properties1.ts4_networkid);
    setTs4Ratecontrol(props.properties1.ts4_ratecontrol);
    setTs4Delivery(props.properties1.ts4_delivery);
    setTs4Ip(props.properties1.ts4_ip);
    setTs4Srcport(props.properties1.ts4_srcport);
    setTs4Port(props.properties1.ts4_port);
    setTs4TimeToLive(props.properties1.ts4_timeToLive);
    setTs4Latency(props.properties1.ts4_latency);
    setProgram4Id(props.properties1.program4_id);
    setProgram4PmtPid(props.properties1.program4_pmt_pid);
    setProgram4PcrPid(props.properties1.program4_pcr_pid);
    setProgram4AudioPid(props.properties1.program4_audio_pid);
    setProgram4VideoPid(props.properties1.program4_video_pid);
    setTs4BwidthOverHead(props.properties1.ts4_bwidthoverhead);
    setTs4Encryption(props.properties1.ts4_encryption);
    setTs4Passphrase(props.properties1.ts4_passphrase ? props.properties1.ts4_passphrase : "");
    setTs4EnableAdaptiveBitrate(props.properties1.ts4_enableadaptivebitrate);
    setTs4Srtmode(props.properties1.ts4_srtmode);
    setTs4Networkname(props.properties1.ts4_networkname);
    setTs4OrgNetworkid(props.properties1.ts4_org_networkid);
    setTs4Id(props.properties1.ts4_id);
    setTs4Bitrate(props.properties1.ts4_bitrate);
    setTs4Noemptyaf(props.properties1.ts4_noemptyaf);
  }, [props.properties1, props]);

  const changeHandler = (event, setContent, type) => {
    let sample = { ...props.properties1 };
    let arr = ["ts1_enableadaptivebitrate", "ts2_enableadaptivebitrate"];
    for (let i = 0; i < arr.length; i++) {
      if (type === arr[i]) {
        event.target.checked ? setContent("Y") : setContent("N");
        sample[type] = event.target.checked ? "Y" : "N";
        return;
      }
    }
    if (type === "ts1_noemptyaf" || type === "ts2_noemptyaf") {
      setContent(event.target.checked ? "1" : "0");
      sample[type] = event.target.checked ? "1" : "0";
      props.setProperties1(sample);
      return;
    }
    setContent(event.target.value);
    sample[type] = event.target.value;
    props.setProperties1(sample);
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

    else if (props.outputMode === "TCP") {
      return (
        <>
          <option value="HTTP">HTTP</option>
        </>
      );
    }
    else {
      return (
        <>
          <option value="RTSP">RTSP</option>
        </>
      );
    }
  };

  const checkPIDs = (programId, type, program) => {
    let contents = ["id", "audio_pid", "video_pid", "pmt_pid"];
    let programNo = (program === "program1") ? 1 : ((program === "program2") ? 2 : (program === "program3") ? 3 : 4)
    let typeIndex = 0;
    if (type === "program") typeIndex = 1;
    else if (type === "audio") typeIndex = 2;
    else if (type === "video") typeIndex = 3;
    else typeIndex = 4;
    if (props.properties1.ts_type === "SPTS") {
      for (let i = 1; i < 5; i++) {
        if ((i !== typeIndex) && (programId === props.properties1[`${program}_${contents[i - 1]}`])) {
          return "";
        }
      }
    }
    else {
      for (let i = 1; i < 5; i++) {
        if ((i !== typeIndex) && (programId === props.properties1[`${program}_${contents[i - 1]}`])) {
          return "";
        }
      }

      for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
          if ((i !== programNo) && (programId === props.properties1[`program${i}_${contents[j - 1]}`])) {
            return "";
          }
        }
      }
    }
    return "not-visible";
  }

  const checkSourcePorts = (sourcePortVal, sourcePortNum, allEncoders) => {
    if (sourcePortVal !== '0') {
      for (let j = 1; j < Number.parseInt(props.properties1.encoder_count) + 1; j++) {
        if (sourcePortVal === props.properties1[`ts${j}_port`]) {
          return '';
        }
      }
      for (let j = 1; j < Number.parseInt(props.properties1.encoder_count) + 1; j++) {
        if (j !== sourcePortNum && sourcePortVal === props.properties1[`ts${j}_srcport`]) {
          return '';
        }
      }
    }
    return "not-visible";
  }

  return (
    <div>
      <div className={"pad-15 " + (props.outputMode === "TCP" ? "" : "not-visible")}>
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
                      changeHandler(event, setDashSegmentsize, "dash_segmentsize")
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
                    onChange={(event) => changeHandler(event, setDashBufferdepth, "dash_bufferdepth")}
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
                    onChange={(event) => changeHandler(event, setDashMinbuffertime, "dash_minbuffertime")}
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
                    onChange={(event) => changeHandler(event, setDashMinupdateperiod, "dash_minupdateperiod")}
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
                    onChange={(event) => changeHandler(event, setDashPresentationdelay, "dash_presentationdelay")}
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
                    onChange={(event) => changeHandler(event, setTs1NetworkId, "ts1_networkid")}
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
                    onChange={(event) => changeHandler(event, setTs1Networkname, "ts1_networkname")}
                  />
                </div>
              </div>

              <div
                className={"col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")}
              >
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

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">TS ID</label>
                  <input
                    className="form-control"
                    value={ts1Id}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs1Id, "ts1_id")
                    }
                    }
                    min="1"
                    max="65535"
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
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts1Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs1Ratecontrol, "ts1_ratecontrol")
                    }
                  >
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
                    value={ts1Delivery}
                    onChange={(event) =>
                      changeHandler(event, setTs1Delivery, "ts1_delivery")
                    }
                  >
                    {getProtocol()}
                  </select>
                </div>
              </div>

              {/* {props.properties1.model.includes("VL4522Q") &&
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
              {/* 
              {props.properties.model.includes("RM1121CXF") ?
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-check-label">RTSP Server Port</label>
                    <input type='number' placeholder='0' min={0} className='form-control' />
                  </div>
                </div>
                : <></>
              } */}

              <div className={"col-sm-6 " + (ts1Delivery === "SRT" ? "" : "not-visible")}>
                <div className="form-group">
                  <label className="form-check-label">SRT Mode</label>
                  <select
                    className="form-control"
                    value={ts1Srtmode}
                    onChange={(event) =>
                      changeHandler(event, setTs1Srtmode, "ts1_srtmode=")
                    }
                  >
                    <option value="caller">Caller</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {deviceModelCondition && <>
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
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) { return; }
                        changeHandler(event, setTs1Ip, "ts1_ip")
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
                    <label className="form-check-label">Source Port</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        if (Number.parseInt(event.target.value) > 65536 || Number.parseInt(event.target.value) < 0) return;
                        changeHandler(event, setTs1Srcport, "ts1_srcport")
                      }}
                      value={ts1Srcport}
                      required
                    />
                    {props.properties1.ts1_delivery === "SRT" ? <i
                      style={{ color: "red" }}
                      className={checkSourcePorts(ts1Srcport, 1, props.allEncoders)}
                    >
                      {ts1Srcport === "" ? ("Source port can't be Empty") : ("Source port can't be dublicate")}

                    </i> : ''}
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
                      type="number"
                      className="form-control"
                      value={ts1Port}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) { return; }
                        changeHandler(event, setTs1Port, "ts1_port")
                      }}
                      required
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
                </div></>}

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
                    value={ts1Passphrase}
                    onChange={(event) =>
                      event.target.value.length > 24 ? "" :
                        changeHandler(event, setTs1Passphrase, "ts1_passphrase")
                    }
                  />
                  {ts1Passphrase !== "" && (ts1Passphrase.length > 24 || ts1Passphrase.length < 10) ? <i
                    style={{ color: "red" }}
                    className=""
                  >
                    PassPhrase length should be between 10-24
                  </i> : <i className="not-visible"></i>
                  }
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

              <div className={"col-sm-6 " + (['RM11','VL45'].includes(props.properties1.model.substring(0, 4)) && props.legacyStbSupport === "1" ? "" : "not-visible")}>
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
              {/* <div className={"col-sm-6 " + (props.properties1.model.substring(0, 4) === "VL45" && props.legacyStbSupport === "1" ? "" : "not-visible")}>
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
              </div> */}

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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1Id, "program", "program1")}
                  >
                    {program1Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}

                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1Id, "program", "program1")}
                  >
                    {program1Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i>
                  }
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1PmtPid, "pmt", "program1")}
                  >
                    {program1PmtPid === "" ? ("Program PMT Id's should not be empty.") : ("Program PMT Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1PmtPid, "pmt", "program1")}
                  >
                    {program1PmtPid === "" ? ("Program PMT Ids should not be empty.") : ("Program PMT Id's should be different.")}
                  </i>
                  }

                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PCR PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program1PcrPid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setProgram1PcrPid,
                        "program1_pcr_pid"
                      )
                    }
                    maxLength="4"
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Audio-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1AudioPid, "audio", "program1")}
                  >
                    {program1AudioPid === "" ? ("Program Audio Id's should not be empty.") : ("Program Audio Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1AudioPid, "audio", "program1")}
                  >
                    {program1AudioPid === "" ? ("Program Audio Id's should not be empty.") : ("Program Audio Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Video-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1VideoPid, "video", "program1")}
                  >
                    {program1VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program1VideoPid, "video", "program1")}
                  >
                    {program1VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i>
                  }
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
          (props.videoMode !== "1xHD+1xSD" && props.videoMode !== "2xHD" && props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD"
            ? "not-visible"
            : props.tsType === "SPTS"
              ? ""
              : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-2</div>
          <div className="form-boxtopcont user-form">
            <div className="row">

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts2Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs2Ratecontrol, "ts2_ratecontrol")
                    }
                  >
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
                    <option value="caller">Caller</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {deviceModelCondition && <>
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
                    min="1"
                    max="65535"
                  />
                  {props.properties1.ts2_delivery === "SRT" ? <i
                    style={{ color: "red" }}
                    className={checkSourcePorts(ts2Srcport, 2, props.allEncoders)}
                  >
                    {ts2Srcport === "" ? ("Source port can't be Empty") : ("Source port can't be dublicate")}

                  </i> : ''}
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
                    type="number"
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
              </div></>}

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
                    value={ts2Passphrase}
                    onChange={(event) =>
                      event.target.value.length > 24 ? "" :
                        changeHandler(event, setTs2Passphrase, "ts2_passphrase")
                    }
                  />
                  {ts2Passphrase !== "" && (ts2Passphrase.length > 24 || ts2Passphrase.length < 10) ? <i
                    style={{ color: "red" }}
                    className=""
                  >
                    PassPhrase length should be between 10-24
                  </i> : <i className="not-visible"></i>
                  }
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

              <div className={"col-sm-6 " + (['RM11','VL45'].includes(props.properties1.model.substring(0, 4)) && props.legacyStbSupport === "1" ? "" : "not-visible")}>
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
              {/* <div className={"col-sm-6 " + (props.properties1.model.substring(0, 4) === "VL45" ? "" : "not-visible")}>
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
              </div> */}

              <div className="clear"></div>
            </div>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2Id, "program", "program2")}
                  >
                    {program2Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2Id, "program", "program2")}
                  >
                    {program2Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i>
                  }
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2PmtPid, "pmt", "program2")}
                  >
                    {program2PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2PmtPid, "pmt", "program2")}
                  >
                    {program2PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PCR PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program2PcrPid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setProgram2PcrPid,
                        "program2_pcr_pid"
                      )
                    }
                    min="16"
                    max="8190"
                    maxLength="4"
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Audio-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2AudioPid, "audio", "program2")}
                  >
                    {program2AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2AudioPid, "audio", "program2")}
                  >
                    {program2AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Video-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2VideoPid, "video", "program2")}
                  >
                    {program2VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program2VideoPid, "video", "program2")}
                  >
                    {program2VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i>
                  }
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
          (props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD"
            ? "not-visible"
            : props.tsType === "SPTS"
              ? ""
              : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-3</div>
          <div className="form-boxtopcont user-form">
            <div className="row">

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts3Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs3Ratecontrol, "ts3_ratecontrol")
                    }
                  >
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
                      changeHandler(event, setTs3Srtmode, "ts3_srtmode")
                    }
                  >
                    <option value="caller">Caller</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {deviceModelCondition && <>
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
                    min="1"
                    max="65535"
                  />
                  {props.properties1.ts3_delivery === "SRT" ? <i
                    style={{ color: "red" }}
                    className={checkSourcePorts(ts3Srcport, 3, props.allEncoders)}
                  >
                    {ts3Srcport === "" ? ("Source port can't be Empty") : ("Source port can't be dublicate")}

                  </i> : ''}
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
                    type="number"
                    className="form-control"
                    value={ts3Port}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs3Port, "ts3_port")
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
                    value={ts3TimeToLive}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9]/)) { return; }
                      changeHandler(event, setTs3TimeToLive, "ts3_timeToLive")
                    }}
                  />
                </div>
              </div></>}

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
                        "ts2_bwidthoverhead"
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
                    value={ts3Passphrase}
                    onChange={(event) =>
                      event.target.value.length > 24 ? "" :
                        changeHandler(event, setTs3Passphrase, "ts3_passphrase")
                    }
                  />
                  {
                    ts3Passphrase !== "" && (ts3Passphrase.length > 24 || ts3Passphrase.length < 10) ? <i
                      style={{ color: "red" }}
                      className=""
                    >
                      PassPhrase length should be between 10-24
                    </i> : <i className="not-visible"></i>
                  }
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

              <div className={"col-sm-6 " + (['RM11','VL45'].includes(props.properties1.model.substring(0, 4)) && props.legacyStbSupport === "1" ? "" : "not-visible")}>
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
              {/* <div className={"col-sm-6 " + (props.properties1.model.substring(0, 4) === "VL45" ? "" : "not-visible")}>
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
              </div> */}

              <div className="clear"></div>
            </div>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3Id, "program", "program3")}
                  >
                    {program3Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3Id, "program", "program3")}
                  >
                    {program3Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i>
                  }
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3PmtPid, "pmt", "program3")}
                  >
                    {program3PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3PmtPid, "pmt", "program3")}
                  >
                    {program3PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PCR PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program3PcrPid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setProgram3PcrPid,
                        "program3_pcr_pid"
                      )
                    }
                    min="16"
                    max="8190"
                    maxLength="4"
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Audio-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3AudioPid, "audio", "program3")}
                  >
                    {program3AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3AudioPid, "audio", "program3")}
                  >
                    {program3AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Video-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3VideoPid, "video", "program3")}
                  >
                    {program3VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program3VideoPid, "video", "program3")}
                  >
                    {program3VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i>
                  }

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
          (props.videoMode !== "2xHD+2xSD"
            ? "not-visible"
            : props.tsType === "SPTS"
              ? ""
              : "not-visible")
        }
      >
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Transport Stream-4</div>
          <div className="form-boxtopcont user-form">
            <div className="row">

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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

              <div
                className={
                  "col-sm-6 " + (props.tsMode === "DVB" ? "" : "not-visible")
                }
              >
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
                  <label className="form-check-label">Bit Rate Control</label>
                  <select
                    className="form-control"
                    value={ts4Ratecontrol}
                    onChange={(event) =>
                      changeHandler(event, setTs4Ratecontrol, "ts4_ratecontrol")
                    }
                  >
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
                    <option value="caller">Caller</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              {deviceModelCondition && <>
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
                    min="1"
                    max="65535"
                  />
                  {props.properties1.ts4_delivery === "SRT" ? <i
                    style={{ color: "red" }}
                    className={checkSourcePorts(ts4Srcport, 4, props.allEncoders)}
                  >
                    {ts4Srcport === "" ? ("Source port can't be Empty") : ("Source port can't be dublicate")}

                  </i> : ''}
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
                    type="number"
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
              </div></>}

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
                    value={ts4Passphrase}
                    onChange={(event) =>
                      event.target.value.length > 24 ? "" :
                        changeHandler(event, setTs4Passphrase, "ts4_passphrase")
                    }
                  />
                  {
                    ts4Passphrase !== "" && (ts4Passphrase.length > 24 || ts4Passphrase.length < 10) ? <i
                      style={{ color: "red" }}
                      className=""
                    >
                      PassPhrase length should be between 10-24
                    </i> : <i className="not-visible"></i>
                  }
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
                          event, setTs4EnableAdaptiveBitrate, "ts4_enableadaptivebitrate"
                        )}
                    />
                  </label>
                </div>
              </div>

              <div className={"col-sm-6 " + (['RM11','VL45'].includes(props.properties1.model.substring(0, 4)) && props.legacyStbSupport === "1" ? "" : "not-visible")}>
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
              {/* <div className={"col-sm-6 " + (props.properties1.model.substring(0, 4) === "VL45" ? "" : "not-visible")}>
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
              </div> */}

              <div className="clear"></div>
            </div>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4Id, "program", "program4")}
                  >
                    {program4Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4Id, "program", "program4")}
                  >
                    {program4Id === "" ? ("Program Id's should be different.") : ("Program Id's should be different.")}
                  </i>
                  }
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4PmtPid, "pmt", "program4")}
                  >
                    {program4PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4PmtPid, "pmt", "program4")}
                  >
                    {program4PmtPid === "" ? ("Program PMT Id's should be different.") : ("Program PMT Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">PCR PID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={program4PcrPid}
                    onChange={(event) =>
                      changeHandler(
                        event,
                        setProgram4PcrPid,
                        "program4_pcr_pid"
                      )
                    }
                    min="16"
                    max="8190"
                    maxLength="4"
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Audio ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Audio-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4AudioPid, "audio", "program4")}
                  >
                    {program4AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4AudioPid, "audio", "program4")}
                  >
                    {program4AudioPid === "" ? ("Program Audio Id's should be different.") : ("Program Audio Id's should be different.")}
                  </i>
                  }
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-check-label">Video ES Stream</label>
                  <select className="form-control" disabled>
                    <option>Video-1</option>
                  </select>
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
                  {props.properties1.ts_type === "SPTS" ? <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4VideoPid, "video", "program4")}
                  >
                    {program4VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i> : <i
                    style={{ color: "red" }}
                    className={checkPIDs(program4VideoPid, "video", "program4")}
                  >
                    {program4VideoPid === "" ? ("Program Video Id's should be different.") : ("Program Video Id's should be different.")}
                  </i>
                  }
                </div>
              </div>
            </div>

            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
};

export default TS;
