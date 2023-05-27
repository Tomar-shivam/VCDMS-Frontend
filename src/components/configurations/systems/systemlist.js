import { useEffect, useState } from "react";
import Loader from "../../../common/loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SystemForm from "./systemform";
import VCDMSService from "../../../services/http.service";
import 'bootstrap/dist/css/bootstrap.min.css';

let SystemList = (props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(<></>);

  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }

  useEffect(() => {
    props.getSystems();
  }, [])

  const setField = (data) => {
    setContent("form");
    setForm(
      <SystemForm
        getRegions={props.getRegions}
        data={data}
        setformContent={setContent}
        customerData={props.customerData}
        getSystems={props.getSystems}
        regionList={props.regionList}
      />
    );
  };

  let DeleteSystem = async (rowdata) => {
    if (!props.customerData || !props.customerData.Username) return;
    let r = window.confirm(
      "Deleting this system will also delete it's associated Devices.\nAre you sure you want to delete this system?"
    );
    if (r === false) {
      return;
    }
    let data = {
      _id: rowdata._id,
      ActionTime: new Date(),
      ActionType: "Delete",
      Module: "System",
      Username: props.customerData.Username,
      Target: rowdata.System,
    };
    showLoader();
    await VCDMSService.getByBoj("deletesystem", data).then(
      (res) => res.data
    );
    props.getSystems();
    hideLoader();
  };

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
  };

  const columns = [
    {
      headerName: "System Name",
      field: "System",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.System;

        link.addEventListener("click", () => setField(params.data));
        // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
        return link;
      },
    },
    {
      headerName: "Location",
      field: "Location",
    },
    {
      headerName: "Email Targets for Critical Alarms",
      field: "Contact",
    },
    {
      headerName: "Email Targets for Alarms",
      field: "Email",
    },
    {
      headerName: " ",
      field: " ",
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        if (params.data.System !== 'OnBoardingSystem') {
          let span = document.createElement("div");
          span.className = "spanname";
          let img = document.createElement("i");
          img.className = "fa fa-trash delete-icon";
          img.addEventListener("click", () => DeleteSystem(params.data));
          span.appendChild(img);
          return img;
        }
        else return ''
      },
      maxWidth: 90,
    },
  ];

  const columnsOperator = [
    {
      headerName: "System Name",
      field: "System",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.System;
        // link.href = '/admin/distributordetail/' + params.data.orderitemid + "/" + params.data.sellersku
        return link;
      },
    },
    {
      headerName: "Location",
      field: "Location",
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

  const addSystemClick = () => {
    props.addSystemClick();
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
              onClick={addSystemClick}
            >
              Add System
            </button>
          )}
          <div className="clear"></div>
        </div>

        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Systems</div>
            <div className="form-boxtopcont user-form">
              <div className="ag-theme-alpine custom-row-bg" style={{ height: "calc(100vh - 285px)" }}>
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
                  rowData={props.systemList}
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

export default SystemList;
