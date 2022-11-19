import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UserService,
               private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado =>  {
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
