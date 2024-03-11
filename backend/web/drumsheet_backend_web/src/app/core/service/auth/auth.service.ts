import { catchError, mergeMap, Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CMSServerApiData } from '../../data/cms-api.data';
import { HttpService } from '../http/http.service';
import { ICMSUserInfo } from 'src/app/shared/domain/interface/user-info.interface';
import { IJsonResultBase } from 'src/app/shared/domain/interface/json-result.interface';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoadDialogToastService } from 'src/app/shared/service/load-dialog-toast/load-dialog-toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpService);

  /**
   * 路由守門員 iis cookie
   */
  onRouteAuthorization(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    childRoute: ActivatedRouteSnapshot
  ): Observable<boolean> {
    const loadDialogToastService = inject(LoadDialogToastService);
    loadDialogToastService.controlLoading(true);
    const getUserInfo$: Observable<boolean> | undefined = this.http
      .get<IJsonResultBase<ICMSUserInfo>>(
        CMSServerApiData.URL_GET_USER_INFO,
        ''
      )
      .pipe(
        mergeMap((result) => {
          loadDialogToastService.controlLoading(false);
          if (result.isSuccess) {
            //TODO: STORE
            //存入全域store
            // this.sharedStore.dispatch(
            //   fromUserActions.getUserInfoSuccess({ cmsUser: result.element })
            // );
            return of(true);
          } else {
            //不會觸發 false直接throw error 401 403 使用user.interceptor接
            return of(false);
          }
        }),
        catchError(() => {
          loadDialogToastService.controlLoading(false);
          return of(false);
        })
      );
    return getUserInfo$;
  }
}
