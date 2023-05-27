import { useState, useEffect } from "react";
import "./topinfo.css";
import VCDMSservice from "../../services/http.service";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../../common/errorMsg";
const Topinfo = (props) => {
  const [startState, setStartState] = useState(props.startState);
  const [stopState, setStopState] = useState(props.stopState);
  const [restartState, setRestartState] = useState(props.stopState);
  const [startText, setStartText] = useState(props.properties.model.includes('RM1121CXF') ? "RTSP Start" : "Start");
  const [stopText, setStopText] = useState(props.properties.model.includes('RM1121CXF') ? "RTSP Stop" : "Stop");
  const [restartText, setRestartText] = useState(props.properties.model.includes('RM1121CXF') ? "RTSP Restart" : "Restart");

  const [startLoader, setStartLoader] = useState("");
  const [restartLoader, setRestartLoader] = useState("");
  const [presetValue, setPresetValue] = useState(
    props.properties
      ? props.properties.current_enc_preset
        ? props.properties.current_enc_preset
        : ""
      : ""
  );
  const [saveText, setSaveText] = useState("Save");
  useEffect(() => {
    setStartState(props.startState);
    setStopState(props.stopState);
    setRestartState(props.stopState);
  }, [props.startState, props.stopState]);

  useEffect(() => {
    setStartText(props.properties.model.includes('RM1121CXF') ? "RTSP Start" : "Start")
    setStopText(props.properties.model.includes('RM1121CXF') ? "RTSP Stop" : "Stop")
    setRestartText(props.properties.model.includes('RM1121CXF') ? "RTSP Restart" : "Restart")
    setPresetValue(props.properties ? props.properties.current_enc_preset : "");

  }, [props.properties]);

  const saveClickHandler = async (event) => {
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

    let data = {
      ip: props.peerip,
      data: props.properties1,
    };
    let res = await VCDMSservice.getByBoj("savesession", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.status === "success") {
        props.getProperties();
      } else {
        ErrorMessage("Error Occured!!!")
      }
    } else {
      ErrorMessage("Error Occured!!!")
    }
    setSaveText("Save");
  };

  const setStateStop = () => {
    let status = { ...props.statusvar };
    status.opstate = "Idle";
    status.status = "stopped";
    props.setStatus(status);
  };

  const restartClick = async () => {
    let data = {
      ip: props.peerip,
      RegionID: props.RegionID,
      SystemID: props.SystemID,
      deviceip: props.deviceip,
      startType: restartText === "RTSP Restart" ? "RtspRestart" : ""
    };
    setRestartState(false);
    setRestartLoader("active");
    setRestartText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>

        {props.properties.model.includes('RM1121CXF') ? "RTSP Restart" : "Restart"}
      </>
    );
    let res = await VCDMSservice.getByBoj("startencoding", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.status === "success") {
        props.setStartState(false);
        props.setStopState(true);
        setRestartState(true);
        props.properties.model.includes('RM1121CXF') ? setRestartText("RTSP Restart") : setRestartText("Restart");
        props.setPresetState(false);
      } else {
        props.properties.model.includes('RM1121CXF') ? setRestartText("RTSP Restart") : setRestartText("Restart");
        props.setStopState(true);
        setRestartState(true);
      }
    } else {
      props.properties.model.includes('RM1121CXF') ? setRestartText("RTSP Restart") : setRestartText("Restart");
      props.setStopState(true);
      setRestartState(true);
    }
    setRestartLoader("");
  };

  const startClick = async () => {
    let data = {
      ip: props.peerip,
      RegionID: props.RegionID,
      SystemID: props.SystemID,
      deviceip: props.deviceip,
      startType: startText === "RTSP Start" ? "RtspStart" : ""
    };
    props.setStartState(false);
    setStartLoader("active");
    setStartText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>{
          props.properties.model.includes('RM1121CXF') ? "RTSP Start" : "Start"
        }
      </>
    );
    let res = await VCDMSservice.getByBoj("startencoding", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.status === "success") {
        props.setStartState(false);
        props.setStopState(true);
        props.properties.model.includes('RM1121CXF') ? setStartText("RTSP Start") : setStartText("Start");

        props.setPresetState(true);
        props.SetisStopped(false);
      } else {
        props.properties.model.includes('RM1121CXF') ? setStartText("RTSP Start") : setStartText("Start");
        props.setStartState(true);
      }
    } else {
      props.properties.model.includes('RM1121CXF') ? setStartText("RTSP Start") : setStartText("Start");
      props.setStartState(true);
    }
    setStartLoader("");
  };

  const stopClick = async () => {
    let data = {
      ip: props.peerip,
      RegionID: props.RegionID,
      SystemID: props.SystemID,
      deviceip: props.deviceip,
      startType: stopText === "RTSP Stop" ? "RtspStop" : ""
    };
    props.setStopState(false);
    setStopText(
      <>
        <span
          className="spinner-border spinner-border-sm mr-1"
          role="status"
          aria-hidden="true"
        ></span>
        {props.properties.model.includes('RM1121CXF') ? "RTSP Stop" : "Stop"}
      </>
    );
    let res = await VCDMSservice.getByBoj("stopencoding", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res) {
      if (res.status === "success") {
        props.setStartState(true);
        props.setStopState(false);
        props.SetisStopped(true)
        setStateStop();
        props.properties.model.includes('RM1121CXF') ? setStopText("RTSP Stop") : setStopText("Stop");
        props.setPresetState(false);
      } else {
        props.properties.model.includes('RM1121CXF') ? setStopText("RTSP Stop") : setStopText("Stop");
        props.setStopState(true);
      }
    } else {
      props.properties.model.includes('RM1121CXF') ? setStopText("RTSP Stop") : setStopText("Stop");
      props.setStopState(true);
    }
  };

  const onChangePreset = async (value) => {
    setPresetValue(value);
    props.setPresetState(true);
    let preset = await changePreset(value);
    if (preset === "success") {
      props.setPresetState(false);
      props.getProperties();
    }
  };

  const changePreset = async (value) => {
    let data = {
      ip: props.peerip,
      current_enc_preset: value,
    };

    let res = await VCDMSservice.CreateUpdate("loadpreset", data)
      .then((res) => res.data)
      .catch((err) => { return });
    if (res) {
      if (res.status === "success") {
        // setPresetState(false);
        return "success";
      } else {
        // setPresetState(false);
        return "failure";
      }
    }
  };

  let startButton =
    props.customerData.Role === "Operator" ? (
      <></>
    ) : startState ? (
      <button className="btn btn-success marl-15" onClick={startClick}>
        <>{startText}</>
      </button>
    ) : startLoader === "active" ? (
      <button className="btn btn-success marl-15" disabled>
        <>{startText}</>
      </button>
    ) : (
      <button
        className="btn btn-success marl-15 not-visible"
        disabled
      >
        <>{startText}</>
      </button>
    );
  let stopButton =
    props.customerData.Role === "Operator" ? (
      <></>
    ) : stopState ? (
      <button className="btn btn-danger marl-15 " onClick={stopClick}>
        {stopText}
      </button>
    ) : (
      <button className="btn btn-danger marl-15" disabled>
        {stopText}
      </button>
    );
  let restartButton =
    props.customerData.Role === "Operator" ? (
      <></>
    ) : restartState ? (
      <button className="btn btn-success marl-15" onClick={restartClick}>
        {restartText}
      </button>
    ) : restartLoader === "active" ? (
      <button className="btn btn-success marl-15" disabled>
        {restartText}
      </button>
    ) : (
      <button
        className="btn btn-success marl-15 not-visible"
        disabled
      >
        {restartText}
      </button>
    );

  let presetList = [];
  for (var key in props.properties) {
    if (key.startsWith("preset")) {
      if (props.properties[key] !== "") {
        presetList.push(<option key={key}>{props.properties[key]}</option>);
      }
    }
  }

  return (
    <>
      <div>
        <div>
          <div className="row">
            <div className="col-md-9">
              <h4 className="encoder-title">
                {props.properties ? props.properties.model : ""} Encoder
              </h4>
              <p className="color-gray">
                Firmware Version:{" "}
                {props.properties ? props.properties.firmware_version : ""}
              </p>
              <p className="color-gray">
                Uptime(dd:hh:mm:ss):{" "}
                {props.properties ? props.properties.uptime : ""}
              </p>
              <h5 className="font-16 bold-h5">
                {props.properties ? props.properties.devicename : ""}
              </h5>
            </div>
            {!props.properties.model.includes("RM1121CXF") ?
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-5 pr-0 text-right">
                    <label className="inline-custom-label">
                      Preset:&nbsp;
                      {props.customerData.Role === "Operator" ? (
                        <span>{presetValue}</span>
                      ) : (
                        <></>
                      )}
                    </label>
                  </div>
                  {props.customerData.Role === "Operator" ? (
                    <></>
                  ) : (
                    <div className="col-md-7">
                      <select
                        className="form-control form-controls"
                        onChange={(event) => onChangePreset(event.target.value)}
                        disabled={props.presetState}
                        value={presetValue}
                      >
                        <option>encoder factory default</option>
                        {presetList.map((value, index) => value)}
                      </select>
                    </div>
                  )}
                </div>
              </div> : <></>
            }
          </div>
          <div className="border-bottom encoder-top-btn-grp text-right">
            {props.customerData.Role === "Operator" ? (
              <></>
            ) : (
              <button
                className="btn btn-primary"
                onClick={(event) => saveClickHandler(event)}
              >
                {saveText}
              </button>
            )}
            {stopButton}
            {startButton}
            {restartButton}
          </div>
        </div>
      </div>
      {/* <ToastContainer/>  */}
    </>
  );
};

export default Topinfo;
