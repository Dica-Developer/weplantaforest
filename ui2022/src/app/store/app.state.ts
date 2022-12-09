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
import { PlantbagState } from './plantbag.store';
import { TreeState } from './tree.store';
import { RankingState } from './ranking.store';

export interface PagedData<T> {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  content: T[];
}

import { ProjectReportState } from './project-report.store';

export interface AppState {
  readonly auth: AuthState;
  readonly profile: ProfileState;
  readonly carts: CartsState;
  readonly user: UserState;
  readonly projects: ProjectState;
  readonly treeTypes: TreeTypeState;
  readonly errors: ErrorState;
  readonly successMessages: SuccessMessageState;
  readonly content: ContentState;
  readonly event: EventsState;
  readonly teams: TeamState;
  readonly plantbag: PlantbagState;
  readonly trees: TreeState;
  readonly ranking: RankingState;
  readonly projectReports: ProjectReportState;
}
