import { createReducer, on } from '@ngrx/store';
import { Confirmation, Message } from 'primeng/api';
import { LayoutActions } from '../../action/layout/layout.action';

export const initialState: LayoutState = {
  toggleOpen: 0,
  toggleClose: 0,
  option: null,
  message: null,
};

export interface LayoutState {
  /**
   * 觸發開啟次數
   */
  toggleOpen: number;
  /**
   * 觸發關閉次數
   */
  toggleClose: number;
  option: Confirmation | null;
  message: Message | null;
}
export const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.uPDATE_LOADING_STATUS, (state, action) => {
    const counter = action.status
      ? { toggleOpen: state.toggleOpen + 1 }
      : { toggleClose: state.toggleClose + 1 };
    return {
      ...state,
      ...counter,
    };
  }),
  on(LayoutActions.uPDATE_CONFIRM_DIALOG, (state, action) => {
    return {
      ...state,
      option: action.option,
    };
  }),
  on(LayoutActions.uPDATE_TOAST, (state, action) => {
    return {
      ...state,
      message: action.message,
    };
  })
);
