import React, { useState } from "react";
import VCDMSService from "../../services/http.service";
import Loader from "../../common/loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import UsersForm from "./usersform";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorMessage from '../../common/errorMsg'
let UsersList = (props) => {
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(<></>);
  const [loading, setLoading] = useState(false);
  let gridOptions = {};
  let onGridReady = {};
  function hideLoader() {
    setLoading(false);
  }

  function showLoader() {
    setLoading(true);
  }

  const addUserClick = (event) => {
    event.preventDefault();
    props.addUserClick();
  };

  const setField = (data) => {
    setContent("form");
    setForm(
      <UsersForm
        data={data}
        setformContent={setContent}
        getUsers={props.getUsers}
        customerData={props.customerData}
      />
    );
  };

  let DeleteUser = async (event, rowdata) => {
    event.preventDefault();
    if (!props.customerData || !props.customerData.Username) return;
    let r = window.confirm("Are you sure you want to delete this user!");
    if (r === false) {
      return;
    }
    let data = {
      _id: rowdata._id,
      ActionTime: new Date(),
      ActionType: "Delete",
      Module: "User",
      Username: props.customerData.Username,
      Target: rowdata.Username,
    };
    showLoader();
    let returnData = await VCDMSService.getByBoj("deleteuser", data)
      .then((res) => res.data)
      .catch((err) => { return });

    if (returnData) {
      if (returnData.status === "success") {
        props.getUsers();
      } else {
        ErrorMessage("Unable to delete user")
      }
    }
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
      headerName: "User Name",
      field: "Username",
      cellRenderer: (params) => {
        var link = document.createElement("a");
        link.className = "linka";
        link.innerText = params.data.Username;
        link.addEventListener("click", () => setField(params.data));
        return link;
      },
    },
    {
      headerName: "Role",
      field: "Role",
    },
    {
      headerName: "Email",
      field: "Email",
    },
    {
      headerName: "Phone",
      field: "Phone",
    },
    {
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: (params) => {
        let span = document.createElement("div");
        span.className = "spanname";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
        img.onclick = (event) => DeleteUser(event, params.data);

        span.appendChild(img);
        return span;
      },
      onCellValueChanged: (params) => {
        let span = document.createElement("div");
        span.className = "spanname";
        let img = document.createElement("i");
        img.className = "fa fa-trash delete-icon";
        img.onclick = (event) => DeleteUser(event, params.data);
        span.appendChild(img);
        return span;
      },
      maxWidth: 100,
    },
  ];

  return content === "list" ? (
    <>
      <div>
        <div className="text-right">
          <button
            className={"header-btn"}
            onClick={(event) => addUserClick(event)}
          >
            Add User
          </button>
          <div className="clear"></div>
        </div>

        {loading ? <Loader /> : null}
        <div className="pad-15">
          <div className="form-boxdiv">
            <div className="form-boxtopline5">Users</div>
            <div className="form-boxtopcont user-form">
              <div className="ag-theme-alpine" style={{ height: "calc(100vh - 240px)" }}>
                <AgGridReact
                  pagination={true}
                  paginationPageSize={10}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
                  enableBrowserTooltips={true}
                  tooltipShowDelay={{ tooltipShowDelay: 0 }}
                  rowData={props.usersList}
                  gridOptions={gridOptions}
                  gridReady={onGridReady}
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

export default UsersList;
