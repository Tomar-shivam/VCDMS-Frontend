import React, { useEffect, useState } from 'react'
import Login from './components/authentication/login/login'
import Signup from './components/authentication/signup/signup'
import Page from './components/authentication/page'
import Layout from './components/layout/layout'
import { Route, Switch, Redirect } from 'react-router-dom'
import httpService from './services/http.service'
import LicenseError from './components/licenseError/licenseerror'
import { CHECK_KEYLOK } from './config';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useIdleTimer } from 'react-idle-timer'
import ErrorMessage from './common/errorMsg'

let interval = setInterval(() => { }, 60000);

function App() {
  const [errorPage, setErrorPage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [license, setLicense] = useState({})
  const [toggle, setToggle] = useState(false);
  const [logoutUser, setLogoutUser] = useState(false);
  const [logoutTime, setLogoutTime] = useState(60);
  const [customerData, setcustomerData] = useState('');

  const checkkeylok = async () => {
    if (!CHECK_KEYLOK) return
    Checkkeylok_validation();
    interval = setInterval(() => {
      if (!CHECK_KEYLOK) return
      Checkkeylok_validation();
    }, 60000);
  };

  const Checkkeylok_validation = async () => {
    let res = await httpService.get("checkkeylok")
      .then((res) => res.data)
      .catch((err) => {
        setErrorMessage("Can not validate license file due to bad network");
        setErrorPage(true);
        localStorage.removeItem("Username")
        sessionStorage.removeItem("session")
        sessionStorage.removeItem("token")
      });
    if (res === undefined || res === null) return;
    setLicense(res);
    if (res.output && (res.output.Slug === '' || res.output.Slug === '0' || res.output.DueDate)) {
      if (res.output.Msg === 'LicenseNotFound') {
        setErrorMessage('License file not found on the server.');
        localStorage.removeItem("Username");
        sessionStorage.removeItem("session");
        sessionStorage.removeItem("token")
        setErrorPage(true);
      } else if (res.output.Msg === 'licenseExpire') {
        setErrorMessage('License Expired, Please contact your vendor to renew it.');
        localStorage.removeItem("Username");
        sessionStorage.removeItem("session");
        sessionStorage.removeItem("token")
        setErrorPage(true);
      }
      else if (res.output.Msg === 'invalidMacAddress') {
        setErrorMessage('Your MacAddress/Machine ID not match with license file, Please contact your vendor.');
        localStorage.removeItem("Username");
        sessionStorage.removeItem("session");
        sessionStorage.removeItem("token")
        setErrorPage(true);
      }
      else {
        if (res.output.DueDate != (new Date()).getDate()) {
          setErrorMessage("License Expired, Please contact your vendor to renew it.");
          localStorage.removeItem("Username");
          sessionStorage.removeItem("session");
          sessionStorage.removeItem("token")
          setErrorPage(true);
        }
      }
    }

    else {
      setErrorPage(false);
    }
  }
  useEffect(() => {
    if (!CHECK_KEYLOK) return;
    else {
      checkkeylok();
      return () => {
        clearInterval(interval);
      };
    }
  }, [])

  useEffect(() => {
    if (toggle) {
      if (logoutTime > 0) { setTimeout(() => setLogoutTime(logoutTime - 1), 1000); }
      else {
        setLogoutTime(60);
        setToggle(false);
        setLogoutUser(true);
      }
    } else {
      setLogoutTime(60);
      setToggle(false);
    }
  });

  const handleOnIdle = event => {
    let ifLoginScree = window.location.href.split('/');
    if (ifLoginScree[ifLoginScree.length - 1] === 'login') {
      setToggle(false);
    } else if (sessionStorage.getItem('session')) {
      //if user is inactive then show a message
      setToggle(true);
    }
  }

  const handleOnActive = event => {
    setLogoutUser(false);
  }

  useIdleTimer({
    timeout: 3600000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  })
  const clickHandler = (type) => {
    if (type == 'continue') { setToggle(false); }
    if (type == 'logout') {
      setToggle(false);
      setLogoutUser(true);
    }
  }

  return (
    <>
      {errorPage ? (
        <div><LicenseError license={license} erroeMessage={errorMessage}></LicenseError></div>
      ) :
        (
          <>
            <Switch>
              <Route path="/content" render={(props) => <Layout {...props} license={license && license.output ? license.output.Slug : 0} logoutUser={logoutUser} setToggle={setToggle} setLogoutUser={setLogoutUser} setcustomerData={setcustomerData} />} />
              <Route path="/login" exact render={(props) => <Page {...props} contentData={<Login superPassword={"$uper@dmin@123"} />} />} />
              <Route path="/signup" exact render={(props) => <Page {...props} contentData={<Signup />} />} />
              <Redirect from="/" to={window.sessionStorage.session && window.sessionStorage.token ? "/content" : "/login"} />
            </Switch>
          </>
        )
      }
      <Modal className="sessionTimeout-popup" isOpen={toggle}>
        <ModalHeader className="justify-content-center">
          Session Timeout
        </ModalHeader>
        <ModalBody className="p-4">
          <h5 className="modal-desc">You will be logged out automatically after {logoutTime} sec! <br /> Do you wish to continue?</h5>
          <button onClick={(event) => { clickHandler('continue') }} className="btn btn-primary">Continue</button>
          <button onClick={(event) => { clickHandler('logout') }} className="btn btn-outline-danger">Logout</button>
        </ModalBody>
      </Modal>
    </>
  )

}
//for testing purpose
export default App
