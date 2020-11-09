import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}
  async canActivate(){
    const auth = await this.authService.verifyLogin()
    if(auth) {
      
      return true;
    } else {
      this.router.navigateByUrl('/register');
      return false;
      }
  }
  
}
