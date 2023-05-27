import { useEffect, useState } from "react";
import ErrorMessage from "../../common/errorMsg";
import httpService from "../../services/http.service";
import NavSlider from "./navSlider";
import SuccessMessage from "../../common/successMsg";

let DeviceTypes = (props) => {
    let [deviceTypeName, setDeviceTypeName] = useState('');
    let [allDeviceTypes, setAllDeviceTypes] = useState([]);
    let [edit, setEdit] = useState('');

    const handleOnclick = async (e) => {
        e.preventDefault();
        if (deviceTypeName.trim()) {
            let devicetypedata = {
                DeviceType: deviceTypeName.trim()
            }

            let result = await httpService.getByBoj("devicetype", devicetypedata
            ).then((res) => {
                GetAll();
                return res.data
            })
                .catch((e) => {
                    ErrorMessage("Something went wrong, Please try again!")
                }
                );
            if (result.ack === '1') {
                setDeviceTypeName('');
                SuccessMessage(result.msg)
            }
            else ErrorMessage(result.msg)
        }
        else {
            setDeviceTypeName('');
            ErrorMessage('Enter a valid Device-Type name');
        }
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        if (deviceTypeName.trim()) {
            const data = {
                DeviceType: deviceTypeName.trim(),
                id: id
            }
            let result = await httpService.updateData("devicetype", data)
                .then(res => {
                    GetAll();
                    setEdit('');
                    setDeviceTypeName('');
                    return res.data;
                })
                .catch(e => e)
            if (result['ack'] === '1') SuccessMessage(result.msg)
            else ErrorMessage(result.msg)
        }
        else {
            setEdit('');
            ErrorMessage('Enter a valid Device-Type name');
        }
    }

    const handleDelete = async (id) => {
        let r = window.confirm("Are you sure you want to delete this Device-Type?");
        if (r) {
            let data = {
                id: id
            }
            let result = await httpService.CreateUpdate('devicetypedelete', data)
                .then(res => {
                    GetAll();
                    setEdit('');
                    setDeviceTypeName('');
                    return res.data;
                })
                .catch(e => e)
            if (result['ack'] === '1') SuccessMessage(result.msg)
            else ErrorMessage(result.msg)
        }
    }

    const GetAll = async () => {
        await httpService.get("devicetype")
            .then(res => {
                setAllDeviceTypes(res.data.ack === '0' ? [] : res.data.Data)
            })
    }

    useEffect(() => {
        GetAll();
    }, [])

    return <div>
        <form>
            <NavSlider activeTab={"devicetype"} tabNumber={8} />
            <div className="pad-15" >
                <div className="form-boxdiv">
                    <div className="form-boxtopline5">Device Types</div>
                    <div className="form-boxtopcont ">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="form-check-label">Type</label>
                                    <div className="select-wrapper form-inline">
                                        <input
                                            className="form-control flex-grow-1"
                                            type="text"
                                            placeholder="Device Type Name"
                                            value={deviceTypeName}
                                            onChange={(e) => setDeviceTypeName(e.target.value)}
                                            required
                                        ></input>

                                        <button
                                            className="btn btn-success ml-3"
                                            onClick={(e) => {
                                                edit ? handleUpdate(e, edit) : handleOnclick(e);
                                            }}
                                        >
                                            {edit ? "Update" : "Save"}
                                        </button>
                                        <button
                                            className="btn btn-danger ml-3"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (edit) setEdit('');
                                                setDeviceTypeName('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-boxdiv">
                <div className="form-boxtopline5">All Device Types</div>
                <div className="form-boxtopcont ">
                    <div className="row">
                        {
                            allDeviceTypes && allDeviceTypes.map((itm, indx) =>
                                <div className="col-md-4 col-lg-3" key={indx}>
                                    <div className="actionIcons-list">
                                        <p> {itm.DeviceType}</p>
                                        <div className="action-icons">
                                            <i onClick={() => {
                                                setDeviceTypeName(itm.DeviceType)
                                                setEdit(itm._id)
                                            }} className="fa fa-edit text-primary" style={{ height: "16px" }}></i>
                                            <i onClick={() => handleDelete(itm._id)} className="fa fa-trash text-danger"></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </form>

    </div>
}

export default DeviceTypes;