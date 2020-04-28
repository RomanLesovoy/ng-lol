import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { localStorageUser } from './index';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorageUser() || !localStorageUser().access_token) {
      return true;
    }

    // logged in so redirect to home page with the return url
    this.router.navigate(['/']);
    return false;
  }
}
