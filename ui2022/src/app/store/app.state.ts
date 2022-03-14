import { AuthState } from './auth.store';
import { ProfileState } from './profile.store';
import { CartsState } from './carts.store';


export interface AppState{
  readonly auth: AuthState,
  readonly profile: ProfileState,
  readonly carts: CartsState
}