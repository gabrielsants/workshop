import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { EntranceAndExitComponent } from './components/entrance-and-exit/entrance-and-exit.component';
import { ListPartsComponent } from './components/list-parts/list-parts.component';
import { RegisterPartsComponent } from './components/register-parts/register-parts.component';
import { StockistGuard } from './guard/stockist.guard';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: 'register-parts',
    component: RegisterPartsComponent,
    data: { title: marker('Register Parts') },
    canActivate: [StockistGuard],
  },
  {
    path: 'list-parts',
    component: ListPartsComponent,
    data: { title: marker('List Parts') },
    canActivate: [StockistGuard],
  },
  {
    path: 'entrance-and-exit',
    component: EntranceAndExitComponent,
    data: { title: marker('Entrance and Exit') },
    canActivate: [StockistGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockistRoutingModule {}
