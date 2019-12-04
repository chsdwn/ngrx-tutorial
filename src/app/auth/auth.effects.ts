import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';

import { User } from './model/user.model';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.action$
    .pipe(
      ofType(AuthActions.login),
      tap(action => {
        localStorage.setItem('user', JSON.stringify(action.user));
        this.router.navigate(['courses']);
      })
    ),
    { dispatch: false } // Without this occurs an infinite loop.
  );

  logout$ = createEffect(() => this.action$
    .pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => this.action$
    .pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          console.log('no user cookie');
          return {type: 'NO COOKIE'};
        } else {
          console.log('user is', user);
          return AuthActions.login({ user });
        }
      })
    )
  );

  constructor(private action$: Actions, private router: Router) { }
}
