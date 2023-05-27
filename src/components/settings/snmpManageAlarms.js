import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./settings.css";
import NavSlider from "./navSlider";
import HttpService from "../../services/http.service";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import Loader from "../../common/loader";
import httpService from "../../services/http.service";

const SNMPManager = (props) => {
    const [activeTab] = useState("setSNMPManagerAlarm");
    // const [trapdestIP, setTrapDestIP] = useState("");
    const [snmpManager, setSnmpManager] = useState('');
    const [communityName, setCommunityName] = useState("Public");
    let [loading, setState] = useState(false);
    let [snmpUser, setSnmpUser] = useState('');
    let [password, setPassword] = useState('');
    let [port] = useState('161|162');
    let [version, setVersion] = useState('1');
    let [sendTrap, setSendTrap] = useState(false)
    useEffect(() => {
        getSnmpData();
    }, [])

    function hideLoader() {
        setState(false);
    }

    function showLoader() {
        setState(true);
    }

    // get snmp Details here
    const getSnmpData = async () => {
        let res = await HttpService.get("getSnmpDetails")
            .then((res) => res.data)
            .catch((err) => { return { ack: '2', message: err } });
        if (res) {
            if (res.ack === "1") {
                setPassword(res.Snmp?.SnmpV3UserPassword)
                setCommunityName(res.Snmp?.CommunityName);
                setSnmpUser(res.Snmp?.SnmpV3User)
                setSnmpManager(res.Snmp.SnmpManager);
                setVersion(res.Snmp.SnmpVersion);
                setSendTrap(res.Snmp?.SendTrap)
            }
        }
    }


    const downloadMIB = async () => {
        // event.preventDefault();
        showLoader()
        let res = await httpService.getBackup("downloadMIBFile")
        if (res) {
            if (res.data.size !== 0) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `mib.txt`);
                document.body.appendChild(link);
                link.click();
                hideLoader()
                SuccessMessage("downloaded successfully")
            } else {
                hideLoader()
                ErrorMessage("File not found")
            }
        }
        hideLoader()
    };
    // save snmp data here
    const handleOnSave = async () => {
        if (snmpManager === "" || snmpManager.length < 7) {
            ErrorMessage("Please enter valid SNMP Manager");
            return;
        }
        if (version === '3' && snmpUser === '') {
            ErrorMessage('Please enter Username');
            return;
        }
        if (version === '3' && password === '') {
            ErrorMessage('Please enter password');
            return;
        }
        showLoader();
        if (!props.customerData || !props.customerData.Username) return;
        let data = {
            SnmpManager: snmpManager,
            CommunityName: communityName || 'Public',
            SnmpV3User: snmpUser,
            SnmpV3UserPassword: password,
            Snmpport: port,
            SnmpVersion: version,
            SendTrap: sendTrap
        };
        let res = await HttpService.CreateUpdate("saveSnmpDetails", data)
            .then((res) => res.data)
            .catch((err) => null);
        if (res) {
            if (res.ack === "1") {
                getSnmpData();
                hideLoader();
                SuccessMessage("SNMP Details updated successfully")
            } else {
                hideLoader();
                ErrorMessage("Something went wrong please try again");
            }
        } else {
            hideLoader();
            ErrorMessage("Something went wrong please try again");
        }
    };

    const sendDefaultTrap = async (e) => {
        e.preventDefault();
        if (snmpManager === "" || snmpManager.length < 7) {
            ErrorMessage("Please enter valid SNMP Manager");
            return;
        }
        if (version === '3' && snmpUser === '') {
            ErrorMessage('Please enter Username');
            return;
        }
        if (version === '3' && password === '') {
            ErrorMessage('Please enter password');
            return;
        }
        if (!props.customerData || !props.customerData.Username) return;
        let res = await HttpService.get("sendDefaultSNMPTrap")
            .then((res) => res.data)
            .catch((err) => null);
        if (res && res.ack) {
            SuccessMessage("Test Trap Send Successfully");
        } else {
            ErrorMessage("Unable to send trap")
        }
    }

    return (
        <>
            <form>
                <NavSlider activeTab={activeTab} tabNumber={8} />
                <div className="pad-15" >
                    <div className="form-boxdiv">
                        <div className="form-boxtopline5">SNMP Manager Alarm</div>
                        <div className="form-boxtopcont">
                            <div className="row">
                                {loading ? <Loader /> : null}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-check-label">SNMP Manager</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="snmp_trap_ip"
                                            placeholder="Enter SNMP Manager"
                                            value={snmpManager}
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
                                                setSnmpManager(e.target.value);
                                            }}
                                            required
                                            min="1"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-check-label">SNMP Community Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="snmp_trap_ip"
                                            placeholder="Enter SNMP Community Name"
                                            value={communityName}
                                            onChange={(e) => {
                                                setCommunityName(e.target.value);
                                            }}
                                            readOnly={version === '3'}
                                            min="1"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-check-label">SNMPv3 User</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="snmpv3_user"
                                                    placeholder="SNMPv3 User Name"
                                                    value={snmpUser}
                                                    onChange={(e) => {
                                                        setSnmpUser(e.target.value.trim(''));
                                                    }}
                                                    readOnly={!(version === '3')}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <label className="form-check-label">SNMPv3 User Password</label>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    name="snmpv3_user_password"
                                                    placeholder="SNMPv3 User Password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    readOnly={!(version === '3')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-check-label">SNMP Port (Default Polling: 161,Trap:162)</label>
                                        {/* <div className="col-sm-6" style={{ 'display': 'flex' }}> */}
                                        <input className="form-control" type={'text'} value={port} name="polling" readOnly={1} />
                                        {/* <input className="form-control" type={'number'} value='162' name="trap" /> */}
                                        {/* </div> */}
                                    </div>
                                </div>

                                <div className="col-sm-4 col-lg-3 ml-auto">
                                    <div className="form-group">
                                        {/* <Select options={options} defaultValue={'1'} /> */}
                                        <label class="form-check-label">Select</label>
                                        <select className="form-control" name="snmap_select" value={version} onChange={(e) => setVersion(e.target.value)} >
                                            <option>SNMP Version</option>
                                            <option value={'1'}>1</option>
                                            <option value={'2c'}>2c</option>
                                            <option value={'3'}>3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button
                                        className="btn btn-success marb-15"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOnSave();
                                            // history.goBack();
                                        }}
                                    >
                                        Save Setting
                                    </button>
                                    {props.customerData.Role === "Operator" ? (
                                        ""
                                    ) : (
                                        <button
                                            className="btn btn-primary marl-15 marb-15"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                downloadMIB();
                                                // history.goBack();
                                            }}
                                        >
                                            Download MIB
                                        </button>
                                    )}

                                    <div class="form-group">
                                        <button className="btn btn-warning marb-15" onClick={(e) => sendDefaultTrap(e)}>Send trap</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SNMPManager;
