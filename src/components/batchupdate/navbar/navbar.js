import { useState ,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

let Navbar = (props) => {
  const [videoSettingsClass, setVideoSettingsClass] = useState("active");
  const [audioSettingsClass, setAudioSettingClass] = useState("");
  const [tsSettingClass, setTsSettingClass] = useState("");
  const [systemSettingClass, setSystemSettingClass] = useState("");
  const [firmwareClass, setFirmwareClass] = useState("");
  const [active, setActive] = useState("video");
  const [pcvisionClass, setPcvisionClass] = useState("");

  const resetActive = () => {
    if (active === "video") {
      setVideoSettingsClass("");
    }
    else if (active === "audio") {
      setAudioSettingClass("");
    }
    else if (active === "ts") {
      setTsSettingClass("");
    }
    else if (active === "system") {
      setSystemSettingClass("");
    }
    else if (active === "pcvision") {
      setPcvisionClass("");
    }
    else if (active === "firmware") {
      setFirmwareClass("");
    }
  };

  useEffect(()=>{
    resetActive();
    setVideoSettingsClass("active");
    setActive("video");
  },[props.selectedModel])

  const videoSettingsClick = (event) => {
    event.preventDefault();
    props.videoClick();
    resetActive();
    setVideoSettingsClass("active");
    setActive("video");
  };

  const audioSettingsClick = (event) => {
    event.preventDefault();
    props.audioClick();
    resetActive();
    setAudioSettingClass("active");
    setActive("audio");
  };

  const tsSettingsClick = (event) => {
    event.preventDefault();
    props.tsClick();
    resetActive();
    setTsSettingClass("active");
    setActive("ts");
  };

  const systemSettingsClick = (event) => {
    event.preventDefault();
    props.systemClick();
    resetActive();
    setSystemSettingClass("active");
    setActive("system");
  };

  const firmwareUpdateClick = (event) => {
    event.preventDefault();
    props.firmwareClick();
    resetActive();
    setFirmwareClass("active");
    setActive("firmware");
  };
  const setPcvisionClick = (event) => {
    event.preventDefault();
    props.pcvisionClick();
    resetActive();
    setPcvisionClass("active");
    setActive("pcvision");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav custom-tabs dashboard-navbar">
            <li
              className="nav-item"
              onClick={(event) => videoSettingsClick(event)}
            >
              <div style={{ cursor: "pointer" }}
                className={"nav-link " + videoSettingsClass}
                aria-current="page"
                href="#"
              >
                <i className="fa fa-video-camera"></i>
                Video Settings
              </div>
            </li>
            <li
              className="nav-item"
              onClick={(event) => audioSettingsClick(event)}
            >
              <div style={{ cursor: "pointer" }} className={"nav-link " + audioSettingsClass} href="#">
                <i className="fa fa-microphone"></i>
                Audio Settings
              </div>
            </li>
            {props.selectedModel !== "RM1121HD/CXF" ?
              <li
                className="nav-item"
                onClick={(event) => tsSettingsClick(event)}
              >
                <div style={{ cursor: "pointer" }} className={"nav-link " + tsSettingClass} href="#">
                  <i className="fa fa-wifi"></i>
                  TS Settings
                </div>
              </li> : <li
                className="nav-item"
                onClick={(event) => setPcvisionClick(event)}
              >
                <div style={{ cursor: "pointer" }} className={"nav-link " + pcvisionClass} href="#">
                  <i className="fa fa-gears"></i>
                  PcVision Settings
                </div>
              </li>
            }
            <li
              className="nav-item"
              onClick={(event) => systemSettingsClick(event)}
            >
              <div style={{ cursor: "pointer" }} className={"nav-link " + systemSettingClass} href="#">
                <i className="fa fa-gears"></i>
                System Settings
              </div>
            </li>
            <li
              className="nav-item"
              onClick={(event) => firmwareUpdateClick(event)}
            >
              <div style={{ cursor: "pointer" }} className={"nav-link " + firmwareClass} href="#">
                <i className="fa fa-gears"></i>
                Firmware Updates
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
