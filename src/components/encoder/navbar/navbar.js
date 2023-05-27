import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

let Navbar = (props) => {
  const [dashboardClass, setDashboardClass] = useState("active");
  const [videoSettingsClass, setVideoSettingsClass] = useState("");
  const [audioSettingsClass, setAudioSettingClass] = useState("");
  const [tsSettingClass, setTsSettingClass] = useState("");
  const [networkSettingClass, setNetworkSettingClass] = useState("");
  const [systemSettingClass, setSystemSettingClass] = useState("");
  const [userPresetClass, setUserPresetClass] = useState("");
  const [pcVisionClass, setPcVisionClass] = useState("");
  const [active, setActive] = useState("dashboard");
  const [model, setModel] = useState(props.properties ? props.properties.model : '');

  const resetActive = () => {

    if (active === "dashboard") {
      setDashboardClass("");
    }

    else if (active === "video") {
      setVideoSettingsClass("");
    }

    else if (active === "audio") {
      setAudioSettingClass("");
    }

    else if (active === "ts") {
      setTsSettingClass("");
    }

    else if (active === "network") {
      setNetworkSettingClass("");
    }

    else if (active === "system") {
      setSystemSettingClass("");
    }

    else if (active === "preset") {
      setUserPresetClass("");
    }
    else if (active === "pcVision") {
      setPcVisionClass("");
    }
  };
  useEffect(() => {
    setModel(props.properties ? props.properties.model : '');
  }, [props.properties])
  useEffect(() => {

    resetActive();
    setActive(props.match.params.activetab);
    if (props.match.params.activetab === "dashboard") {
      setDashboardClass("active");
    }

    if (props.match.params.activetab === "video") {
      setVideoSettingsClass("active");
    }

    if (props.match.params.activetab === "audio") {
      setAudioSettingClass("active");
    }

    if (props.match.params.activetab === "ts") {
      setTsSettingClass("active");
    }

    if (props.match.params.activetab === "network") {
      setNetworkSettingClass("active");
    }

    if (props.match.params.activetab === "system") {
      setSystemSettingClass("active");
    }

    if (props.match.params.activetab === "preset") {
      setUserPresetClass("active");
    }
    if (props.match.params.activetab === "pcVision") {
      setPcVisionClass("active");
    }
  }, [props.match]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav encoder-tabs custom-tabs">
            <li className="nav-item" /* onClick={dashboardClick} */>

              <Link
                to={
                  "/content/encoder/" +
                  props.match.params.ellvisindex +
                  "/" +
                  props.match.params.encoderindex +
                  "/dashboard"
                }
                className={"nav-link " + dashboardClass}
                aria-current="page"
                href="#"
              >
                <i className="fa fa-th-large"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item" /* onClick={videoSettingsClick} */>
              <Link
                to={
                  "/content/encoder/" +
                  props.match.params.ellvisindex +
                  "/" +
                  props.match.params.encoderindex +
                  "/video"
                }
                className={"nav-link " + videoSettingsClass}
                aria-current="page"
                href="#"
              >
                <i className="fa fa-video-camera"></i>
                Video Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={
                  "/content/encoder/" +
                  props.match.params.ellvisindex +
                  "/" +
                  props.match.params.encoderindex +
                  "/audio"
                }
                className={"nav-link " + audioSettingsClass}
                href="#"
              >
                <i className="fa fa-microphone"></i>
                Audio Settings
              </Link>
            </li>
            {!model.includes('RM1121CXF') ?
              <>
                <li className="nav-item" /* onClick={tsSettingsClick} */>
                  <Link
                    to={
                      "/content/encoder/" +
                      props.match.params.ellvisindex +
                      "/" +
                      props.match.params.encoderindex +
                      "/ts"
                    }
                    className={"nav-link " + tsSettingClass}
                    href="#"
                  >
                    <i className="fa fa-wifi"></i>
                    TS Settings
                  </Link>
                </li>
              </> : <></>}
            <li className="nav-item" /* onClick={networkSettingsClick} */>
              <Link
                to={
                  "/content/encoder/" +
                  props.match.params.ellvisindex +
                  "/" +
                  props.match.params.encoderindex +
                  "/network"
                }
                className={"nav-link " + networkSettingClass}
                href="#"
              >
                <i className="fa fa-globe"></i>
                Network Settings
              </Link>
            </li>
            <li className="nav-item" /* onClick={systemSettingsClick} */>
              <Link
                to={
                  "/content/encoder/" +
                  props.match.params.ellvisindex +
                  "/" +
                  props.match.params.encoderindex +
                  "/system"
                }
                className={"nav-link " + systemSettingClass}
                href="#"
              >
                <i className="fa fa-gears"></i>
                System Settings
              </Link>
            </li>
            {!model.includes('RM1121CXF') ?
              <li className="nav-item" /* onClick={userPresetClick} */>
                <Link
                  to={
                    "/content/encoder/" +
                    props.match.params.ellvisindex +
                    "/" +
                    props.match.params.encoderindex +
                    "/preset"
                  }
                  className={"nav-link " + userPresetClass}
                  href="#"
                >
                  <i className="fa fa-user"></i>
                  User Presets
                </Link>
              </li> : <></>
            }

            {model.includes('RM1121CXF') ?
              <>
                <li className="nav-item" /* onClick={userPresetClick} */>
                  <Link
                    to={
                      "/content/encoder/" +
                      props.match.params.ellvisindex +
                      "/" +
                      props.match.params.encoderindex +
                      "/pcVision"
                    }
                    className={"nav-link " + pcVisionClass}
                    href="#"
                  >
                    <i className="fa fa-cog"></i>
                    PCVision Settings
                  </Link>
                </li></> : <></>
            }

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
