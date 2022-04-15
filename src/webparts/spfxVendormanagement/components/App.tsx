import * as React from "react";
import Grid from "./AgGrid/Grid";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import MasterPage from "../../MasterData/MasterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupForm from "./PeoplePickerForm/PopupForm";
import AddOpportunitiesForm from "./Form/AddOpportunitiesForm";
// import AddOpportunitiesForm from "./Form/AddOpportunitiesForm";

const App: React.FunctionComponent<any> = (props) => {
  const [rowData, setRowData] = React.useState([]);
  const [openForm, setOpenForm] = React.useState("");

  React.useEffect(() => {
    VSP();
  }, []);

  const VSP = async () => {
    const items: any[] = await sp.web.lists
      .getByTitle("OpportunitiesList")
      .items.select(
        "ID",
        "Title",
        "Customer",
        "Store",
        "Location",
        "Branch",
        "ProjectType",
        "TradeClass",
        "BidCreateDate",
        "BidReceivedDate",
        "BiddeadlineDate",
        "BidStatus",
        "AssignTo/Title"
      )
      .expand("AssignTo/Title")
      .get();
    console.log(items);
    setRowData(items.reverse());
  };

  console.log("rowdata", rowData);

  const addOpportunities = (): void => {
    setOpenForm("addOpportunities");
    // console.log("its working addOpportunities....");
  };

  const masterData = (): void => {
    setOpenForm("masterData");
    // console.log("its working masterData....");
  };

  const popupForm = (): void => {
    setOpenForm("PopupForm");
    // console.log("its working masterData....");
  };

  const Close = (): void => {
    setOpenForm("Close");
  };

  const ShowCases = () => {
    switch (openForm) {
      case "addOpportunities":
        // return <DisplayForm ShowList={ShowList} />;
        return <AddOpportunitiesForm Close={Close}/>;
      case "masterData":
        return <MasterPage Close={Close} context={props.context} />;
      case "PopupForm":
        return <PopupForm popupForm={popupForm} />;
      default:
        return (
          <Grid
            data={rowData}
            addOpportunities={addOpportunities}
            masterData={masterData}
            context={props.context}
          />
        );
    }
  };

  return (
    <React.Fragment>
      <div>
        <ShowCases />
      </div>
    </React.Fragment>
  );
};

export default App;
