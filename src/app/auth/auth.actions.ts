import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

export const login = createAction('[Auth Component] Login', props<{user: User}>());
export const logout = createAction('[Auth Component] Logout');
export const autoLogin = createAction('[Auth Component] Auto Login');
