import * as React from "react";
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import Collection from "../MasterData/Collection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin: React.FunctionComponent<any> = ({
  context,
  formHeading,
  ActiveTab
}) => {
  const [gobalID, setGobalID] = React.useState(null);
  const [collectionListData, setCollectionListData] = React.useState([]);
  const [updateLatestListData, setUpdateLatestListData] = React.useState([]);
  const [selectUserData, setSelectUserData] = React.useState<string[]>([]);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [checkValidate, setCheckValidate] = React.useState([]);

  const currentabData = (Collection: any): void => {
    const {
      Admin,
      Customer,
      Location,
      Branch,
      ProjectType,
      TradeClass
    } = Collection;
    localStorage.setItem("ActiveTab", ActiveTab);
    if (ActiveTab === "Admin") {
      setCollectionListData(Admin);
      setUpdateLatestListData(Collection);
    } else if (ActiveTab === "Customer") {
      setCollectionListData(Customer);
      setUpdateLatestListData(Collection);
    } else if (ActiveTab === "Location") {
      setCollectionListData(Location);
      setUpdateLatestListData(Collection);
    } else if (ActiveTab === "Branch") {
      setCollectionListData(Branch);
      setUpdateLatestListData(Collection);
    } else if (ActiveTab === "ProjectType") {
      setCollectionListData(ProjectType);
      setUpdateLatestListData(Collection);
    } else if (ActiveTab === "TradeClass") {
      setCollectionListData(TradeClass);
      setUpdateLatestListData(Collection);
    }
  };
  // Reload the Data ...
  React.useEffect(() => {
    currentabData([]);
  }, []);

  // SaveData Convert into the String...
  const temp = updateLatestListData;
  let stringListData = JSON.stringify(temp);
  console.log("updateLatestListData====>>>", updateLatestListData);

  const adminListData = async () => {
    const items: any[] = await sp.web.lists
      .getByTitle("VendorConfig")
      .items.get();
    let id: number;
    let currentTabValue: any[];
    for (let i = 0; i < items.length; i++) {
      //  newEnteryOfAdminData.push(items[i].id);
      if (ActiveTab === items[i].Title) {
        currentTabValue = JSON.parse(items[i].vValue);
        id = items[i].ID;
        setGobalID(id);
        console.log("currentTabValue of Admin page", currentTabValue);
        break;
      }
    }
    if (!currentTabValue || !currentTabValue.length) {
      currentTabValue = Collection[ActiveTab];
    }
    currentabData(currentTabValue);
    setCheckValidate(currentTabValue);
    console.log("items of admin page ===>", items);
  };

  React.useEffect(() => {
    adminListData();
  }, []);

  const getPeoplePickerItems = (items: any) => {
    let newEnteryOfAdminData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      newEnteryOfAdminData.push(items[i].secondaryText);
    }
    setSelectUserData(newEnteryOfAdminData);
    console.log("tempUserName", newEnteryOfAdminData);
  };

  const addEditUpdateMethodForAdmin = async (
    newUpdateData: any,
    editInInputField: boolean = false
  ) => {
    const createCopyData = JSON.parse(stringListData);
    let list = sp.web.lists.getByTitle("VendorConfig");
    if (gobalID > 0) {
      //Update data into List
      if (editInInputField) {
        let existDataOfList = createCopyData;
        for (var i = 0; i < existDataOfList.length; i++) {
          if (existDataOfList[i]["Email"] === newUpdateData["Email"]) {
            console.log("existDataOfList ===>>", existDataOfList);
          }
        }
        const updateItem = await list.items.getById(gobalID).update({
          Title: ActiveTab,
          vValue: JSON.stringify(existDataOfList)
        });
        setCollectionListData(existDataOfList);
      } else {
        //mergedNew updated data into the list....
        let tempData = createCopyData;
        const mergedData = tempData.concat(newUpdateData);
        const updateItem = await list.items.getById(gobalID).update({
          Title: ActiveTab,
          vValue: JSON.stringify(mergedData)
        });
        // update successfully...
        setCollectionListData(mergedData);
        adminListData();
      }
    } else {
      // add new data into list .....
      let tempData = JSON.parse(JSON.stringify(createCopyData));
      const mergedData = tempData.concat(newUpdateData);
      const addItem: IItemAddResult = await sp.web.lists
        .getByTitle("VendorConfig")
        .items.add({
          Title: ActiveTab,
          vValue: JSON.stringify(mergedData)
        });
      adminListData();
    }
  };
// its pending working on this task.....!!!
  // const getDefaultUserDataOfPeoplePicker = async () => {
  //   let items = await sp.web.lists.getByTitle("VendorConfig").items.get();
  //   console.log(items);
  // };
  const handleSubmit = (e: any) => {
    const errors = validate(selectUserData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log(`
    AssignTo: ${selectUserData}
  `);
    e.preventDefault();
    validate(selectUserData);
    addEditUpdateMethodForAdmin(selectUserData);
    notifyToaster();
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values: any) => {
    let errors: any = {};
    let element: any;
    let checkDuplicateEntry = checkValidate;
    element = checkDuplicateEntry.filter(elem => {
      return values.includes(elem);
    });
    if (values.length === 0) {
      errors.email = "Name is required";
    } else if (element.length > 0) {
      errors.email = "Duplicate Records Found";
    }
    return errors;
  };

  const notifyToaster = () => {
    toast.success("Submitted...!");
    console.log("its working......");
  };
  return (
    <React.Fragment>
      <div className="col-xl-9 col-lg-7 col-md-6 pt-3">
        <div>
          <div className="row mt-4">
            <div className="col-12 pb-2">
              <p className="f-w-s-bold f-18 m-0 c-black"> User Permissions</p>
            </div>
            <div>
              <div className="col-6 pb-2">
                {/* <label> Super admins </label> */}
                <div id="userfldSettingSuperAdmins">
                  <PeoplePicker
                    context={context}
                    titleText={"Super Admin"}
                    placeholder={"Enter Name Here."}
                    personSelectionLimit={3}
                    onChange={getPeoplePickerItems}
                    // showHiddenInUI={false}
                    ensureUser={true}
                    // principalTypes={[PrincipalType.User]}
                    // resolveDelay={1000}
                    // defaultSelectedUsers={isAssignUserData}
                  />
                  {formErrors["email"] && <p>{formErrors["email"]}</p>}
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row form-group pt-2">
        <div className="col-12">
          <button
            className="btn btn-primary big-btn "
            type="button"
            onClick={handleSubmit}
          >
            Save permission
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
