import './cluster.css'
import ClusterList from './clusterlist';
import ClusterForm from './clusterform';

let AddRegion = (props) => {

    return (
        <div className="form-boxdiv margin-top">
            {props.formState === "list" ?
                (<ClusterList
                    getRegions={props.getRegions}
                    regionList={props.regionList}
                    addRegionClick={props.addRegionClick}
                    customerData={props.customerData}
                    changeContent={props.changeContent} />
                ) : (
                    <ClusterForm
                        changeContent={props.changeContent}
                        customerData={props.customerData}
                        getRegions={props.getRegions} />
                )
            }
        </div>
    );
}

export default AddRegion;