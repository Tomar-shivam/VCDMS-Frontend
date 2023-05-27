import './system.css'
import SystemList from './systemlist';
import SystemForm from './systemform';


let SystemConfig = (props) => {
    return (
        <div>

            {
                props.formState === "list" ?
                    (
                        <SystemList
                            getSystems={props.getSystems}
                            systemList={props.systemList}
                            addSystemClick={props.addSystemClick}
                            customerData={props.customerData}
                            changeContent={props.changeContent}
                            regionList={props.regionList}
                            getRegions={props.getRegions} />
                    ) : (
                        <SystemForm
                            changeContent={props.changeContent}
                            customerData={props.customerData}
                            getSystems={props.getSystems}
                            regionList={props.regionList}
                            getRegions={props.getRegions}
                            systemList={props.systemList} />
                    )

            }
        </div>


    );
}

export default SystemConfig;