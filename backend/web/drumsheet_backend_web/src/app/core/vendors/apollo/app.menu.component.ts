import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AppMenuitemComponent],
})
export class AppMenuComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any[] = [];

  ngOnInit() {
    /** EX: this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'E-Commerce', 名稱
                        icon: 'pi pi-fw pi-home', ICON
                        routerLink: ['/'] 路由
                    },
                    {
                        label: 'Banking',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/dashboard-banking']
                    }
                ]
            },
            //...
        ]; */
    this.model = [];
  }
}
