import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> | boolean | UrlTree
     {
    
      return this.isAuthenticated();
  }

  isAuthenticated():Observable<boolean | UrlTree> 
  |Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( 
      (resolve, reject) =>{ 
              resolve(this.authService.isAuthenticated());
      }
  ).then(
    (authenticated :any) => { 
      if(authenticated){
          return true; 
      }else{
          this.router.navigate(['/auth/login']); 
          return false
      }
  }
  )
  }

  canActivateChild(route: ActivatedRouteSnapshot, 

    state: RouterStateSnapshot): Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> | boolean | UrlTree
     {

return this.canActivate(route, state);

}

 
}
