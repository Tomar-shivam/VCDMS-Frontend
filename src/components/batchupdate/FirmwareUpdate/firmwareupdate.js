import React, { useState, useEffect } from "react";
import httpService from "../../../services/http.service";
import "./../batchupdate.css";
import "./firmware.css";

let FirmwareUpdate = (props) => {
  const [firmwareFiles, setFirmwareFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const firmwareUpdateChange = (event) => {
    props.setFormData(event.target.files[0]);
  };
  useEffect(() => {
    const getFirmwareFiles = async () => {
      let data = { DeviceType: props.selectedModel ? props.selectedModel : null }
      let res = await httpService.getFirmwarefiles("getfirmwarefilesbydevicetype", data);
      setFirmwareFiles(res.data)
    }
    getFirmwareFiles();
  }, [props.selectedModel])
  const clearForms = () => {
    props.setFormData({});
    props.setFirmwareFileForUpdate('');
    document.getElementById('formFile').value = null
    setSelectedFile('');
  }
  const makeFormdata = (e) => {
    setSelectedFile(e.target.value)
    props.setFirmwareFileForUpdate(e.target.value);
  }
  return (
    <>
      <div className="mt-4 form-boxdiv">
        <div class="form-boxtopline5">Update Firmware</div>
        <div className="col-md-6 mx-auto">

          <div className="w-100 avail-files mt-4">
            <h4>Available Files : {firmwareFiles.length}</h4>
            <form>

              <div className="row" >
                {firmwareFiles.map((files, index) => (
                  <div className="col-6" key={index}>
                    <div className="form-check d-flex justify-content-center">
                      <label className="form-check-label">
                        <input type="radio" className="form-check-input" disabled={document.getElementById('formFile').value} checked={selectedFile === files} onChange={makeFormdata} name="optradio" value={files} />
                        <span>{files}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-6 mx-auto">
          <h4 className="firmware-seperator"><span>OR</span></h4>
        </div>

        <div className="col-md-6 mx-auto">
          <div className="file-upload-box">
            <div>
              <input type="file" id="formFile" disabled={selectedFile} onChange={(event) => firmwareUpdateChange(event)} />
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center mx-auto my-4">
          <button className="btn btn-danger mr-2" disabled={props.disable} onClick={() => clearForms()}>Cancel</button>
          <button className="btn btn-success" disabled={props.disable} onClick={selectedFile ? props.updateFirmwareByUploadedFiles : props.SubmitFirmwareUpdate}>{props.upDateText}</button>
        </div>
      </div>
    </>
  );
};

export default FirmwareUpdate;
