import { LayoutState, layoutReducer } from './layout/layout.reducers';

export interface IRootState {
  layout: LayoutState;
}

export const rootReducer = {
  layout: layoutReducer,
};
