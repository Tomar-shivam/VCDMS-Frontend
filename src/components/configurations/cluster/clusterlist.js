import { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ClusterForm from './clusterform'

let ClusterList = (props) => {
    const [content, setContent] = useState('list')
    const [form, setForm] = useState(<></>);
    const setField = (data) => {
        setContent('form');
        setForm(<ClusterForm data={data} setformContent={setContent} customerData={props.customerData} getRegions={props.getRegions} />)
    }

    const defaultColDef = {
        sortable: true,
        editable: false,
        flex: 1,
        filter: true
    }

    const columns = [
        {
            headerName: 'Region Name',
            field: 'Region',
            cellRenderer: (params) => {
                var link = document.createElement('a');
                link.className = "linka";
                link.innerText = params.data.Region;
                link.addEventListener('click', () => setField(params.data));
                // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
                return link;
            },
        },
        {
            headerName: 'Phone No',
            field: 'Contact'
        },
        {
            headerName: 'Email',
            field: 'Email'
        }
    ]

    const addRegionClick = () => {
        props.addRegionClick()
    }
    return (
        content === 'list' ? (<>
            <div className="modal-body">
                <div className="form-boxtopline5 ">
                    Regions
                    <div className="text-right"><button className={"header-btn"} onClick={addRegionClick}>Add Region</button><div className="clear"></div></div>
                </div>

                <div className="account-body3">
                    <div className="ag-theme-alpine" style={{ height: '390px' }}>
                        <AgGridReact
                            pagination={true}
                            paginationPageSize={20}
                            columnDefs={columns}
                            defaultColDef={defaultColDef}
                            enableBrowserTooltips={true}
                            tooltipShowDelay={{ tooltipShowDelay: 0 }}
                            rowData={props.regionList}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </>) : form
    )
}

export default ClusterList;