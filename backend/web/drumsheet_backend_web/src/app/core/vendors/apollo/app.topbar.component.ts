import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { ApolloLayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [AppBreadcrumbComponent, InputTextModule],
})
export class AppTopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public apolloLayoutService: ApolloLayoutService) {}

  onMenuButtonClick() {
    this.apolloLayoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.apolloLayoutService.showProfileSidebar();
  }
}
