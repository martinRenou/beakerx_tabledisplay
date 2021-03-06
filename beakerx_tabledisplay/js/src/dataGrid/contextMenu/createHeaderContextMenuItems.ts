/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { IContextMenuItem } from '../../contextMenu/IContextMenuItem';
import { BeakerXDataGrid } from '../BeakerXDataGrid';
import { DataGridContextMenu } from './DataGridContextMenu';

export function createHeaderContextMenuItems(
  dataGrid: BeakerXDataGrid,
  contextMenu: DataGridContextMenu,
): IContextMenuItem[] {
  const selector = `#${dataGrid.wrapperId} canvas`;

  const rotateMenuItemAction = function (headersVertical: boolean): () => void {
    return () => {
      dataGrid.dataModel.setHeaderTextVertical(headersVertical);
      dataGrid.resize();
    };
  };

  const isVisible = (headersVertical: boolean) => {
    const data = dataGrid.getCellData(contextMenu.event.clientX, contextMenu.event.clientY);

    if (!data || data.offsetTop >= dataGrid.headerHeight) {
      return false;
    }

    return headersVertical;
  };

  return [
    {
      id: `${dataGrid.wrapperId}_verticalHeaders`,
      title: 'vertical headers',
      action: rotateMenuItemAction(true),
      isVisible: () => isVisible(!dataGrid.store.selectHeadersVertical()),
      selector,
    },
    {
      id: `${dataGrid.wrapperId}_horizontalHeaders`,
      title: 'horizontal headers',
      action: rotateMenuItemAction(false),
      isVisible: () => isVisible(!!dataGrid.store.selectHeadersVertical()),
      selector,
    },
  ];
}
