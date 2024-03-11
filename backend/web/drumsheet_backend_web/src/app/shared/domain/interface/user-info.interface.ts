/**
 * 使用者訊息
 * @property id Admin
 * @property name user name
 * @property isHQUser 是否為總部使用者
 * @property isSevenElevenUser 是否為7-11使用者
 * @property hasVerfiyPermissions 是否有審核權限
 */
export interface ICMSUserInfo {
  /**
   * Admin
   */
  id: string;
  /**
   * user name
   */
  name: string;
  /**
   * 是否為總部使用者
   */
  isHQUser: boolean;
  /**
   * 是否為7-11使用者
   */
  isSevenElevenUser: boolean;
  /**
   * 是否有審核權限
   * 錯字比照後端
   */
  hasVerfiyPermissions: boolean;
}
