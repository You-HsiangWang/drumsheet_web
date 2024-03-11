import { Routes } from '@angular/router';
import { ApolloBasicLayoutComponent } from '../../layout/apollo-basic-layout/apollo-basic-layout.component';
import { BasicLayoutComponent } from '../../layout/basic-layout/basic-layout.component';


export const routes: Routes = [
  {
    path: 'version', //版本號路由
    component: BasicLayoutComponent,
    loadChildren: () =>
      import('../../features/version/version.routes').then((r) => r.routes),
    data: {
      title: '版本',
    },
  },
  {
    path: 'sheet-music', //版本號路由
    component: ApolloBasicLayoutComponent,
    loadChildren: () =>
      import('../../features/sheet-music/sheet-music.routes').then((r) => r.routes),
    data: {
      title: '樂譜',
    },
  },
  {
    path: '',
    component: BasicLayoutComponent, //normal layout
    children: [],
  },
  {
    path: '',
    component: ApolloBasicLayoutComponent, //apollo layout
    children: [],
  },
  { path: '**', redirectTo: '/notfound' },
];
