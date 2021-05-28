import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { StockistRoutingModule } from './stockist-routing.module';
import { RegisterPartsComponent } from './components/register-parts/register-parts.component';
import { ListPartsComponent } from './components/list-parts/list-parts.component';
import { EntranceAndExitComponent } from './components/entrance-and-exit/entrance-and-exit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterPartsComponent, ListPartsComponent, EntranceAndExitComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    StockistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StockistModule {}
