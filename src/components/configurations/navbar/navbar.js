import { useState, useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faGlobe } from "@fortawesome/free-solid-svg-icons";


const NavBar = (props) => {
    const [activeTab, setActiveTab] = useState("regions")
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    return (
        <div className="my-2">
            <nav className='navbar navbar-expand-lg navbar-light p-0'>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav custom-tabs dashboard-navbar'>
                        <li className='nav-item' onClick={() => props.setActiveTab("regions")}>
                            <Link to="/content/configurations/regions" className={'nav-link ' + (activeTab === "regions" ? "active" : "")} aria-current='page' href='#' >
                                <FontAwesomeIcon icon={faGlobe} />
                                Regions
                            </Link>
                        </li>
                        <li className='nav-item' onClick={() => props.setActiveTab("systems")} >
                            <Link to="/content/configurations/systems" className={'nav-link ' + (activeTab === "systems" ? "active" : "")} aria-current='page' href='#' >
                                <FontAwesomeIcon icon={faGlobe} />
                                Systems
                            </Link>
                        </li>
                        <li className='nav-item' onClick={() => {
                            
                            props.setActiveTab("devices")
                            props.setDeviceFormState("list")
                        }} >
                            <Link to="/content/configurations/devices" className={'nav-link ' + (activeTab === "devices" ? "active" : "")} aria-current='page' href='#' >
                                <FontAwesomeIcon icon={faLaptop} />
                                Devices
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;