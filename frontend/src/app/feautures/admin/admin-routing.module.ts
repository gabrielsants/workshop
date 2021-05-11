import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LinkFileComponent } from './components/link-file/link-file.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { ListProductModelComponent } from './components/list-product-model/list-product-model.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { RegisterDepartmentComponent } from './components/register-department/register-department.component';
import { RegisterProductModelComponent } from './components/register-product-model/register-product-model.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SignatureComponent } from './components/signature/signature.component';

import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { AdminGuard } from './guard/admin.guard';

// Module is lazy loaded, see app-routing.module.ts
const routes: Routes = [
  { 
    path : 'upload-file', component : UploadFileComponent,
    data : { title: marker('Upload file') }, canActivate: [AdminGuard] 
  }, 
  { path : 'link-file', component : LinkFileComponent, 
    data : { title: marker('Link file') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'register-product', component : RegisterProductComponent,
    data : { title: marker('Register Product') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'list-product', component : ListProductComponent,
    data : { title: marker('List Product') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'register-product-model', component : RegisterProductModelComponent,
    data : { title: marker('Register Product Model') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'list-product-model', component : ListProductModelComponent,
    data : { title: marker('List Product Model') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'register-user', component : RegisterUserComponent,
    data : { title: marker('Register User') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'list-user', component : ListUsersComponent,
    data : { title: marker('List User') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'register-department', component : RegisterDepartmentComponent,
    data : { title: marker('Register Department') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'list-department', component : ListDepartmentsComponent,
    data : { title: marker('List Department') }, canActivate: [AdminGuard] 
  },
  { 
    path : 'signature', component : SignatureComponent,
    data : { title: marker('Create a signature') }, canActivate: [AdminGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
