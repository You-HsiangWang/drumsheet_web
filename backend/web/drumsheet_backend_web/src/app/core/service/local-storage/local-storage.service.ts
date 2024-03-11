/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

/**
 * LocalStorageService
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * 取值
   * @param key
   * @returns any
   */
  get<T>(key: string): any {
    const value: string | null = window.localStorage.getItem(key);
    return <T>JSON.parse(<string>value);
  }
  /**
   * 設值
   * @param key
   * @param data
   * @returns
   */
  set<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  /**
   * 移除
   * @param key
   */
  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
  /**
   * 清空
   */
  clear(): void {
    window.localStorage.clear();
  }
}
