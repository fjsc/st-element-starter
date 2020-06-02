/*
 * © 2020 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

import { LitElement, html, customElement } from 'lit-element';
import '../element/st-horizontal-tabs';
import { StHorizontalTab } from '../element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('demo-snippet')
export class DemoSnippet extends LitElement {

  public tabs: StHorizontalTab[] = [{
    id: 'tab-1',
    text: 'tab1'
  },
  {
    id: 'tab-2',
    text: 'tab2'
  },{
    id: 'tab-3',
    text: 'tab3'
  }];
  

  render() {
    return html`
    <st-horizontal-tabs
      .options="${this.tabs}"></st-horizontal-tabs>
   `;
  }



}

declare global {
  interface HTMLElementTagNameMap {
    'demo-snippet': DemoSnippet;
  }
}