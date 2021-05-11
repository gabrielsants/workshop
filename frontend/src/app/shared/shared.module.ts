import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './service/dialog.service';
import { DialogHistoricComponent } from './dialog-historic/dialog-historic.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    FlexLayoutModule, 
    MaterialModule, 
    CommonModule, 
    TranslateModule
  ],
  declarations: [
    LoaderComponent, 
    DialogComponent, 
    DialogHistoricComponent, 
    NotFoundComponent
  ],
  exports: [
    LoaderComponent, 
    DialogComponent, 
    DialogHistoricComponent,
    NotFoundComponent,
  ],
  entryComponents: [
    DialogComponent, 
    DialogHistoricComponent
  ],
  providers: [
    DialogService
  ],
})
export class SharedModule {}
