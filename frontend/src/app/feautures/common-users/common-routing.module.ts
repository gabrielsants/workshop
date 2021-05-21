import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ListCatalogComponent } from './components/list-catalog/list-catalog.component';
import { ListOperatorWorkshopComponent } from './components/list-operator-workshop/list-operator-workshop.component';
import { ListTmoComponent } from './components/list-tmo/list-tmo.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { ClerkGuard } from './guard/clerk.guard';
import { MechanicGuard } from './guard/mechanic.guard';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'list-tmo',
    component: ListTmoComponent,
    data: { title: marker('List TMO') },
    canActivate: [MechanicGuard],
  },
  {
    path: 'list-operator-workshop',
    component: ListOperatorWorkshopComponent,
    data: { title: marker('List Operator/Workshop') },
    canActivate: [MechanicGuard],
  },
  {
    path: 'list-catalog',
    component: ListCatalogComponent,
    data: { title: marker('List Catalog') },
    canActivate: [ClerkGuard],
  },

  {
    path: 'report-card',
    component: ReportCardComponent,
    data: { title: marker('Report card') },
    canActivate: [MechanicGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonUsersRoutingModule {}
