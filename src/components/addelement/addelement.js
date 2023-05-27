import './addelement.css'
import AddElementList from './addelementlist';
import AddElementForm from './addelementform';

let AddElement = (props) => {
    return (
        <>
            <div>
                {props.formState === "list" ? (
                    <AddElementList
                        systemList={props.systemList}
                        regionList={props.regionList}
                        changeContent={props.changeContent}
                        getRegions={props.getRegions}
                        deviceList={props.deviceList}
                        addDeviceClick={props.addDeviceClick}
                        getSystems={props.getSystems}
                        customerData={props.customerData}
                        getAllDevices={props.getAllDevices} />)
                    : (
                        <AddElementForm
                            changeContent={props.changeContent}
                            regionList={props.regionList}
                            systemList={props.systemList}
                            getRegions={props.getRegions}
                            getSystems={props.getSystems}
                            getAllDevices={props.getAllDevices}
                            customerData={props.customerData}
                        />)
                }
            </div>

        </>
    );
}

export default AddElement;