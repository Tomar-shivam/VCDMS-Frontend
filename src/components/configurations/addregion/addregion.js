import './addregion.css'
import AddRegionList from './addregionlist';
import AddRegionForm from './addregionform';

let AddRegion = (props) => {
    return (
        <div>
            {props.formState === "list" ?
                (
                    <AddRegionList
                        getRegions={props.getRegions}
                        regionList={props.regionList}
                        addRegionClick={props.addRegionClick}
                        customerData={props.customerData}
                        changeContent={props.changeContent} />
                ) : (
                    <AddRegionForm
                        changeContent={props.changeContent}
                        customerData={props.customerData}
                        getRegions={props.getRegions} />
                )
            }
        </div>


    );
}

export default AddRegion;