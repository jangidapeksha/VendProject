import * as React from "react";
import { ISpfxVendormanagementProps } from "./ISpfxVendormanagementProps";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

export default class SpfxVendormanagement extends React.Component<ISpfxVendormanagementProps,
{}
> {
  constructor(props: any) {
    super(props);
    console.log("props all context", props);
  }

  public render(): React.ReactElement<ISpfxVendormanagementProps> {
    return (
      <div>
        <App {...this.props} />;
      </div>
    );
  }
}
