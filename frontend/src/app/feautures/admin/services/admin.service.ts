import { HttpClient } from '@angular/common/http';
import { Routes, Route } from '@angular/router';
import { AuthenticationGuard } from '@app/feautures/auth/guards/authentication.guard';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';

export class AdminService {
  constructor(private http: HttpClient) {}

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: UploadFileComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
    };
  }
}
