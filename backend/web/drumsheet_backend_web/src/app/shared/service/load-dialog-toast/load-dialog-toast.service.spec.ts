import { TestBed } from '@angular/core/testing';
import { LoadDialogToastService } from './load-dialog-toast.service';
import { provideMockStore } from '@ngrx/store/testing';
import { DialogType } from '../../enum/dialog-type.enum';
import { ToastType } from '../../enum/toast-type.enum';

describe(LoadDialogToastService.name, () => {
  let service: LoadDialogToastService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LoadDialogToastService, provideMockStore()],
    });
    service = TestBed.inject(LoadDialogToastService);
  });

  it('controlLoading, loading打開 / 關閉', () => {
    const loadingSpy = jest.spyOn(service, 'controlLoading');
    service.controlLoading(true);
    expect(loadingSpy).toHaveBeenCalledWith(true);
    service.controlLoading(false);
    expect(loadingSpy).toHaveBeenCalledWith(false);
  });

  it('openDialog, popup 成功 / 錯誤 / 確認', () => {
    const openDialogSpy = jest.spyOn(service, 'openDialog');
    const acceptFunc = () => console.log('accept');
    const rejectFunc = () => console.log('reject');
    const dialogType = [
      DialogType.Confirm,
      DialogType.Success,
      DialogType.Error,
    ];
    dialogType.forEach((dialog) => {
      service.openDialog(dialog, '測試', acceptFunc, rejectFunc);
      expect(openDialogSpy).toHaveBeenCalledWith(
        dialog,
        '測試',
        acceptFunc,
        rejectFunc
      );
    });
  });

  it('openToast, toast success / info / warn / error', () => {
    const openDialogSpy = jest.spyOn(service, 'openToast');
    const toastType = [
      ToastType.Error,
      ToastType.Info,
      ToastType.Success,
      ToastType.Warn,
    ];
    toastType.forEach((toast) => {
      service.openToast(toast, '測試');
      expect(openDialogSpy).toHaveBeenCalledWith(toast, '測試');
    });
  });

  it(`observeControlLoading, return Observable<{ status: boolean } & TypedAction<'[LAYOUT] UPDATE_LOADING_STATUS'>>`, () => {
    const status = [true, false];
    status.forEach((s) => {
      service.observeControlLoading(s).subscribe((res) => {
        expect(res.status).toBe(s);
      });
    });
  });

  it(`observeOpenDialog, Observable<{ option: Confirmation } & TypedAction<'[LAYOUT] UPDATE_CONFIRM_DIALOG'>>`, () => {
    const acceptFunc = () => console.log('accept');
    const rejectFunc = () => console.log('reject');
    const dialogType = [
      { Question: DialogType.Confirm, Answer: '確認' },
      { Question: DialogType.Success, Answer: '成功' },
      { Question: DialogType.Error, Answer: '錯誤' },
    ];
    dialogType.forEach((dialog) => {
      service
        .observeOpenDialog(dialog.Question, '測試', acceptFunc, rejectFunc)
        .subscribe((res) => {
          expect(res.option.header).toBe(dialog.Answer);
        });
    });
  });

  it(`observeOpenToast, Observable<{ message: Message } & TypedAction<'[LAYOUT]UPDATE_TOAST'>>`, () => {
    const toastType = [
      { Question: ToastType.Success, Answer: 'success' },
      { Question: ToastType.Info, Answer: 'info' },
      { Question: ToastType.Warn, Answer: 'warn' },
      { Question: ToastType.Error, Answer: 'error' },
    ];
    toastType.forEach((toast) => {
      service.observeOpenToast(toast.Question, '測試').subscribe((res) => {
        expect(res.message.severity).toBe(toast.Answer);
      });
    });
  });
});
