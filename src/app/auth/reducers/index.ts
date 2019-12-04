import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { User } from '../model/user.model';
import { login, logout } from '../auth.actions';
import { AppState } from '../../reducers';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

const _authReducer = createReducer(
  initialAuthState,
  /* on(login, (state, action) => {
    return {
      user: action.user
    };
  }), */
  // on(login, (state, action) => ({user: action.user})),
  on(login, (state, {user}) => ({user})),
  on(logout, state => ({user: undefined}))
);

export function authReducer(state: AuthState = initialAuthState, action: Action) {
  return _authReducer(state, action);
}

// export const authState = (state: AppState) => state.auth;
export const authState = createFeatureSelector<AppState, AuthState>('auth');

export const isUserLoggedIn = createSelector(
  authState,
  (auth: AuthState) => !!auth.user
);
