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

export enum StHorizontalTabStatus { warning = <any>'warning', error = <any>'error' }

export interface StHorizontalTab {
  id: string;
  text: string;
  status?: StHorizontalTabStatus;
}

export interface StHorizontalTabSchema {
  id: string;
  text: TranslateableElement;
}

export interface TranslateableElement {
  key: string;
  translate: boolean;
}