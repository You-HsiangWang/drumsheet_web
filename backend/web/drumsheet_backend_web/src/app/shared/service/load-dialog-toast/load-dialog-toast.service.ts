import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';
import { Observable, of } from 'rxjs';
import { Confirmation, Message } from 'primeng/api';
import { TypedAction } from '@ngrx/store/src/models';
import { DialogType } from '../../enum/dialog-type.enum';
import { ToastType } from '../../enum/toast-type.enum';
import { LayoutActions } from '../../../core/store/action';

/**
 * 控制loading / popup / 通知(toast) 的service
 */
@Injectable({
  providedIn: 'root',
})
export class LoadDialogToastService {
  /**
   * ngStore
   */
  private store = inject(Store);

  /**
   * 開關LOADING
   * @param status loading狀態
   */
  controlLoading(status: boolean): void {
    this.store.dispatch(
      LayoutActions.uPDATE_LOADING_STATUS({ status: status })
    );
  }

  /**
   * 開關POPUP
   * @param type DialogType popup樣式 Success / Confirm / Error
   * @param message popup顯示訊息
   * @param acceptFunction 確認後call back
   * @param rejectFunction 取消後call back
   */
  openDialog(
    type: DialogType,
    message: string,
    acceptFunction?: AnyFn,
    rejectFunction?: AnyFn
  ): void {
    const dialogConfig = {
      header: '',
      icon: '',
      rejectVisible: false,
      acceptVisible: false,
    };
    switch (type) {
      case DialogType.Success:
        dialogConfig.header = '成功';
        dialogConfig.icon = 'pi pi-check-circle text-green-500';
        dialogConfig.rejectVisible = false;
        dialogConfig.acceptVisible = true;
        break;
      case DialogType.Error:
        dialogConfig.header = '錯誤';
        dialogConfig.icon = 'pi pi-times-circle text-red-500';
        dialogConfig.rejectVisible = false;
        dialogConfig.acceptVisible = true;
        break;
      case DialogType.Confirm:
        dialogConfig.header = '確認';
        dialogConfig.icon = 'pi pi-exclamation-circle text-blue-500';
        dialogConfig.rejectVisible = true;
        dialogConfig.acceptVisible = true;
        break;
    }
    this.store.dispatch(
      LayoutActions.uPDATE_CONFIRM_DIALOG({
        option: {
          header: dialogConfig.header,
          message: message,
          icon: dialogConfig.icon,
          rejectVisible: dialogConfig.rejectVisible,
          acceptVisible: dialogConfig.acceptVisible,
          acceptLabel: '確認',
          rejectLabel: '取消',
          acceptButtonStyleClass: 'p-button-raised p-button-success',
          rejectButtonStyleClass: 'p-button-raised p-button-secondary',
          accept: acceptFunction,
          reject: rejectFunction,
        },
      })
    );
  }

  /**
   * 開關通知
   * @param type ToastType 通知樣式 Success / Info / Warn / Error
   * @param message Toast顯示訊息
   */
  openToast(type: ToastType, message: string): void {
    const messageConfig = {
      severity: '',
      summary: '',
    };
    switch (type) {
      case ToastType.Success:
        messageConfig.severity = 'success';
        messageConfig.summary = message;
        break;
      case ToastType.Info:
        messageConfig.severity = 'info';
        messageConfig.summary = message;
        break;
      case ToastType.Warn:
        messageConfig.severity = 'warn';
        messageConfig.summary = message;
        break;
      case ToastType.Error:
        messageConfig.severity = 'error';
        messageConfig.summary = message;
        break;
    }
    this.store.dispatch(
      LayoutActions.uPDATE_TOAST({
        message: {
          severity: messageConfig.severity,
          summary: messageConfig.summary,
        },
      })
    );
  }

  /**
   * 開關LOADING 回傳OBSERVABLE
   * @param status loading狀態
   * @returns Observable<{ status: boolean } & TypedAction<'[LAYOUT] UPDATE_LOADING_STATUS'>>
   */
  observeControlLoading(
    status: boolean
  ): Observable<
    { status: boolean } & TypedAction<'[LAYOUT] UPDATE_LOADING_STATUS'>
  > {
    return of(LayoutActions.uPDATE_LOADING_STATUS({ status: status }));
  }

  /**
   * 開關POPUP 回傳OBSERVABLE
   * @param type DialogType popup樣式 Success / Confirm / Error
   * @param message popup顯示訊息
   * @returns Observable<{ option: Confirmation } & TypedAction<'[LAYOUT] UPDATE_CONFIRM_DIALOG'>>
   */
  observeOpenDialog(
    type: DialogType,
    message: string,
    acceptFunction?: AnyFn,
    rejectFunction?: AnyFn
  ): Observable<
    { option: Confirmation } & TypedAction<'[LAYOUT] UPDATE_CONFIRM_DIALOG'>
  > {
    const dialogConfig = {
      header: '',
      icon: '',
      rejectVisible: false,
      acceptVisible: false,
    };
    switch (type) {
      case DialogType.Success:
        dialogConfig.header = '成功';
        dialogConfig.icon = 'pi pi-check-circle text-green-500';
        dialogConfig.rejectVisible = false;
        dialogConfig.acceptVisible = true;
        break;
      case DialogType.Error:
        dialogConfig.header = '錯誤';
        dialogConfig.icon = 'pi pi-times-circle text-red-500';
        dialogConfig.rejectVisible = false;
        dialogConfig.acceptVisible = true;
        break;
      case DialogType.Confirm:
        dialogConfig.header = '確認';
        dialogConfig.icon = 'pi pi-exclamation-circle text-blue-500';
        dialogConfig.rejectVisible = true;
        dialogConfig.acceptVisible = true;
        break;
    }
    return of(
      LayoutActions.uPDATE_CONFIRM_DIALOG({
        option: {
          header: dialogConfig.header,
          message: message,
          icon: dialogConfig.icon,
          rejectVisible: dialogConfig.rejectVisible,
          acceptVisible: dialogConfig.acceptVisible,
          acceptLabel: '確認',
          rejectLabel: '取消',
          acceptButtonStyleClass: 'p-button-raised p-button-success',
          rejectButtonStyleClass: 'p-button-raised p-button-secondary',
          accept: acceptFunction,
          reject: rejectFunction,
        },
      })
    );
  }

  /**
   * 開關通知 回傳OBSERVABLE
   * @param type ToastType 通知樣式 Success / Info / Warn / Error
   * @param message Toast顯示訊息
   * @returns Observable<{ message: Message } & TypedAction<'[LAYOUT]UPDATE_TOAST'>>
   */
  observeOpenToast(
    type: ToastType,
    message: string
  ): Observable<{ message: Message } & TypedAction<'[LAYOUT] UPDATE_TOAST'>> {
    const messageConfig = {
      severity: '',
      summary: '',
    };
    switch (type) {
      case ToastType.Success:
        messageConfig.severity = 'success';
        messageConfig.summary = message;
        break;
      case ToastType.Info:
        messageConfig.severity = 'info';
        messageConfig.summary = message;
        break;
      case ToastType.Warn:
        messageConfig.severity = 'warn';
        messageConfig.summary = message;
        break;
      case ToastType.Error:
        messageConfig.severity = 'error';
        messageConfig.summary = message;
        break;
    }
    return of(
      LayoutActions.uPDATE_TOAST({
        message: {
          severity: messageConfig.severity,
          summary: messageConfig.summary,
        },
      })
    );
  }
}
