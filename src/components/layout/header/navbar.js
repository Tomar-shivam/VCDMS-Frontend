import React from 'react'
import { Navbar, Nav, Dropdown, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'
import { CHECK_KEYLOK } from '../../../config'
import { Link, NavLink } from 'react-router-dom'

let NavElement = (props) => {
    const addElementClick = () => {
        props.setDeviceFormState("form")
        props.addElementClick();
    }
    return (
        <div className='navbar-pos'>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='light' className="">
                <Nav.Link className="nav-link-left">
                    <Dropdown className="btn-icons">
                        <Dropdown.Toggle variant="success" id="dropdown-menu-align-left " className="dropdown-menu-left toggle btn-icons">
                            <button aria-controls='responsive-navbar-nav' type='button' aria-label='' className='navbar-toggler-web collapsed'>
                                <span className='navbar-toggler-icon'></span>
                            </button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-l-pop">
                            <Link to="/content/dashboard" className="dropdown-item1">
                                <Dropdown.Item href="#/dashboard" className="dropdown-item"
                                    onClick={props.dashboardClick}>
                                    <i className="fa fa-home font-size-16 align-middle mr-1"></i>
                                    <span className="dropdown-item1">Home</span>
                                </Dropdown.Item></Link>
                            <Link to="/content/configurations/regions" className="dropdown-item1">
                                <Dropdown.Item href="#/configuration" className="dropdown-item"
                                    onClick={(event) => props.setContent("configurations")}>
                                    <i className="fa fa-cog font-size-16 align-middle mr-1"></i>
                                    <span to="/content/configurations/regions" className="dropdown-item1">Configuration</span>

                                </Dropdown.Item></Link>
                            {props.customerData.Role === "Operator" ? <></> : <Link to="/content/batchupdate" className="dropdown-item1"><Dropdown.Item href="#/logout" className="dropdown-item">
                                <i className="fa fa-pencil-square font-size-16 align-middle mr-1"></i>
                                <span>
                                    <span to="/content/batchupdate" className="dropdown-item1">Batch Update</span>
                                </span>
                            </Dropdown.Item></Link>}
                            {(props.customerData.Role === "Admin" || props.customerData.Role === "" || props.customerData.Role === null || props.customerData.Role === undefined) ? <Link to="/content/users" className="dropdown-item1"><Dropdown.Item href="#/logout" className="dropdown-item">
                                <i className="fa fa-user font-size-16 align-middle mr-1"></i>
                                <span>
                                    <span to="/content/users" className="dropdown-item1">Users</span>
                                </span>
                            </Dropdown.Item></Link> : <></>}
                            {(props.customerData.Role === "Admin" || props.customerData.Role === "" || props.customerData.Role === null || props.customerData.Role === undefined) ? <Link to="/content/report" className="dropdown-item1"><Dropdown.Item href="#/logout" className="dropdown-item">
                                <i className="fa fa-flag font-size-16 align-middle mr-1"></i>
                                <span>
                                    <span to="/content/report" className="dropdown-item1">Reports</span>
                                </span>
                            </Dropdown.Item></Link> : <></>}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Link>
                <Nav className='mr-auto'>
                    <span className="navbar-title">RCC Element Manager
                    </span>
                </Nav>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>

                    <Nav className="align-items-end align-items-lg-center">
                        {props.customerData.Role === "Operator" ? <></> : CHECK_KEYLOK ? (parseInt(props.licenses) > props.deviceList.length ? (<div className="">
                            <button className={"header-btn"}
                                onClick={addElementClick}>
                                <Link to="/content/configurations/devices" className="dropdown-item2">Add Device</Link>
                            </button>
                            <div className="clear"></div>
                        </div>) : <></>) : (<div className="">
                            <button className={"header-btn"}
                                onClick={addElementClick}>
                                <Link to="/content/configurations/devices" className="dropdown-item2">Add Device</Link>
                            </button>
                            <div className="clear"></div>
                        </div>)}
                        <div className="nav-seperator">
                            <Nav.Link>
                                <NavLink to="/content/SMTP" >
                                    <div className="setting-ico"></div>
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/content/version" >
                                    <div className="quation-mark-ico"></div>
                                </NavLink>
                            </Nav.Link>
                        </div>
                        <Nav.Link className="pr-0 pl-3">
                            <Dropdown className="btn-icons">
                                <Dropdown.Toggle variant="success" id="dropdown-menu-align-right" className="user-dropdown toggle btn-icons">

                                    <div className="user-ico"></div>{props.username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <strong className="model-head">
                                        {
                                            props.username
                                        }</strong>
                                    <Dropdown.Divider />
                                    <Link to="/content/profile" className="dropdown-item1">

                                        <Dropdown.Item href="#/profile" className="dropdown-item">
                                            <i className="fa fa-user font-size-16 align-middle mr-1"></i>
                                            <span>Profile</span>
                                        </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Item href="#/logout" className="dropdown-item"
                                        onClick={
                                            props.logoutClick
                                        }>
                                        <i className="fa fa-power-off font-size-16 align-middle mr-1 text-danger"></i>
                                        <span>Logout</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
export default NavElement
