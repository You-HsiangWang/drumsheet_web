import { Component } from '@angular/core';
import { ApolloLayoutService } from './service/app.layout.service';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
  standalone: true,
  imports: [SidebarModule, BadgeModule],
})
export class AppProfileSidebarComponent {
  constructor(public apolloLayoutService: ApolloLayoutService) {}

  get visible(): boolean {
    return this.apolloLayoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.apolloLayoutService.state.profileSidebarVisible = _val;
  }
}
