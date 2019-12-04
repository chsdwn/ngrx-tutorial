import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from './reducers';
import { isUserLoggedIn } from './auth/reducers';
import { logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.store
      .pipe(
        select(isUserLoggedIn)
      )
      .subscribe(isLoggedIn => this.isLoggedIn$.next(isLoggedIn));
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['login']);
  }
}
