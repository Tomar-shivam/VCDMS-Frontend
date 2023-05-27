import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

let Navbar = (props) => {
  const resetActive = () => {
    if (props.active === 'dashboard') {
      props.setDashboardClass('')
    }

    if (props.active === 'streamconfig') {
      props.setStreamConfigurationClass('')
    }

    if (props.active === 'settings') {
      props.setSettingsClass('')
    }
    if (props.active === 'hotbackup') {
      props.setHotBackupClass('')
    }
  }
  const dashboardClick = () => {
    resetActive()
    props.setDashboardClass('active')
    props.setActive("dashboard")
    props.dashboardClick()
  }
  const streamConfigurationClick = () => {
    props.setClickedStream({})
    resetActive()
    props.setStreamConfigurationClass('active')
    props.setActive("streamconfig")
    props.streamConfigClick()
    props.setUpdate(false)
  }
  const settingsClick = () => {
    resetActive()
    props.setActive('settings')
    props.setSettingsClass('active')
    props.settingClick()
  }

  return (
    <div className="my-2 pb-2">
      <nav className='navbar navbar-expand-lg navbar-light p-0'>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav custom-tabs dashboard-navbar'>
            <li className='nav-item' onClick={dashboardClick}>
              <Link to={"/content/ellvis/" + props.match.params['IP'] + "/dashboard"} className={'nav-link ' + props.dashboardClass} aria-current='page' href='#'>
                <i className="fa fa-th-large"></i>
                Dashboard
              </Link>
            </li>
            {props.customerData.Role === "Operator" ? <></> :<li className={'nav-item'} onClick={streamConfigurationClick} >
              <Link to={"/content/ellvis/" + props.match.params['IP'] + "/streamconfig"} className={'nav-link ' + props.streamConfigurationClass} aria-current='page' href='#'>
                <i className="fa fa-sliders"></i>
                Stream Configuration
              </Link>
            </li>}
            <li className='nav-item' onClick={settingsClick}>
              <Link to={"/content/ellvis/" + props.match.params['IP'] + "/settings"} className={'nav-link ' + props.settingsClass} href='#'>
                <i className="fa fa-gear"></i>
                Settings
              </Link>
            </li>
            <li className='nav-item' onClick={settingsClick}>
              <Link to={"/content/ellvis/" + props.match.params['IP'] + "/hotbackup"} className={'nav-link ' + props.hotBackupClass} href='#'>
              <i className="fa fa-database"></i>
                Hot Backup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar