import { createSelector } from '@ngrx/store';
import { LayoutState } from '../../reducer/layout/layout.reducers';
import { IRootState } from '../../reducer';

/**
 * selectLayout STATE
 * @param state IRootState
 * @returns (state: IRootState) => state.layout
 */
export const selectLayout = (state: IRootState) => state.layout;
/**
 * LOADING SELECTOR
 * @type { MemoizedSelector<IRootState, boolean, (s1: LayoutState) => boolean>}
 */
export const selectLayoutLoading = createSelector(
  selectLayout,
  (state: LayoutState) => state.toggleOpen > state.toggleClose
);
/**
 * CONFIRM SELECTOR
 * @type {MemoizedSelector<IRootState, IPopupViewModel | null, (s1: LayoutState) => IPopupViewModel | null>}
 */
export const selectLayoutConfirm = createSelector(
  selectLayout,
  (state: LayoutState) => state.option
);
/**
 * TOAST SELECTOR
 */
export const selectLayoutToast = createSelector(
  selectLayout,
  (state: LayoutState) => state.message
);
