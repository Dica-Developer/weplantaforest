import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { PlatformHelper } from '../../helper/platform.helper';
import { deleteTeam } from 'src/app/store/team.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-team-delete-confirmation',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './team-delete-confirmation.component.html',
  styleUrl: './team-delete-confirmation.component.scss'
})
export class TeamDeleteConfirmationComponent {

  constructor(
    private snackBarRef: MatSnackBarRef<TeamDeleteConfirmationComponent>,
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deleteTeam() {
    console.log(this.data)
    let username = this.platformHelper.getLocalstorage('username');
    this.store.dispatch(deleteTeam({teamId: this.data.teamId}))
    this.snackBarRef.dismiss();
  }

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
