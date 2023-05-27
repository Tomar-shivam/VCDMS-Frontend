import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HttpService from "../../services/http.service";
import Loader from "../../common/loader";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./settings.css";
import httpService from "../../services/http.service";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import NavSlider from "./navSlider";
import Select from 'react-select'
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import { deviceTypesnames } from "../../common/CommonUtils";


const HotBackup = (props) => {
    const [activeTab] = useState("hotbackup");
    const [device_type, setDeviceType] = useState("");
    const [selectedDeviceType, setSelectedDeviceType] = useState("");
    const [selectedDeviceTypeforUnavailable, setSelectedDeviceTypeforUnavailable] = useState("");
    const [hotBackupIP, setHotBackupIP] = useState("");
    const [password, setPassword] = useState("");
    const [spareIps, setSpareIps] = useState({});
    const [UsedIPs, setUsedIPs] = useState({});
    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUsed, setIsUsed] = useState(false);
    const [isUnused, setIsUnused] = useState(true);
    const [activeClass, setActiveClass] = useState('unUsed');
    const [searchHotBackupIp, setSearchHotBackupIp] = useState('');
    const [searchHotBackupIpResult, setSearchHotBackupIpResult] = useState('');
    const [searchedDeviceType, setSearchedDeviceType] = useState('');
    const [searchedEncoderPeerIP, setSearchedEncoderPeerIP] = useState('');
    const username = 'apiuser';
    const deviceTypes = deviceTypesnames.map((itm) => { return { value: itm, label: itm } });
    const history = useHistory();

    useEffect(() => {
        fetchAllIPList();
        fetchAllUnavailableIPList();
    }, [])

    const fetchAllIPList = async () => {
        let allHotBackupIPs = await httpService.get("getAllHotBackupIp").then(res => res.data);
        setSpareIps(allHotBackupIPs);
    }
    const fetchAllUnavailableIPList = async () => {
        let allHotBackupIPs = await httpService.get("getAllAvailableHotBackupIp").then(res => res.data);
        setUsedIPs(allHotBackupIPs);
    }
    const DeleteAvailableHotIP = async (deviceType, spareIp) => {
        const result = window.confirm("Are you sure you want to delete this IP?");
        if (result) {
            let data = { deviceType: deviceType, spareIP: spareIp }
            let res = await httpService.CreateUpdate("deleteSpareIpForSettings", data).catch(err => console.log(err));
            if (res.data.ack === '1') {
                SuccessMessage("Spare IP Deleted Successfully")
                fetchAllUnavailableIPList();
                fetchAllIPList();
                if (spareIps[deviceType].length === 1 && !isSearch) {
                    setSelectedDeviceType('');
                }
            }
            else {
                ErrorMessage(res.data.msg)
            }

        }
    }
    const DeleteEncoderHotIP = async (peerip, spareIp, deviceType) => {
        const result = window.confirm("Are you sure you want to delete this IP?");
        if (result) {
            let data = { ip: peerip, spareIP: spareIp }
            let res = await httpService.CreateUpdate("deleteSpareIp", data).catch(err => console.log(err));
            if (res.data.ack === '1') {
                SuccessMessage("Spare IP Deleted Successfully")
                fetchAllUnavailableIPList();
                fetchAllIPList();
                if (UsedIPs[deviceType].length === 1 && !isSearch) {
                    setSelectedDeviceTypeforUnavailable('');
                }
            }
        }
    }
    const handleOnclick = async (e) => {
        e.preventDefault();
        if (hotBackupIP === '' || hotBackupIP.length < 7) {

            ErrorMessage("Please enter a valid hot backup IP")
            return;
        }
        if (device_type === '') {
            ErrorMessage("Please select a device type")
            return;
        }
        if (device_type === 'ELLVIS9000V3' && password === '') {
            ErrorMessage("Please a valid password")
            return;
        }

        let data = {
            Ip: hotBackupIP,
            deviceType: device_type,
            username: device_type === 'ELLVIS9000V3' ? username : '',
            password: password
        }
        setLoading(true);
        let res = await HttpService.CreateUpdate("bacupIpList", data).then((res) => res.data).catch((err) => console.log(err));
        if (res && res.ack === '0') {
            ErrorMessage(res.msg)
        }
        else {
            SuccessMessage("Spare IP Save Successfully")
            setHotBackupIP('')
            setDeviceType('')
            setPassword('');
            setSelectedDeviceType('');
            setSelectedDeviceTypeforUnavailable('');
            setIsSearch(false);
            fetchAllIPList();
            fetchAllUnavailableIPList();
        }
        setLoading(false);
    }
    const SearchHotBackIP = async (e) => {
        e.preventDefault();
        if (searchHotBackupIp === '' || searchHotBackupIp.length < 7) {
            ErrorMessage("Please enter a valid Device IP")
            return;
        }
        if (isUsed) {
            let flag = true;
            for (let i = 0; i < deviceTypesnames.length; i++) {
                if (UsedIPs[deviceTypesnames[i]].length > 0) {
                    for (let j = 0; j < UsedIPs[deviceTypesnames[i]].length; j++) {
                        if (UsedIPs[deviceTypesnames[i]][j].spareIp === searchHotBackupIp) {
                            setSearchHotBackupIpResult(UsedIPs[deviceTypesnames[i]][j].spareIp);
                            setSearchedDeviceType(deviceTypesnames[i]);
                            setSearchedEncoderPeerIP(UsedIPs[deviceTypesnames[i]][j].peerIP);
                            setIsSearch(true);
                            flag = false;
                            return;
                        }
                    }
                }
            }
            if (flag) {
                setSearchHotBackupIpResult('No data found');
                setSearchedDeviceType('');
                setSearchedEncoderPeerIP('');
                setIsSearch(true);
            }
        }
        else if (isUnused) {
            let flag = true;
            for (let i = 0; i < deviceTypesnames.length; i++) {
                if (spareIps[deviceTypesnames[i]].length > 0) {
                    for (let j = 0; j < spareIps[deviceTypesnames[i]].length; j++) {
                        if (spareIps[deviceTypesnames[i]][j].SpareIp === searchHotBackupIp) {
                            setSearchHotBackupIpResult(spareIps[deviceTypesnames[i]][j].SpareIp);
                            setSearchedDeviceType(deviceTypesnames[i]);
                            setIsSearch(true);
                            return;
                        }
                    }
                }
            }
            if (flag) {
                setSearchHotBackupIpResult('No data Found');
                setSearchedDeviceType('');
                setSearchedEncoderPeerIP('');
                setIsSearch(true);
            }
        }
    }
    const selectDeviceType = (selectedDeviceType) => {
        if (spareIps[selectedDeviceType.value] === undefined || spareIps[selectedDeviceType.value].length === 0) {
            setSearchHotBackupIpResult('No data Found');
            setSearchedDeviceType('');
            setSearchedEncoderPeerIP('');
            setIsSearch(true);
            setSelectedDeviceType(selectedDeviceType);
            return;
        }
        setIsSearch(false);
        setSelectedDeviceType(selectedDeviceType);
    }
    const selectDeviceTypeForUnavailable = (selectedDeviceType) => {
        if (UsedIPs[selectedDeviceType.value].length === 0) {
            setSearchHotBackupIpResult('No data found');
            setSearchedDeviceType('');
            setSearchedEncoderPeerIP('');
            setIsSearch(true);
            setSelectedDeviceTypeforUnavailable(selectedDeviceType);
            return;
        }
        setIsSearch(false);
        setSelectedDeviceTypeforUnavailable(selectedDeviceType);
    }
    const AvailableClickHandler = () => {
        setIsUnused(true);
        setIsUsed(false);
        setActiveClass('unUsed');
        setIsSearch(false)
        setSearchedDeviceType('');
    }
    const UnavailableClickHandler = () => {
        setIsUsed(true);
        setIsUnused(false);
        setActiveClass('used');
        setIsSearch(false);
        setSearchedDeviceType('');
        setSearchedEncoderPeerIP('')
    }
    const DeleteSearchedHotIP = (deviceType, spareIp) => {
        if (isUsed) {
            DeleteEncoderHotIP(searchedEncoderPeerIP, spareIp, deviceType);
        }
        else if (isUnused) {
            DeleteAvailableHotIP(deviceType, spareIp)
        }
    }
    return (
        <>
            <form>
                <NavSlider activeTab={activeTab} tabNumber={8} />
                <div className="pad-15" >
                    <div className="form-boxdiv">
                        <div className="form-boxtopline5">Hot Backup</div>
                        <div className="form-boxtopcont ">
                            {loading ? <Loader /> : null}
                            <div className="col-sm-6">
                                <div className="row">
                                    {/* device IP */}
                                    <div className="col-12 p-0">
                                        <div className="form-group">
                                            <label className="form-check-label">Hot BackUp IP: <i style={{ color: "red" }}>*</i> </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter Hot BackUp IP"
                                                value={hotBackupIP}
                                                onChange={(e) => {
                                                    let string = e.target.value.split(":")[0];
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
                                                    setHotBackupIP(e.target.value);
                                                }}
                                                required
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    {/* device type */}
                                    <div className="col-12 p-0">
                                        <div className="form-group">
                                            <label className="form-check-label">
                                                Device Type : <i style={{ color: "red" }}>*</i>
                                            </label>
                                            <select
                                                className="form-control"
                                                name="device_type"
                                                id="device_type"
                                                value={device_type}
                                                onChange={(e) => setDeviceType(e.target.value)}
                                            >
                                                <option value="">select device type</option>
                                                {
                                                    deviceTypesnames.map((item, indx) => <option value={item}>{item}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* username */}
                            {device_type === 'ELLVIS9000V3' ? <div className="col-sm-6 p-0">
                                <div className="form-group">
                                    <label className="form-check-label">Username:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Hot BackUp IP Username"
                                        value={username}
                                        style={{ cursor: "not-allowed" }}
                                        disabled
                                    />
                                </div>
                            </div> : ''}
                            {/* password */}
                            <div className="col-sm-6 p-0">
                                <div className="form-group">
                                    <label className="form-check-label">Password:</label>{device_type === 'ELLVIS9000V3' ? <i style={{ color: "red" }}>*</i> : ''}
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter Hot BackUp IP Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>
                            </div>
                            <button
                                className="btn btn-danger marb-15"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.goBack();
                                }}
                            >
                                Cancel
                            </button>
                            {props.customerData.Role === "Operator" ? (
                                ""
                            ) : (
                                <button
                                    className="btn btn-success marl-15 marb-15"
                                    onClick={(e) => handleOnclick(e)}
                                >
                                    Save
                                </button>
                            )}


                        </div>
                    </div>
                </div>
            </form>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <div className="backupTabs navbar-nav">
                        <button className={activeClass === "unUsed" ? 'btn btn-primary active' : 'btn'} onClick={() => { AvailableClickHandler() }}>Available Hot Backup IPs</button>
                        <button className={activeClass === "used" ? 'btn btn-primary active' : 'btn'} onClick={() => { UnavailableClickHandler() }}>Used Hot Backup IPs</button>
                    </div>
                </div>
                <div className="col-sm-4 ml-sm-auto" >
                    <div className="text-right d-flex" >
                        <input
                            className="form-control"
                            type="text"
                            name="snmp_trap_ip"
                            placeholder="Search Hot BackUp IP"
                            value={searchHotBackupIp}
                            onChange={(e) => {
                                let string = e.target.value.split(":")[0];
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
                                setSearchHotBackupIp(e.target.value);
                            }}
                            required
                            min="1"
                        />
                        <button className="btn btn-success ml-3" onClick={(e) => SearchHotBackIP(e)}>Search</button>
                    </div>
                </div>
            </div>
            {
                (isUnused && !isSearch) ?
                    <>
                        <div className="row" >
                            <div className="col-sm-6">
                                <Select
                                    value={selectedDeviceType}
                                    onChange={selectDeviceType}
                                    options={deviceTypes}
                                />
                            </div>
                        </div>
                        {selectedDeviceType && spareIps[selectedDeviceType.value].length > 0 ?
                            <div className="py-custom pad-15">
                                <div className="form-boxdiv input-status-box">
                                    <div className="form-boxtopline5">All Available Hot Backup IP's for <span style={{ color: "green" }}> {selectedDeviceType.value}</span></div>
                                    <div className="form-boxtopcont user-form form-boxcontent p-0">
                                        <div className="col m-2">
                                            <div className="row">
                                                {
                                                    selectedDeviceType ? spareIps[selectedDeviceType.value].map((ip, index) => {
                                                        return (
                                                            <div className="col-sm-6 col-md-4 col-lg-3 backupIpList">
                                                                <p>{ip.SpareIp}</p>
                                                                <FontAwesomeIcon
                                                                    icon={faTrashAlt}
                                                                    onClick={() => DeleteAvailableHotIP(ip.DeviceType, ip.SpareIp)}
                                                                    className='text-danger delete-backupIp'
                                                                />
                                                            </div>
                                                        )
                                                    }) : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div> : ''}
                    </> : isUsed && !isSearch ?
                        <>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Select
                                        value={selectedDeviceTypeforUnavailable}
                                        onChange={selectDeviceTypeForUnavailable}
                                        options={deviceTypes}
                                    />
                                </div>
                            </div>
                            {selectedDeviceTypeforUnavailable && UsedIPs[selectedDeviceTypeforUnavailable.value].length > 0 ?
                                <table className="table mt-3 table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Device Name</th>
                                            <th>Available Hot Backup IP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {UsedIPs[selectedDeviceTypeforUnavailable.value].map((ip, index) => {
                                            return (
                                                <tr>
                                                    <td><p><span style={{ color: "green" }}> {ip.properties.devicename} ({ip.peerIP})</span></p></td>
                                                    <td ><p>{ip.spareIp}
                                                        <FontAwesomeIcon
                                                            style={{ marginLeft: "7px" }}
                                                            icon={faTrashAlt}
                                                            onClick={() => DeleteEncoderHotIP(ip.peerIP, ip.spareIp, selectedDeviceTypeforUnavailable.value)}
                                                            className='text-danger delete-backupIp'
                                                        /></p></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                : ""}
                        </> : ''
            }
            {
                isSearch && isUnused ?
                    <>
                        <div className="row" >
                            <div className="col-sm-6">
                                <Select
                                    value={selectedDeviceType}
                                    onChange={selectDeviceType}
                                    options={deviceTypes}
                                />
                            </div>
                        </div>
                        <div className="py-custom pad-15">
                            <div className="form-boxdiv input-status-box">
                                <div className="form-boxtopline5">{searchedDeviceType ? `All Available Hot Backup IP's for ${searchedDeviceType}` : "Oops!!"}</div>
                                <div className="form-boxtopcont user-form form-boxcontent p-0">
                                    <div className="col m-2">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4 col-lg-3 backupIpList">
                                                <p>{searchHotBackupIpResult}</p>
                                                {searchedDeviceType ? <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    onClick={() => DeleteSearchedHotIP(searchedDeviceType, searchHotBackupIp)}
                                                    className='text-danger delete-backupIp'
                                                /> : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </> : isUsed && isSearch ?
                        <>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Select
                                        value={selectedDeviceTypeforUnavailable}
                                        onChange={selectDeviceTypeForUnavailable}
                                        options={deviceTypes}
                                    />
                                </div>
                            </div>
                            <div className="py-custom pad-15">
                                <div className="form-boxdiv input-status-box">
                                    <div className="form-boxtopline5">{searchedDeviceType ? `All Available Hot Backup IP's for ${searchedDeviceType}` : "Oops!!"}</div>
                                    <div className="form-boxtopcont user-form form-boxcontent p-0">
                                        <div className="col m-2">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4 col-lg-3 backupIpList">
                                                    <p>{searchHotBackupIpResult}</p>
                                                    {searchedDeviceType ? <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        onClick={() => DeleteSearchedHotIP(searchedDeviceType, searchHotBackupIp)}
                                                        className='text-danger delete-backupIp'
                                                    /> : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </> : ''
            }
        </>
    )
}

export default HotBackup;
