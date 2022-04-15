import * as React from "react";
import ValidateInfo from "./ValidateInfo";
import UseForm from "./UseForm";
import "./Form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const AddOpportunitiesForm: React.FunctionComponent<any> = ({
  submitForm,
  Close
}) => {
  const [customerTabData, setCustomerTabData] = React.useState<string[]>([]);
  const [loctionTabData, setLoctionTabData] = React.useState<string[]>([]);
  const [branchTabData, setBranchTabData] = React.useState<string[]>([]);
  const [projectTypeTabData, setProjectTypeTabData] = React.useState<string[]>(
    []
  );
  const [tradeClassTabData, setTradeClassTabData] = React.useState<string[]>(
    []
  );
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { handleChange, handleSubmit, values, errors } = UseForm(
    submitForm,
    ValidateInfo
  );

  const doCancel = (): void => {
    Close();
  };

  React.useEffect(() => {
    getMasterPageListItem();
  }, []);

  const getMasterPageListItem = async () => {
    let items = await sp.web.lists.getByTitle("VendorConfig").items.get();
    console.log(items);
    let getItemFormList = items;
    for (let i = 0; i < getItemFormList.length; i++) {
      let getTitleData = getItemFormList[i].Title;
      let getVvalueData = JSON.parse(getItemFormList[i].vValue);
      switch (getTitleData) {
        case "Customer":
          setCustomerTabData(getVvalueData);
          break;
        case "Location":
          setLoctionTabData(getVvalueData);
          break;
        case "Branch":
          setBranchTabData(getVvalueData);
          break;
        case "ProjectType":
          setProjectTypeTabData(getVvalueData);
          break;
        case "TradeClass":
          setTradeClassTabData(getVvalueData);
          break;
      }
      // console.log("getItemFormList===>>>", vValueArray);
    }
  };

  const handleSubmitForm = (e): void => {
    e.preventDefault();
    handleSubmit();
  };
  const formSubmit = (): void => {
    setIsSubmitted(true);
  };

  React.useEffect(() => {
    formSubmit();
  }, [submitForm]);

  return (
    <React.Fragment>
      <div>
        <div className="row pb-4">
          <div className="col-12 pb-3">
            <h4 className="title">Add List</h4>
          </div>
          {/* <div className="col-12">
                        <h5 className="sub-heading">General Information and Description</h5>
                    </div>*/}
        </div>
        <div className="row  div-margin-form">
          <div className="col-md-12 p-0">
            <form
              className="add-project-form pb-6"
              onSubmit={handleSubmitForm}
              noValidate
            >
              <div className="form-group">
                <label className="col-12">
                  Title<span className="">*</span>
                </label>
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <input
                    className="form-control form-control-sm "
                    name="Title"
                    type="text"
                    placeholder="Enter Title Name "
                    value={values.Title}
                    onChange={handleChange}
                  />
                  {errors["Title"] && <p>{errors["Title"]}</p>}
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  Customer<span className="">*</span>
                </label>
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <select
                    name="Customer"
                    value={values.Customer}
                    onChange={handleChange}
                    required
                  >
                    <option key="" selected>
                      Customer
                    </option>
                    {customerTabData.map((item: any) => (
                      <option key={"Customer" + item.Id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors["Customer"] && <p>{errors["Customer"]}</p>} */}
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  Store<span className="">*</span>{" "}
                </label>
                <div className="col-lg-2 col-md-6 col-sm-8">
                  <input
                    className="form-control form-control-sm"
                    name="Store"
                    type="number"
                    placeholder="Enter Store Number"
                    value={values.Store}
                    onChange={handleChange}
                  />
                  {errors["Store"] && <p>{errors["Store"]}</p>}
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  Location<span className="">*</span>{" "}
                </label>
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <select
                    name="Location"
                    value={values.Location}
                    onChange={handleChange}
                    required
                  >
                    <option key="" selected>
                      Location
                    </option>
                    {loctionTabData.map((item: any) => (
                      <option key={"Location" + item.Id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors["Location"] && <p>{errors["Location"]}</p>} */}
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  Branch<span className="">*</span>{" "}
                </label>

                <div className="col-lg-3 col-md-6 col-sm-8">
                  <select
                    name="Branch"
                    value={values.Branch}
                    onChange={handleChange}
                    required
                  >
                    <option key="" selected>
                      Branch
                    </option>
                    {branchTabData.map((item: any) => (
                      <option key={"Branch" + item.Id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors["Branch"] && <p>{errors["Branch"]}</p>} */}
                </div>
              </div>
              <div className="form-group">
                <label className="col-12">
                  Project Type<span className="">*</span>{" "}
                </label>
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <select
                    name="ProjectType"
                    value={values.ProjectType}
                    onChange={handleChange}
                    required
                  >
                    <option key="" selected>
                      ProjectType
                    </option>
                    {projectTypeTabData.map((item: any) => (
                      <option key={"ProjectType" + item.Id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors["ProjectType"] && <p>{errors["ProjectType"]}</p>} */}
                </div>
              </div>
              <div className="form-group">
                {" "}
                <label className="col-12">
                  Trade Class<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <select
                    name="TradeClass"
                    value={values.TradeClass}
                    onChange={handleChange}
                    required
                  >
                    <option key="" selected>
                      TradeClass
                    </option>
                    {tradeClassTabData.map((item: any) => (
                      <option key={"TradeClas" + item.Id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors["TradeClass"] && <p>{errors["TradeClass"]}</p>} */}
                </div>
              </div>
              <div className="form-group">
                {" "}
                <label className="col-12">
                  Bid Create Date<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-2 col-md-6 col-sm-8">
                  {" "}
                  <input
                    className="form-control form-control-sm"
                    name="BidCreateDate"
                    type="date"
                    value={values.BidCreateDate}
                    onChange={handleChange}
                    placeholder="Enter Bid Create Date Name "
                  />
                  {errors["BidCreateDate"] && <p>{errors["BidCreateDate"]}</p>}
                </div>
              </div>
              <div className="form-group">
                {" "}
                <label className="col-12">
                  Bid Received Date<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-2 col-md-6 col-sm-8">
                  {" "}
                  <input
                    className="form-control form-control-sm"
                    name="BidReceivedDate"
                    type="date"
                    value={values.BidReceivedDate}
                    onChange={handleChange}
                    placeholder="Enter Bid Received Date Name "
                  />
                  {errors["BidReceivedDate"] && (
                    <p>{errors["BidReceivedDate"]}</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                {" "}
                <label className="col-12">
                  Bid Deadline Date<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-2 col-md-6 col-sm-8">
                  {" "}
                  <input
                    className="form-control form-control-sm"
                    name="BiddeadlineDate"
                    type="date"
                    value={values.BiddeadlineDate}
                    onChange={handleChange}
                    placeholder="Enter BiddeadlineDate Name "
                  />
                  {errors["BiddeadlineDate"] && (
                    <p>{errors["BiddeadlineDate"]}</p>
                  )}
                </div>
              </div>
              {/* <div className="form-group">
                {" "}
                <label className="col-12">
                  Bid Status<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-3 col-md-6 col-sm-8">
                  <input
                    className="form-control form-control-sm"
                    name="BidStatus"
                    type="text"
                    value={values.BidStatus}
                    onChange={handleChange}
                    placeholder="Enter Bid Status Name "
                  />

                  {errors["BidStatus"] && <p>{errors["BidStatus"]}</p>}
                </div>
              </div>{" "} */}
              {/* <div className="form-group">
                {" "}
                <label className="col-12">
                  Assignment Status<span className="">*</span>{" "}
                </label>{" "}
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <input
                    className="form-control form-control-sm"
                    name="AssignTo"
                    type="text"
                    value={values.AssignTo}
                    onChange={handleChange}
                    placeholder="Enter Assignment Status Name "
                  />

                  {errors["AssignTo"] && (
                    <p>{errors["AssignTo"]}</p>
                  )}
                </div>
              </div> */}
              <div className="form-group mb-2">
                {" "}
                <div className="col-6 text-right footer-actions mb-3">
                  <input
                    type="Button"
                    className=" btn btn-sm btn-outline-primary  mb-3 mr-1"
                    id="btnFooterCancel"
                    value="Cancel"
                    onClick={doCancel}
                  />

                  <button className="btn btn-sm btn-primary mb-3" type="submit">
                    Add List{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddOpportunitiesForm;
