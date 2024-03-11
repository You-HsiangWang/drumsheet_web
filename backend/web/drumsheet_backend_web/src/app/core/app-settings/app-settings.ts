import { EnvironmentMode } from '../../shared/domain/enum/environment-mode.enum';
import { environment } from '../../../environments/environment.local';
export class AppSettings {
  /**
   * 是否為測試模式
   * @static
   */
  public static readonly TEST_MODE = false;
  /**
   * 標示當前使用哪個環境的設定檔
   * @static
   */
  public static readonly ENV_MODE: EnvironmentMode = environment.ENV;
  /**
   * 登入頁面
   */
  public static readonly SERVER_LOGIN_PAGE = environment.SERVER_LOGIN_PAGE;
  /**
   * CMS伺服器API位置
   */
  public static readonly SERVER_CMS_API_URL = environment.CMS_SERVER_API_URL;
  /**
   * CMS 驗證用token key值
   */
  public static readonly CMS_SERVER_TOKEN_KEY_NAME = 'token';
  /**
   * HTTP Timeout 時限
   */
  public static readonly HTTP_TIME_OUT_LIMIT = 100000;
}
