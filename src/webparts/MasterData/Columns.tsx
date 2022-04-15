import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import agGridActions from "./DeleteRow";

export const columnDefs = [
  { headerName: "Name", field: "name", minWidth: 160 },
  {
    headerName: "Active",
    field: "active",
    cellRendererFramework: (params: any) => (
      <div>
        {params.data.active == 0 ? (
          <FontAwesomeIcon icon={faCheck} style={{ color: "lime" }} />
        ) : (
          <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
        )}
      </div>
    ),
  },
  {
    headerName: "Action",
    field: "Action",
    cellRendererFramework: (params: any) => (
      <div>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => agGridActions.DeleteRow(params)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    ),
  },
];
// Grid defaultColDef filter, sorting...
export const defaultColDef = {
  // width: 170,
  sortable: true,
  flex: 1,
  filter: true,
  floatingFilter: true,
  editable: true,
};
