/**
 * API回傳基本規格
 */
export interface IJsonResultBase<T> {
  /**
   * API是否成功
   */
  isSuccess: boolean;
  /**
   * API錯誤訊息
   */
  message: string;
  /**
   * 錯誤回報內容
   *
   * @type {*}
   * @memberof IJsonResultBase
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  /**
   * API Respond 回傳內容
   *
   * @type {T}
   * @memberof IJsonResultBase
   */
  element?: T;
}
