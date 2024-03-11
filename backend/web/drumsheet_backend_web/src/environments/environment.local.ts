// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentMode } from "../app/shared/domain/enum/environment-mode.enum";

/**
 * 環境設定檔 Local
 */
export const environment = {
  // 當前環境
  ENV: EnvironmentMode.Local,
  // 登入頁面
  SERVER_LOGIN_PAGE: `http://localhost:2064/SETOPBackend/api/`,
  // CMS_Server API位置
  CMS_SERVER_API_URL: `https://localhost:44356/PresaleCMS/api/`,
};
