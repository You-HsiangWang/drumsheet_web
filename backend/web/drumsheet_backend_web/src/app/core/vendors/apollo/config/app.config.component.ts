import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../app.menu.service';
import { ApolloLayoutService } from '../service/app.layout.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgStyle, NgClass, NgIf } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
  standalone: true,
  imports: [
    SidebarModule,
    NgFor,
    NgStyle,
    ButtonModule,
    NgClass,
    NgIf,
    RadioButtonModule,
    FormsModule,
    InputSwitchModule,
  ],
})
export class AppConfigComponent implements OnInit {
  @Input() minimal = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentThemes: any[] = [];

  scales: number[] = [12, 13, 14, 15, 16];

  constructor(
    public apolloLayoutService: ApolloLayoutService,
    public menuService: MenuService
  ) {}

  get visible(): boolean {
    return this.apolloLayoutService.state.configSidebarVisible;
  }

  set visible(_val: boolean) {
    this.apolloLayoutService.state.configSidebarVisible = _val;
  }

  get scale(): number {
    return this.apolloLayoutService.config.scale;
  }

  set scale(_val: number) {
    this.apolloLayoutService.config.scale = _val;
  }

  get menuMode(): string {
    return this.apolloLayoutService.config.menuMode;
  }

  set menuMode(_val: string) {
    this.apolloLayoutService.config.menuMode = _val;
    if (
      this.apolloLayoutService.isSlim() ||
      this.apolloLayoutService.isHorizontal()
    ) {
      this.menuService.reset();
    }
  }

  get colorScheme(): string {
    return this.apolloLayoutService.config.colorScheme;
  }

  set colorScheme(_val: string) {
    this.changeColorScheme(_val);
  }

  get inputStyle(): string {
    return this.apolloLayoutService.config.inputStyle;
  }

  set inputStyle(_val: string) {
    this.apolloLayoutService.config.inputStyle = _val;
  }

  get ripple(): boolean {
    return this.apolloLayoutService.config.ripple;
  }

  set ripple(_val: boolean) {
    this.apolloLayoutService.config.ripple = _val;
  }

  get menuTheme(): string {
    return this.apolloLayoutService.config.menuTheme;
  }

  set menuTheme(_val: string) {
    this.apolloLayoutService.config.menuTheme = _val;
  }

  ngOnInit() {
    this.componentThemes = [
      { name: 'indigo', color: '#6366F1' },
      { name: 'blue', color: '#3B82F6' },
      { name: 'purple', color: '#8B5CF6' },
      { name: 'teal', color: '#14B8A6' },
      { name: 'cyan', color: '#06b6d4' },
      { name: 'green', color: '#10b981' },
      { name: 'orange', color: '#f59e0b' },
      { name: 'pink', color: '#d946ef' },
    ];
  }

  onConfigButtonClick() {
    this.apolloLayoutService.showConfigSidebar();
  }

  changeColorScheme(colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme =
      'theme-' + this.apolloLayoutService.config.colorScheme;
    const newColorScheme = 'theme-' + colorScheme;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);
    this.replaceThemeLink(newHref, () => {
      this.apolloLayoutService.config.colorScheme = colorScheme;
      this.apolloLayoutService.onConfigUpdate();
    });
  }

  changeTheme(theme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newHref = themeLink
      .getAttribute('href')!
      .replace(this.apolloLayoutService.config.theme, theme);
    this.replaceThemeLink(newHref, () => {
      this.apolloLayoutService.config.theme = theme;
      this.apolloLayoutService.onConfigUpdate();
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-link';
    const themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  applyScale() {
    document.documentElement.style.fontSize = this.scale + 'px';
  }
}
