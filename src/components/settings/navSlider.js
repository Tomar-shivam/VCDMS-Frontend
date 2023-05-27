import { Link } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFileExport, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./settings.css";

const NavSlider = (props) => {
  const [display, setDisplay] = useState(false);
  const toggleClickHandler = () => {
    setDisplay(!display)
  }
  // const options = {
  //   responsiveClass: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 3,
  //     },
  //     992: {
  //       items: 5,

  //     },
  //     1199: {
  //       items: 8,

  //     }
  //   },
  // };

  return (

    <nav className='navbar navbar-expand-lg navbar-light p-0 settingSliderTabs'>

      {/* <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>             
      </button> */}

      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav custom-tabs dashboard-navbar'>
          <li className='nav-item'>
            <Link
              to="/content/SMTP"
              className={"nav-link " + (props.activeTab === 'smtp' ? "active" : "")}
              aria-current="page"
              href="#"
            >
              <FontAwesomeIcon icon={faFileExport} />
              SMTP
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/httphttps"
              className={
                "nav-link " + (props.activeTab === 'http' ? "active" : "")
              }
              aria-current="page"
              href="#zz"
            >
              <FontAwesomeIcon icon={faFileExport} />
              HTTP/HTTPS
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/scheduler"
              className={
                "nav-link " + (props.activeTab === "cron" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-calendar"></i>
              SCHEDULER
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/majoralarm"
              className={
                "nav-link " + (props.activeTab === "majoralarm" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-bell"></i>
              MAJOR ALARM THRESHOLDS
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/firmwarerefiles"
              className={
                "nav-link " +
                (props.activeTab === "firmwarerefiles" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-file"></i>
              FIRMWARE FILES
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to="/content/backup"
              className={
                "nav-link " + (props.activeTab === "backup" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              BACKUPS
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/backupLocation"
              className={
                "nav-link " + (props.activeTab === "backupLocation" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              REMOTE BACKUP LOC.
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/setTime"
              className={
                "nav-link " +
                (props.activeTab === "setTime" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <FontAwesomeIcon icon={faClock} />
              TIMEZONE
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/setSNMPManagerAlarm"
              className={
                "nav-link " +
                (props.activeTab === "setSNMPManagerAlarm" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-bell"></i>
              SNMP Manager Alarm
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              id="backupTab1"
              to="/content/hotbackup"
              className={
                "nav-link " +
                (props.activeTab === "hotbackup" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              Hot Backup
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/uploadPresetJsonfiles"
              className={
                "nav-link " +
                (props.activeTab === "uploadPresetJsonfiles" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-file"></i>
              UPLOAD PRESET FILES
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/content/licenseinformation"
              className={
                "nav-link " +
                (props.activeTab === "licenseinformation" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-info-circle"></i>
              License Information
            </Link>
          </li>

          {/* <li className='nav-item'>
            <Link
              id="deviceTypes"
              to="/content/devicetype"
              className={
                "nav-link " +
                (props.activeTab === "devicetype" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-window-restore"></i>
              Device Types
            </Link>
          </li> */}
        </ul>
      </div>

      <Dropdown isOpen={display} toggle={toggleClickHandler} className='navSlider-dropdown'>
        <DropdownToggle caret>
          <FontAwesomeIcon icon={faEllipsisV} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link
              to="/content/SMTP"
              className={"nav-link " + (props.activeTab === 'smtp' ? "active" : "")}
              aria-current="page"
              href="#"
            >
              <FontAwesomeIcon icon={faFileExport} />
              SMTP
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/httphttps"
              className={
                "nav-link " + (props.activeTab === 'http' ? "active" : "")
              }
              aria-current="page"
              href="#zz"
            >
              <FontAwesomeIcon icon={faFileExport} />
              HTTP/HTTPS
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/scheduler"
              className={
                "nav-link " + (props.activeTab === "cron" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-calendar"></i>
              SCHEDULER
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/majoralarm"
              className={
                "nav-link " + (props.activeTab === "majoralarm" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-bell"></i>
              MAJOR ALARM THRESHOLDS
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/firmwarerefiles"
              className={
                "nav-link " +
                (props.activeTab === "firmwarerefiles" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-file"></i>
              FIRMWARE FILES
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/backup"
              className={
                "nav-link " + (props.activeTab === "backup" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              BACKUPS
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/backupLocation"
              className={
                "nav-link " + (props.activeTab === "backupLocation" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              REMOTE BACKUP LOC.
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/setTime"
              className={
                "nav-link " +
                (props.activeTab === "setTime" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <FontAwesomeIcon icon={faClock} />
              TIMEZONE
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/setSNMPManagerAlarm"
              className={
                "nav-link " +
                (props.activeTab === "setSNMPManagerAlarm" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-bell"></i>
              SNMP Manager Alarm
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              id="backupTab1"
              to="/content/hotbackup"
              className={
                "nav-link " +
                (props.activeTab === "hotbackup" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-database"></i>
              Hot Backup
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/uploadPresetJsonfiles"
              className={
                "nav-link " +
                (props.activeTab === "uploadPresetJsonfiles" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-file"></i>
              UPLOAD PRESET FILES
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/content/licenseinformation"
              className={
                "nav-link " +
                (props.activeTab === "licenseinformation" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i class="fa fa-info-circle"></i>
              License Information
            </Link>
          </DropdownItem>
          {/* <DropdownItem>
            <Link
              id="deviceTypes"
              to="/content/devicetype"
              className={
                "nav-link " +
                (props.activeTab === "devicetype" ? "active" : "")
              }
              aria-current="page"
              href="#"
            >
              <i className="fa fa-window-restore"></i>
              Device Types
            </Link>
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
};

export default NavSlider;
