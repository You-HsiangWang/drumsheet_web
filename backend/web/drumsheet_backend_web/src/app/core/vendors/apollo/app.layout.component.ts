import {
  Component,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MenuService } from './app.menu.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopbarComponent } from './app.topbar.component';
import { ApolloLayoutService } from './service/app.layout.service';
import { AppConfigComponent } from './config/app.config.component';
import { AppProfileSidebarComponent } from './app.profilesidebar.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  standalone: true,
  imports: [
    NgClass,
    AppSidebarComponent,
    AppTopbarComponent,
    AppBreadcrumbComponent,
    RouterOutlet,
    AppProfileSidebarComponent,
    AppConfigComponent,
    NgIf,
  ],
})
export class AppLayoutComponent implements OnDestroy {
  @Input() isApolloToolKit = false;

  overlayMenuOpenSubscription: Subscription;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

  constructor(
    private menuService: MenuService,
    public apolloLayoutService: ApolloLayoutService,
    public renderer: Renderer2,
    public router: Router
  ) {
    this.overlayMenuOpenSubscription =
      this.apolloLayoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );
              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (this.apolloLayoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
      });
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  hideMenu() {
    this.apolloLayoutService.state.overlayMenuActive = false;
    this.apolloLayoutService.state.staticMenuMobileActive = false;
    this.apolloLayoutService.state.menuHoverActive = false;
    this.menuService.reset();
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  get containerClass() {
    return {
      'layout-light': this.apolloLayoutService.config.colorScheme === 'light',
      'layout-dim': this.apolloLayoutService.config.colorScheme === 'dim',
      'layout-dark': this.apolloLayoutService.config.colorScheme === 'dark',
      'layout-colorscheme-menu':
        this.apolloLayoutService.config.menuTheme === 'colorScheme',
      'layout-primarycolor-menu':
        this.apolloLayoutService.config.menuTheme === 'primaryColor',
      'layout-transparent-menu':
        this.apolloLayoutService.config.menuTheme === 'transparent',
      'layout-overlay': this.apolloLayoutService.config.menuMode === 'overlay',
      'layout-static': this.apolloLayoutService.config.menuMode === 'static',
      'layout-slim': this.apolloLayoutService.config.menuMode === 'slim',
      'layout-horizontal':
        this.apolloLayoutService.config.menuMode === 'horizontal',
      'layout-reveal': this.apolloLayoutService.config.menuMode === 'reveal',
      'layout-static-inactive':
        this.apolloLayoutService.state.staticMenuDesktopInactive &&
        this.apolloLayoutService.config.menuMode === 'static',
      'layout-overlay-active': this.apolloLayoutService.state.overlayMenuActive,
      'layout-mobile-active':
        this.apolloLayoutService.state.staticMenuMobileActive,
      'p-input-filled': this.apolloLayoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.apolloLayoutService.config.ripple,
      'layout-reveal-active': this.apolloLayoutService.state.revealMenuActive,
      'layout-reveal-anchored': this.apolloLayoutService.state.anchored,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
