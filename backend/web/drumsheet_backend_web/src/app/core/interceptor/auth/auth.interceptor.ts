import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpStatusCode,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../app-settings/app-settings';
import { LoadDialogToastService } from '../../../shared/service/load-dialog-toast/load-dialog-toast.service';
import { DialogType } from '../../../shared/enum/dialog-type.enum';

/**
 * 權限認證
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    const loadDialogToastService = inject(LoadDialogToastService);
    return next.handle(request).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((event: any) => {
        if (
          event?.status === HttpStatusCode.Forbidden ||
          event?.status === HttpStatusCode.Unauthorized
        ) {
          console.log('【權限認證失敗】');
          loadDialogToastService.controlLoading(false);
          loadDialogToastService.openDialog(
            DialogType.Error,
            'error.error.Message',
            () => {
              location.replace(AppSettings.SERVER_LOGIN_PAGE);
            }
          );
          return EMPTY;
        } else {
          return event;
        }
      })
    );
  }
}
