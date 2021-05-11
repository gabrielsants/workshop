import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '@app/feautures/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MechanicGuard implements CanActivate {
  
  constructor(private router: Router, private authService : AuthenticationService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('role') == '2' || localStorage.getItem('role') == '1') {
        return true;
      }

      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
      return false;
  }
  
}
