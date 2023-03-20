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
import { ProjectReportState } from './project-report.store';
import { SearchState } from './search.store';
import { PlantProposalState } from './plant.store';
import { BlogState } from './blog.store';
import { PaymentState } from './payment.store';
import { ContactState } from './contact.store';

export interface PagedData<T> {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  content: T[];
}

export interface AppState {
  readonly authState: AuthState;
  readonly profileState: ProfileState;
  readonly cartsState: CartsState;
  readonly userState: UserState;
  readonly projectsState: ProjectState;
  readonly treeTypesState: TreeTypeState;
  readonly errorsState: ErrorState;
  readonly successMessagesState: SuccessMessageState;
  readonly contentState: ContentState;
  readonly blogState: BlogState;
  readonly eventState: EventsState;
  readonly teamsState: TeamState;
  readonly plantbagState: PlantbagState;
  readonly treesState: TreeState;
  readonly rankingState: RankingState;
  readonly projectReportsState: ProjectReportState;
  readonly searchState: SearchState;
  readonly plantProposalState: PlantProposalState;
  readonly paymentState: PaymentState;
  readonly contactState: ContactState;
}
