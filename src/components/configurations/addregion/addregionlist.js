import { useEffect, useState } from "react";
import Loader from "../../../common/loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import AddRegionForm from "./addregionform";
import VCDMSService from "../../../services/http.service";
import 'bootstrap/dist/css/bootstrap.min.css';

let AddRegionList = (props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(<AddRegionForm />);

  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }
  useEffect(() => {
    props.getRegions();
  }, [])

  let DeleteRegion = async (rowdata) => {
    if (!props.customerData) return;
    if (!props.customerData.Username) return;
    let r = window.confirm(
      "Deleting this region will also delete it's associated Systems and Devices.\nAre you sure you want to delete this region?"
    );
    if (r === false) {
      return;
    }
    let data = {
      _id: rowdata._id,
      Module: "Region",
      ActionTime: new Date(),
      ActionType: "Delete",
      Username: props.customerData.Username,
      Target: rowdata.Region
    };
    showLoader();
    await VCDMSService.getByBoj("deleteregion", data).then(
      (res) => res.data
    );
    props.getRegions();
    hideLoader();
  };

  const setField = (data) => {
    setContent("form");
    setForm(
      <AddRegionForm
        data={data}
        setformContent={setContent}
        customerData={props.customerData}
        getRegions={props.getRegions}
      />
    );
  };

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
  };

  const columns = [
    {
      headerName: "Region Name",
      field: "Region",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.Region;
        link.addEventListener("click", () =>setField(params.data));
        // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
        return link;
      },
    },
    {
      headerName: "Contact No",
      field: "Contact",
    },
    {
      headerName: "Email Targets for Critical Alarms",
      field: "Email",
    },
    {
      headerName: " ",
      field: " ",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        if(params.data.Region !== 'OnBoardingRegion'){
          let span = document.createElement("div");
          span.className = "spanname";
          let img = document.createElement("i");
          img.className = "fa fa-trash delete-icon";
          img.addEventListener("click", () => DeleteRegion(params.data));
          span.appendChild(img);
          return span;
          } else return ''
      },
      maxWidth: 70,
    },
  ];

  const columnsOperator = [
    {
      headerName: "Region Name",
      field: "Region",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.Region;
        // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
        return link;
      },
    },
    {
      headerName: "Contact No",
      field: "Contact",
    },
    {
      headerName: "Email",
      field: "Email",
    },
  ];

  const addRegionClick = () => {
    props.addRegionClick();
  };
  return content === "list" ? (
    <>
      <div>
        {loading ? <Loader /> : <></>}
        <div className="text-right">
          {props.customerData.Role === "Operator" ? (
            <></>
          ) : (
            <button
              className={"header-btn"}
              onClick={addRegionClick}
            >
              Add Region
            </button>
          )}
          <div className="clear"></div>
        </div>
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Regions</div>
            <div className="form-boxtopcont user-form">
              <div
                className="ag-theme-alpine custom-row-bg"
                style={{ height: "calc(100vh - 285px)" }}
              >
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
                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                  rowData={props.regionList}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    form
  );
};

export default AddRegionList;
