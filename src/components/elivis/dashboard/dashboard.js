import React, { useEffect, useState } from "react";
import "./dashboard.css";
import VCDMSservice from "../../../services/http.service";
import Loader from "../../../common/loader";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import totalStreamImg from "../../../images/bar-icon-total.png";
import healthyStreamImg from "../../../images/bar-icon-healthy.png";
import majorStreamImg from "../../../images/bar-icon-avg.png";
import criticalStreamImg from "../../../images/bar-icon-critical.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ErrorMsg from '../../../common/errorMsg';

let interval = setInterval(() => { }, 3000);
let Dashboard = (props) => {
  const [totalStream, setTotalStream] = useState(0);
  const [healthyStream, setHealthyStream] = useState(0);
  const [averageStream, setAverageStream] = useState(0);
  const [criticalStream, setCriticalStream] = useState(0);
  const [containers, setContainers] = useState([]);
  const [allContainers, setAllContainers] = useState([]);
  const [visibleStreams, setVisibleStreams] = useState("total");
  const [deleteText, setDeleteText] = useState([]);
  const [startText, setStartText] = useState([]);
  const [stopText, setStopText] = useState([]);
  const [loader, setLoader] = useState(true);
  const [streamClass, setStreamClass] = useState("not-visible");
  const [dataSet1, setDataSet1] = useState(false);
  const [dataSet2, setDataSet2] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setDataSet1(false);
    setDataSet2(false);
    setLoader(true);
    getBothStreams();
    return () => {
      clearInterval(interval);
    };
  }, [props.ip]);

  useEffect(() => {
    checkLoader();
  }, [dataSet1, dataSet2]);

  useEffect(() => {
    if (props.checkEllvisStreamRefresh) {
      getStreams();
    }
  }, [props.checkEllvisStreamRefresh])

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < allContainers.length; i++) {
      arr.push("");
    }
    let healthy = 0;
    let critical = 0;
    let average = 0;
    let sample = [];
    for (let i = 0; i < allContainers.length; i++) {
      if (allContainers[i].MailStatus === "connected") {
        healthy++;
        if (visibleStreams === "healthy") {
          sample.push(allContainers[i]);
        }
      }
      if (allContainers[i].MailStatus === "disconnected") {
        critical++;
        if (visibleStreams === "critical") {
          sample.push(allContainers[i]);
        }
      }
      if (allContainers[i].MailStatus === "major") {
        average++;
        if (visibleStreams === "average") {
          sample.push(allContainers[i]);
        }
      }
    }
    setAverageStream(average);
    setHealthyStream(healthy);
    setCriticalStream(critical);
    setTotalStream(allContainers.length);
    if (visibleStreams === "total") {
      setContainers(allContainers);
    } else {
      setContainers(sample);
    }
    setDeleteText(arr);
    setStartText(arr);
    setDeleteText(arr);
  }, [allContainers]);

  const checkLoader = () => {
    if (dataSet1 && dataSet2) {
      setLoader(false);
    }
  };

  const handleDeleteClick = async (event, value, index) => {
    event.preventDefault();
    if (!props.customerData || !props.customerData.Username) return;
    let r = window.confirm("Are you sure you want to delete this stream!");
    if (r === false) {
      return;
    }
    setLoading(true);
    let sample = [...deleteText];

    sample[index] = (
      <>
        {loading ? (
          <span
            className="spinner-border spinner-border-sm ml-1"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <></>
        )}
      </>
    );
    setDeleteText(sample);

    let data = {
      ip: props.ip,
      Id: value.Id,
      ActionType: "Delete",
      ActionTime: new Date(),
      Module: "Stream",
      Username: props.customerData.Username,
      Target: props.ip,
    };

    let res = await VCDMSservice.CreateUpdate("deletecontainer", data)
      .then((res) => res.data)
      .catch((error) => { return });

    if (res) {
      if (res.length < allContainers.length) {
        let sample = [...deleteText];
        let sample1 = [...containers];

        sample1.splice(index, 1);
        sample.splice(index, 1);
        setDeleteText(sample);
        setContainers(sample1);
        for (let i = 0; i < allContainers.length; i++) {
          if (allContainers[i].Id === data.Id) {
            let sm = [...allContainers];
            sm.splice(i, 1);
            setAllContainers(sm);
          }
        }
      } else {
        // alert("Unable to Delete Container");
        ErrorMsg("Unable to Delete Container");

      }
      let sample = [...deleteText];
      sample[index] = "";
      setDeleteText(sample);
      setLoading(false);
    }
  };

  const getBothStreams = async () => {
    getStreams();
    interval = setInterval(() => {
      // getStreams();
    }, 3000);
  };

  const getStreams = async () => {
    let data = {
      ip: props.ip,
    };

    let res = await VCDMSservice.getByBoj("getallcontainers", data)
      .then((res) => res.data)
      .catch((err) => { return });
    props.setCheckEllvisStreamRefresh(false);
    if (res) {
      let arr = [];
      for (let i = 0; i < res.length; i++) {
        arr.push("");
      }
      let healthy = 0;
      let critical = 0;
      let average = 0;
      for (let i = 0; i < res.length; i++) {
        if (res[i].MailStatus === "connected") {
          healthy++;
        }
        if (res[i].MailStatus === "disconnected") {
          critical++;
        }
        if (res[i].MailStatus === "major") {
          average++;
        }
      }
      setAverageStream(average);
      setHealthyStream(healthy);
      setCriticalStream(critical);
      setTotalStream(res.length);
      setDeleteText(arr);
      setStartText(arr);
      setAllContainers(res);
      setDeleteText(arr);
      setStreamClass("");
      // setDataSet1(true)
      setLoader(false);
    }
  };

  const healthyStreamClickHandler = async (event) => {
    setVisibleStreams("healthy");
    if (event) event.preventDefault();
    setStreamClass("not-visible");
    let all_streams = [...allContainers];
    let healthy = [];
    let arr = [];
    for (let i = 0; i < all_streams.length; i++) {
      if (all_streams[i].MailStatus === "connected") {
        healthy.push(all_streams[i]);
        arr.push("");
      }
    }
    setContainers(healthy);
    setDeleteText(arr);
    setStartText(arr);
    setStopText(arr);
    setStreamClass("");
  };

  const criticalStreamClickHandler = async (event) => {
    if (event) event.preventDefault();
    setStreamClass("not-visible");
    setVisibleStreams("critical");
    let all_streams = [...allContainers];
    let critical = [];
    let arr = [];
    for (let i = 0; i < all_streams.length; i++) {
      if (all_streams[i].MailStatus === "disconnected") {
        critical.push(all_streams[i]);
        arr.push("");
      }
    }
    setContainers(critical);
    setDeleteText(arr);
    setStartText(arr);
    setStopText(arr);
    setStreamClass("");
  };

  const averageStreamClickHandler = async (event) => {
    if (event) event.preventDefault();
    setStreamClass("not-visible");
    setVisibleStreams("average");
    let all_streams = [...allContainers];
    let average = [];
    let arr = [];
    for (let i = 0; i < all_streams.length; i++) {
      if (all_streams[i].MailStatus === "major") {
        average.push(all_streams[i]);
        arr.push("");
      }
    }
    setContainers(average);
    setDeleteText(arr);
    setStartText(arr);
    setStopText(arr);
    setStreamClass("");
  };

  const totalStreamClickHandler = async (event) => {
    setVisibleStreams("total");
    if (event) event.preventDefault();
    setStreamClass("not-visible");
    let sample = [...allContainers];
    let total = [];
    let arr = [];
    for (let i = 0; i < sample.length; i++) {
      total.push(sample[i]);
      arr.push("");
    }
    setContainers(total);
    setDeleteText(arr);
    setStartText(arr);
    setStopText(arr);
    setStreamClass("");
  };

  const handleEditClick = (event, value, index) => {
    props.setUpdate(true);
    props.setClickedStream(value);
  };

  const startClickHandler = async (event, value, index, type) => {
    event.preventDefault();
    setLoading(true);
    let sample = [...startText];

    sample[index] = (
      <>
        {loading ? (
          <span
            className="spinner-border spinner-border-sm ml-1"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <></>
        )}
      </>
    );
    setStartText(sample);

    let data = {
      ip: props.ip,
      Id: value.Id,
    };

    let res = await VCDMSservice.CreateUpdate("startcontainer", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res === "Stream successfully created!") {
      let sample = [...allContainers];
      for (let i = 0; i < sample.length; i++) {
        if (sample[i].Id === data.Id) {
          sample[i].state = "running";
          sample[i].MailStatus = "connected";
        }
      }
      setAllContainers(sample);
      getStreams()
      if (visibleStreams === "total") {
        totalStreamClickHandler();
      }
      if (visibleStreams === "average") {
        averageStreamClickHandler();
      }
      if (visibleStreams === "critical") {
        criticalStreamClickHandler();
      }
      if (visibleStreams === "healthy") {
        healthyStreamClickHandler();
      }
    } else {
      ErrorMsg("Cannot start the stream");
    }
    sample = [...startText];
    sample[index] = "";
    setStartText(sample);
    setLoading(false);
  };

  const stopClickHandler = async (event, value, index, type) => {
    event.preventDefault();
    setLoading(true);
    let sample = [...stopText];
    sample[index] = (
      <>
        {loading ? (
          <span
            className="spinner-border spinner-border-sm ml-1"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <></>
        )}
      </>
    );
    setStopText(sample);

    let data = {
      ip: props.ip,
      Id: value.Id,
    };

    let res = await VCDMSservice.CreateUpdate("stopcontainer", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (res === data.Id) {
      let sample = [...allContainers];
      for (let i = 0; i < allContainers.length; i++) {
        if (allContainers[i].Id === res) {
          sample[i].state = "exited";
          sample[i].MailStatus = "not running";
          break;
        }
      }
      setAllContainers(sample);
      getStreams()
      if (visibleStreams === "total") {
        totalStreamClickHandler();
      }
      if (visibleStreams === "average") {
        averageStreamClickHandler();
      }
      if (visibleStreams === "critical") {
        criticalStreamClickHandler();
      }
      if (visibleStreams === "healthy") {
        healthyStreamClickHandler();
      }
    } else {
      ErrorMsg("Cannot Stop the Stream");
    }

    sample = [...stopText];
    sample[index] = "";
    setStopText(sample);
    setLoading(false);
  };

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    resizable: true,
  };

  const columns = [
    {
      headerName: "Input Stream",
      field: "inputStream",
    },
    {
      headerName: "Output Stream",
      field: "outputStream",
    },
    {
      headerName: "Comment",
      field: "comment",
    },
    {
      headerName: "Controls",
      field: "controls",
      suppressMenu: true,
      suppressSorting: true,
      cellRendererFramework: (params) => {
        let index = params.rowIndex;
        let value = params.data;

        return (
          <div>
            {(value.state === "exited" || value.status === "not running") ? (
              <Tippy
                className="tomato-theme"
                content={
                  <>
                    <span className="textbold">
                      Start Stream
                    </span>
                  </>
                }
              >
                <i
                  className="fa fa-play stream-icons icon-tooltip"
                  onClick={(event) =>
                    startClickHandler(event, value, index, "total")
                  }
                ></i>
              </Tippy>
            ) : (
              <i></i>
            )}

            {(value.state === "exited" || value.status === "not running") ? (
              <i></i>
            ) : (
              <Tippy
                className="tomato-theme"
                content={
                  <>
                    <span className="textbold">
                      Stop Stream
                    </span>
                  </>
                }
              >
                <i
                  className="fa fa-stop stream-icons icon-tooltip"
                  onClick={(event) =>
                    stopClickHandler(event, value, index, "total")
                  }
                ></i>
              </Tippy>
            )}
            <Tippy
              className="tomato-theme"
              content={
                <>
                  <span className="textbold">
                    Edit Stream
                  </span>
                </>
              }
            >
              <Link
                to={
                  "/content/ellvis/" + props.match.params["IP"] + "/streamconfig"
                }
                aria-current="page"
                href="#"
              >

                <i
                  className="fa fa-edit stream-icons icon-tooltip"
                  onClick={(event) => handleEditClick(event, value, index)}
                ></i>
              </Link>
            </Tippy>
            <Tippy
              className="tomato-theme"
              content={
                <>
                  <span className="textbold">
                    Remove Stream
                  </span>
                </>
              }
            >
              <i
                className="fa fa-times stream-icons-close icon-tooltip"
                onClick={(event) =>
                  handleDeleteClick(event, value, index, "total")
                }
              ></i>
            </Tippy>
          </div>
        );
      },
    },
  ];

  const rowClassRules = {
    one: (params) => params.data.MailStatus === "connected",
    two: (params) => params.data.MailStatus === "disconnected",
    three: (params) => params.data.MailStatus === "major",
  };

  const columnsOperator = [
    {
      headerName: "Input Stream",
      field: "inputStream",
    },
    {
      headerName: "Output Stream",
      field: "outputStream",
    },
    {
      headerName: "Comment",
      field: "comment",
    },
  ];

  return (
    <>
      <div>
        <div className="block-01 ">
          <div
            className="disk-plats disk-plat-01 cursor-pointer"
            onClick={(event) => totalStreamClickHandler(event)}
          >
            <div className="stream-card-title">Total Streams</div>
            <div className="stream-card-stats">{totalStream}</div>
            <img className="stream-img" src={totalStreamImg} alt="" />
          </div>
          <div
            className="disk-plats disk-plat-02 cursor-pointer"
            onClick={(event) => healthyStreamClickHandler(event)}
          >
            <div className="stream-card-title">Healthy Streams</div>
            <div className="stream-card-stats">{healthyStream}</div>
            <img className="stream-img" src={healthyStreamImg} alt="" />
          </div>
          <div
            className="disk-plats disk-plat-03 cursor-pointer"
            onClick={(event) => averageStreamClickHandler(event)}
          >
            <div className="stream-card-title">Major Streams</div>
            <div className="stream-card-stats">{averageStream}</div>
            <img className="stream-img" src={majorStreamImg} alt="" />
          </div>
          <div
            className="disk-plats disk-plat-04 cursor-pointer"
            onClick={(event) => criticalStreamClickHandler(event)}
          >
            <div className="stream-card-title">Critical Streams</div>
            <div className="stream-card-stats">{criticalStream}</div>
            <img className="stream-img" src={criticalStreamImg} alt="" />
          </div>
          <div className="clear"></div>
        </div>

        {loader ? (
          <Loader />
        ) : (
          <div className={"pad-15 " + streamClass}>
            <div className="form-boxdiv">
              <div className="form-boxtopline5">Stream List</div>
              <div className="form-boxtopcont user-form ag-theme-alpine dashboard-form">
                <div style={{ height: "560px" }}>
                  <AgGridReact
                    pagination={true}
                    paginationPageSize={20}
                    columnDefs={
                      props.customerData.Role === "Operator"
                        ? columnsOperator
                        : columns
                    }
                    defaultColDef={defaultColDef}
                    enableBrowserTooltips={true}
                    rowClassRules={rowClassRules}
                    tooltipShowDelay={{ tooltipShowDelay: 0 }}
                    rowData={containers}
                  ></AgGridReact>
                </div>
              </div>

              <div className="clear"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Dashboard;