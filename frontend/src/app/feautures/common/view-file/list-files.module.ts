import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListFilesRoutingModule } from './list-files-routing.module';
import { MaterialModule } from '@app/material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { ViewFileComponent } from './view-file.component';

@NgModule({
  declarations: [ViewFileComponent],
  imports: [CommonModule, TranslateModule, ListFilesRoutingModule, MaterialModule, PdfViewerModule],
})
export class ListFilesModule {}
