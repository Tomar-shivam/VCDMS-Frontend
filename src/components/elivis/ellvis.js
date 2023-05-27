import { useState, useEffect } from 'react'
import Navbar from './navbar/navbar'
import Dashboard from './dashboard/dashboard'
import Settings from './settings/settings'
import Streamconfiguration from './streamconfiguration/streamconfiguration'
import './ellvis.css'
import Hotbackup from './hotbackup/hotbackup'
let Ellvis = (props) => {

  const [content, setContent] = useState('dashboard')
  const [active, setActive] = useState('dashboard')
  const [dashboardClass, setDashboardClass] = useState("active")
  const [streamConfigurationClass, setStreamConfigurationClass] = useState("")
  const [settingsClass, setSettingsClass] = useState("")
  const [hotBackupClass, setHotBackupClass] = useState("")

  useEffect(() => {

    setActive(props.match.params.tab)
    resetActive()
    setContent(props.match.params.tab)
    if (props.match.params.tab === "dashboard") {
      setDashboardClass("active")
    }
    if (props.match.params.tab === "streamconfig") {
      setStreamConfigurationClass("active")
    }
    if (props.match.params.tab === "settings") {
      setSettingsClass("active")
    }
    if (props.match.params.tab === "hotbackup") {
      setHotBackupClass("active")
    }
  }, [props.match.params])

  const resetActive = () => {
    if (active === 'dashboard') {
      setDashboardClass('')
    }

    if (active === 'streamconfig') {
      setStreamConfigurationClass('')
    }

    if (active === 'settings') {
      setSettingsClass('')
    }
    if (active === 'hotbackup') {
      setHotBackupClass('');
    }
  }

  let handleDashboardClick = (setContent) => {
    setContent('dashboard')
  }

  let handleSettingsClick = (setContent) => {
    setContent('settings')
  }

  let handleStreamConfigClick = (setContent) => {
    setContent('streamconfig')
  }
  let handleHotBackupClick = (setContent) => {
    setContent('hotbackup')
  }

  return (
    <>
      <Navbar
        match={props.match}
        dashboardClick={() => handleDashboardClick(setContent)}
        settingClick={() => handleSettingsClick(setContent)}
        streamConfigClick={() => handleStreamConfigClick(setContent)}
        hotBackupClick={() => handleHotBackupClick(setContent)}
        setClickedStream={props.setClickedStream}
        active={active}
        setActive={setActive}
        dashboardClass={dashboardClass}
        setDashboardClass={setDashboardClass}
        streamConfigurationClass={streamConfigurationClass}
        setStreamConfigurationClass={setStreamConfigurationClass}
        settingsClass={settingsClass}
        setSettingsClass={setSettingsClass}
        hotBackupClass={hotBackupClass}
        setHotBackupClass={setHotBackupClass}
        setUpdate={props.setUpdate}
        customerData={props.customerData}
      />
      {content === 'dashboard' ? (
        <Dashboard
          CardData={props.CardData}
          ip={props.ip}
          match={props.match}
          setClickedStream={props.setClickedStream}
          streamConfigClick={() => handleStreamConfigClick(setContent)}
          setActive={setActive}
          resetActive={resetActive}
          setStreamConfigurationClass={setStreamConfigurationClass}
          setUpdate={props.setUpdate}
          clickedEllvis={props.clickedEllvis}
          setClickedEllvis={props.setClickedEllvis}
          customerData={props.customerData}
          checkEllvisStreamRefresh={props.checkEllvisStreamRefresh}
          setCheckEllvisStreamRefresh={props.setCheckEllvisStreamRefresh}
        />
      ) : content === 'streamconfig' ? (
        <Streamconfiguration ip={props.ip} interval={props.clickedStream.interval} clickedEllvis={props.clickedEllvis} customerData={props.customerData} stream={props.clickedStream} active={active} setActive={setActive} update={props.update} setUpdate={props.setUpdate} />
      ) : content === 'settings' ? (
        <Settings customerData={props.customerData} ip={props.ip} />
      ) : <Hotbackup customerData={props.customerData} ip={props.ip} />}
    </>
  )
}

export default Ellvis
