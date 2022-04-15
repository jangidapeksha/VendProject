const ValidateInfo = (values: any) => {
  let errors: any = {};
  let regex = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g;
  let dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/    
  if (!values.Title.trim()) {
    errors.Title = "Title required";
  }
  // else if (!/^[A-Za-z]+/.test(values.Title.trim())) {
  //   errors.Title = 'Enter a Title ';
  // }

  if (!values.Customer.trim()) {
    errors.Customer = "Customer required";
  } 
  if (!values.Store) {
    errors.Store = "Store is required";
  } else if (/^[0-9][0-9]{9}$/.test(values.Store)) {
    errors.Store = "Please Enter correct Store";
  }
  if (!values.Location.trim()) {
    errors.Location = "Location is required";
  } 
  if (!values.Branch.trim()) {
    errors.Branch = "Branch is required";
  }
  if (!values.ProjectType.trim()) {
    errors.ProjectType = "ProjectType is required";
  } 
  if (!values.TradeClass.trim()) {
    errors.TradeClass = "TradeClass is required";
  } 
  if (!values.BidCreateDate.trim()) {
    errors.BidCreateDate = "Date is required";
  } 
  if (!values.BidReceivedDate.trim()) {
    errors.BidReceivedDate = "Date is required";
  } 
  if (!values.BiddeadlineDate.trim()) {
    errors.BiddeadlineDate = "Date is required";
  } 
  if (!values.BidStatus) {
    errors.BidStatus = "BidStatus is required";
  } else if (!regex.test(values.BidStatus)) {
    errors.BidStatus = "Please Enter Correct BidStatus Name";
  }
  if (!values.AssignTo) {
    errors.AssignTo = "AssignTo is required";
  } else if (!regex.test(values.AssignTo)) {
    errors.AssignTo = "Please Enter Correct AssignTo Name";
  }
  return errors;
};
export default ValidateInfo;
