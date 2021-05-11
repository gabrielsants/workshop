import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from './services/upload.service';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { DialogEdit, DialogLink, LinkFileComponent } from './components/link-file/link-file.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { EditProduct, ListProductComponent } from './components/list-product/list-product.component';
import { RegisterProductModelComponent } from './components/register-product-model/register-product-model.component';
import {
  EditProductModel,
  ListProductModelComponent,
} from './components/list-product-model/list-product-model.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditDepartment, ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { RegisterDepartmentComponent } from './components/register-department/register-department.component';
import { FileService } from './services/file.service';
import { ProductService } from './services/product.service';
import { SignatureComponent } from './components/signature/signature.component';

@NgModule({
  declarations: [
    UploadFileComponent,
    LinkFileComponent,
    DialogEdit,
    DialogLink,
    EditProductModel,
    EditDepartment,
    EditProduct,
    RegisterProductComponent,
    ListProductComponent,
    RegisterProductModelComponent,
    ListProductModelComponent,
    RegisterUserComponent,
    ListUsersComponent,
    ListDepartmentsComponent,
    RegisterDepartmentComponent,
    SignatureComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFileUploadModule,
  ],
  entryComponents: [DialogEdit, DialogLink, EditProduct, EditDepartment, EditProductModel],
  providers: [UploadService, FileService, ProductService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
