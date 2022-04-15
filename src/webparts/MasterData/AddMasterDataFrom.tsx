import * as React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../MasterData/MasterData.css";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import Collection from "./Collection";
import { columnDefs, defaultColDef } from "./Columns";
import agGridActions from "./DeleteRow";
const collection = Collection;

const AddMasterDataFrom: React.FunctionComponent<any> = ({
  formHeading,
  ActiveTab,
}) => {
  const [name, setName] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [collectionData, setCollectionData] = React.useState([]);
  const [gridApi, setGridApi] = React.useState(null);
  const [gridColumnApi, setGridColumnApi] = React.useState(null);
  const [tableRowsData, setTableRowsData] = React.useState([]);
  const [gobalID, setGobalID] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [checkValidate, setCheckValidate] = React.useState([]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    params.api.setRowData(collectionData);
    params.api.setPinnedTopRowData(collectionData);
    params.api.setPinnedBottomRowData(collectionData);
  };
  // data save by form submitted...
  const handleSubmit = (e: any): void => {
    const errors = validate(name);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    let converter = {
      Active: 0,
      InActive: 1,
    };
    let newId = 1;
    newId = GetID(tableRowsData);
    let saveObj = {
      Id: newId + 1,
      name: name,
      active: converter[active === true ? "Active" : "InActive"],
    };
    createListData(saveObj);
    e.preventDefault();
    setIsSubmit(true);
    setName("");
  };

  React.useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(collectionData);
    }
  }, [collectionData]);

  const GetID = (ArrayOfObjects: any) => {
    if (ArrayOfObjects.length > 0) {
      return Math.max.apply(
        Math,
        ArrayOfObjects.map(function (obj: any) {
          return obj.Id;
        })
      );
    } else if (ArrayOfObjects.length === 0) {
      return 0;
    }
  };

  const currentabData = (Collection: any): void => {
    const { Customer, Location, Branch, ProjectType, TradeClass } = collection;
    localStorage.setItem("ActiveTab", ActiveTab);
    if (ActiveTab === "Customer") {
      setCollectionData(Customer);
      setTableRowsData(Collection);
    } else if (ActiveTab === "Location") {
      setCollectionData(Location);
      setTableRowsData(Collection);
    } else if (ActiveTab === "Branch") {
      setCollectionData(Branch);
      setTableRowsData(Collection);
    } else if (ActiveTab === "ProjectType") {
      setCollectionData(ProjectType);
      setTableRowsData(Collection);
    } else if (ActiveTab === "TradeClass") {
      setCollectionData(TradeClass);
      setTableRowsData(Collection);
    }
  };
  // Reload the Data into the Grid...
  React.useEffect(() => {
    currentabData([]);
  }, []);

  // SaveData Convert into the String...
  const temp = [...tableRowsData];
  let stringGridData = JSON.stringify(temp);
  // console.log("stringData====>", stringGridData);

  // Getting List Items from SharePoint...
  const listData = async () => {
    const items: any[] = await sp.web.lists
      .getByTitle("VendorConfig")
      .items.get();
    // const Collection = {
    //   Customer: items[0] ? JSON.parse(items[0].vValue) : collection.Customer,
    //   Location: items[1] ? JSON.parse(items[1].vValue) : collection.Location,
    //   Branch: items[2] ? JSON.parse(items[2].vValue) : collection.Branch,
    //   ProjectType: items[3]
    //     ? JSON.parse(items[3].vValue)
    //     : collection.ProjectType,
    //   TradeClass: items[4]
    //     ? JSON.parse(items[4].vValue)
    //     : collection.TradeClass,
    // };
    let id: number;
    let currentTabValue: any[];
    for (let i = 0; i < items.length; i++) {
      if (ActiveTab === items[i].Title) {
        currentTabValue = JSON.parse(items[i].vValue);
        id = items[i].ID;
        setGobalID(id);
        localStorage.setItem("ActiveTabID", id.toString());
        console.log("currentTabValue", currentTabValue);
        break;
      }
    }
    if (!currentTabValue || !currentTabValue.length) {
      currentTabValue = collection[ActiveTab];
    }
    currentabData(currentTabValue);
    setCheckValidate(currentTabValue);
    console.log("items===>", items);
  };

  React.useEffect(() => {
    listData();
  }, []);
  // this for Delete function.....
  React.useEffect(() => {
    agGridActions.data = tableRowsData;
  }, [tableRowsData]);

  // All methods Add, Update , Edit into the SharePoint.....
  const createListData = async (
    newUpdateData: any,
    editInGrid: boolean = false
  ) => {
    const createCopyData = JSON.parse(JSON.stringify(stringGridData));
    let list = sp.web.lists.getByTitle("VendorConfig");
    if (gobalID > 0) {
      //Update data into List
      if (editInGrid) {
        let gridData = JSON.parse(createCopyData);
        for (var i = 0; i < gridData.length; i++) {
          if (gridData[i]["Id"] === newUpdateData["Id"]) {
            gridData[i]["name"] = newUpdateData["name"];
            gridData[i]["active"] = newUpdateData["active"];
          }
        }
        const updateItem = await list.items.getById(gobalID).update({
          Title: ActiveTab,
          vValue: JSON.stringify(gridData),
        });
        setCollectionData(gridData);
      } else {
        //mergedNew updated data into the list....
        let tempData = JSON.parse(createCopyData);
        const mergedData = tempData.concat(newUpdateData);
        const updateItem = await list.items.getById(gobalID).update({
          Title: ActiveTab,
          vValue: JSON.stringify(mergedData),
        });
        // update successfully...
        setCollectionData((prevItems) => [...prevItems, mergedData]);
        listData();
      }
    } else {
      // add new data into list
      let tempData = JSON.parse(createCopyData);
      const mergedData = tempData.concat(newUpdateData);
      const addItem: IItemAddResult = await sp.web.lists
        .getByTitle("VendorConfig")
        .items.add({
          Title: ActiveTab,
          vValue: JSON.stringify(mergedData),
        });
      listData();
    }
  };

  // Grid onCellValueChanged ...
  const onCellValueChanged = (event: any): void => {
    createListData(event.data, true);
    console.log("data after changes is: ", event.data);
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values: any) => {
    let errors: any = {};
    let element: any;
    let checkDuplicateEntry = checkValidate;
    element = checkDuplicateEntry.filter((elem) => {
      return elem.name === values;
    });
    if (!values) {
      errors.name = "Name is required";
    } else if (element.length > 0) {
      errors.name = "Duplicate Records Found";
    }
    return errors;
  };
  return (
    <React.Fragment>
      <div className="container">
        {/* {" "}
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">entery is successfully</div>
        ) : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )} */}
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="col-12 pb-2">
              <p className="f-w-s-bold f-18 m-0 c-black">{formHeading}</p>
            </div>
            <form
              className="add-project-form pb-6"
              // onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <label className="col-12">
                  Name<span className="">*</span>
                </label>
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <input
                    className="form-control form-control-sm "
                    name="name"
                    type="text"
                    placeholder=" Please Enter Name "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {formErrors["name"] && <p>{formErrors["name"]}</p>}

              <div className="form-group col-lg-3 col-md-6">
                <label className="mb-1">Active/In-Active</label>
                <br />
                <label className="switch switch-sm success ">
                  <input
                    name="active"
                    type="checkbox"
                    className="success"
                    id="1chkCategoryActive"
                    onChange={() => {
                      setActive(!active);
                    }}
                    checked={active}
                  />
                  <span className="slider round ChangeSpanBackground"></span>
                </label>
              </div>

              <div className=" form-group pt-2">
                <div className="col-12">
                  <button className="btn btn-sm btn-primary mb-3" type="button" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*Table Start here*/}
        <div className="ag-theme-alpine" style={{ height: 600, width: 500 }}>
          <AgGridReact
            rowData={tableRowsData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            unSortIcon={true}
            paginationAutoPageSize={true}
            pagination={true}
            onCellValueChanged={onCellValueChanged}
            enterMovesDown={true}
            enterMovesDownAfterEdit={true}
            getRowNodeId={tableRowsData => tableRowsData.Id}
          />
        </div>
      </div>
      {/*Table Start END*/}
    </React.Fragment>
  );
};

export default AddMasterDataFrom;
