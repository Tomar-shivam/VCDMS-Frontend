
import { useState, useEffect } from "react";
import VCDMSservice from "../../services/http.service";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./settings.css";
import NavSlider from "./navSlider";
import ErrorMessage from "../../common/errorMsg";
import SuccessMessage from "../../common/successMsg";
import httpService from '../../services/http.service'

const LicenseInfo = (props) => {
    const [activeTab] = useState("licenseinformation");
    const [formData, setFormData] = useState();
    const [startDate, setStartDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [totalLicense, setTotalLicense] = useState("");
    const [licenseToggle, setLicenseToggle] = useState(false);

    useEffect(() => {
        getLicenseDate();
    }, [])

    const licenseChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.name === "VCDMS-license.txt") {
                setFormData(file);
            } else {
                ErrorMessage("Not a valid file, It should be VCDMS-license.txt");
                setFormData({});
                document.getElementById("formFile1").value = null;
            }
        }
    };

    const SubmitClickHandler = async (e) => {
        e.preventDefault();
        debugger
        if (!formData) {
            ErrorMessage("Please select a File");
            return;
        }
        let data = { file: formData, };
        let res = await VCDMSservice.uploadFileOnDir("savelicensefile", data)
            .then((res) => res.data)
            .catch((err) => null);
        if (res) {
            if (res.ack === "1") {
                setFormData({});
                SuccessMessage("License Information has been uploaded Successfully.");
                let startDate = res.startDate.split("-")
                let expDate = res.expiryTime.split("-")
                setStartDate(startDate[1] + "-" + startDate[2] + "-" + startDate[0]);
                setExpirationDate(expDate[1] + "-" + expDate[2] + "-" + expDate[0]);
                setTotalLicense(res.totalLicense)
                document.getElementById("formFile1").value = null;
                setLicenseToggle(false)
            } else if (res.ack === "0") {
                ErrorMessage("Unable to save");
                document.getElementById("formFile1").value = null;
                setLicenseToggle(false)
            } else if (res.ack === "2") {
                ErrorMessage(res.msg);
                document.getElementById("formFile1").value = null;
                setLicenseToggle(false)
            }
        } else {
            ErrorMessage("Something went wrong, please try again");
            document.getElementById("formFile1").value = null;
            setLicenseToggle(false)
        }
    };

    const getLicenseDate = async () => {
        try {
            let res = await httpService.get("checkkeylok")
            if (res.data.output) {
                let startDate = res.data.output.StartDate.split("-")
                let expDate = res.data.output.EndDate.split("-")
                setStartDate(startDate[1] + "-" + startDate[2] + "-" + startDate[0]); // Set the starting date
                setExpirationDate(expDate[1] + "-" + expDate[2] + "-" + expDate[0]); // Set the expiration date
                setTotalLicense(res.data.output.Slug); // Set the total license
            }
        } catch (error) {
            ErrorMessage("Something went wrong, please try again");
        }
    }

    const licenseToggleHandler = async (e) => {
        e.preventDefault()
        setLicenseToggle(!licenseToggle)
    }

    return (
        <div>
            <form>
                <NavSlider activeTab={activeTab} tabNumber={8} />
                <div>
                    <div className="pad-15">
                        <div className="form-boxdiv">
                            <div className="form-boxtopline5" style={{ padding: "12px" }}>License Information
                                <button class="btn btn-primary float-right" onClick={(e) => { licenseToggleHandler(e) }}>
                                    {!licenseToggle ? "Upload License" : "Show License Info"}</button>
                            </div>
                            {licenseToggle ?
                                <div className="form-boxtopcont ">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="form-check-label">Upload License File:</label>
                                                <div className="select-wrapper">
                                                    <input
                                                        className="form-control pad-top-3"
                                                        type="file"
                                                        id="formFile1"
                                                        accept=".txt"
                                                        onChange={(event) => licenseChange(event)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-danger marb-15"
                                        onClick={(e) => {
                                            licenseToggleHandler(e);
                                        }}
                                    >Cancel</button>

                                    {props.customerData.Role === "Operator" ? (
                                        ""
                                    ) : (
                                        <button
                                            className="btn btn-success marl-15 marb-15"
                                            onClick={(e) => {
                                                SubmitClickHandler(e);
                                            }}
                                        >Upload</button>
                                    )}
                                </div> :
                                <div className="form-boxtopcont ">
                                    <label className="form-check-label "><span className="font-weight-bold">Total Number Of License:</span> {totalLicense}</label>
                                    <div>
                                        <label className="form-check-label"><span className="font-weight-bold">License Start Date:</span> {startDate}</label>
                                        <label className="form-check-label ml-5 "><span className="font-weight-bold">License Expiry Date:</span> {expirationDate}</label>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LicenseInfo;
