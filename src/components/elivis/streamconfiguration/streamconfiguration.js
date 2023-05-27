import React, { useEffect, useState } from "react";
import "../ellvis.css";
import "./streamconfiguration.css";
import VCDMSService from "../../../services/http.service";
import Loader from "../../../common/loader";
import _ from "underscore";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ErrorMsg from '../../../common/errorMsg';
import SuccessMessage from '../../../common/successMsg';

let StreamConfiguration = (props) => {
  const [inputprotocol, setInputProtocol] = useState();
  const [outputprotocol, setOutputProtocol] = useState();
  const [segmentTemplate, setSegmentTemplate] = useState("Number");
  const [UTCTimingScheme, setUTCTimingScheme] = useState('');
  const [HLSFormate, setHLSFormate] = useState('');
  const [UTCTimingSchemeVal, setUTCTimingSchemeVal] = useState('');
  const [inputsrtmode, setInputSRTMode] = useState();
  const [outputsrtmode, setOutputSRTMode] = useState('');
  const [inputinterfaces, setInputInterface] = useState("");
  const [outputinterfaces, setOutputInterface] = useState("");
  const [inputipaddress, setInputIPAddress] = useState('');
  const [outputipaddress, setOutputIPAddress] = useState('')
  const [inputport, setInputPort] = useState('');
  const [outputport, setOutputPort] = useState('');
  const [inputttl, setInputTTL] = useState('');
  const [outputttl, setOutputTTL] = useState('');
  const [inputlatency, setInputLatency] = useState('');
  const [outputlatency, setOutputLatency] = useState('');
  const [inputtimeout, setInputTimeout] = useState('');
  const [outputtimeout, setOutputTimeout] = useState('');
  const [inputencryption, setInputEncryption] = useState('');
  const [outputencryption, setOutputEncryption] = useState('');
  const [inputencryptionPassphrase, setInputEncryptionPassphrase] = useState('');
  const [outputencryptionPassphrase, setOutputEncryptionPassphrase] = useState('');
  const [inputssmipaddress, setInputSSMIPAddress] = useState('');
  const [inputoutgoingport, setInputOutgoingPort] = useState('');
  const [outputoutgoingport, setOutputOutgoingPort] = useState('');
  const [outputpsoolw, setOutputPSOOLW] = useState('');
  const [outputstwcd, setOutputSTWCD] = useState(false);
  const [outputrtmpLocation, setOutputRTMPLocation] = useState('');
  const [outputminBufferTime, setMinBufferTime] = useState('');
  const [updateInterval, setUpdateInterval] = useState('');
  const [streamComment, setStreamComment] = useState('');
  const [inputdropPackets, setInputDropPackets] = useState(true);
  const [outputdropPackets, setOutputDropPackets] = useState(true);
  const [iframes, setIFrames] = useState(false);
  const [destAdapterEnp4s0, setDestAdapterEnp4s0] = useState({});
  const [destAdapterEnp6s0, setDestAdapterEnp6s0] = useState({});
  const [loading, setLoading] = useState(false);
  const [enablePackager, setEnablePackager] = useState(false);
  const [enableQam, setEnableQam] = useState(false);
  const [enableRTMP, setEnableRTMP] = useState(false);
  const [httpsLocation, setHttpsLocation] = useState(false);
  const [enableLowLatency, setEnableLowLatency] = useState(false);
  const [httpsLocationVal, setHttpsLocationVal] = useState('');
  const [outputsegmentDuration, setOutputSegmentDuration] = useState('');
  const [outputfragmentDuration, setOutputFragmentDuration] = useState('');
  const [outputminUpdatePeriod, setOutputMinUpdatePeriod] = useState('');
  const [outputsuggestedPresentationDelay, setOutputSuggestedPresentationDelay,] = useState('');
  const [outputtimeShiftBufferDepth, setOutputTimeShiftBufferDepth] = useState('');
  const [frequency, setFrequency] = useState('');
  const [qamMode, setQamMode] = useState('');
  const [interleaver, setInterleaver] = useState('');
  const [licensenumber, setLicensenumber] = useState("");
  const history = useHistory();

  useEffect(() => {
    let keys = _.keys(props.stream);
    if (keys.length > 0) {
      setInputProtocol(props.stream.sourceProtocol);
      setOutputProtocol(props.stream.destProtocol);
      setInputSRTMode(
        props.stream
          ? props.stream.sourceSrtMode
            ? props.stream.sourceSrtMode
            : ""
          : ""
      );
      setOutputSRTMode(
        props.stream
          ? props.stream.destSrtMode
            ? props.stream.destSrtMode
            : ""
          : ""
      );
      setInputInterface(
        props.stream
          ? props.stream.sourceAdapterName
            ? props.stream.sourceAdapterName
            : ""
          : ""
      );
      setOutputInterface(
        props.stream
          ? props.stream.destAdapterName
            ? props.stream.destAdapterName
            : ""
          : ""
      );
      setInputIPAddress(
        props.stream ? (props.stream.sourceIP ? props.stream.sourceIP : "") : ""
      );
      setOutputIPAddress(
        props.stream ? (props.stream.destIP ? props.stream.destIP : "") : ""
      );
      setInputPort(
        props.stream
          ? props.stream.sourcePort
            ? props.stream.sourcePort
            : ""
          : ""
      );
      setOutputPort(
        props.stream ? (props.stream.destPort ? props.stream.destPort : "") : ""
      );
      setInputTTL(
        props.stream
          ? props.stream.sourceTtl
            ? props.stream.sourceTtl
            : "32"
          : "32"
      );
      setOutputTTL(
        props.stream
          ? props.stream.destTtl
            ? props.stream.destTtl
            : "32"
          : "32"
      );
      setInputLatency(
        props.stream
          ? props.stream.sourceLatency
            ? props.stream.sourceLatency
            : "150"
          : "150"
      );
      setOutputLatency(
        props.stream
          ? props.stream.destLatency
            ? props.stream.destLatency
            : "150"
          : "150"
      );
      setInputTimeout(
        props.stream
          ? props.stream.sourceTimeout
            ? props.stream.sourceTimeout
            : ""
          : ""
      );
      setOutputTimeout(
        props.stream
          ? props.stream.destTimeout
            ? props.stream.destTimeout
            : ""
          : ""
      );
      setInputEncryption(
        props.stream
          ? props.stream.sourceEncryption
            ? props.stream.sourceEncryption
            : ""
          : ""
      );
      setOutputEncryption(
        props.stream
          ? props.stream.destEncryption
            ? props.stream.destEncryption
            : ""
          : ""
      );
      setInputEncryptionPassphrase(
        props.stream
          ? props.stream.sourceEncryptionKey
            ? props.stream.sourceEncryptionKey
            : ""
          : ""
      );
      setOutputEncryptionPassphrase(
        props.stream
          ? props.stream.destEncryptionKey
            ? props.stream.destEncryptionKey
            : ""
          : ""
      );
      setInputSSMIPAddress(
        props.stream
          ? props.stream.sourceSSMIP
            ? props.stream.sourceSSMIP
            : ""
          : ""
      );
      setInputOutgoingPort(
        props.stream
          ? props.stream.sourceOutgoingPort
            ? props.stream.sourceOutgoingPort
            : ""
          : ""
      );
      setOutputOutgoingPort(
        props.stream
          ? props.stream.destOutgoingPort
            ? props.stream.destOutgoingPort
            : ""
          : ""
      );

      setOutputPSOOLW(
        props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow
          ? props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow
          : props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
            ? props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
            : ""
      );

      setOutputSTWCD(false);

      setOutputRTMPLocation(
        props.stream
          ? props.stream.destRtmpLocation
            ? props.stream.destRtmpLocation
            : ""
          : ""
      );

      setOutputSegmentDuration(
        props.stream.destHlsSegmentDuration
          ? props.stream.destHlsSegmentDuration
          : props.stream.destDashSegmentDuration
            ? props.stream.destDashSegmentDuration
            : ""
      );

      setOutputFragmentDuration(
        props.stream.destHlsFragmentDuration !== ""
          ? props.stream.destHlsFragmentDuration
          : props.stream.destDashFragmentDuration
            ? props.stream.destDashFragmentDuration
            : ""
      );

      setOutputMinUpdatePeriod(
        props.stream
          ? props.stream.destDashMinUpdatePeriod
            ? props.stream.destDashMinUpdatePeriod
            : ""
          : ""
      );
      setOutputSuggestedPresentationDelay(
        props.stream
          ? props.stream.destDashSuggestedPresentationDelay
            ? props.stream.destDashSuggestedPresentationDelay
            : ""
          : ""
      );
      setOutputTimeShiftBufferDepth(
        props.stream.destHlsTimeShiftBufferDepth
          ? props.stream.destHlsTimeShiftBufferDepth
          : props.stream.destDashTimeShiftBufferDepth
            ? props.stream.destDashTimeShiftBufferDepth
            : ""
      );
      // setOutputPreseveredSegmentsOutsideOfLiveWindow(
      //   props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow != ""
      //     ? props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow
      //     : props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
      //     ? props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
      //     : ""
      // );
      // setOutputSegmentTemplateConstantDuration(false);
      setIFrames(
        props.stream
          ? props.stream.destHlsEnableIframe
            ? props.stream.destHlsEnableIframe
            : false
          : false
      );
      setOutputPSOOLW(
        props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow
          ? props.stream.destHlsPreservedSegmentsOutsideOfLiveWindow
          : props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
            ? props.stream.destDashPreservedSegmentsOutsideOfLiveWindow
            : ""
      );
      setOutputSTWCD(
        props.stream.destDashSegmentTemplateConstantDuration
          ? props.stream.destDashSegmentTemplateConstantDuration
          : false
      );
      setOutputRTMPLocation(props.stream.destRtmpLocation);
      setMinBufferTime(
        props.stream
          ? props.stream.destDashMinBufferTime
            ? props.stream.destDashMinBufferTime
            : ""
          : ""
      );
      setUpdateInterval(
        props.interval
          ? props.stream.interval
            ? props.stream.interval
            : "30"
          : "30"
      );
      setStreamComment(
        props.stream ? (props.stream.comment ? props.stream.comment : "") : ""
      );
      setInputDropPackets(true);
      setOutputDropPackets(true);
    }
    getDestAdapter();
  }, [props.stream]);

  useEffect(() => {
    getDestAdapter();
  }, [props.ip]);

  useEffect(() => {
    getLicenseNumber();
  }, [props.ip]);

  const getLicenseNumber = async () => {
    let data = {
      IP: props.ip,
    };
    let res = await VCDMSService.getByBoj("checklicensenumber", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      setLicensenumber(res);
      setEnablePackager(res.enablePackager);
      setEnableQam(res.enableQam);
      setEnableRTMP(res.enableRTMP);
    }
  };

  const getDestAdapter = async () => {
    let data = {
      IP: props.ip,
    };

    let res = await VCDMSService.getByBoj("getnetworksettings", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      for (let i = 0; i < res.eth.length; i++) {
        if ("enp4s0" in res.eth[i]) {
          setDestAdapterEnp4s0(res.eth[i].enp4s0);
        } else {
          setDestAdapterEnp6s0(res.eth[i].enp6s0);
        }
      }
    }
  };

  const createContainer = async (event) => {
    event.preventDefault();
    if (!props.customerData) {
      return;
    }
    if (!props.customerData.Username) {
      return;
    }
    if (inputprotocol === undefined || outputprotocol === undefined) {
      ErrorMsg("Please select a Protocol");
      return;
    }
    if (inputinterfaces === "" || outputinterfaces === "") {
      ErrorMsg("Please select an interface");
      return;
    }
    if (streamComment === "") {
      ErrorMsg("Please enter a comment");
      return;
    }
    if (inputprotocol === "SRT" || inputprotocol === "UDP") {
      if (inputport === "") {
        ErrorMsg("Please enter an input port");
        return;
      }
    }
    if (outputprotocol === "SRT" || outputprotocol === "UDP") {
      if (outputport === "") {
        ErrorMsg("Please enter an output port");
        return;
      }
    }
    let data = {};
    if (inputprotocol === "UDP" && outputprotocol === "SRT") {
      if (
        outputencryption !== "" &&
        outputencryptionPassphrase === ""
      ) {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }
      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDropPackets: true,
        destEncryption: outputencryption,
        destEncryptionKey: outputencryptionPassphrase,
        destIP: outputipaddress,
        destLatency: outputlatency,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: outputsrtmode,
        destTimeout: outputtimeout,
        destTtl: outputttl,
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceEncryption: "",
        sourceEncryptionKey: "",
        sourceIP: inputipaddress,
        sourceLatency: "",
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: "",
        sourceTimeout: inputtimeout,
        sourceTtl: inputttl,
        timeout: -1,
        ttl: 0,
      };
    } else if (inputprotocol === "UDP" && outputprotocol === "DASH") {
      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDashMinUpdatePeriod: outputminUpdatePeriod,
        destDashSegmentDuration: outputsegmentDuration,
        destDashSuggestedPresentationDelay: outputsuggestedPresentationDelay,
        destDashTimeShiftBufferDepth: outputtimeShiftBufferDepth,
        destDashPreservedSegmentsOutsideOfLiveWindow: outputpsoolw,
        destDashSegmentTemplateConstantDuration: outputstwcd,
        destDropPackets: true,
        destEncryption: outputencryption,
        destEncryptionKey: outputencryptionPassphrase,
        destIP: outputipaddress,
        destLatency: outputlatency,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: outputsrtmode,
        destTimeout: outputtimeout,
        destTtl: outputttl,
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceEncryption: "",
        sourceEncryptionKey: "",
        sourceIP: inputipaddress,
        sourceLatency: inputlatency,
        sourceOutgoingPort: "",
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: "",
        sourceTimeout: inputtimeout,
        sourceTtl: inputttl,
        timeout: inputtimeout,
        ttl: 0,
      };
    } else if (inputprotocol === "UDP" && outputprotocol === "HLS") {
      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDropPackets: true,
        destEncryption: outputencryption,
        destEncryptionKey: outputencryptionPassphrase,
        destHlsFragmentDuration: outputfragmentDuration,
        destHlsSegmentDuration: outputsegmentDuration,
        destHlsPreservedSegmentsOutsideOfLiveWindow: outputpsoolw,
        destHlsEnableIframe: iframes,
        destHlsTimeShiftBufferDepth: outputtimeShiftBufferDepth,
        destIP: outputipaddress,
        destLatency: outputlatency,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: outputsrtmode,
        destTimeout: outputtimeout,
        destTtl: outputttl,
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceEncryption: "",
        sourceEncryptionKey: "",
        sourceIP: inputipaddress,
        sourceLatency: inputlatency,
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: "",
        sourceTimeout: inputtimeout,
        sourceTtl: inputttl,
        timeout: inputtimeout,
        ttl: 0,
      };
    } else if (inputprotocol === "UDP" && outputprotocol === "UDP") {
      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDropPackets: true,
        destLatency: "150",
        destIP: outputipaddress,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: "",
        destTimeout: outputtimeout,
        destTtl: outputttl,
        destEncryption: "",
        destEncryptionKey: "",
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceEncryption: "",
        sourceEncryptionKey: "",
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceIP: inputipaddress,
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: "",
        sourceTimeout: inputtimeout,
        sourceLatency: "",
        sourceTtl: inputttl,
        timeout: -1,
        ttl: 0,
      };
    } else if (inputprotocol === "UDP" && outputprotocol === "RTMP") {
      setLoading(true);
      data = {
        ip: props.ip,
        options: {
          destDashDir: "kn4l6to2",
          qamConfig: {
            frequency: "",
            mode: "",
            interleaver: "",
          },
          Id: props.update ? props.stream.Id : 0,
          ttl: 0,
          timeout: -1,
          interval: updateInterval,
          comment: "",
          sourceSrtMode: "",
          sourceLatency: "150",
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          sourceAdapterIP: "",
          sourceProtocol: inputprotocol,
          sourceIP: inputipaddress,
          sourcePort: inputport,
          sourceDropPackets: true,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          destSrtMode: outputsrtmode,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          destAdapterIP: "",
          destProtocol: outputprotocol,
          destIP: outputipaddress,
          destPort: outputport,
          destLatency: "150",
          destDropPackets: outputdropPackets,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          destQamMode: "",
          destEncryptionKey: "",
          destEncryption: "",
          sourceOutgoingPort: inputoutgoingport,
          sourceAdapterName: inputinterfaces,
          sourceEncryption: "",
          sourceEncryptionKey: "",
          destAdapterName: outputinterfaces,
          destRtmpLocation: outputrtmpLocation,
          interfaceList: [
            {
              interface: "enp4s0",
              address: destAdapterEnp4s0.address,
              netmask: destAdapterEnp4s0.netmask,
            },
            {
              interface: "enp6s0",
              address: destAdapterEnp6s0.address,
              netmask: destAdapterEnp6s0.netmask,
            },
          ],
        },
      };
    }else if(inputprotocol === "UDP" && outputprotocol === "RTP"){
      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDropPackets: true,
        destLatency: "150",
        destIP: outputipaddress,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: "",
        destTimeout: outputtimeout,
        destTtl: outputttl,
        destEncryption: "",
        destEncryptionKey: "",
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceEncryption: "",
        sourceEncryptionKey: "",
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceIP: inputipaddress,
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: "",
        sourceTimeout: inputtimeout,
        sourceLatency: "",
        sourceTtl: inputttl,
        timeout: -1,
        ttl: 0,
      };
      
    }else if(inputprotocol === "UDP" && outputprotocol === "CMAF"){
      
    }else if(inputprotocol === "UDP" && outputprotocol === "QAM"){
      
    } else if (inputprotocol === "SRT" && outputprotocol === "UDP") {
      if (inputencryption !== "" && inputencryptionPassphrase === "") {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }
      setLoading(true);
      if (inputsrtmode === "Listener") {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDropPackets: true,
          destEncryption: "",
          destEncryptionKey: "",
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destOutgoingPort: "",
          destProtocol: outputprotocol,
          destQamMode: "",
          destSrtMode: "",
          destTimeout: "",
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: -1,
          ttl: 0,
        };
      } else {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDropPackets: true,
          destEncryption: "",
          destEncryptionKey: "",
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destProtocol: outputprotocol,
          // destQamMode: "",
          destSrtMode: "",
          destTimeout: "",
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: -1,
          // ttl: 0,
        };
      }
    } else if (inputprotocol === "SRT" && outputprotocol === "SRT") {
      if (inputencryption !== "" && inputencryptionPassphrase === "") {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }
      if (
        outputencryption !== "" &&
        outputencryptionPassphrase === ""
      ) {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }

      setLoading(true);
      data = {
        ip: props.ip,
        Id: props.update ? props.stream.Id : 0,
        comment: streamComment,
        destAdapter:
          outputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        destAdapterIP: "",
        destAdapterName: outputinterfaces,
        destDashDir: "",
        destDropPackets: true,
        destEncryption: outputencryption,
        destEncryptionKey: outputencryptionPassphrase,
        destIP: outputipaddress,
        destLatency: outputlatency,
        destPort: outputport,
        destProtocol: outputprotocol,
        destQamMode: "",
        destSrtMode: outputsrtmode,
        destTimeout: outputtimeout,
        destTtl: outputttl,
        interval: updateInterval,
        qamConfig: { frequency: "", mode: "", interleaver: "" },
        sourceAdapter:
          inputinterfaces === "enp4s0"
            ? destAdapterEnp4s0["address"]
            : destAdapterEnp6s0["address"],
        sourceAdapterIP: "",
        sourceAdapterName: inputinterfaces,
        sourceDropPackets: true,
        sourceEncryption: inputencryption,
        sourceEncryptionKey: inputencryptionPassphrase,
        sourceIP: inputipaddress,
        sourceLatency: inputlatency,
        sourcePort: inputport,
        sourceProtocol: inputprotocol,
        sourceSrtMode: inputsrtmode,
        sourceTimeout: inputtimeout,
        sourceTtl: inputttl,
        timeout: -1,
        ttl: 0,
      };
    } else if (inputprotocol === "SRT" && outputprotocol === "DASH") {
      if (inputencryption !== "" && inputencryptionPassphrase === "") {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }
      setLoading(true);

      if (inputsrtmode === "Listener") {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDashMinUpdatePeriod: outputminUpdatePeriod,
          destDashSegmentDuration: outputsegmentDuration,
          destDashSuggestedPresentationDelay: outputsuggestedPresentationDelay,
          destDashTimeShiftBufferDepth: outputtimeShiftBufferDepth,
          destDropPackets: true,
          destEncryption: outputencryption,
          destEncryptionKey: outputencryptionPassphrase,
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destProtocol: outputprotocol,
          destQamMode: "",
          destSrtMode: outputsrtmode,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: inputtimeout,
          ttl: 0,
        };
      } else {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDashMinUpdatePeriod: outputminUpdatePeriod,
          destDashSegmentDuration: outputsegmentDuration,
          destDashSuggestedPresentationDelay: outputsuggestedPresentationDelay,
          destDashTimeShiftBufferDepth: outputtimeShiftBufferDepth,
          destDropPackets: true,
          destEncryption: outputencryption,
          destEncryptionKey: outputencryptionPassphrase,
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destProtocol: outputprotocol,
          // destQamMode: "",
          destSrtMode: outputsrtmode,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: inputtimeout,
          // ttl: 0
        };
      }
    } else if (inputprotocol === "SRT" && outputprotocol === "HLS") {
      if (inputencryption !== "" && inputencryptionPassphrase === "") {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }

      setLoading(true);
      if (inputsrtmode === "Caller") {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDropPackets: true,
          destEncryption: outputencryption,
          destEncryptionKey: outputencryptionPassphrase,
          destHlsFragmentDuration: outputfragmentDuration,
          destHlsSegmentDuration: outputsegmentDuration,
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destProtocol: outputprotocol,
          destQamMode: "",
          destSrtMode: outputsrtmode,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: inputtimeout,
          ttl: 0,
        };
      } else {
        data = {
          ip: props.ip,
          Id: props.update ? props.stream.Id : 0,
          comment: streamComment,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // destAdapterIP: "",
          destAdapterName: outputinterfaces,
          destDashDir: "",
          destDropPackets: true,
          destEncryption: outputencryption,
          destEncryptionKey: outputencryptionPassphrase,
          destHlsFragmentDuration: outputfragmentDuration,
          destHlsSegmentDuration: outputsegmentDuration,
          destIP: outputipaddress,
          destLatency: outputlatency,
          destPort: outputport,
          destProtocol: outputprotocol,
          // destQamMode: "",
          destSrtMode: outputsrtmode,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          interval: updateInterval,
          qamConfig: { frequency: "", mode: "", interleaver: "" },
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          // sourceAdapterIP: "",
          sourceAdapterName: inputinterfaces,
          sourceDropPackets: true,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          sourceIP: inputipaddress,
          sourceLatency: inputlatency,
          sourceOutgoingPort: inputoutgoingport,
          sourcePort: inputport,
          sourceProtocol: inputprotocol,
          sourceSrtMode: inputsrtmode,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          timeout: inputtimeout,
          // ttl: 0
        };
      }
    } else if (inputprotocol === "SRT" && outputprotocol === "RTMP") {
      if (inputencryption !== "" && inputencryptionPassphrase === "") {
        // alert("Encryption Key is Empty!!");
        ErrorMsg("Encryption Key is Empty!!");
        return;
      }

      setLoading(true);
      data = {
        ip: props.ip,
        options: {
          destDashDir: "kn4l6to2",
          qamConfig: {
            frequency: "",
            mode: "",
            interleaver: "",
          },
          Id: props.update ? props.stream.Id : 0,
          ttl: 0,
          timeout: -1,
          interval: updateInterval,
          comment: "",
          sourceSrtMode: inputsrtmode,
          sourceAdapter:
            inputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          sourceAdapterIP: "",
          sourceProtocol: inputprotocol,
          sourceIP: inputipaddress,
          sourcePort: inputport,
          sourceLatency: inputlatency,
          sourceDropPackets: true,
          sourceTimeout: inputtimeout,
          sourceTtl: inputttl,
          sourceEncryption: inputencryption,
          sourceEncryptionKey: inputencryptionPassphrase,
          destSrtMode: outputsrtmode,
          destAdapter:
            outputinterfaces === "enp4s0"
              ? destAdapterEnp4s0["address"]
              : destAdapterEnp6s0["address"],
          destAdapterIP: "",
          destProtocol: outputprotocol,
          destIP: outputipaddress,
          destPort: outputport,
          destDropPackets: outputdropPackets,
          destTimeout: outputtimeout,
          destTtl: outputttl,
          destQamMode: "",
          sourceOutgoingPort: inputoutgoingport,
          sourceAdapterName: inputinterfaces,
          destAdapterName: outputinterfaces,
          destRtmpLocation: outputrtmpLocation,
          interfaceList: [
            {
              interface: "enp4s0",
              address: destAdapterEnp4s0.address,
              netmask: destAdapterEnp4s0.netmask,
            },
            {
              interface: "enp6s0",
              address: destAdapterEnp6s0.address,
              netmask: destAdapterEnp6s0.netmask,
            },
          ],
        },
      };
    }
    if (data.Id === 0) {
      data["ActionType"] = "Add";
    } else {
      data["ActionType"] = "Update";
    }
    data["ActionTime"] = new Date();
    data["Module"] = "Stream";
    data["Username"] = props.customerData.Username;
    data["DeviceName"] = props.clickedEllvis.DeviceName;
    data["Target"] = props.ip;
    let res = await VCDMSService.CreateUpdate("createcontainer", data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return "Something went wrong";
      });

    if (res === "Stream successfully created!") {
      // alert(res);
      SuccessMessage(res);
      setLoading(false);
    } else {
      ErrorMsg(res);
      setLoading(false);
    }
  };

  const outputProtocolChangeHandler = (event) => {
    event.preventDefault();
    setOutputProtocol(event.target.value)
    setHttpsLocation(false);
    setEnableLowLatency(false);
    setHttpsLocationVal('')
    setOutputSegmentDuration('');
    setOutputFragmentDuration('');
    setUTCTimingSchemeVal('')
    setHLSFormate('');
    setQamMode('');
    setFrequency('');
    setInterleaver('');
  }
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">Stream Configuration</div>
          <div className="form-boxtopcont user-form">
            <div className="row">
              <div className="col-sm-6 border-right">
                <div className="form-group">
                  <div className="form-boxdiv-gray">
                    <div className="form-boxtopline7">Input Stream</div>
                    <div className="form-boxtopcont user-form">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-check-label">PROTOCOL</label>
                            <select
                              className="form-control"
                              onChange={(e) =>
                                setInputProtocol(e.target.value)
                              }
                              value={inputprotocol}
                            >
                              <option value="" hidden={true}>
                                Select Protocol
                              </option>
                              <option value="SRT">SRT</option>
                              <option value="UDP">UDP</option>

                            </select>
                          </div>
                        </div>

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                SRT MODE
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setInputSRTMode(e.target.value)
                                }
                                value={inputsrtmode}
                              >
                                <option value="" hidden={true}>
                                  Select SRT Mode
                                </option>
                                <option value="listener">Listener</option>
                                <option value="caller">Caller</option>
                                <option value="rendezvous">Rendezvous</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {inputprotocol !== "" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                INTERFACE
                              </label>
                              <select
                                required
                                className="form-control"
                                onChange={(e) =>
                                  setInputInterface(e.target.value)
                                }
                                value={inputinterfaces}
                              >
                                <option value="" disabled selected hidden>
                                  Select Interface
                                </option>
                                <option value="enp4s0">enp4s0</option>
                                <option value="enp6s0">enp6s0</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {inputprotocol !== "" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                IP ADDRESS
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter IP"
                                value={inputipaddress}
                                onChange={(e) => {
                                  let string = e.target.value;
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
                                  setInputIPAddress(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <Tippy
                          className="black-theme"
                          content={
                            <>
                              <span>
                                Suggested port range to use in this field is
                                49152-65535
                              </span>
                            </>
                          }
                        >
                          {inputprotocol !== "" && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">PORT</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Port"
                                  value={inputport}
                                  onChange={(e) => {
                                    // if (e.target.value < 0) return;
                                    // if (e.target.value > 65535) return;
                                    if (e.target.value.match(/[^0-9]/)) {
                                      return;
                                    }
                                    if (Number.parseInt(e.target.value) > 65535)
                                      return;
                                    setInputPort(e.target.value);
                                  }}
                                  min="1"
                                  max="65535"
                                  required
                                />
                              </div>
                            </div>
                          )}
                        </Tippy>
                        {inputprotocol === "SRT" && inputsrtmode === "Caller" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                OUTGOING PORT
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Outgoing Port"
                                className="form-control"
                                value={inputoutgoingport}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  if (Number.parseInt(e.target.value) > 65535)
                                    return;
                                  setInputOutgoingPort(e.target.value);
                                }}
                                min="1"
                                max="65535"
                              />
                            </div>
                          </div>
                        )}

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                LATENCY
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Latency"
                                className="form-control"
                                value={inputlatency}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setInputLatency(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {inputprotocol === "UDP" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                SSM IP ADDRESS
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter SSM IP Address"
                                value={inputssmipaddress}
                                onChange={(e) => {
                                  let string = e.target.value;
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
                                  setInputSSMIPAddress(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {inputprotocol !== "" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">TTL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter TTL"
                                value={inputttl}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setInputTTL(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label enc-status">
                                DROP PACKETS:
                                <input
                                  type="checkbox"
                                  className="enc-checkbox"
                                  checked={inputdropPackets}
                                  onChange={() => setInputDropPackets(!inputdropPackets)}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                TIMEOUT
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Timeout"
                                value={inputtimeout}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setInputTimeout(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                ENCRYPTION
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setInputEncryption(e.target.value)
                                }
                                value={inputencryption}
                              >
                                <option value="">Disabled</option>
                                <option value="16">AES128</option>
                                <option value="24">AES196</option>
                                <option value="32">AES256</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {inputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                ENCRYPTION KEY
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Key"
                                value={inputencryptionPassphrase}
                                onChange={(e) =>
                                  setInputEncryptionPassphrase(
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}

                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-boxdiv-gray">
                    <div className="form-boxtopline7">Output Stream</div>
                    <div className="form-boxtopcont user-form">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-check-label">PROTOCOL</label>
                            <select
                              className="form-control"
                              onChange={(e) => outputProtocolChangeHandler(e)}
                              value={outputprotocol}
                            >
                              <option value="" hidden={true}>
                                Select Protocol
                              </option>
                              <option value="SRT">SRT</option>
                              <option value="UDP">UDP</option>
                              {enablePackager === 'true' ?
                                <>
                                  <option value="DASH">DASH</option>
                                  <option value="HLS">HLS</option>
                                  <option value="CMAF">CMAF</option>
                                </> : ""}
                              {enableRTMP === 'true' ?
                                <>
                                  <option value="RTMP">RTMP</option>
                                  <option value="RTP">RTP</option>
                                </> : ''}
                              {enableQam === 'true' ?
                                <>
                                  <option value="QAM">QAM</option>
                                </> : ''}
                            </select>
                          </div>
                        </div>

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                SRT MODE
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setOutputSRTMode(e.target.value)
                                }
                                value={outputsrtmode}
                              >
                                <option value="" hidden={true}>
                                  Select SRT Mode
                                </option>
                                <option value="listener">Listener</option>
                                <option value="caller">Caller</option>
                                <option value="rendezvous">Rendezvous</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {(outputprotocol !== "" && outputprotocol !== 'QAM') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                INTERFACE
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setOutputInterface(e.target.value)
                                }
                                value={outputinterfaces}
                              >
                                <option value="" disabled selected hidden>
                                  Select Interface
                                </option>
                                <option value="enp4s0">enp4s0</option>
                                <option value="enp6s0">enp6s0</option>
                              </select>
                            </div>
                          </div>
                        )}
                        {outputprotocol === 'DASH' || outputprotocol === 'HLS' || outputprotocol === 'CMAF' ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label enc-status">
                                  HTTPS LOCATION
                                  <input
                                    type="checkbox"
                                    className="enc-checkbox"
                                    checked={httpsLocation}
                                    onChange={() => {
                                      setHttpsLocation(!httpsLocation);
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </> : ''}
                        {httpsLocation ?
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="http://127.0.0.1:8085//ll-dash"
                                className="form-control"
                                value={httpsLocationVal}
                                onChange={(e) => {
                                  setHttpsLocationVal(e.target.value);
                                }}
                              />
                            </div>
                          </div> : ''}

                        {outputprotocol === "HLS" ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">HLS FORMAT</label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setHLSFormate(e.target.value)
                                  }
                                  value={HLSFormate}
                                >
                                  <option value="" hidden={true}>
                                    Select HLS FORMAT
                                  </option>
                                  <option value="mp4">mp4</option>
                                  <option value="ts">ts</option>
                                </select>
                              </div>
                            </div>
                          </>
                          : ''}
                        {outputprotocol === 'DASH' || outputprotocol === 'CMAF' ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label enc-status">
                                  ENABLE LOW LATENCY
                                  <input
                                    type="checkbox"
                                    className="enc-checkbox"
                                    checked={enableLowLatency}
                                    onChange={() => {
                                      setEnableLowLatency(!enableLowLatency);
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </> : ''}

                        {(outputprotocol === "SRT" ||
                          outputprotocol === "UDP" || outputprotocol === 'RTP') && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  IP ADDRESS
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IP"
                                  value={outputipaddress}
                                  onChange={(e) => {
                                    let string = e.target.value;
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
                                    setOutputIPAddress(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          )}

                        <Tippy
                          className="black-theme"
                          content={
                            <>
                              <span>
                                Suggested port range to use in this field is
                                49152-65535
                              </span>
                            </>
                          }
                        >
                          {(outputprotocol === "SRT" ||
                            outputprotocol === "UDP" || outputprotocol === 'RTP') && (
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-check-label">PORT</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Port"
                                    value={outputport}
                                    onChange={(e) => {
                                      // if (e.target.value < 0) return;
                                      // if (e.target.value > 65535) return;
                                      if (e.target.value.match(/[^0-9]/)) {
                                        return;
                                      }
                                      if (Number.parseInt(e.target.value) > 65535)
                                        return;
                                      setOutputPort(e.target.value);
                                    }}
                                    min="1"
                                    max="65535"
                                  />
                                </div>
                              </div>
                            )}
                        </Tippy>

                        {outputprotocol === "SRT" &&
                          outputsrtmode === "Caller" && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  OUTGOING PORT
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Outgoing Port"
                                  className="form-control"
                                  value={outputoutgoingport}
                                  onChange={(e) => {
                                    // if (e.target.value < 0) return;
                                    // if (e.target.value > 65535) return;
                                    if (e.target.value.match(/[^0-9]/)) {
                                      return;
                                    }
                                    if (Number.parseInt(e.target.value) > 65535)
                                      return;
                                    setOutputOutgoingPort(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          )}

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                LATENCY
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Latency"
                                className="form-control"
                                value={outputlatency}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputLatency(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {(outputprotocol !== "" && outputprotocol !== "RTMP" && outputprotocol !== 'QAM') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">TTL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter TTL"
                                value={outputttl}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputTTL(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {outputprotocol === "DASH" || outputprotocol === "HLS" || outputprotocol === 'CMAF' ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">SEGMENT TEMPLATE</label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setSegmentTemplate(e.target.value)
                                  }
                                  value={segmentTemplate}
                                >
                                  {/* <option value="" hidden={true}>
                                    Select Segment Template
                                  </option> */}
                                  <option value="Number">Number</option>
                                  <option value="Time">Time</option>
                                </select>
                              </div>
                            </div>
                          </>
                          : ''}

                        {outputprotocol === "DASH" ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">UTCTIMING SCHEME</label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setUTCTimingScheme(e.target.value)
                                  }
                                  value={UTCTimingScheme}
                                >
                                  <option value="" hidden={true}>
                                    Select UTCTIMING SCHEME
                                  </option>
                                  <option value="none">none</option>
                                  <option value="urn:mpeg:dash:utc:direct:2014">urn:mpeg:dash:utc:direct:2014</option>
                                  <option value="urn:mpeg:dash:utc:http-iso:2014">urn:mpeg:dash:utc:http-iso:2014</option>
                                  <option value="urn:mpeg:dash:utc:http-ntp:2014">urn:mpeg:dash:utc:http-ntp:2014</option>
                                  <option value="urn:mpeg:dash:utc:ntp:2014">urn:mpeg:dash:utc:ntp:2014</option>
                                  <option value="urn:mpeg:dash:utc:http-head:2014">urn:mpeg:dash:utc:http-head:2014</option>
                                </select>
                              </div>
                            </div>
                          </>
                          : ''}

                        {UTCTimingScheme !== '' && UTCTimingScheme !== 'none' ? (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={UTCTimingSchemeVal}
                                onChange={(e) => {
                                  setUTCTimingSchemeVal(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        ) : ''}

                        {(outputprotocol === "DASH" ||
                          outputprotocol === "HLS" || outputprotocol === 'CMAF') && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  SEGMENT DURATION
                                </label>
                                <input
                                  type="text"
                                  placeholder="seconds"
                                  className="form-control"
                                  value={outputsegmentDuration}
                                  onChange={(e) => {
                                    if (e.target.value.match(/[^0-9]/)) {
                                      return;
                                    }
                                    setOutputSegmentDuration(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        {(enableLowLatency === false && (outputprotocol === "DASH" || outputprotocol === 'HLS' || outputprotocol === 'CMAF')) ? (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                FRAGMENT DURATION
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="seconds"
                                value={outputfragmentDuration}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputFragmentDuration(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        ) : ''}

                        {(outputprotocol === "DASH" || outputprotocol === 'CMAF') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                MIN UPDATE PERIOD
                              </label>
                              <input
                                type="text"
                                placeholder="seconds"
                                className="form-control"
                                value={outputminUpdatePeriod}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputMinUpdatePeriod(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {(outputprotocol === "DASH" || outputprotocol === 'CMAF') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                MIN BUFFER TIME
                              </label>
                              <input
                                type="text"
                                placeholder="seconds"
                                className="form-control"
                                value={outputminBufferTime}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setMinBufferTime(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {(outputprotocol === "DASH" || outputprotocol === 'CMAF') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                SUGGESTED PRESENTATION DELAY
                              </label>
                              <input
                                type="text"
                                placeholder="seconds"
                                className="form-control"
                                value={outputsuggestedPresentationDelay}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputSuggestedPresentationDelay(
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {(outputprotocol === "DASH" ||
                          outputprotocol === "HLS" || outputprotocol === 'CMAF') && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  TIME SHIFT BUFFER DEPTH
                                </label>
                                <input
                                  type="text"
                                  placeholder="seconds"
                                  className="form-control"
                                  value={outputtimeShiftBufferDepth}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    if (e.target.value.match(/[^0-9]/)) {
                                      return;
                                    }
                                    setOutputTimeShiftBufferDepth(
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          )}

                        {(outputprotocol === "DASH" ||
                          outputprotocol === "HLS" || outputprotocol === 'CMAF') && (
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">
                                  PRESERVED SEGMENTS OUTSIDE OF LIVE WINDOW
                                </label>
                                <input
                                  type="text"
                                  placeholder="number of segments"
                                  className="form-control"
                                  value={outputpsoolw}
                                  onChange={(e) => {
                                    if (e.target.value.match(/[^0-9]/)) {
                                      return;
                                    }
                                    setOutputPSOOLW(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          )}

                        {(outputprotocol === "DASH" || outputprotocol === 'CMAF') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label enc-status">
                                SEGMENT TEMPLATE WITH CONSTANT DURATION
                                <input
                                  type="checkbox"
                                  className="enc-checkbox"
                                  checked={outputstwcd}
                                  onChange={() => {
                                    setOutputSTWCD(!outputstwcd);
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {(outputprotocol === "HLS" || outputprotocol === 'CMAF') && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label enc-status">
                                I-FRAMES
                                <input
                                  type="checkbox"
                                  className="enc-checkbox"
                                  checked={iframes}
                                  onChange={() => {
                                    setIFrames(!iframes);
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label enc-status">
                                DROP PACKETS
                                <input
                                  type="checkbox"
                                  className="enc-checkbox"
                                  checked={outputdropPackets}
                                  onChange={() => {
                                    setOutputDropPackets(!outputdropPackets);
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                TIMEOUT
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="150ms"
                                value={outputtimeout}
                                onChange={(e) => {
                                  if (e.target.value.match(/[^0-9]/)) {
                                    return;
                                  }
                                  setOutputTimeout(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                ENCRYPTION
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setOutputEncryption(e.target.value)
                                }
                                value={outputencryption}
                              >
                                <option value="">Disabled</option>
                                <option value="16">AES128</option>
                                <option value="24">AES196</option>
                                <option value="32">AES256</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {outputprotocol === "SRT" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                ENCRYPTION KEY
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Key"
                                value={outputencryptionPassphrase}
                                onChange={(e) =>
                                  setOutputEncryptionPassphrase(
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}

                        {outputprotocol === "RTMP" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                RTMP LOCATION
                              </label>
                              <input
                                type="text"
                                placeholder="a.rtmp.youtube.com/live2/ywc2-64g8-ruz8-t6yh"
                                className="form-control"
                                value={outputrtmpLocation}
                                onChange={(e) =>
                                  setOutputRTMPLocation(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}

                        {outputprotocol === "QAM" && (
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-check-label">
                                FREQUENCY
                              </label>
                              <input
                                type="number"
                                placeholder="36000"
                                className="form-control"
                                value={frequency}
                                onChange={(e) =>
                                  setFrequency(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}

                        {outputprotocol === "QAM" ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">QAM MODE</label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setQamMode(e.target.value)
                                  }
                                  value={qamMode}
                                >
                                  <option value="" hidden={true}>
                                    Select QAM Mode
                                  </option>
                                  <option value="QAM64">QAM64</option>
                                  <option value="QAM256">QAM256</option>
                                </select>
                              </div>
                            </div>
                          </>
                          : ''}

                        {/* {outputprotocol === "QAM" ?
                          <>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-check-label">INTERLEAVER</label>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setInterleaver(e.target.value)
                                  }
                                  value={interleaver}
                                >
                                  <option value="" hidden={true}>
                                    Select Interleaver
                                  </option>
                                  <option value="QAM64">QAM64</option>
                                  <option value="QAM256">QAM256</option>
                                </select>
                              </div>
                            </div>
                          </>
                          : ''} */}

                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clear"></div>
            </div>
            <div className="mt-4">
              {/* <div className="form-boxdiv-gray">
                <div className="form-boxtopline7">Graph Settings</div>

                <div className="form-boxtopcont user-form m-0">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-check-label">
                          UPDATE INTERVAL(SECONDS)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Interval"
                          value={updateInterval}
                          onChange={(e) => {
                            if (e.target.value.match(/[^0-9]/)) {
                              return;
                            }
                            changeUpdateInterval(e.target.value);
                          }}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="clear"></div>
                </div>
                <div className="clear"></div>
              </div> */}
            </div>
            <div className="pad-15">
              <div className="row">
                <div className="col-sm-6 border-right">
                  <div className="form-boxdiv-gray">
                    <div className="form-boxtopline7">Graph Settings</div>

                    <div className="form-boxtopcont user-form w-100 m-0">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              UPDATE INTERVAL(SECONDS)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Interval"
                              value={updateInterval}
                              onChange={(e) => {
                                if (e.target.value.match(/[^0-9]/)) {
                                  return;
                                }
                                setUpdateInterval(e.target.value);
                              }}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-boxdiv-gray">
                    <div className="form-boxtopline7">Stream metadata</div>

                    <div className="form-boxtopcont user-form w-100 m-0">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-check-label">
                              STREAM COMMENT
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Comment"
                              value={streamComment}
                              onChange={(e) => setStreamComment(e.target.value)}
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

            </div>
            <div className="text-center">
              <button
                className="btn btn-danger marr-15"
                onClick={(event) => {
                  event.preventDefault();
                  history.goBack();
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={(event) => createContainer(event)}
              >
                Save
              </button>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </>
  );
};

export default StreamConfiguration;
