import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState, authReducer } from '../auth/reducers';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
