import * as React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = () => {
    toast.success("Submitted...!");
  };
  
const Toaster = () => {

  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer />
    </div>
  );
};
export default Toaster;

// Note :- required to install the react toster module then toster is working fine...
