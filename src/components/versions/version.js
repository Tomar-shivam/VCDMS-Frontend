import React from "react";
import { useState, useEffect } from "react";
import HttpService from "../../services/http.service";
import vcdms from "../../common/rcc-version-logo.png"
import "react-toastify/dist/ReactToastify.css";
import "../versions/version.css";
import packageVersion from "../../../package.json";
import VCDMSService from "../../services/http.service";
import { CHECK_KEYLOK } from "../../config";

const Version = (props) => {
  const [backendVersion, setbackendVersion] = useState("");
  const [license, setlicense] = useState(0)
  useEffect(() => {
    getVersions();
    if (CHECK_KEYLOK) getLicenses()
  }, []);
  useEffect(() => {
    async function fetchData() {
      let returndata = await VCDMSService.get("getbackendversion").then(
        (res) => res.data
      );

      setbackendVersion(returndata);
    }
    fetchData();
  }, []);
  const getVersions = async () => {

    await HttpService.getByBoj("checkversions")
      .then((res) => res.data)
      .catch((err) => { return });
  };
  const getLicenses = async () => {
    let res = await HttpService.get('getlicenses').then(res => res.data).catch(err => {
      setlicense(0);
    });
    if (res === undefined) return;
    if (res.output === "") setlicense(0);
    else setlicense(parseInt(res['output']))
  }

  return (
    <>
      <div className="pad-15">
        <div className="form-boxdiv">
          <div className="form-boxtopline5">About</div>
          <div className="form-boxtopcont">
            <div className="form-boxdiv-gray">
              <div className="form-boxtopcont user-form">
                <div className=" panel-default">
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-sm-2">
                        <figure className="rcc-version-logo">
                          <img src={vcdms} alt="" />
                        </figure>
                        <div className="text-center rcc-version">

                          <h5>VCDMS</h5>
                          <h5>UI/UX Version <span>{packageVersion.version}</span></h5>
                          <h5>Backend Version <span>{backendVersion}</span></h5>
                          {/* <h5>License Status: <span>{`${props.deviceList?.length}/${license}`}</span></h5> */}
                          {CHECK_KEYLOK ? (
                            <h5>License Status: <span>{`${props.deviceList?.length}/${license}`}</span></h5>
                          ) : <></>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Version;
