import { AuthState } from './auth.store';
import { ProfileState } from './profile.store';
import { CartsState } from './carts.store';
import { UserState } from './user.store';
import { ProjectState } from './project.store';


export interface AppState{
  readonly auth: AuthState,
  readonly profile: ProfileState,
  readonly carts: CartsState,
  readonly user: UserState,
  readonly projects: ProjectState
}