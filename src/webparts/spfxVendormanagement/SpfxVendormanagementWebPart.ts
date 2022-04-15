import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxVendormanagementWebPartStrings';
import SpfxVendormanagement from './components/SpfxVendormanagement';
import { ISpfxVendormanagementProps } from './components/ISpfxVendormanagementProps';
import { sp } from "@pnp/sp/presets/all";

export interface ISpfxVendormanagementWebPartProps {
  description: string;
}

export default class SpfxVendormanagementWebPart extends BaseClientSideWebPart<ISpfxVendormanagementWebPartProps> {
  /* Start here this for sharepoint interaction for getting list data from the sharepoint using pnpjs */
  protected onInit(): Promise<void> {
    // onInit function use for interaction for sharepoint..//
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }
  /* this End here.. */
  public render(): void {
    const element: React.ReactElement<ISpfxVendormanagementProps> =
      React.createElement(SpfxVendormanagement, {
        description: this.properties.description,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
