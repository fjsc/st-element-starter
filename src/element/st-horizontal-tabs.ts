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

import { LitElement, html, customElement, property } from 'lit-element';
import { StHorizontalTab, StHorizontalTabStatus } from './st-horizontal-tabs.model';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('st-horizontal-tabs')
export class StHorizontalTabs extends LitElement {

  /** Current active option */
  @property()
  public activeOption: StHorizontalTab;

  /** An array of StHorizontalTab objects (see below) that defines the links
   * that will appear and that will be disabled
   */
  @property()
  public options: StHorizontalTab[] = [];

  /** Prefix used to generate the id values for qa tests */
  @property()
  public qaTag: string;


  render() {
    return html`
    <nav class="st-horizontal-tabs">
      ${this.options.map((option: StHorizontalTab, i: number) =>
      html`
      <a class="tab ${this.getTabClasses(option)}"
        @click="${this.activateOption(option)}"
        href="javascript:void(0)"
        id="${this.qaTag + '-tab-' + i}">${option.text}</a>`)}
      <slot></slot>
    </nav>`;
  }

  public activateOption(option: StHorizontalTab): void {
    this.activeOption = option;
    let myEvent = new CustomEvent('changed-option', {
      detail: option,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  public getTabClasses(tab: StHorizontalTab): string {
    const classes: Array<string> = [];
    if (tab.status) {
      classes.push(StHorizontalTabStatus[tab.status]);
    }

    if (this.activeOption === tab) {
      classes.push('tab--active');
    }
    return classes.join(' ');
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'st-horizontal-tabs': StHorizontalTabs;
  }
}