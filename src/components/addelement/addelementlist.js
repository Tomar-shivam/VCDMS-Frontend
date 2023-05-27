import { useEffect, useState } from "react";
import VCDMSService from "../../services/http.service";
import Loader from "../../common/loader";
import AddElementForm from "./addelementform";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardBody, Card, Table } from "reactstrap";
import "../dashboard/dashboard.css";
import { CHECK_KEYLOK } from "../../config";
import { Accordion } from "react-bootstrap";

let AddElementList = (props) => {
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(<div></div>);
  const [loading, setLoading] = useState(false);
  const [devicesList, setDevicesList] = useState([]);
  const [returnData, setreturnData] = useState([]);
  const [licenses, setlicenses] = useState(0);
  const [regToggle, setRegToggle] = useState([]);
  const [sysToggle, setSysToggle] = useState([])
  const [sysinReg, setSysinReg] = useState([])

  const setReturnDataOnUseEffect = async () => {
    if (CHECK_KEYLOK) {
      let licenseCount = await VCDMSService.get('getlicenses').then(res => res.data);
      if (licenseCount !== undefined && licenseCount['output'] == "") setlicenses(0);
      else if (licenseCount !== undefined) setlicenses(parseInt(licenseCount['output']));
    }
    let returndata = await VCDMSService.get("getdeviceobject").then(
      (res) => res.data
    );
    setreturnData(returndata);
  }

  useEffect(() => {
    setReturnDataOnUseEffect();
    setDevicesList(props.deviceList);
  }, [props.deviceList]);

  useEffect(() => {
    setRegToggle(Array(props.regionList.length).fill(null))
    setSysToggle(Array(props.systemList.length).fill(null))
    setSysinReg(Array(props.systemList.length).fill(null))
  }, [content])

  useEffect(() => {
    setRegToggle(Array(props.regionList.length).fill(null))
    setSysToggle(Array(props.systemList.length).fill(null))
    setSysinReg(Array(props.systemList.length).fill(null))
  }, [props.regionList, props.systemList])

  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }

  let DeleteDevice = async (rowdata) => {
    if (!props.customerData || !props.customerData.Username) return;
    let r = window.confirm("Are you sure you want to delete this device?");
    if (r == false) { return; }
    let data = {
      _id: rowdata._id,
      DeviceName: rowdata.DeviceName,
      DeviceType: rowdata.DeviceType,
      DeviceIP: rowdata.IP,
      ManagementIP: rowdata.ManagementIP,
      Region: rowdata.Region,
      TimeCreated: new Date(),
      ActionTime: new Date(),
      ActionType: "Delete",
      Module: "Device",
      Username: props.customerData.Username,
      Target: rowdata.IP,
    };
    showLoader();
    await VCDMSService.getByBoj("deletedevice", data).then(
      (res) => res.data
    );
    props.getAllDevices();
    hideLoader();
  };

  const setField = (data) => {
    setContent("form");
    setForm(
      <AddElementForm
        data={data}
        systemList={props.systemList}
        setformContent={setContent}
        getAllDevices={props.getAllDevices}
        regionList={props.regionList}
        getRegions={props.getRegions}
        getSystems={props.getSystems}
        customerData={props.customerData}
      />
    );
  };

  const updateRegToggle = (e) => {
    let regionToggle;
    if (e !== null)
      regionToggle = regToggle.map((itm, indx) => indx == e ? e : null)
    else
      regionToggle = regToggle.map((itm, indx) => itm !== e ? e : itm)
    setRegToggle(regionToggle);
  }

  const updateSysToggle = (index, e) => {
    let systemToggle;
    if (e !== null) {
      sysinReg[e] = index;
      systemToggle = sysToggle.map((itm, indx) => indx == e ? e : (sysinReg[indx] == index ? null : itm))
    }
    else
      systemToggle = sysToggle.map((itm, indx) => itm !== e && sysinReg[indx] == index ? e : itm)

    setSysToggle(systemToggle)
  }

  return content === "list" ? (
    <div className={"mt-3 regions-scroll"}>
      {loading ? <Loader /> : ""}
      <Accordion className="region-accordion" onSelect={(e) => updateRegToggle(e)}>
        {props.regionList.map((value, index) => {
          return (
            <Card className="mb-3">
              <Accordion.Toggle className={regToggle[index] != null ? "accordion-header active" : "accordion-header"} as={Card.Header} eventKey={index.toString()}>
                {value.Region.length < 30
                  ? value.Region
                  : value.Region.substring(0, 30) + "...."}
                <span className="accordion-toggle"><i className={regToggle[index] != null ? "fa fa-minus-circle" : 'fa fa-plus-circle'}></i></span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index.toString()}>
                <CardBody
                  key={"system" + index}
                >
                  <Accordion className="region-accordion" onSelect={(e) => updateSysToggle(index, e)}>
                    {props.systemList.map((val, i) => {
                      if (val.RegionID === value._id) {
                        return (
                          <Card className="my-1">
                            <Accordion.Toggle className={sysToggle[i] != null ? "accordion-header active" : "accordion-header"} as={Card.Header} eventKey={i.toString()}>
                              {val.System}
                              <span className="accordion-toggle"><i className={sysToggle[i] != null ? "fa fa-minus-circle" : 'fa fa-plus-circle'}></i></span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={i.toString()}>
                              <CardBody>
                                <div className="table-responsive border deviceList-scroll">
                                  {props.deviceList ? <Table className="cluster-table">
                                    <thead className="bg-header">
                                      <tr>
                                        <th>Device Name</th>
                                        <th>Device IP</th>
                                        <th>Device Type</th>
                                        <th>{" "}</th>

                                      </tr>
                                    </thead>
                                    <tbody className="font12">
                                      {Object.entries(returnData).map((entry, i) => {
                                        if (val._id == entry[1][0].SystemID)
                                          return (
                                            <>
                                              {entry[1].map((d, i) => {
                                                if (entry[0] === d.IP && Object.keys(entry[1]).length) {
                                                  return (
                                                    <tr>
                                                      <td onClick={(e) => setField(d)}>
                                                        {" "}
                                                        <a className="linka">{d.DeviceName}</a>
                                                      </td>
                                                      <td>{d.IP}</td>
                                                      <td>{d.DeviceType}</td>
                                                      <td>
                                                        <span className="spannames">
                                                          <i
                                                            className="fa fa-trash delete-icon"
                                                            onClick={(e) => {
                                                              DeleteDevice(d);
                                                            }}
                                                          ></i>
                                                        </span>
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              })}
                                              {Object.keys(entry[1]).length == 1 ? (
                                                <div></div>
                                              ) : (
                                                <tr className="cluster-view">
                                                  <td colSpan="4" className="form-boxtable-pad-15">
                                                    <div className="table-responsive border device-inner-table">
                                                      <Table className="table-inner ">
                                                        <thead className="bg-header"
                                                          style={{ position: "sticky", top: 0 }}
                                                        >
                                                          <th>Device Name</th>
                                                          <th>Device IP</th>
                                                          <th>Device Type</th>
                                                          <th>{""}</th>
                                                        </thead>
                                                        <tbody className="font12 bg-white">
                                                          {entry[1].map((d, i) => {
                                                            if (d.IP !== entry[0]) {
                                                              return (
                                                                <tr key={i}>
                                                                  <td onClick={(e) => setField(d)}>
                                                                    {" "}
                                                                    <a className="linka">
                                                                      {d.DeviceName}
                                                                    </a>
                                                                  </td>
                                                                  <td>{d.IP}</td>
                                                                  <td>{d.DeviceType}</td>
                                                                  <td>
                                                                    <spna className="spannames">
                                                                      <i
                                                                        className="fa fa-trash delete-icon"
                                                                        onClick={(e) => {
                                                                          DeleteDevice(d);
                                                                        }}
                                                                      ></i>
                                                                    </spna>
                                                                  </td>
                                                                </tr>
                                                              );
                                                            }
                                                          })}
                                                        </tbody>
                                                      </Table>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )}
                                            </>
                                          );
                                      })}
                                    </tbody>
                                  </Table> : ""}
                                </div>
                              </CardBody>
                            </Accordion.Collapse>
                          </Card>
                        );
                      } else return <></>;
                    })}
                  </Accordion>
                </CardBody>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  ) : (
    form
  );
};

export default AddElementList;
