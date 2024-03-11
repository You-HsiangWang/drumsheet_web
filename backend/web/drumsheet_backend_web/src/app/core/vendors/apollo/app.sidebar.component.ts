import { Component, ElementRef } from '@angular/core';
import { ApolloLayoutService } from './service/app.layout.service';
import { AppMenuComponent } from './app.menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  standalone: true,
  imports: [RouterLink, AppMenuComponent],
})
export class AppSidebarComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timeout: any = null;

  constructor(
    public apolloLayoutService: ApolloLayoutService,
    public el: ElementRef
  ) {}

  onMouseEnter() {
    if (!this.apolloLayoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.apolloLayoutService.state.revealMenuActive = true;
    }
  }

  onMouseLeave() {
    if (!this.apolloLayoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(
          () => (this.apolloLayoutService.state.revealMenuActive = false),
          300
        );
      }
    }
  }

  anchor() {
    this.apolloLayoutService.state.anchored =
      !this.apolloLayoutService.state.anchored;
  }
}
