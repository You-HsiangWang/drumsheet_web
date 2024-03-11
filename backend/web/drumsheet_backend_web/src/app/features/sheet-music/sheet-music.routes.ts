import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'edit-sheet',
    data: {
      title: '版本查看',
    },
    loadComponent: () =>
      import('./feature/edit-sheet/edit-sheet.component').then(
        (c) => c.EditSheetComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/error-page/not-found',
    pathMatch: 'full',
  },
];
