import { useState, useEffect } from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";

const UseForm = (submitForm: any, ValidateInfo: any) => {
  const initialFormState = {
    ID: null,
    Title: "",
    Customer: "",
    Store: "",
    Location: "",
    Branch: "",
    ProjectType: "",
    TradeClass: "",
    BidCreateDate: "",
    BidReceivedDate: "",
    BiddeadlineDate: "",
    // BidStatus: "",
    // AssignTo: "",
  };
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  taking Values from input ...
  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // add an item to the list
  const saveData = async () => {
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle("OpportunitiesList")
      .items.add({
        ID: values.ID,
        Title: values.Title,
        Customer: values.Customer,
        Store: values.Store,
        Location: values.Location,
        Branch: values.Branch,
        ProjectType: values.ProjectType,
        TradeClass: values.TradeClass,
        BidCreateDate: values.BidCreateDate,
        BidReceivedDate: values.BidReceivedDate,
        BiddeadlineDate: values.BiddeadlineDate,
        // BidStatus: values.BidStatus,
        // AssignTo: values.AssignTo,
      });
    console.log("submitted form...");
    
  };

  const formSubmit = (): void => {
    setIsSubmitting(true);
  };
  //  Submitted the from  ...
  const handleSubmit = (): void => {
    saveData();
    setErrors(ValidateInfo(values));
    formSubmit();
    console.log("saveData value", saveData);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm(true);
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default UseForm;
