import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn } from '@angular/router';
import { AppSettings } from '../../app-settings/app-settings';
import { AuthService } from '../../service/auth/auth.service';

/**
 * 路由守門員，檢核會員憑證，Mid_v轉token後 在此儲存
 * @returns CanActivateChildFn 是否可以進入子路由
 */
export function tokenAuthGuard(): CanActivateChildFn {
  if (AppSettings.TEST_MODE) {
    return () => {
      return true;
    };
  }
  return (route: ActivatedRouteSnapshot) => {
    const authService: AuthService = inject(AuthService);
    return authService.onRouteAuthorization(route);
  };
}
