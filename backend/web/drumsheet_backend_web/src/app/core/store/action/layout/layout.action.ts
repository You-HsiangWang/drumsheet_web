import { createActionGroup, props } from '@ngrx/store';
import { Confirmation, Message } from 'primeng/api';

/**
 * LayoutActions
 */
export const LayoutActions = createActionGroup({
  source: 'LAYOUT',
  events: {
    /**
     * 更新系統遮罩狀態
     */
    UPDATE_LOADING_STATUS: props<{ status: boolean }>(),
    /**
     * 更新訊息popup
     */
    UPDATE_CONFIRM_DIALOG: props<{ option: Confirmation }>(),
    /**
     * 更新通知
     */
    UPDATE_TOAST: props<{ message: Message }>(),
  },
});
