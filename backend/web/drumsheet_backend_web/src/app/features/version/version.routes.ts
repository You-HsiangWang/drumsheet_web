import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'version',
    data: {
      title: '版本查看',
    },
    loadComponent: () =>
      import('./feature/version/version.component').then(
        (c) => c.VersionComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/error-page/not-found',
    pathMatch: 'full',
  },
];
