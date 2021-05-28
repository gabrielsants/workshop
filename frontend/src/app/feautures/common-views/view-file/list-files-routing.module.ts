import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ViewFileComponent } from './view-file.component';
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: 'view', component: ViewFileComponent, data: { title: marker('View Files') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFilesRoutingModule {}
