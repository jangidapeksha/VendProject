import * as React from "react";
import "../MasterData/MasterData.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faUserCircle,
  faCodeBranch,
  faProjectDiagram,
  faUsersCog,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import AddMasterDataFrom from "./AddMasterDataFrom";
import Admin from "../SuperAdmin/Admin";

const MasterPage: React.FunctionComponent<any> = ({ Close, context }) => {
  const [activeFormShow, setActiveFormShow] = React.useState("CustomerForm");

  const doBack = (): void => {
    Close();
  };

  return (
    <React.Fragment>
      <div>
        <div className="row pb-2">
          {/* <div className="col-6 text-right">
            <a
              href="#"
              id="btnAddNewUser"
              className="btn btn-primary big-btn SwitchTitleColor d-none"
            >
              <i className="icon-add mr-2"></i>
            </a> */}
        </div>
        <div className="col-6 text-right">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={doBack}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
        </div>
        <div className="col-6">
          <h4 className="title">MasterData</h4>
        </div>
      </div>
      <div className="row mt-4">
        <div className="settings-d-line"></div>
        <div className="col-md-4">
          <div className="settings-left-btn">
            <ul>
              <li className=" active text-decoration-none">
                <a
                  href="#"
                  className="btn "
                  role="button"
                  onClick={() => setActiveFormShow("Admin")}
                >
                  <FontAwesomeIcon icon={faUserAlt} />
                  UserPermission
                </a>
              </li>
              <li className=" text-decoration-none">
                <a
                  href="#"
                  className="btn "
                  role="button"
                  onClick={() => setActiveFormShow("CustomerForm")}
                >
                  <FontAwesomeIcon icon={faUserCircle} /> Customer
                </a>
              </li>
              <li className="text-decoration-none">
                <a
                  href="#"
                  className="btn "
                  role="button"
                  onClick={() => setActiveFormShow("LoctionForm")}
                >
                  <FontAwesomeIcon icon={faLocationArrow} /> Loction
                </a>
              </li>
              <li className="text-decoration-none">
                <a
                  href="#"
                  className="btn"
                  role="button"
                  onClick={() => setActiveFormShow("BranchForm")}
                >
                  <FontAwesomeIcon icon={faCodeBranch} /> Branch
                </a>
              </li>
              <li className="text-decoration-none">
                <a
                  href="#"
                  className="btn"
                  role="button"
                  onClick={() => setActiveFormShow("ProjectTypeForm")}
                >
                  <FontAwesomeIcon icon={faProjectDiagram} /> Project Type
                </a>
              </li>
              <li className="text-decoration-none">
                <a
                  href="#"
                  className="btn"
                  role="button"
                  onClick={() => setActiveFormShow("TradeClassForm")}
                >
                  <FontAwesomeIcon icon={faUsersCog} /> Trade Class
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          {activeFormShow === "Admin" && (
            <Admin
              formHeading={"Admin"}
              ActiveTab={"Admin"}
              context={context}
            />
          )}
          {activeFormShow === "CustomerForm" && (
            <AddMasterDataFrom
              formHeading={"Customer"}
              ActiveTab={"Customer"}
            />
          )}
          {activeFormShow === "LoctionForm" && (
            <AddMasterDataFrom
              formHeading={"Location"}
              ActiveTab={"Location"}
            />
          )}
          {activeFormShow === "BranchForm" && (
            <AddMasterDataFrom formHeading={"Branch"} ActiveTab={"Branch"} />
          )}
          {activeFormShow === "ProjectTypeForm" && (
            <AddMasterDataFrom
              formHeading={"Project Type"}
              ActiveTab={"ProjectType"}
            />
          )}
          {activeFormShow === "TradeClassForm" && (
            <AddMasterDataFrom
              formHeading={"Trade Class"}
              ActiveTab={"TradeClass"}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MasterPage;
