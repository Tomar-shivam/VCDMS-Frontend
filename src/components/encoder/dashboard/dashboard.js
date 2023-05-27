import { useState, useEffect } from "react";
import "./dashboard.css";
import "./../encoder.css";
import { Row, Col, Card, Label } from "reactstrap";
import { Link } from "react-router-dom";
import VCDMSservice from "../../../services/http.service";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Chart from "react-apexcharts";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import httpService from "../../../services/http.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../../common/errorMsg";
import SuccessMessage from "../../../common/successMsg";


let graphInterval = setInterval(() => { }, 1000);
let streamStatsInterval = setInterval(() => { }, 3000);
let Dashboard = (props) => {
    const [encoder1Status, setEncoder1Status] = useState(
        props.status
            ? props.status.status === ""
                ? "NA"
                : props.status.status
            : "NA"
    );
    const [toggle, setToggle] = useState(false);
    const [isEditHotBackupIp, setIsEditHotBackupIp] = useState(false);
    const [encoderBackup, setEncoderBackup] = useState(props.hotBackup ? props.hotBackup : false);
    const animatedComponents = makeAnimated();
    const [togglesend, settogglesend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bandwidthGraph, setBandwidthGraph] = useState({});
    const [packetsGraph, setPacketsGraph] = useState({});
    const [rttGraph, setRttGraph] = useState({});
    const [bandwidthGraphSend, setBandwidthGraphSend] = useState({});
    const [packetsGraphSend, setPacketsGraphSend] = useState({});
    const [rttGraphSend, setRttGraphSend] = useState({});
    const [linkEfficiency, setLinkEfficiency] = useState("");
    const [dropPackets, setDropPackets] = useState("");
    const [recvPacketStats, setRecvPacketStats] = useState(0);
    const [recvPacketLost, setRecvPacketLost] = useState(0);
    const [recvPacketDropped, setRecvPacketDropped] = useState(0);

    const [sendPacketLost, setSendPacketLost] = useState(0);
    const [sendPacketDropped, setSendPacketDropped] = useState(0);
    const [sendPacketStats, setSendPacketStats] = useState(0);

    //dashboard link details
    const [recvPeerIP, setRecvPeerIP] = useState("");
    const [recvUptime, setRecvUptime] = useState("0:00:00:00");
    const [recvBandwidth, setRecvBandwidth] = useState("0 Mbs");
    const [recvBitRate, setRecvBitRate] = useState(0);
    const [recvRtt, setRecvRtt] = useState(0);

    const [sendPeerIP, setSendPeerIP] = useState("");
    const [sendUptime, setSendUptime] = useState("0:00:00:00");
    const [sendBandwidth, setSendBandwidth] = useState("0 Mbs");
    const [sendBitRate, setSendBitRate] = useState(0);
    const [sendRtt, setSendRtt] = useState(0);

    //srt details
    const [recvLatency, setRecvLatency] = useState(0);
    const [recvBufferSize, setRecvBufferSize] = useState(0);
    const [recvRetransmittedTotal, setRecvRetransmittedTotal] = useState(0);
    const [recvBelatedTotal, setRecvBelatedTotal] = useState(0);

    const [sendLatency, setSendLatency] = useState(0);
    const [sendRetransmittedTotal, setSendRetransmittedTotal] = useState(0);
    const [InputportData, setInputportData] = useState(props.inputport);
    const [showircode, setshowircode] = useState(false);
    const [ircode, setircode] = useState(props.ircode);
    const [remoteType, setremoteType] = useState(props.remoteType);
    const [presetOptimization, setPresetOptimization] = useState(props.presetOptimization);
    const [srtOptimization, setSrtOptimization] = useState(props.srtOptimization);

    const [allHotBackupIPs, setAllHotBackupIPs] = useState([]);
    const [editedSpareIp, setEditedSpareIp] = useState('');
    const [selectedOption, setSelectedOption] = useState({});
    const [warningmessags, setWarningmessags] = useState([]);
    const [thread, setThread] = useState(false);
    const [spareIpPassword, setSpareIpPassword] = useState('');

    let selectedTimezone = 0;

    useEffect(() => {
        setWarningmessags(props.warningMessages);
        if (props.warningMessages.length > 0 && warningmessags.length === 0) {
            props.getAllDevices()
        }
    }, [props.warningMessages])

    useEffect(() => {
        if (props.peerip) {
        } else {
            setTimeout(() => {
                if (props.peerip === undefined) {
                    clearInterval(streamStatsInterval);
                }
                if (props.encoderId === "") {
                    clearInterval(streamStatsInterval);
                }
            }, 2000);
        }
    }, [props.peerip]);

    useEffect(() => {
        setshowircode(false);
        setPresetOptimization(props.presetOptimization);
        setEncoderBackup(props.hotBackup);
        setSrtOptimization(props.srtOptimization);
    }, [props.model, props.presetOptimization, props.srtOptimization]);

    useEffect(() => {
        if (props !== undefined && props.ircode !== undefined) {
            setircode(props.ircode);
        }
        if (props !== undefined && props.remotetype !== undefined) {
            setremoteType(props.remotetype);
        }
        if (props !== undefined && props.inputport !== undefined) {
            setInputportData(props.inputport);
        }

    }, [props.ircode, props.remotetype, props.inputport])

    useEffect(() => {
        clearInterval(streamStatsInterval);
        setRecvPacketStats(0);
        setRecvPacketLost(0);
        setRecvPacketDropped(0);
        setSendPacketLost(0);
        setSendPacketDropped(0);
        setSendPacketStats(0);
        setSendBitRate(0);
        setSendRtt(0);
        setRecvBitRate(0);
        setRecvLatency(0);
        setRecvBufferSize(0);
        setRecvRetransmittedTotal(0);
        setRecvBelatedTotal(0);
        setSendLatency(0);
        setSendRetransmittedTotal(0);
        setRecvPeerIP("");
        setRecvUptime("0:00:00:00");
        setRecvBandwidth("0 Mbs");
        setRecvRtt(0);
        setSendUptime("0:00:00:00");
        setSendBandwidth("0 Mbs");
        setLinkEfficiency('');
        setDropPackets('');
        changePacketStats(props.encoderId);
        streamStatsInterval = setInterval(() => {
        }, Number.parseInt(props.callInterval) * 1000);

        return () => {
            clearInterval(streamStatsInterval);
        };
    }, [props.encoderindex, props.ip]);
    useEffect(() => {
        if (props.checkStreamsStatsRefresh) {
            changePacketStats(props.encoderId);
        }
    }, [props.checkStreamsStatsRefresh])
    const hotBackupList = async () => {
        let data = {
            peerIP: props.peerip
        }
        if (props.model) {
            let allHotBackupIPs = await httpService.CreateUpdate("getAllHotBackupIp", data).then(res => res.data);
            let backupIPs = [];
            for (let i = 0; i < allHotBackupIPs.length; i++) {
                let data = {
                    value: allHotBackupIPs[i].SpareIp,
                    label: allHotBackupIPs[i].SpareIp
                }
                backupIPs.push(data);
            }
            setAllHotBackupIPs(backupIPs);
        }
    }
    useEffect(() => {
        hotBackupList();
    }, [props.peerip, props.model])
    const changePacketStats = async (Id) => {
        if (props.encoderId === '') return;
        if (Id === "" || props.ip === undefined || props.ip === null) return;
        let data = {
            Id: Id,
            ip: props.ip.split(":")[0],
        };
        let res = await VCDMSservice.getByBoj("getdevicestreamstats", data).then(
            (res) => res.data[0]
        );
        props.setCheckStreamsStatsRefresh(false);
        if (props.peerip === undefined) {
            setRecvPacketStats(0);
            setRecvPacketLost(0);
            setRecvPacketDropped(0);
            setSendPacketLost(0);
            setSendPacketDropped(0);
            setSendPacketStats(0);
            setSendBitRate(0);
            setSendRtt(0);
            setRecvLatency(0);
            setRecvBufferSize(0);
            setRecvRetransmittedTotal(0);
            setRecvBelatedTotal(0);
            setSendLatency(0);
            setSendRetransmittedTotal(0);
            setRecvPeerIP("");
            setRecvUptime("0:00:00:00");
            setRecvBandwidth("0 Mbs");
            setSendUptime("0:00:00:00");
            setSendBandwidth("0 Mbs");
            setDropPackets('');
            setLinkEfficiency('');
            return;
        }
        if (
            res !== undefined &&
            res !== null &&
            Object.keys(res.inputStats).length !== 0 &&
            res.inputStats !== null &&
            res.inputStats !== undefined &&
            res.inputStats.recv !== undefined &&
            res.inputStats.recv !== null
        ) {
            if (res.inputStats.recv !== undefined) {

                //calculating packet loss and LinkEfficiency
                const calculatedValue = calculatePacketLoss(res.inputStats);
                setDropPackets(calculatedValue.lossPackets);
                setLinkEfficiency(calculatedValue.linkEfficiency);
                setRecvPacketStats(res.inputStats.recv.packetsTotal);
                setRecvPacketLost(res.inputStats.recv.packetsLostTotal);
                setRecvPacketDropped(res.inputStats.recv.packetsDroppedTotal);
                // setRecvPacketBelated(res.inputStats.recv.packetsBelated);
                setRecvBitRate(res.inputStats.recv.mbitRate);
                setRecvBufferSize(res.inputStats.recv.bufferMs);
                setRecvRetransmittedTotal(
                    res.inputStats.recv.packetsRetransmittedTotal
                );
                // setRecvBelatedAvg(res.inputStats.recv.packetsBelatedAverageTime);
                setRecvBelatedTotal(res.inputStats.recv.packetsBelatedTotal);
            } else {
                setRecvPacketStats(0);
                setRecvPacketLost(0);
                setRecvPacketDropped(0);
                setRecvBitRate(0);
                setRecvRetransmittedTotal(0);
                setRecvBelatedTotal(0);
            }

            if (res.inputStats !== undefined) {
                setRecvPeerIP(res.inputStats.peerIP.split(":")[0]);
            } else {
                setRecvPeerIP("");
            }
            if (res.inputStats.send !== undefined) {
                setSendRetransmittedTotal(
                    res.inputStats.send.packetsRetransmittedTotal
                );
            } else {
                setSendRetransmittedTotal("");
            }
            if (res.inputStats.link !== undefined) {
                setRecvUptime(msToTime(res.inputStats.time));
                setRecvBandwidth(res.inputStats.link.bandwidth + " Mbs");
                setRecvRtt(res.inputStats.link.rtt);
                setRecvLatency(res.inputStats.link.latency);
            } else {
                setRecvUptime("0:00:00:00");
                setRecvBandwidth("0 Mbs");
                setRecvRtt(0);
                setRecvLatency(0);
            }
        } else {
            setRecvPacketStats(0);
            setRecvPacketLost(0);
            setRecvPacketDropped(0);
            setRecvLatency(0);
            setRecvBufferSize(0);
            setRecvRetransmittedTotal(0);
            setRecvBelatedTotal(0);
            setRecvPeerIP("");
            setRecvUptime("0:00:00:00");
            setRecvBandwidth("0 Mbs");
            setRecvBitRate(0);
            setRecvRtt(0);
            setDropPackets('');
            setLinkEfficiency('');
        }

        if (res !== undefined &&
            res !== null &&
            Object.keys(res.outputStats).length !== 0 &&
            res.outputStats !== null &&
            res.outputStats !== undefined &&
            res.outputStats.send !== undefined &&
            res.outputStats.send !== null) {
            if (res.outputStats.send !== undefined) {
                setSendPacketStats(res.outputStats.send.packetsTotal);
                setSendPacketDropped(res.outputStats.send.packetsDroppedTotal);
                setSendPacketLost(res.outputStats.send.packetsLostTotal);
                setSendBitRate(res.outputStats.send.mbitRate);
            } else {
                setSendPacketStats(0);
                setSendPacketDropped(0);
                setSendPacketLost(0);
                setSendBitRate(0);
            }
            if (res.outputStats !== undefined) {
                setSendPeerIP(res.outputStats.peerIP);
            } else {
                setSendPeerIP("");
            }
            if (res.outputStats.link !== undefined) {
                setSendUptime(msToTime(res.outputStats.time));
                setSendBandwidth(res.outputStats.link.bandwidth + " Mbs");
                setSendRtt(res.outputStats.link.rtt);
                setSendLatency(res.outputStats.link.latency);
            } else {
                setSendUptime("0:00:00:00");
                setSendBandwidth("0 Mbs");
                setSendRtt(0);
                setSendLatency(0);
            }
        }
        else {
            setSendPacketLost(0);
            setSendPacketDropped(0);
            setSendPacketStats(0);
            setSendBitRate(0);
            setSendRtt(0);
            setSendLatency(0);
            setSendRetransmittedTotal(0);
            setSendUptime("0:00:00:00");
            setSendBandwidth("0 Mbs");
        }
    };

    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor(duration / (1000 * 60 * 60 * 24));
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return days + ":" + hours + ":" + minutes + ":" + seconds;
    }

    const getFlooredFixed = (v) => {
        return (Math.floor(v * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
    }

    const calculatePacketLoss = (inputStats) => {
        let calclossPackets = (Number.parseFloat((inputStats["recv"]["packetsDroppedTotal"]).toFixed(2)) / (Number.parseFloat((inputStats['recv']["packetsDroppedTotal"]).toFixed(2)) + Number.parseFloat((inputStats["recv"]["packetsTotal"]).toFixed(2)))) * 100;
        let calclinkEfficiency = (Number.parseFloat((inputStats["recv"]["packetsTotal"]).toFixed(2)) / (Number.parseFloat((inputStats['recv']["packetsBelatedTotal"]).toFixed(2)) + Number.parseFloat((inputStats["recv"]["packetsTotal"]).toFixed(2)) + Number.parseFloat((inputStats["recv"]["packetsRetransmittedTotal"]).toFixed(2)))) * 100;
        let lossPackets = getFlooredFixed(calclossPackets);
        let linkEfficiency = getFlooredFixed(calclinkEfficiency);
        return { lossPackets, linkEfficiency }
    }

    useEffect(() => {
        setEncoder1Status(
            props.status
                ? props.status.status === ""
                    ? "NA"
                    : props.status.status
                : "NA"
        );
    }, [props.status]);

    useEffect(() => {
        setLinkEfficiency("");
        setDropPackets("");
    }, [props.encoderindex]);

    useEffect(() => {
        if (props.ellvisList.length === 0) return;
        getcheckBoxStatus();
    }, [props.peerip, props.ellvisList.length, props.encoderId]);


    useEffect(async () => {
        getGraphData();
        getGraphDataSend();

        let getElvisIndex = localStorage.getItem("elvisIndex") == null ? props.ellvisindex : localStorage.getItem("elvisIndex");
        let isSavedHistory =
            props.ellvisList.length !== 0 &&
                props.ellvisindex !== undefined &&
                props.deviceList[getElvisIndex].DeviceType === "ELLVIS9000V3"
                ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                    props.encoderindex
                ].isSavedHistory
                : false;
        clearInterval(graphInterval);
        if (props.encoderId !== '' && isSavedHistory === true) {
            graphInterval = setInterval(() => {

                if (thread == false) {
                    setThread(true)
                    return;
                } else {
                    getGraphData();
                    getGraphDataSend();
                }
            }, 60000);
        }

        return () => {
            clearInterval(graphInterval);
        };
    }, [props.encoderId]);

    const getGraphData = async () => {
        let returnData = await VCDMSservice.getByBoj("gettimezone");
        selectedTimezone = returnData.data.offset;
        let data = {
            ContainerId: props.encoderId,
        };

        let res = await VCDMSservice.getByBoj("getgraphdata", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (res) {
            let dataArrayBandwidth = [];
            let dataArrayMbitrate = [];
            let dataArrayRTT = [];
            let dataArrayPackets = [];
            let dataArrayPacketsLost = [];
            let dataArrayPacketsDropped = [];
            let dataArrayReTransmittedPackets = [];
            let dataArrayBelatedPackets = [];

            for (let i = 0; i < res.length; i++) {
                dataArrayBandwidth.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].Bandwidth.recv),
                });
                dataArrayMbitrate.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(
                        res[i].MBitRate !== undefined ? res[i].MBitRate.recv : 0
                    ),
                });
                dataArrayRTT.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].RTT.recv),
                });
                dataArrayPackets.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].Packets.recv),
                });
                dataArrayPacketsLost.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].PacketsLost.recv),
                });
                dataArrayPacketsDropped.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].PacketsDropped.recv),
                });
                dataArrayReTransmittedPackets.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].ReTransmittedPackets.recv),
                });
                dataArrayBelatedPackets.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].BelatedPackets),
                });
            }

            dataArrayBandwidth.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayMbitrate.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayRTT.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPackets.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPacketsLost.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPacketsDropped.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayReTransmittedPackets.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayBelatedPackets.sort((a, b) => {
                return b.x - a.x;
            });

            let bandwidth = {
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Bandwidth-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "Bandwidth",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        shared: true,
                        onDatasetHover: {
                            highlightDataSeries: false,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
                series: [
                    {
                        name: "Bandwidth",
                        data: dataArrayBandwidth,
                    },
                    {
                        name: "mBitRate",
                        data: dataArrayMbitrate,
                    },
                ],
            };

            let packets = {
                series: [
                    {
                        name: "Packets",
                        data: dataArrayPackets,
                    },
                    {
                        name: "Lost",
                        data: dataArrayPacketsLost,
                    },
                    {
                        name: "Dropped",
                        data: dataArrayPacketsDropped,
                    },
                    {
                        name: "Retransmitted",
                        data: dataArrayReTransmittedPackets,
                    },
                    {
                        name: "Belated",
                        data: dataArrayBelatedPackets,
                    },
                ],
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Packet-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "Packets",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        shared: true,
                        // // enabledOnSeries: undefined,
                        // shared: false,
                        onDatasetHover: {
                            highlightDataSeries: true,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
            };

            let rtt = {
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Rtt-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "RTT",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        shared: false,
                        onDatasetHover: {
                            highlightDataSeries: false,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
                series: [
                    {
                        name: "RTT",
                        data: dataArrayRTT,
                    },
                ],
            };

            setBandwidthGraph(bandwidth);
            setPacketsGraph(packets);
            setRttGraph(rtt);
        }
    };
    const getGraphDataSend = async () => {
        let returnData = await VCDMSservice.getByBoj("gettimezone");
        selectedTimezone = returnData.data.offset;
        let data = {
            ContainerId: props.encoderId,
        };
        let res = await VCDMSservice.getByBoj("getgraphdata", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (res) {
            let dataArrayBandwidthSend = [];
            let dataArrayMbitrateSend = [];
            let dataArrayRTTSend = [];
            let dataArrayPacketsSend = [];
            let dataArrayPacketsLostSend = [];
            let dataArrayPacketsDroppedSend = [];
            let dataArrayReTransmittedPacketsSend = [];
            let dataArrayBelatedPacketsSend = [];

            for (let i = 0; i < res.length; i++) {
                dataArrayBandwidthSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].Bandwidth.send),
                });
                dataArrayMbitrateSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(
                        res[i].MBitRate !== undefined ? res[i].MBitRate.send : 0
                    ),
                });
                dataArrayRTTSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].RTT.send),
                });
                dataArrayPacketsSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].Packets.send),
                });
                dataArrayPacketsLostSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].PacketsLost.send),
                });
                dataArrayPacketsDroppedSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].PacketsDropped.send),
                });
                dataArrayReTransmittedPacketsSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].ReTransmittedPackets.send),
                });
                dataArrayBelatedPacketsSend.push({
                    x: new Date(res[i].OurDate).getTime() + selectedTimezone * 3600000,
                    y: Number.parseFloat(res[i].BelatedPackets),
                });
            }

            dataArrayBandwidthSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayMbitrateSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayRTTSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPacketsSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPacketsLostSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayPacketsDroppedSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayReTransmittedPacketsSend.sort((a, b) => {
                return b.x - a.x;
            });
            dataArrayBelatedPacketsSend.sort((a, b) => {
                return b.x - a.x;
            });

            let bandwidth = {
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Bandwidth-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "Bandwidth",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        shared: true,
                        onDatasetHover: {
                            highlightDataSeries: false,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
                series: [
                    {
                        name: "Bandwidth",
                        data: dataArrayBandwidthSend,
                    },
                    {
                        name: "mBitRate",
                        data: dataArrayMbitrateSend,
                    },
                ],
            };

            let packets = {
                series: [
                    {
                        name: "Packets",
                        data: dataArrayPacketsSend,
                    },
                    {
                        name: "Lost",
                        data: dataArrayPacketsLostSend,
                    },
                    {
                        name: "Dropped",
                        data: dataArrayPacketsDroppedSend,
                    },
                    {
                        name: "Retransmitted",
                        data: dataArrayReTransmittedPacketsSend,
                    },
                    {
                        name: "Belated",
                        data: dataArrayBelatedPacketsSend,
                    },
                ],
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Packet-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "Packets",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        shared: true,
                        // // enabledOnSeries: undefined,
                        // shared: false,
                        onDatasetHover: {
                            highlightDataSeries: true,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
            };

            let rtt = {
                options: {
                    chart: {
                        width: "100%",
                        autoScaleYaxis: true,
                        id: "Rtt-chart",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350,
                            },
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                                customIcons: [],
                            },
                            export: {
                                csv: {
                                    columnDelimiter: ",",
                                    headerCategory: "Date/Time",
                                    dateFormatter(timestamp) {
                                        return new Date(timestamp).toUTCString().substring(0, 25);
                                    },
                                },
                                svg: {
                                    filename: undefined,
                                },
                                png: {
                                    filename: undefined,
                                },
                            },
                            autoSelected: "zoom",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    title: {
                        text: "RTT",
                        align: "left",
                        margin: 10,
                        offsetX: 0,
                        offsetY: 0,
                        floating: false,
                        style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "#263238",
                        },
                    },
                    tooltip: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        shared: false,
                        onDatasetHover: {
                            highlightDataSeries: false,
                        },
                        x: {
                            show: true,
                            format: "ddd, dd MMM yyyy HH:mm:ss ",
                        },
                        fixed: {
                            enabled: false,
                            position: "bottomRight",
                        },
                    },
                },
                series: [
                    {
                        name: "RTT",
                        data: dataArrayRTTSend,
                    },
                ],
            };

            setBandwidthGraphSend(bandwidth);
            setPacketsGraphSend(packets);
            setRttGraphSend(rtt);
        }
    };

    const getcheckBoxStatus = () => {
        if (props.encoderId !== '') {
            let getElvisIndex = localStorage.getItem("elvisIndex") == null ? props.ellvisindex : localStorage.getItem("elvisIndex");
            let isSavedHistory =
                props.ellvisList.length !== 0 &&
                    props.ellvisindex !== undefined &&
                    props.deviceList[getElvisIndex].DeviceType === "ELLVIS9000V3"
                    ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                        props.encoderindex
                    ].isSavedHistory
                    : false;

            if (props.updateEncoderDashboardCheckbox) {
                if (isSavedHistory) {
                    let x = document.getElementById("savehistory");
                    x.checked = true;
                    props.setSaveHistoryCheckbox(true);
                } else {
                    let x = document.getElementById("savehistory");
                    x.checked = false;
                    props.setSaveHistoryCheckbox(false);
                }
            }
        }
    };

    const startClickHandler = async (event, type) => {
        event.preventDefault();
        setLoading(true);
        let data = {
            ip: props.ellvisList[props.ellvisindex].deviceip,
            Id: props.encoderId,
        };

        let res = await VCDMSservice.CreateUpdate("startcontainer", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (res === "Stream successfully created!") {
        } else {
            ErrorMessage("Cannot start the stream");
        }
        setLoading(false);
    };
    const saveInputPort = async (event) => {
        event.preventDefault();
        setLoading(true);
        let data = {
            ip: props.peerip,
            inputport: InputportData
        };
        if (!InputportData) {
            ErrorMessage("Please select Input Port");
            return;
        }
        let res = await VCDMSservice.CreateUpdate("checkPort", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (!res) {
            ErrorMessage("Error occurred");
            return;
        }
        if (res.status === "success") {
            setshowircode(true);
            SuccessMessage("Input Port data sent");
        } else {
            ErrorMessage("Cannot send the input port");
        }
        setLoading(false);
    };
    const saveircode = async (event) => {
        event.preventDefault();
        setLoading(true);
        let data = {
            ip: props.peerip,
            remotetype: remoteType,
            ircode: ircode
        };

        let res = await VCDMSservice.CreateUpdate("checkIRcode", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (!res) {
            ErrorMessage("Error occurred");
            return;
        }
        if (res.status === "success") {
            SuccessMessage("IR Code data sent");
        } else {
            ErrorMessage("Cannot send the ircode");
        }
        setLoading(false);
    };

    const stopClickHandler = async (event, type) => {
        event.preventDefault();
        setLoading(true);
        let data = {
            ip: props.ellvisList[props.ellvisindex].deviceip,
            Id: props.encoderId,
        };

        let res = await VCDMSservice.CreateUpdate("stopcontainer", data)
            .then((res) => res.data)
            .catch((err) => { return });
        if (res === undefined) {
            ErrorMessage("Cannot Stop the Stream");
        }
        await changePacketStats(props.encoderId);
        setLoading(false);
    };
    const automatedWorkFlowChangeHandler = async (event, type) => {
        let data = {};
        if (type === "srtOptimization") {
            if (srtOptimization === true) {
                setSrtOptimization(false);
            } else { setSrtOptimization(true); }

            data = {
                ip: props.peerip,
                srtOptimization: event.target.checked ? true : false,
                presetOptimization: props.presetOptimization
            };
        }
        if (type === "presetOptimization") {
            if (presetOptimization === true) {
                setPresetOptimization(false);
            } else { setPresetOptimization(true); }

            data = {
                ip: props.peerip,
                presetOptimization: event.target.checked ? true : false,
                srtOptimization: props.srtOptimization,

            };
        }
        let res = await VCDMSservice.getByBoj("setautomatedworkflow", data)
            .then((res) => res.data)
            .catch((err) => {
                return null;
            });
        if (res) {
        } else {
            // setPresetOptimization(false)
        }
        props.getProperties();
        props.getAllDevices();
    }

    const remoceWarningMessages = async (index, props) => {
        let messagesArray = [...warningmessags]
        for (let i = 0; i < messagesArray.length; i++) {
            if (messagesArray[i] === messagesArray[index]) {
                messagesArray.splice(i, 1);
            }
        }
        setWarningmessags(messagesArray);
        let data = {
            ip: props.peerip,
            messages: messagesArray,
        }
        let res = await VCDMSservice.getByBoj("deleteWarningMessages", data)
            .then((res) => res)
            .catch((err) => {
                return null;
            });
        if (res.data && res.data.ack === '1') {
            props.getProperties();
        }
    }

    const handleChange = async () => {
        let isChecked = !props.saveHistoryCheckbox;
        let data = {
            _id: props.ellvisList[props.ellvisindex].ConnectedDevice[
                props.encoderindex
            ]._id,
            isSavedHistory: isChecked,
        };
        let res = await VCDMSservice.getByBoj("savehistory", data)
            .then((res) => res.data)
            .catch((err) => {
                return null;
            });
        if (res) {
            if (res.ack === "1") {
                props.fetchEllvisList();
                return;
            } else {
                props.setSaveHistoryCheckbox(!isChecked);
            }
        } else {
            props.setSaveHistoryCheckbox(!isChecked);
        }

    };

    const handleEditClick = (event) => {
        const value =
            props.ellvisList.length !== 0 &&
            props.ellvisindex !== undefined &&
            props.ellvisList[props.ellvisindex].ConnectedDevice[props.encoderindex];
        props.setUpdate(true);
        props.setClickedStream(value);
    };

    const getColor = () => {
        const value =
            props.ellvisList.length > 0 &&
                props.ellvisindex !== undefined &&
                props.ellvisList[props.ellvisindex].ConnectedDevice.length > 0
                ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                props.encoderindex
                ]
                : { status: "disconnected" };
        if (value.MailStatus === "connected") {
            return "one";
        }
        if (value.MailStatus === "disconnected") {
            return "two";
        }
        if (value.MailStatus === "not running") {
            return "";
        }
        if (value.MailStatus === "major") {
            return "three";
        }
    };
    const encoderHotBackUp = async (event) => {
        // event.preventDefault();
        if (event.target.checked) {
            setEncoderBackup(true)
            let data = { isChecked: true, ip: props.peerip }
            await httpService.CreateUpdate("sethotbackup", data).catch(err => console.log(err));
            setEditedSpareIp('');
            setIsEditHotBackupIp(false);
            props.getProperties()
            hotBackupList();
        }
        else {
            const result = window.confirm("If you disable encoder backup, you will lose all backup IP's, do you want to proceed?");
            if (result) {
                setEncoderBackup(false)
                let data = { isChecked: false, ip: props.peerip }
                await httpService.CreateUpdate("sethotbackup", data).catch(err => console.log(err));
                setEditedSpareIp('');
                setIsEditHotBackupIp(false);
                setSelectedOption({});
                props.getProperties()
                hotBackupList();
            }
        }
    }
    const handelHotBackupChange = (editedSpareIp) => {
        setSelectedOption(editedSpareIp);
        setEditedSpareIp(editedSpareIp.value);
    }
    const SaveHotBackupIPs = async (e) => {
        e.preventDefault();
        if (editedSpareIp.length === 0) {
            ErrorMessage("Please select IPs");
            return;
        }
        let data = {
            spareIP: editedSpareIp,
            ip: props.peerip
        }
        let res = await httpService.CreateUpdate("svaeSpareUnitIpForEnc", data).then(res => res.data).catch(err => console.log(err));
        if (res && res.ack === '1') {
            SuccessMessage("Save Successfully");
            props.getProperties()
            hotBackupList();
            setEditedSpareIp('');
            setIsEditHotBackupIp(false);
        }
        else {
            ErrorMessage("Something went wrong");
            props.getProperties()
            hotBackupList();
        }
        setEditedSpareIp('');
    }
    const SaveEditedHotBackupIP = async (e) => {
        e.preventDefault();
        if (editedSpareIp === '' || editedSpareIp.length < 7) {
            ErrorMessage("Please enter a valid Hot Spare Ip");
        }

        let data = {
            spareIp: editedSpareIp,
            password: spareIpPassword,
            peerIP: props.peerip
        }
        let res = await httpService.CreateUpdate('editSpareIpForEnc', data).catch(err => console.log(err));
        if (res.data.ack === '1') {
            SuccessMessage("Successfully Updated Hot Backup IP");
            setEditedSpareIp('');
            setIsEditHotBackupIp(false);
            setSpareIpPassword('');
            props.getProperties()
            hotBackupList();
        }
        else if (res.data.ack === '0') {
            ErrorMessage("Please check IP or Password");
        }
    }

    const deleteHotIP = async (spareIp) => {
        const result = window.confirm("Are you sure you want to delete this IP?");
        if (result) {
            let data = { ip: props.peerip, spareIP: spareIp }
            let res = await httpService.CreateUpdate("deleteSpareIp", data).catch(err => console.log(err));
            setEditedSpareIp('');
            setSelectedOption({});
            props.getProperties();
            hotBackupList();
        }
    }
    const EditHotBackupIP = async (spareIp) => {
        const result = window.confirm("Are you sure, you want to Edit this IP?");
        if (result) {
            setIsEditHotBackupIp(true);
            setEditedSpareIp(spareIp);
        }
    }
    const getEncoderStatus = (encoding) => {
        if (encoding) {
            let list = {
                5: { message: "NA", classname: "enc-status-inside-black" },
                0: { message: "Idle", classname: "enc-status-inside-black" },
                1: {
                    message: "Loading and Checking Parameters",
                    classname: "enc-status-inside-black",
                },
                2: { message: "Valid video Input", classname: "enc-status-inside-blue" },
                3: { message: "Running", classname: "enc-status-inside-green" },
                4: { message: "Error", classname: "enc-status-inside-red" },
            };

            return (
                <span className={list[encoding]["classname"]}>
                    {list[encoding]["message"]}
                </span>
            );
        }

    };


    const getVideoStatus = (model, enc_no) => {
        for (let i = 1; i <= Number.parseInt(props.properties1.encoder_count); i++) {
            if (i === enc_no && props.properties1) {
                if (model.includes('RM11') || model.includes('VL4510H')) {
                    return (
                        <>
                            <span>Source: HDMI</span><br />
                            <span>Frame Rate(fps): {props.properties1[`input_framerate`] ? (props.properties1[`input_framerate`]).replace('_', '-') : 'NA'}</span><br />
                            <span>Resolution: {props.properties1[`input_resolution`] ? (props.properties1[`input_resolution`]).replace('_', 'x') : 'NA'}</span><br />
                        </>
                    )
                }
                else if (model.includes('VL45')) {
                    let sourceMsg = '';
                    // if (model === 'VL4510H') { sourceMsg = "Source: HDMI"; }
                    if (model.includes('VL4510')) { sourceMsg = "Source: SDI"; }
                    else if (model.substring(0, 6) === 'VL4522') { sourceMsg = "Source: SDI1 and SDI2"; }
                    else { sourceMsg = "Source: HDMI"; }
                    return (
                        <>
                            <span>{sourceMsg}</span><br />
                            <span>Frame Rate(fps): {props.properties1[`input${i}_framerate`] ? (props.properties1[`input${i}_framerate`]) : 'NA'}</span><br />
                            <span>Resolution: {props.properties1[`input${i}_resolution`] ? (props.properties1[`input${i}_resolution`]).replace('_', 'x') : 'NA'}</span><br />
                        </>
                    )
                }
            }
        }
        return (
            <span>
                NA
            </span>
        );
    };

    let top = <div></div>;
    let encoder_one = <div></div>
    let encoder_two = <div></div>
    let encoder_three = <div></div>;
    let encoder_four = <div></div>;

    let input_stream = <div></div>;
    let video_one_sourse = <div></div>;
    let video_two_sourse = <div></div>;
    let video_three_sourse = <div></div>;
    let video_four_sourse = <div></div>;

    let audio_one_sourse = <div></div>;

    audio_one_sourse = (
        <div className="col">
            <div className="encoder-status-card">
                <h6 className="mb-2">Audio-1 Status:</h6>
                <p className="input-status-desc">
                    <span className="">Source: {props.properties.audio1_source}</span><br />
                    <span>Sample Rate(Hz): {props.properties.audio1_samplerate}</span>
                </p>
            </div>
        </div>
    )
    if (props.deviceList.length > 0) {
        if (props.deviceindex !== undefined) {
            if (
                props.deviceList[props.deviceindex].DeviceType !== "ELLVIS9000V3" ||
                (props.ellvisList.length > 0 &&
                    props.ellvisindex !== undefined &&
                    props.ellvisList[props.ellvisindex].ConnectedDevice &&
                    props.encoderindex !== undefined &&
                    props.ellvisList[props.ellvisindex].ConnectedDevice[
                        props.encoderindex
                    ].IsEncoderNeeded !== undefined &&
                    props.ellvisList[props.ellvisindex].ConnectedDevice[
                        props.encoderindex
                    ].IsEncoderNeeded !== false && (props.ellvisList[props.ellvisindex].ConnectedDevice[props.encoderindex].properties === null && props.ellvisList[props.ellvisindex].ConnectedDevice[props.encoderindex].properties.model === "ghyhy"))
            ) {


                video_one_sourse = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <h6 className="mb-2">Video-1 Status:</h6>
                            <p className="input-status-desc">
                                <span className="">
                                    {getVideoStatus(
                                        props.status ? props.properties1.model : "", 1
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                )
                video_two_sourse = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <h6 className="mb-2">Video-2 Status:</h6>
                            <p className="input-status-desc">
                                <span className="">
                                    {getVideoStatus(
                                        props.status ? props.properties1.model : "", 2
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                )
                video_three_sourse = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <h6 className="mb-2">Video-3 Status:</h6>
                            <p className="input-status-desc">
                                <span className="">
                                    {getVideoStatus(
                                        props.status ? props.properties1.model : "", 3
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                )
                video_four_sourse = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <h6 className="mb-2">Video-4 Status:</h6>
                            <p className="input-status-desc">
                                <span className="">
                                    {getVideoStatus(
                                        props.status ? props.properties1.model : "", 4
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                )
                encoder_one = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <div className="disk-plat-heading5">Encoder-1 Status: </div>
                            <div className="disk-plat-heading2">
                                <span className="">
                                    {getEncoderStatus(
                                        props.status ? props.status.encoder1_status : 5
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )
                encoder_two = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <div className="disk-plat-heading5">Encoder-2 Status: </div>
                            <div className="disk-plat-heading2">
                                <span className="">
                                    {getEncoderStatus(
                                        props.status ? props.status.encoder2_status : 5
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                )
                encoder_three = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <div className="disk-plat-heading5">Encoder-3 Status: </div>
                            <div className="disk-plat-heading2">
                                <span className="">
                                    {getEncoderStatus(
                                        props.status ? (props.status.encoder3_status ? props.status.encoder3_status : 5) : 5
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                )

                encoder_four = (
                    <div className="col">
                        <div className="encoder-status-card">
                            <div className="disk-plat-heading5">Encoder-4 Status: </div>
                            <div className="disk-plat-heading2">
                                <span className="">
                                    {getEncoderStatus(
                                        props.status ? (props.status.encoder4_status ? props.status.encoder4_status : 5) : 5
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )
                top = (
                    <div className="py-custom">
                        <div className="form-boxdiv encoder-status-box">
                            <div className="form-boxtopline5">Encoder Status</div>

                            <div className="form-boxtopcont user-form form-boxcontent p-0">
                                <div className="row m-0">
                                    {props.status.encoder_count >= 1 ? encoder_one : ""}
                                    {props.status.encoder_count >= 2 ? encoder_two : ""}
                                    {props.status.encoder_count >= 3 ? encoder_three : ""}
                                    {props.status.encoder_count >= 4 ? encoder_four : ""}

                                    <div className="col">
                                        <div className="encoder-status-card">
                                            <div className="disk-plat-heading5"> Opstate: </div>
                                            <div className="disk-plat-heading2">
                                                <span
                                                    className={
                                                        props.running === true
                                                            ? "enc-status-inside-green"
                                                            : "enc-status-inside-black"
                                                    }
                                                >
                                                    {props.status ? props.status.opstate === "" ? "NA" : props.status.opstate : "NA"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    {props.model.includes("RM1121CXF") ? <div className="col">
                                        <div className="encoder-status-card">
                                            <div className="disk-plat-heading5"> RTSP State: </div>
                                            <div className="disk-plat-heading2">
                                                <span
                                                    className={
                                                        props.running === true || props.status.rtsp_state === "Running"
                                                            ? "enc-status-inside-green"
                                                            : "enc-status-inside-black"
                                                    }
                                                >
                                                    {props.status ? props.status.rtsp_state === "" ? "NA" : props.status.rtsp_state : "NA"}
                                                </span>
                                            </div>
                                        </div>
                                    </div> : ""}

                                    <div className="col">
                                        <div className="encoder-status-card">
                                            <div className="disk-plat-heading5">Status:</div>
                                            <div className="disk-plat-heading2">
                                                <span
                                                    className={
                                                        encoder1Status === "active"
                                                            ? "enc-status-inside-green"
                                                            : encoder1Status === "error"
                                                                ? "enc-status-inside-red"
                                                                : "enc-status-inside-black"
                                                    }
                                                >
                                                    {encoder1Status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="clear"></div>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="py-custom">
                            <div className="form-boxdiv input-status-box">
                                <div className="form-boxtopline5">Input Status</div>
                                <div className="form-boxtopcont user-form form-boxcontent p-0">
                                    <div className="row m-0">
                                        {props.status.encoder_count >= 1 && video_one_sourse}
                                        {props.properties.model.includes("RM1121CXF") && audio_one_sourse}
                                        {props.status.encoder_count >= 2 && video_two_sourse}
                                        {props.status.encoder_count >= 3 && video_three_sourse}
                                        {props.status.encoder_count >= 4 && video_four_sourse}

                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        {!props.properties.model.includes("RM1121CXF") && props.deviceList[props.deviceindex].Region !== 'OnBoardingRegion' ?
                            <div className="py-custom">
                                <div className="form-boxdiv">
                                    <div className="form-boxtopline5">Automated WorkFlow</div>
                                    <div className="form-boxtopcont user-form">
                                        <div className="row">
                                            {/* <div className="col-sm-6">
                                    <label className="form-check-label">Srt</label>
                                    <input
                                        type="checkbox"
                                        className="enc-checkbox"
                                        checked={srtOptimization}
                                        disabled={
                                            props.customerData.Role === "Operator" ? true : false
                                        }
                                        onChange={(event) => {
                                            automatedWorkFlowChangeHandler(event, "srtOptimization")
                                        }}
                                    />
                                </div> */}
                                            <div className="col-sm-6">
                                                <label className="form-check-label">Preset Optimization</label>
                                                <input
                                                    type="checkbox"
                                                    className="enc-checkbox"
                                                    checked={presetOptimization}
                                                    disabled={
                                                        props.customerData.Role === "Operator" ? true : false
                                                    }
                                                    onChange={(event) => {
                                                        automatedWorkFlowChangeHandler(event, "presetOptimization");
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                            : <></>
                        }

                        {props.presetOptimization ? (
                            <div className="py-custom warnings-box">
                                <div className="form-boxdiv">
                                    <div className="form-boxtopline5">Warning Messages</div>
                                    <div className="form-boxtopcont user-form">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {warningmessags ? warningmessags.map((msg, index) => {
                                                    return (
                                                        <div className="alert alert-warning alert-dismissable">

                                                            <div className="d-flex align-items-center">
                                                                <i className="fa fa-exclamation-triangle" />
                                                                <p>{msg}</p>
                                                            </div>
                                                            <button type="button" class="close" onClick={() => { remoceWarningMessages(index, props) }}>&times;</button>
                                                        </div>
                                                    )
                                                }) : ""}

                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        ) : ('')}


                        {props.spareIps && props.hotBackup ? <div className="py-custom">
                            <div className="form-boxdiv input-status-box">
                                <div className="form-boxtopline5">Available Hot Backup IP's</div>
                                <div className="form-boxtopcont user-form form-boxcontent p-0 m-2">
                                    <div className="col m-0">
                                        <div className="row">
                                            {
                                                // props.spareIps.map((ip, index) => {
                                                //     return (
                                                <div className="col-sm-6 col-md-4 col-lg-3 backupIpList">
                                                    <p>{props.spareIps}</p>
                                                    {/* <i class="fa-solid fa-pen-to-square"></i> */}
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        onClick={() => EditHotBackupIP(props.spareIps)}
                                                        className='text-primary delete-backupIp'
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        onClick={() => deleteHotIP(props.spareIps)}
                                                        className='text-danger delete-backupIp'
                                                    />
                                                </div>
                                                //     )
                                                // })
                                            }
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div> : ''}
                        {props.deviceList[props.deviceindex].Region !== 'OnBoardingRegion' &&
                        <div className="py-custom">
                        <div className="form-boxdiv" style={{ overflow: 'visible' }}>
                            <div className="form-boxtopline5">Encoder Backup</div>
                            <div className="row m-0">
                                <div className="col-md-3">
                                    <div className="form-group mt-3" >
                                        <label className="form-check-label enc-status">
                                            Encoder Backup:
                                            <input
                                                type="checkbox"
                                                className="enc-checkbox"
                                                checked={encoderBackup}
                                                onChange={(event) => encoderHotBackUp(event)}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {encoderBackup ?
                                    <div className="col-md-9 mt-3">
                                        <div className="row mb-3">
                                            {props.spareIps.length === 0 ?
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
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <button
                                                                    className="btn btn-success mt-4"
                                                                    onClick={(e) => SaveEditedHotBackupIP(e)}
                                                                >
                                                                    Update
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger mt-4 ml-2"
                                                                    onClick={() => setIsEditHotBackupIp(false)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : ''
                                            }
                                            {/* <button
                                            className="btn btn-success ml-2"
                                            onClick={(e) => SaveHotBackupIPs(e)}
                                        >
                                            Save
                                        </button> */}
                                        </div>
                                    </div> : ''}
                            </div>
                        </div>
                    </div>
                        }
                        


                        {props.customerData && props.customerData.Role === "Operator" ? (
                            <dev></dev>
                        ) : (
                            <>
                                {(props.model.substring(0, 4) === "RM11" || props.model.includes("VL4510H")) && !props.model.includes('RM1121CXF') ? (
                                    <div className="py-custom">
                                        <div className="form-boxdiv">
                                            <div className="form-boxtopline5">Input</div>
                                            <div className="form-boxtopcont user-form">
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <label className="form-check-label">Input Port</label>
                                                        <div className="row">
                                                            <div className="form-group col-sm-10">

                                                                <select
                                                                    className="form-control"
                                                                    value={InputportData}
                                                                    onChange={(event) =>
                                                                        setInputportData(event.target.value)
                                                                    }
                                                                >
                                                                    <option value="">Select Input Port</option>
                                                                    <option value="1">Input 1</option>
                                                                    <option value="2">Input 2</option>
                                                                    <option value="3">Input 3</option>
                                                                    <option value="4">Input 4</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-2" style={{ marginTop: "4px" }}>
                                                                <div className="form-group">
                                                                    <button className="btn btn-primary" onClick={saveInputPort} >Send</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                ) : ""}
                                {props.model.substring(0, 4) === "RM11" && !props.model.includes('RM1121CXF') ? (
                                    <div className="py-custom">
                                        <div className="form-boxdiv">
                                            <div className="form-boxtopline5">Send IR Code</div>
                                            <div className="form-boxtopcont user-form">
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <label className="form-check-label">
                                                                Remote Type:
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={remoteType}
                                                                style={{ cursor: (showircode ? 'pointer' : "not-allowed") }}
                                                                onChange={(event) =>
                                                                    setremoteType(event.target.value)
                                                                }
                                                                readOnly={!showircode}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-7">
                                                        <label className="form-check-label">
                                                            IR Code:
                                                        </label>
                                                        <div className="row">
                                                            <div className="form-group col-sm-10">

                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    value={ircode}
                                                                    style={{ cursor: (showircode ? 'pointer' : "not-allowed") }}
                                                                    onChange={(event) =>
                                                                        setircode(event.target.value)
                                                                    }
                                                                    readOnly={!showircode}
                                                                />
                                                            </div>
                                                            <div className="form-group col-sm-2">
                                                                <button className="btn btn-primary" onClick={saveircode} style={{ marginTop: "4px" }} disabled={showircode ? false : true}>Send</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                ) : ""}
                            </>
                        )}
                    </div>
                );
            }
        }
    }

    return (
        <div>
            {top}
            {input_stream}
            {props.encoderId === "" ? (
                <div></div>
            ) : (
                <div className="py-custom">
                    <div className="form-boxdiv padding">
                        <table class="dashboardTable table table-encoder">
                            <thead>
                                <tr>
                                    <th>Input Stream </th>
                                    <th>Output Stream</th>
                                    <th>Comment</th>
                                    <th>Controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={getColor()}>
                                    <td>
                                        {props.ellvisList &&
                                            props.ellvisList.length !== 0 &&
                                            props.ellvisindex !== undefined
                                            ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                props.encoderindex
                                            ].input
                                            : ""}
                                    </td>
                                    <td>
                                        {props.ellvisList &&
                                            props.ellvisList.length !== 0 &&
                                            props.ellvisindex !== undefined
                                            ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                props.encoderindex
                                            ].output
                                            : ""}
                                    </td>
                                    <td>
                                        {props.ellvisList &&
                                            props.ellvisList.length !== 0 &&
                                            props.ellvisindex !== undefined
                                            ? props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                props.encoderindex
                                            ].comment
                                            : ""}
                                    </td>
                                    {props.customerData &&
                                        props.customerData.Role === "Operator" ? (
                                        <td></td>
                                    ) : (
                                        <td>
                                            {props.ellvisList &&
                                                props.ellvisList.length !== 0 &&
                                                props.ellvisindex !== undefined &&
                                                (props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                    props.encoderindex
                                                ].state === "exited" ||
                                                    props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                        props.encoderindex
                                                    ].status === "not running") ? (
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
                                                        onClick={(event) => startClickHandler(event, "total")}
                                                    >
                                                        {loading ? (
                                                            <span
                                                                className="spinner-border spinner-border-sm ml-1"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </i>
                                                </Tippy>
                                            ) : (
                                                <i></i>
                                            )}
                                            {props.ellvisList &&
                                                props.ellvisList.length !== 0 &&
                                                props.ellvisindex !== undefined &&
                                                (props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                    props.encoderindex
                                                ].state === "exited" ||
                                                    props.ellvisList[props.ellvisindex].ConnectedDevice[
                                                        props.encoderindex
                                                    ].status === "not running") ? (
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
                                                        onClick={(event) => stopClickHandler(event, "total")}
                                                    >
                                                        {loading ? (
                                                            <span
                                                                className="spinner-border spinner-border-sm ml-1"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </i>
                                                </Tippy>
                                            )}
                                            {props.ellvisList &&
                                                props.ellvisList.length !== 0 &&
                                                props.ellvisindex !== undefined && (
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
                                                                "/content/ellvis/" +
                                                                props.ellvisList[props.ellvisindex].deviceip +
                                                                "/streamconfig"
                                                            }
                                                            aria-current="page"
                                                            href="#"
                                                        >
                                                            <i
                                                                className="fa fa-edit stream-icons icon-tooltip"
                                                                onClick={(event) => handleEditClick(event)}
                                                            ></i>
                                                        </Link>
                                                    </Tippy>
                                                )}
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div
                className={(props.encoderId === "" ? "not-visible" : "") + " py-custom"}
            >
                <div className="form-boxdiv">
                    <div className="form-boxtopline5 mb-2">Stream Details</div>
                    <div
                        className="custom-control custom-checkbox"
                        style={{ display: "inline-block" }}
                    >
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="savehistory"
                            // checked={props.saveHistoryCheckbox}
                            onChange={() => {
                                let x = document.getElementById("savehistory");
                                x.checked = !props.saveHistoryCheckbox;
                                props.setSaveHistoryCheckbox(!props.saveHistoryCheckbox);
                                handleChange();
                            }}
                        />
                        <label
                            className="custom-control-label label-14 cursor-pointer"
                            htmlFor="savehistory"
                        >
                            Save History
                        </label>
                    </div>
                    <div className="custom-control" style={{ display: "inline-block" }}>
                        <label className="label-14">
                            Link Efficiency:
                            {linkEfficiency === "" ? (
                                " -"
                            ) : (
                                <span>&nbsp;&nbsp;{linkEfficiency}%</span>
                            )}
                        </label>
                    </div>
                    <div className="custom-control" style={{ display: "inline-block" }}>
                        <label className="label-14">
                            Packet Loss:
                            {dropPackets === "" ? " -" : <span>&nbsp;&nbsp;{dropPackets}%</span>}
                        </label>
                    </div>

                    <div className="user-form">
                        <div>
                            <Row className="mx-0 my-4">
                                <Col md={4} className="pad-3">
                                    <Card className="stream-detail-card">
                                        <div className="header">
                                            <h4 className="cardtitles">Link Details</h4>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="content">
                                            <Row>
                                                <Col md={4} className="text-right"></Col>
                                                <Col md={4} className="pad-6-2 text-right">
                                                    <span className="label label-primary direction-label">
                                                        Receiving
                                                    </span>
                                                </Col>
                                                <Col md={4} className="pad-6-2 text-left">
                                                    <span className="label label-primary direction-label">
                                                        Sending
                                                    </span>
                                                </Col>
                                                <div className="clear"></div>
                                            </Row>
                                            {/* <Row className="padl-6-0">
                                            <Col md={4} className="pad-6-2">
                                              <Label className="controls-label">Status</Label>
                                            </Col>
                                            <Col md={4} className="pad-6-2">
                                              <input type="text" className="form-control input-box statusColorConnected"></input>
                                            </Col>
                                            <Col md={4} className="pad-6-2">
                                              <input type="text" className="form-control input-box statusColorDisconnected"></input>
                                            </Col>
                                          </Row> */}
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">Peer Ip</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvPeerIP}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendPeerIP}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">Up Time</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvUptime}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendUptime}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">BANDWIDTH</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvBandwidth}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendBandwidth}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">BITRATE</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvBitRate}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendBitRate}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">RTT</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvRtt}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendRtt}
                                                    ></input>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>

                                <Col md={4} className="pad-3 border-left border-right">
                                    <Card className="stream-detail-card">
                                        <div className="header">
                                            <h4 className="cardtitles">SRT Details</h4>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="content">
                                            <Row>
                                                <Col md={4} className="text-right"></Col>
                                                <Col md={4} className="pad-6-2 text-right">
                                                    <span className="label label-primary direction-label">
                                                        Receiving
                                                    </span>
                                                </Col>
                                                <Col md={4} className="pad-6-2 text-left">
                                                    <span className="label label-primary direction-label">
                                                        Sending
                                                    </span>
                                                </Col>
                                                <div className="clear"></div>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">LATENCY</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvLatency}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendLatency}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">DECRYPTION</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">TIMEOUT</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                    ></input>
                                                </Col>
                                            </Row>
                                            {/* <Row className="padl-6-0">
                                            <Col md={4} className="pad-61">
                                            <Label className="controls-label">
                                                RETRANSMITTED TOTAL
                                            </Label>
                                            </Col>
                                            <Col md={4} className="pad-6-2">
                                            <input
                                                type="text"
                                                readOnly={true}
                                                className="form-control input-box"
                                                value={recvretransmittedtotal}
                                            ></input>
                                            </Col>
                                            <Col md={4} className="pad-6-2">
                                            <input
                                                type="text"
                                                readOnly={true}
                                                className="form-control input-box"
                                                value={sendretransmittedtotal}
                                            ></input>
                                            </Col>
                                        </Row> */}
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">BUFFER SIZE</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvBufferSize}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2"></Col>
                                            </Row>
                                            {/* <Row className="padl-6-0">
                                            <Col md={4} className="pad-61">
                                            <Label className="controls-label">
                                                BELATED TOTAL
                                            </Label>
                                            </Col>
                                            <Col md={4} className="pad-6-2">
                                            <input
                                                type="text"
                                                readOnly={true}
                                                className="form-control input-box"
                                                value={recvbelatedtotal}
                                            ></input>
                                            </Col>
                                            <Col md={4} className="pad-6-2"></Col>
                                        </Row> */}
                                        </div>
                                    </Card>
                                </Col>

                                <Col md={4} className="pad-3">
                                    <Card className="stream-detail-card">
                                        <div className="header">
                                            <h4 className="cardtitles">Packet Statistics</h4>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="content">
                                            <Row>
                                                <Col md={4} className="text-right"></Col>
                                                <Col
                                                    style={{ cursor: "pointer" }}
                                                    md={4}
                                                    className="pad-6-2 text-right"
                                                >
                                                    <span
                                                        className="label label-primary direction-label hyperlink-span"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setToggle(!toggle);
                                                        }}
                                                    >
                                                        Receiving
                                                    </span>
                                                </Col>
                                                <Col
                                                    style={{ cursor: "pointer" }}
                                                    md={4}
                                                    className="pad-6-2 text-left"
                                                >
                                                    <span
                                                        className="label label-primary direction-label hyperlink-span"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            settogglesend(!togglesend);
                                                        }}
                                                    >
                                                        Sending
                                                    </span>
                                                </Col>
                                                <div className="clear"></div>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">
                                                        RECEIVED/SENT
                                                    </Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvPacketStats}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendPacketStats}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">LOST</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvPacketLost}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendPacketLost}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">DROPPED</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvPacketDropped}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendPacketDropped}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">
                                                        RETRANSMITTED
                                                    </Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvRetransmittedTotal}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={sendRetransmittedTotal}
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col md={4} className="pad-61">
                                                    <Label className="controls-label">BELATED</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control input-box"
                                                        value={recvBelatedTotal}
                                                    ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2"></Col>
                                            </Row>
                                            {/* <Row className="padl-6-0">
                                                <Col md={4} className="pad-61">
                                                <Label className="controls-label">BELATED</Label>
                                                </Col>
                                                <Col md={4} className="pad-6-2">
                                                <input
                                                    type="text"
                                                    readOnly={true}
                                                    className="form-control input-box"
                                                    value={recvpacketbelated}
                                                ></input>
                                                </Col>
                                                <Col md={4} className="pad-6-2"></Col>
                                            </Row> */}
                                        </div>
                                    </Card>
                                </Col>

                                <div className="clear"></div>
                            </Row>
                        </div>

                        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
                            <ModalHeader toggle={() => setToggle(!toggle)}>
                                Receiving Statistics
                            </ModalHeader>
                            <ModalBody>
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={bandwidthGraph.options}
                                        series={bandwidthGraph.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                {/* <div style={{ margin: "15px" }}>
                  <CanvasJsChart options={rttGraph} />
                </div> */}
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={rttGraph.options}
                                        series={rttGraph.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                {/* <div style={{ margin: "15px" }}>
                  <CanvasJsChart options={packetsGraph} />
                </div> */}
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={packetsGraph.options}
                                        series={packetsGraph.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => setToggle(!toggle)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <Modal
                            isOpen={togglesend}
                            toggle={() => settogglesend(!togglesend)}
                        >
                            <ModalHeader toggle={() => settogglesend(!togglesend)}>
                                Sending Statistics
                            </ModalHeader>
                            <ModalBody>
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={bandwidthGraphSend.options}
                                        series={bandwidthGraphSend.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                {/* <div style={{ margin: "15px" }}>
                  <CanvasJsChart options={rttGraph} />
                </div> */}
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={rttGraphSend.options}
                                        series={rttGraphSend.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                {/* <div style={{ margin: "15px" }}>
                  <CanvasJsChart options={packetsGraph} />
                </div> */}
                                <div style={{ margin: "15px" }}>
                                    <Chart
                                        options={packetsGraphSend.options}
                                        series={packetsGraphSend.series}
                                        type="line"
                                        height="300"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    onClick={() => settogglesend(!togglesend)}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>

                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>

            {/* <ToastContainer/> */}
        </div>
    );
};

export default Dashboard;