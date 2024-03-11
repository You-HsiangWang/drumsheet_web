/**
 * 來源於CMSServe後端API endPoint
 *
 * @export
 * @class CMSServerApiData
 */
export class CMSServerApiData {
  /**
   * 取得隨時取專區列表
   * 取得隨時取專區明細(需掛載ID值)
   * 更新隨時取專區明細(需掛載ID值)
   */
  public static readonly URL_SPECIFIC_ZONE = 'SpecificZone';
  /**
   * 取得隨時取母活動
   */
  public static readonly URL_SPECIFIC_ZONE_ACTIVITY_ITEMS =
    'SpecificZone/ActivityItems';

  public static readonly URL_GET_USER_INFO = 'User/Info';
}
