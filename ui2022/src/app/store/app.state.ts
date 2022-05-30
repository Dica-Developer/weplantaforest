import { AuthState } from './auth.store';
import { ProfileState } from './profile.store';
import { CartsState } from './carts.store';
import { UserState } from './user.store';
import { ProjectState } from './project.store';
import { TreeTypeState } from './treeType.store';
import { ErrorState } from './error.state';
import { SuccessMessageState } from './success-message.state';
import { ContentState } from './content.store';
import { EventsState } from './events.store';
import { TeamState } from './team.store';


export interface AppState{
  readonly auth: AuthState,
  readonly profile: ProfileState,
  readonly carts: CartsState,
  readonly user: UserState,
  readonly projects: ProjectState,
  readonly treeTypes: TreeTypeState,
  readonly errors: ErrorState,
  readonly successMessages: SuccessMessageState,
  readonly content: ContentState,
  readonly event: EventsState,
  readonly teams: TeamState
}