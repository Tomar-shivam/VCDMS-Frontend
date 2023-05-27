import { useState, useEffect } from "react";
import httpService from "../../../services/http.service";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

let HotBackup = (props) => {
    const animatedComponents = makeAnimated();
    const [ellvisBackup, setEllvisHotbackup] = useState(props.ellvisBackup ? props.ellvisBackup : false);
    const [selectedOption, setSelectedOption] = useState({});
    const [allHotBackupIPs, setAllHotBackupIPs] = useState([]);
    const [spareIpPassword, setSpareIpPassword] = useState('');
    const [editedSpareIp, setEditedSpareIp] = useState('');
    const [isEditHotBackupIp, setIsEditHotBackupIp] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);
    const getAllData = async () => {
        let data = {
            peerIP: props.ip
        }
        let res = await httpService.CreateUpdate("getAllHotBackupIp", data).then(res => res.data).catch(err => console.log(err));
        if (res) {
            let backupIPs = [];
            for (let i = 0; i < res.length; i++) {
                let data = {
                    value: res[i].SpareIp,
                    label: res[i].SpareIp
                }
                backupIPs.push(data);
            }
            setAllHotBackupIPs(backupIPs);
        }
    }
    const handelEllvisHotBackUp = async (event) => {
        if (event.target.checked) {
            setEllvisHotbackup(true);
            let data = { isChecked: true, ip: props.ip }
            let res = await httpService.CreateUpdate("setHotBackupForEllvis", data).catch(err => console.log(err));
            setEditedSpareIp('');
            setIsEditHotBackupIp(false);
        } else {
            setEllvisHotbackup(false);
            let data = { isChecked: false, ip: props.ip }
            let res = await httpService.CreateUpdate("setHotBackupForEllvis", data).catch(err => console.log(err));
        }
    }
    const handelHotBackupChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    }
    const SaveHotBackupIPs = () => {

    }
    const SaveEditedHotBackupIP = () => {
    }
    return (
        <>
            <div className="py-custom">
                <div className="form-boxdiv" style={{ overflow: 'visible' }}>
                    <div className="form-boxtopline5">Ellvis Backup</div>
                    <div className="row m-0">
                        <div className="col-md-3">
                            <div className="form-group mt-3" >
                                <label className="form-check-label enc-status">
                                    Ellvis Backup:
                                    <input
                                        type="checkbox"
                                        className="enc-checkbox"
                                        checked={ellvisBackup}
                                        onChange={(event) => handelEllvisHotBackUp(event)}
                                    />
                                </label>
                            </div>
                        </div>

                        {ellvisBackup ?
                            <div className="col-md-9 mt-3">
                                <div className="row mb-3">
                                    {!props.spareIps ?
                                        <>
                                            <Select className="encoderBackupSelect"
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                defaultValue=""
                                                value={selectedOption}
                                                onChange={handelHotBackupChange}
                                                options={allHotBackupIPs}
                                            />
                                            <button
                                                className="btn btn-success ml-2"
                                                onClick={(e) => SaveHotBackupIPs(e)}
                                            >
                                                Save
                                            </button>
                                        </>
                                        : ''
                                    }
                                    {
                                        isEditHotBackupIp ?
                                            <>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label className="form-check-label">Hot Spare IP:</label>
                                                        <input
                                                            style={{ marginRight: "10px" }}
                                                            className="form-control"
                                                            type="text"
                                                            name="snmp_trap_ip"
                                                            placeholder="Enter Hot BackUp IP"
                                                            value={editedSpareIp}
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
                                                                setEditedSpareIp(e.target.value);
                                                            }}
                                                            required
                                                            min="1"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label className="form-check-label">Password:</label>
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            placeholder="Enter Hot BackUp IP Password"
                                                            value={spareIpPassword}
                                                            onChange={(e) => { setSpareIpPassword(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="form-group">
                                                        <button
                                                            className="btn btn-success mt-4"
                                                            onClick={(e) => SaveEditedHotBackupIP(e)}
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                            : ''
                                    }
                                </div>
                            </div> : ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotBackup;