import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { isUserLoggedIn } from './reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean  | Promise<boolean> | Observable<boolean> {
    return this.store
      .pipe(
        select(isUserLoggedIn),
        tap(isLoggedIn => {
          if (isLoggedIn) {
            return true;
          } else {
            return this.router.navigate(['login']);
          }
        })
      );
  }
}
