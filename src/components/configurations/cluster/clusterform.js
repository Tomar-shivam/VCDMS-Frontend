import { useEffect, useState } from 'react'
import './cluster.css'
import HttpService from '../../../services/http.service'
import Loader from '../../../common/loader';

let ClusterForm = (props) => {

    const [loading, setState] = useState(false);
    const [contactNo, setContactNo] = useState("")
    const [region, setRegion] = useState("")
    const [email, setEmail] = useState("")

    function hideLoader() {
        setState(false);
    }

    function showLoader() {
        setState(true);
    }

    useEffect(() => {
        if (props.data) {
            setContactNo(props.data.Contact)
            setRegion(props.data.Region)
            setEmail(props.data.Email)

        }
    }, [props.data])


    const cancelClickHandler = () => {
        setContactNo("")
        setRegion("")
        setEmail("")
        if (props.changeContent) {
            props.changeContent();
        }
        else if (props.setformContent) {
            props.setformContent("list");
        }
    }

    const submitButton = async (event) => {
        showLoader()
        event.preventDefault()
        if (region.toLocaleLowerCase() === 'Onboardingregion') {
            ErrorMessage("You can't Create a Region by name 'OnBoardingRegion' !");
            return;
        }
        let data = {
            _id: (props.data ? props.data._id : null),
            Email: email,
            Region: region,
            Contact: contactNo,
            Nominal: 0,
            Critical: 0,
            Major: 0
        }

        let res = await HttpService.CreateUpdate('createregion', data).then(res => res.data).catch(err => { return })
        var split = res.split(" ");
        var result = split[1];
        if (result === "Successfully") {
            setRegion("");
            setContactNo("");
            setEmail("")
            hideLoader();

            if (props.changeContent) {
                props.getRegions();
                props.changeContent();
            }
            else if (props.setformContent) {
                props.setformContent("list");
                props.getRegions();
            }
        }

    }

    return (
        <div>
            <div className="panel-body2">
                <div className="form-boxtopline5 ">
                    Add Region
                </div>
                {
                    loading ? <Loader /> : null
                }
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-check-label">Region: </label>
                            <input className="form-control" type="text" name="regionname" placeholder="Region" onChange={(event) => setRegion(event.target.value)} value={region} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-check-label">Contact No :</label>
                            <input className="form-control" type="text" name="contactno" placeholder="Contact No" onChange={(event) => setContactNo(event.target.value)} value={contactNo} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="form-check-label">Email :</label>
                            <input className="form-control" type="email" name="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger marb-15" onClick={() => cancelClickHandler()}>Cancel</button>
                <button className="btn btn-success marl-15 marb-15" onClick={(event) => submitButton(event)}>Save</button>
            </div>
        </div>
    )
}

export default ClusterForm;