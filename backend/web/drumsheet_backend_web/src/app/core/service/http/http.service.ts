/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app-settings/app-settings';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * HttpClient
   * @private
   */
  private http = inject(HttpClient);

  /**
   * get
   * @param url
   * @param params
   * @returns
   */
  get<T>(url: string, params: any = null): Observable<T> {
    const apiUrl = `${AppSettings.SERVER_CMS_API_URL}${url}`;
    return this.http.get<T>(apiUrl, {
      params: params,
    });
  }
  /**
   * put
   * @param url
   * @param params
   * @returns
   */
  put<T>(url: string, body: any, params: any = null): Observable<T> {
    const apiUrl = `${AppSettings.SERVER_CMS_API_URL}${url}`;
    return this.http.put<T>(apiUrl, body, {
      params: params,
    });
  }
  /**
   * post
   * @param url
   * @param params
   * @returns
   */
  post<T>(
    url: string,
    params: any = null,
    body: any,
    headers: any = null
  ): Observable<T> {
    const apiUrl = `${AppSettings.SERVER_CMS_API_URL}${url}`;
    return this.http.post<T>(apiUrl, body, {
      params: params,
      headers: headers,
    });
  }
}
