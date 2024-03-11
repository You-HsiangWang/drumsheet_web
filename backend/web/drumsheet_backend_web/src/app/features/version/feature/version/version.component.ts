import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentModePipe } from '../../../../shared/pipe/environment-mode.pipe';
import { EnvironmentMode } from '../../../../shared/domain/enum/environment-mode.enum';
import { AppSettings } from '../../../../core/app-settings/app-settings';
import packageJson from '../../../../../../package.json'

/**
 * 顯示版本package.json的版本號(version)用
 */
@Component({
  selector: 'app-version',
  standalone: true,
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  imports: [CommonModule, EnvironmentModePipe],
})
export class VersionComponent {
  /**
   * package.json 專案名稱
   * @type {string}
   * @memberof VersionComponent
   */
  name: string = packageJson.name;
  /**
   * package.json 版本號
   * @type {string}
   * @memberof VersionComponent
   */
  version: string = packageJson.version;
  /**
   * 當前使用環境
   * @type {EnvironmentMode}
   * @memberof VersionComponent
   */
  environmentMode: EnvironmentMode = AppSettings.ENV_MODE;
}
