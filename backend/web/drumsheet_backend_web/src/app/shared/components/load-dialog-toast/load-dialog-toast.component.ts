import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { selectLayoutLoading, selectLayoutConfirm, selectLayoutToast } from '../../../core/store/selector/layout/layout.selector';


@Component({
  selector: 'app-load-dialog-toast',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    AsyncPipe,
    BlockUIModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './load-dialog-toast.component.html',
  styleUrls: ['./load-dialog-toast.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class LoadDialogToastComponent implements OnInit, OnDestroy {
  /**
   * NGSTORE
   */
  private store = inject(Store);

  /**
   * PRIMENG 控制POPUP用
   */
  private confirmationService = inject(ConfirmationService);

  /**
   * PRIMENG 控制TOAST用
   */
  private messageService = inject(MessageService);

  /**
   * ONDESTROY時呼叫，觸發解訂閱
   */
  private Destroy$: Subject<number> = new Subject<number>();

  /**
   * 訂閱LOADING是否開啟
   */
  Loading$: Observable<boolean> = this.store
    .select(selectLayoutLoading)
    .pipe(takeUntil(this.Destroy$));

  ngOnInit(): void {
    //訂閱popup
    this.subscribePopup();
    //訂閱通知(toast)
    this.subscribeToast();
  }
  ngOnDestroy() {
    this.Destroy$.next(1);
  }

  /**
   * 訂閱popup狀態
   */
  private subscribePopup(): void {
    this.store
      .select(selectLayoutConfirm)
      .pipe(
        filter((x) => !!x),
        takeUntil(this.Destroy$)
      )
      .subscribe((res) => {
        this.confirmationService.confirm({
          message: res?.message,
          header: res?.header,
          icon: res?.icon,
          accept: res?.accept,
          reject: res?.reject,
          rejectVisible: res?.rejectVisible,
          acceptVisible: res?.acceptVisible,
          rejectLabel: res?.rejectLabel,
          acceptLabel: res?.acceptLabel,
          acceptButtonStyleClass: res?.acceptButtonStyleClass,
          rejectButtonStyleClass: res?.rejectButtonStyleClass,
        });
      });
  }

  /**
   * 訂閱通知(toast)狀態
   */
  private subscribeToast(): void {
    this.store
      .select(selectLayoutToast)
      .pipe(
        filter((x) => !!x),
        takeUntil(this.Destroy$)
      )
      .subscribe((res) => {
        this.messageService.add({
          summary: res?.summary,
          severity: res?.severity,
        });
      });
  }
}
