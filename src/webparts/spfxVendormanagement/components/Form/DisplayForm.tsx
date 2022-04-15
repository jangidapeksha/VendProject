import * as React from "react";
import "./Form.css";
import AddOpportunitiesForm from "./AddOpportunitiesForm";
import Grid from "../AgGrid/Grid";
import App from "../App";

const DisplayForm: React.FunctionComponent<any> = ({ ShowList }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const submitForm = (): void => {
    setIsSubmitted(true);
  };

  React.useEffect(() => {
    
  }, [isSubmitted]);
  
  return (
    <React.Fragment>
      <div className="">
        {!isSubmitted ? (
          <AddOpportunitiesForm submitForm={submitForm} ShowList={ShowList} />
        ) : (
          // <div className="alert alert-success" role="alert">
          //     This is a success Add it the data!
          // </div>
          <Grid/>
        )}
      </div>
    </React.Fragment>
  );
};

export default DisplayForm;
