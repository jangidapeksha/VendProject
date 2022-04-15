import * as React from "react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

let agGridActions = {
  data: [],
  DeleteRow: (params: any) => {
    console.log("params====>", params);
    let force = false;
    let confirm = true;
    if (!force) {
      confirm = window.confirm(
        `are you sure you want to delete this row: ${JSON.stringify(
          params.data
        )})`
      );
    }
    if (confirm) {
      console.log();
      params.api.updateRowData({ remove: [params.data] });
      params.api.refreshCells({ force: true });
      deleteListData(params.data,params.data.Id);
      
    }
  },
};
const deleteListData = async (data: any,id:any) => {
  // const items: any[] = await sp.web.lists.getByTitle("VendorConfig").items.get();
  // const temp = data.filter(item => item!== item.Id);
  // console.log("temp",temp);
  // const copy = data; // Create a copy of sourceData
  // const index = copy.findIndex(); // Look for the index
  // if (index >= 0) {// We have index  make sure is not -1
  //   copy.splice(index, 1); // Splice the copy.
  // }
  const temp = agGridActions.data;
  let tempRemainData = temp.filter(item => item.Id!== id);
  let list = sp.web.lists.getByTitle("VendorConfig");
  const updateItem = await list.items
    .getById(parseInt(localStorage.getItem("ActiveTabID")))
    .update({
      Title: localStorage.getItem("ActiveTab"),
      vValue: JSON.stringify(tempRemainData),
    });
    console.log("tempData",tempRemainData);
};
export default agGridActions;

