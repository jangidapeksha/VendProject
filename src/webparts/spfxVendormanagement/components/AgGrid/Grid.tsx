import * as React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faPenSquare,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import PopupForm from "../PeoplePickerForm/PopupForm";

const Grid: React.FunctionComponent<any> = ({
  data,
  addOpportunities,
  masterData,
  context,
}) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [isGobalID, setIsGobalID] = React.useState<boolean>(false);

  const showForm = (): void => {
    addOpportunities();
  };

  const showMasterPage = (): void => {
    masterData();
  };

  const showPopUp = (data: any): void => {
    setIsShow(true);
    console.log("data: any===>", data.data.ID);
    setIsGobalID(data.data.ID);

  };
  const showPopUpClose = (): void => {
    setIsShow(false);
  };

  const columnDefs = [
    { headerName: "Title", field: "Title" },
    { headerName: "Customer", field: "Customer" },
    {
      headerName: "Store",
      field: "Store",
      minWidth: 220,
    },
    { headerName: "Branch", field: "Branch" },
    { headerName: "ProjectType", field: "ProjectType" },
    { headerName: "TradeClass", field: "TradeClass" },
    {
      headerName: "BidCreateDate",
      field: "BidCreateDate",
      minWidth: 190,
      cellRenderer: (data: any) => {
        if (data.value) {
          return moment(data.value).format("DD/MM/YYYY HH:mm");
        }
      },
    },
    {
      headerName: "BidReceivedDate",
      field: "BidReceivedDate",
      cellRenderer: (data: any) => {
        if (data.value) {
          return moment(data.value).format("DD/MM/YYYY HH:mm");
        }
      },
    },
    {
      headerName: "BiddeadlineDate",
      field: "BiddeadlineDate",
      cellRenderer: (data: any) => {
        if (data.value) {
          return moment(data.value).format("DD/MM/YYYY HH:mm");
        }
      },
    },
    { headerName: "BidStatus", field: "BidStatus" },
  {
    headerName: "AssignTo",
    field: "AssignTo",
    cellRenderer: (data: any) =>{
      let getValue = data.value;
      if(getValue != undefined && getValue.length > 0 ){
        // console.log("assignto======>>>>>",getValue); 
        let assignedUsers: any[] = getValue.map((element, index) =>{
        //  console.log("element.Title",element.Title);
         return element.Title;
        });
        return assignedUsers.join(",");
      }
      else{
        return null;
      }
    },
  },
    {
      headerName: "Action",
      field: "Action",
      cellRendererFramework: (data: any) => (
        <div>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => showPopUp(data)}
          >
            <FontAwesomeIcon icon={faTasks} />
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    // editable: true,
    sortable: true,
    flex: 1,
    minWidth: 220,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 mb-2 text-left">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={showForm}
          >
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
        </div>
        <div className="col-12 mb-2 text-left">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={showMasterPage}
          >
            {" "}
            <FontAwesomeIcon icon={faUsersCog} />
          </button>
        </div>
        <div
          className="ag-theme-alpine  col-12 mb-2"
          style={{ height: 400, marginTop: "20px" }}
        >
          {isShow ? (
            <PopupForm
              showPopUpClose={showPopUpClose}
              context={context}
              gobalIDData={isGobalID}
            />
          ) : (
            <AgGridReact
              rowData={data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              paginationAutoPageSize={true}
              pagination={true}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Grid;
