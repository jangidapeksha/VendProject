import * as React from "react";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import PopupForm from "../PeoplePickerForm/PopupForm";


const showPopUp = () =>{
    PopupForm;
    console.log("hiii........");
};

export const columnDefs = [
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
  { headerName: "AssignmentStatus", field: "AssignTo.Title" },
  {
    headerName: "Action",
    field: "Action",
    cellRendererFramework: () => (
      <div>
        <button type="button" className="btn btn-sm" onClick={() =>showPopUp}>
          <FontAwesomeIcon icon={faTasks} />
        </button>
      </div>
    ),
  },
];

export const defaultColDef = {
  editable: true,
  sortable: true,
  flex: 1,
  minWidth: 220,
  filter: true,
  floatingFilter: true,
  resizable: true,
};
