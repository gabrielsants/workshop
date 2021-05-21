import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTmoComponent } from './components/list-tmo/list-tmo.component';
import { ListOperatorWorkshopComponent } from './components/list-operator-workshop/list-operator-workshop.component';
import { ListCatalogComponent } from './components/list-catalog/list-catalog.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { CommonUsersRoutingModule } from './common-routing.module';
import { ReportCardComponent } from './components/report-card/report-card.component';

@NgModule({
  declarations: [ListTmoComponent, ListOperatorWorkshopComponent, ListCatalogComponent, ReportCardComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, CommonUsersRoutingModule],
})
export class CommonUsersModule {}
