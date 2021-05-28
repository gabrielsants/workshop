import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from './feautures/common-views/shell/service/shell.service';
import { NotFoundComponent } from './shared';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: () => import('./feautures/common-views/about/about.module').then((m) => m.AboutModule),
    },
    { path: 'admin', loadChildren: () => import('./feautures/admin/admin.module').then((m) => m.AdminModule) },
    {
      path: 'common',
      loadChildren: () => import('./feautures/common-users/common-users.module').then((m) => m.CommonUsersModule),
    },
    {
      path: 'stockist',
      loadChildren: () => import('./feautures/stockist/stockist.module').then((m) => m.StockistModule),
    },
    {
      path: 'list-files',
      loadChildren: () => import('./feautures/common-views/view-file/list-files.module').then((m) => m.ListFilesModule),
    },
    { path: 'not-found', component: NotFoundComponent, data: { title: marker('NotFound') } },
  ]),
  // Fallback when no prior route is matched
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
