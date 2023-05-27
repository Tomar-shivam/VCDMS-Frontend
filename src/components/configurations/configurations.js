import { useState, useEffect } from "react";
import NavBar from "./navbar/navbar";
import AddRegion from "./addregion/addregion";
import SystemConfig from "./systems/system";
import AddElement from "../addelement/addelement";

const Configurations = (props) => {
  const [regionFormState, setRegionFormState] = useState("list");
  const [activeTab, setActiveTab] = useState("regions");
  const [systemFormState, setSystemFormState] = useState("list");
  const [deviceFormState, setDeviceFormState] = useState("list");

  useEffect(() => {
    setActiveTab(props.match.params.tab);
  }, [props.match.params]);

  useEffect(() => {
    if (props.deviceFormState) setDeviceFormState(props.deviceFormState);
  }, [props.deviceFormState]);

  useEffect(() => {
    props.getAllDevices();
  }, []);

  const changeContentRegion = () => {
    if (regionFormState === "list") {
      setRegionFormState("form");
    } else if (regionFormState === "form") {
      setRegionFormState("list");
    }
  };

  const changeContentSystem = () => {
    if (systemFormState === "list") {
      setSystemFormState("form");
    }
    if (systemFormState === "form") {
      setSystemFormState("list");
    }
  };

  const changeContentDevice = () => {
    if (deviceFormState === "list") {
      setDeviceFormState("form");
      props.setDeviceFormState("form");
    } else if (deviceFormState === "form") {
      setDeviceFormState("list");
      props.setDeviceFormState("list");
    }
  };

  const handleRegionClick = () => {
    setRegionFormState("list");
  };

  const handleSystemClick = () => {
    setSystemFormState("list");
  };

  const handleDeviceClick = () => {
    setDeviceFormState("list");
  };

  const addRegionClick = () => {
    setRegionFormState("form");
  };

  const addSystemClick = () => {
    setSystemFormState("form");
  };

  const addDeviceClick = () => {
    setDeviceFormState("form");
  };

  let data = (
    <AddRegion
      customerData={props.customerData}
      formState={regionFormState}
      setRegionFormState={setRegionFormState}
      changeContent={changeContentRegion}
      addRegionClick={addRegionClick}
      handleRegionClick={handleRegionClick}
      getRegions={props.getRegions}
      getSystems={props.getSystems}
      regionList={props.regionList}
    />
  );
  if (activeTab === "systems") {
    data = (
      <SystemConfig
        customerData={props.customerData}
        formState={systemFormState}
        setSystemFormState={setSystemFormState}
        changeContent={changeContentSystem}
        regionList={props.regionList}
        getSystems={props.getSystems}
        systemList={props.systemList}
        addSystemClick={addSystemClick}
        handleSystemClick={handleSystemClick}
        getRegions={props.getRegions}
      />
    );
  }
  if (activeTab === "devices") {
    data = (
      <AddElement
        systemList={props.systemList}
        regionList={props.regionList}
        changeContent={changeContentDevice}
        deviceList={props.deviceList}
        getRegions={props.getRegions}
        getSystems={props.getSystems}
        formState={deviceFormState}
        setDeviceFormState={setDeviceFormState}
        getAllDevices={props.getAllDevices}
        addDeviceClick={addDeviceClick}
        handleDeviceClick={handleDeviceClick}
        setPropDeviceFormState={props.setDeviceFormState}
        customerData={props.customerData}
      />
    );
  }
  return (
    <>
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setDeviceFormState={props.setDeviceFormState}
      />
      {data}
    </>
  );
};

export default Configurations;
