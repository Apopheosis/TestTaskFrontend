import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../authModule/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.isUserAuthenticated())
    if (this.authService.isUserAuthenticated()){
      return true;
    }

    this.router.navigate([''])
    return false;
  }

}
