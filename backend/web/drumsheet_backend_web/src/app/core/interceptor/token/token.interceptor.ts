import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';
import { AppSettings } from '../../app-settings/app-settings';

/**
 * api request header上帶入token
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /**
   * LocalStorageService
   * @private
   */
  private localStorageService = inject(LocalStorageService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.get(
      AppSettings.CMS_SERVER_TOKEN_KEY_NAME
    );
    if (token)
      request = request.clone({
        headers: request.headers.set(
          AppSettings.CMS_SERVER_TOKEN_KEY_NAME,
          token
        ),
      });
    return next.handle(request);
  }
}
