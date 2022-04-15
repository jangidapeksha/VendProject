import * as React from "react";
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Button, Modal } from "react-bootstrap";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import statusList from "./StatusList";

const PopupForm: React.FunctionComponent<any> = ({
  context,
  showPopUpClose,
  gobalIDData
}) => {
  const [show, setShow] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState("");
  const [assignTo, setAssignTo] = React.useState([]);
  const [assignUserData, setAssignUserData] = React.useState<string[]>([]);

  const handleClose = (): void => {
    showPopUpClose();
  };

  const handleSubmit = (e): void => {
    console.log(`
        Status: ${status}
        AssignTo: ${assignTo}
      `);
    e.preventDefault();
    updateListItem();
  };

  const getPeoplePickerItems = (items: any) => {
    let tempUserData: any[] = [];
    for (let i = 0; i < items.length; i++) {
      tempUserData.push(items[i].id);
      // tempUserData.push(items[i].secondaryText);
    }
    // handleSubmit(tempUserName);
    setAssignTo(tempUserData);
    console.log("items===>>", items);
    console.log("tempUserName", tempUserData);
  };

  const updateListItem = async () => {
    let items = await sp.web.lists
      .getByTitle("OpportunitiesList")
      .items.getById(gobalIDData)
      .select("ID", "AssignTo/Title", "AssignTo/EMail")
      .expand("AssignTo")
      .get();
    console.log(items);
    let list = sp.web.lists.getByTitle("OpportunitiesList");
    const i = await list.items.getById(gobalIDData).update({
      BidStatus: status,
      AssignToId: {
        results: assignTo
      }
    });
    handleClose();
  };

  const getDefaultUserData = async () => {
    try {
      let items = await sp.web.lists
        .getByTitle("OpportunitiesList")
        .items.getById(gobalIDData)
        .select("ID", "AssignTo/Title", "AssignTo/EMail")
        .expand("AssignTo")
        .get();
      console.log(items);
      let getDataFormList = items.AssignTo;
      let emailArray = [];
      if (getDataFormList) {
        for (let i = 0; i < getDataFormList.length; i++) {
          let getTitle = getDataFormList[i].Title;
          let getEmail = getDataFormList[i].EMail;
          emailArray.push(getEmail);
        }
        //console.log("AssignUserData", assignUserData);
      }
      setAssignUserData(emailArray);
    } catch (e) {
      console.error("errors..!!!",e);
    }
  };

  React.useEffect(() => {
    getDefaultUserData();
  }, []);
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pick List</Modal.Title>
        </Modal.Header>
        <div className="row  div-margin-form">
          <div className="col-md-12 p-0"></div>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="col-12">
                Status<span className="">*</span>
              </label>
              <div className="col-lg-3 col-md-6 col-sm-8">
                <select
                  name="status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  required
                >
                  <option key="" selected>
                    Status
                  </option>
                  {statusList.map((item: any) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-12">
                AssignTo<span className="">*</span>
              </label>
              <div className="col-lg-2 col-md-6 col-sm-8">
                <PeoplePicker
                  context={context}
                  // titleText={"AssignTo"}
                  placeholder={"Enter Name Here."}
                  personSelectionLimit={3}
                  onChange={getPeoplePickerItems}
                  // showHiddenInUI={false}
                  ensureUser={true}
                  // principalTypes={[PrincipalType.User]}
                  // resolveDelay={1000}
                  defaultSelectedUsers={assignUserData}
                />
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default PopupForm;
