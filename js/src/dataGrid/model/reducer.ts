/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
//
// import { each } from '@lumino/algorithm';
// // import { Reducer } from '@lumino/datastore';
// import { IDataGridModelState } from '../interface/IDataGridModelState';
// import { IHighlighterState } from '../interface/IHighlighterState';
// import { DataGridAction, DataGridColumnAction } from '../store/DataGridAction';
// import {
//   selectColumnNames,
//   selectColumnOrder,
//   selectColumnsFrozen,
//   selectColumnsVisible,
//   selectHasIndex,
// } from './selectors';
// import { selectColumnHighlighters } from './selectors/column';
// import { selectCellHighlighters } from './selectors/model';

export const UPDATE_MODEL_DATA = 'UPDATE_MODEL_DATA';
export const UPDATE_MODEL_VALUES = 'UPDATE_MODEL_VALUES';
export const UPDATE_MODEL_FONT_COLOR = 'UPDATE_MODEL_FONT_COLOR';
export const UPDATE_COLUMN_RENDERER = 'UPDATE_COLUMN_RENDERER';
export const UPDATE_COLUMN_ORDER = 'UPDATE_COLUMN_ORDER';
export const UPDATE_COLUMN_FROZEN = 'UPDATE_COLUMN_FROZEN';
export const UPDATE_COLUMN_VISIBLE = 'UPDATE_COLUMN_VISIBLE';
export const UPDATE_COLUMNS_VISIBLE = 'UPDATE_COLUMNS_VISIBLE';
export const RESET_COLUMNS_ORDER = 'RESET_COLUMNS_ORDER';
export const ADD_COLUMN_HIGHLIGHTER = 'ADD_COLUMN_HIGHLIGHTER';
export const REMOVE_COLUMN_HIGHLIGHTER = 'REMOVE_COLUMN_HIGHLIGHTER';
//
// export const dataGridModelReducer: Reducer<IDataGridModelState> = (
//   state: IDataGridModelState,
//   action: DataGridAction | DataGridColumnAction,
// ): IDataGridModelState => {
//   switch (action.type) {
//     case UPDATE_MODEL_DATA:
//       return { ...state, ...action.payload };
//
//     case UPDATE_MODEL_VALUES:
//       return { ...state, values: action.payload.values };
//
//     case UPDATE_MODEL_FONT_COLOR:
//       return { ...state, fontColor: action.payload.fontColor };
//
//     case UPDATE_COLUMN_RENDERER:
//       return {
//         ...state,
//         rendererForColumn: {
//           ...state.rendererForColumn,
//           [action.payload.columnName]: action.payload.value,
//         },
//       };
//
//     case UPDATE_COLUMN_ORDER:
//       return reduceColumnOrder(state, action);
//
//     case RESET_COLUMNS_ORDER:
//       return resetColumnsOrder(state, action);
//
//     case UPDATE_COLUMN_FROZEN:
//       return reduceColumnFrozen(state, action);
//
//     case UPDATE_COLUMN_VISIBLE:
//       return reduceColumnVisible(state, action);
//
//     case UPDATE_COLUMNS_VISIBLE:
//       return reduceColumnsVisible(state, action);
//
//     case ADD_COLUMN_HIGHLIGHTER:
//       return addCellHighlighters(state, action);
//
//     case REMOVE_COLUMN_HIGHLIGHTER:
//       return removeCellHighlighters(state, action);
//   }
//
//   return state;
// };
//
// function reduceColumnFrozen(state, action: DataGridColumnAction) {
//   const { columnName, value } = action.payload;
//   const columnsFrozen = selectColumnsFrozen({ model: state });
//
//   return {
//     ...state,
//     columnsFrozen: {
//       ...columnsFrozen,
//       [columnName]: value,
//     },
//   };
// }
//
// function reduceColumnsVisible(state, action) {
//   const columnOrder = [...state.columnOrder];
//
//   if (columnOrder.length > 0) {
//     Object.keys(action.payload.value).forEach((name, index) => {
//       if (columnOrder.indexOf(name) !== -1 || !action.payload.value[name]) {
//         return true;
//       }
//
//       index < columnOrder.length ? columnOrder.splice(index, 0, name) : columnOrder.push(name);
//     });
//   }
//
//   return { ...state, columnOrder, columnsVisible: action.payload.value };
// }
//
// function reduceColumnVisible(state, action: DataGridColumnAction): IDataGridModelState {
//   const { columnName, columnIndex, value } = action.payload;
//   const columnsVisible = selectColumnsVisible({ model: state });
//   const columnOrder = [...selectColumnOrder({ model: state })];
//
//   if (value && columnOrder.length > 0 && columnOrder.indexOf(columnName) === -1) {
//     const position = columnIndex <= columnOrder.length ? columnIndex : columnOrder.length - 1;
//
//     columnOrder.splice(position, 0, columnName);
//   }
//
//   return {
//     ...state,
//     columnOrder,
//     columnsVisible: {
//       ...columnsVisible,
//       [columnName]: value,
//     },
//   };
// }
//
// function reduceColumnOrder(state, action: DataGridColumnAction) {
//   const { columnName, value: position } = action.payload;
//   const columnOrder = getColumnOrderArray(state);
//   const columnVisible = state.columnsVisible;
//   const columnsFrozenen = selectColumnsFrozen({ model: state });
//   const hasIndex = selectHasIndex({ model: state });
//   let destination = hasIndex ? position.value + 1 : position.value;
//
//   Object.keys(columnVisible).forEach((name) => {
//     if (columnVisible[name] !== false) {
//       return true;
//     }
//
//     const position = columnOrder.indexOf(name);
//
//     if (position !== -1) {
//       columnOrder.splice(position, 1);
//       columnOrder.push(name);
//     }
//   });
//
//   const lastPosition = columnOrder.indexOf(columnName);
//
//   if (lastPosition !== -1) {
//     columnOrder.splice(lastPosition, 1);
//   }
//
//   if (destination > 0 && (position.region === 'row-header' || position.region === 'corner-header')) {
//     let frozenCounter = 0;
//
//     columnOrder.forEach((name, index) => {
//       if (columnsFrozenen[name] !== true) {
//         return true;
//       }
//
//       frozenCounter += 1;
//
//       if (frozenCounter === destination) {
//         destination = index;
//       }
//     });
//   }
//
//   columnOrder.splice(destination, 0, columnName);
//
//   return {
//     ...state,
//     columnOrder,
//   };
// }
//
// function resetColumnsOrder(state, action) {
//   const columnOrder = [...state.columnOrder];
//
//   if (action.payload.value) {
//     return { ...state, columnOrder: [] };
//   }
//
//   state.columnNames.forEach((name, index) => {
//     if (columnOrder.indexOf(name) === -1) {
//       columnOrder.splice(index, 0, name);
//     }
//   });
//
//   return {
//     ...state,
//     columnOrder,
//   };
// }
//
// function getColumnOrderArray(state): string[] {
//   const columnOrder = state.columnOrder;
//
//   if (columnOrder.length > 0) {
//     return [...columnOrder];
//   }
//
//   return [...selectColumnNames({ model: state })];
// }
//
// function addCellHighlighters(state, action) {
//   const newState = removeCellHighlighters(state, action);
//   const cellHighlighters = newState.cellHighlighters;
//
//   cellHighlighters.push(action.payload.value);
//
//   return {
//     ...newState,
//     cellHighlighters,
//   };
// }
//
// function removeCellHighlighters(state, action) {
//   const cellHighlighters = [...selectCellHighlighters({ model: state })];
//   const highlighterState: IHighlighterState = action.payload.value;
//   const currentHighlighters = selectColumnHighlighters(
//     { model: state },
//     highlighterState.colName,
//     highlighterState.type,
//   );
//
//   if (currentHighlighters.length > 0) {
//     each(currentHighlighters, (current) => {
//       cellHighlighters.splice(cellHighlighters.indexOf(current), 1);
//     });
//   }
//
//   return {
//     ...state,
//     cellHighlighters,
//   };
// }
