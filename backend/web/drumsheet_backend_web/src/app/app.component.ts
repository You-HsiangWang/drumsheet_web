import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApolloLayoutService } from './core/vendors/apollo/service/app.layout.service';
import { AppSettings } from './core/app-settings/app-settings';
import { LocalStorageService } from './core/service/local-storage/local-storage.service';
import { LoadDialogToastComponent } from './shared/components/load-dialog-toast/load-dialog-toast.component';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet
    ><app-load-dialog-toast></app-load-dialog-toast>`,
  standalone: true,
  imports: [RouterOutlet, LoadDialogToastComponent],
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * PrimeNGConfig PrimeNg設定
   * @private
   */
  private primengConfig = inject(PrimeNGConfig);
  /**
   * ApolloLayoutService Apollo設定
   * @private
   */
  private apolloLayoutService = inject(ApolloLayoutService);
  /**
   * ActivatedRoute
   * @private
   */
  private activatedRoute = inject(ActivatedRoute);
  /**
   * LocalStorageService
   * @private
   */
  private localStorageService = inject(LocalStorageService);
  /**
   *
   * @private
   * @memberof AppComponent
   */
  private setPresaleCMSServerToken$ =
    this.activatedRoute.queryParamMap.subscribe((res) => {
      if (res.get(AppSettings.CMS_SERVER_TOKEN_KEY_NAME)) {
        this.localStorageService.set(
          AppSettings.CMS_SERVER_TOKEN_KEY_NAME,
          res.get(AppSettings.CMS_SERVER_TOKEN_KEY_NAME)
        );
      } else {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get(AppSettings.CMS_SERVER_TOKEN_KEY_NAME);
        if (token) {
          this.localStorageService.set(
            AppSettings.CMS_SERVER_TOKEN_KEY_NAME,
            token
          );
        }
      }
    });

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.apolloPresets();
  }
  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.setPresaleCMSServerToken$.unsubscribe();
  }

  /**
   * primeNg Apollo template 設定
   */
  private apolloPresets(): void {
    this.primengConfig.ripple = true;
    this.apolloLayoutService.config = {
      ripple: false,
      inputStyle: 'outlined',
      menuMode: 'static',
      colorScheme: 'light',
      theme: 'orange',
      menuTheme: 'colorScheme',
      scale: 14,
    };
  }
}
