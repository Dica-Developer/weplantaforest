import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import {
  deleteTeam,
  joinTeam,
  leaveTeam,
  selectIsAdmin,
  selectIsMember,
} from 'src/app/store/team.store';

@Component({
  selector: 'app-team-header',
  templateUrl: './team-header.component.html',
  styleUrls: ['./team-header.component.scss'],
})
export class TeamHeaderComponent implements OnInit {
  @Input() teamDetails;
  @Input() profileDetails;
  isAdmin$ = this.store.select(selectIsAdmin);
  isMember$ = this.store.select(selectIsMember);
  createMode = false;
  editMode = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  routeToTeam() {
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

  isMyProfile() {
    console.log(this.profileDetails.userName, localStorage.getItem('username'));
    
    return this.profileDetails.userName === localStorage.getItem('username');
  }

  openConfirmation(confirmType: string) {
    if (confirmType === 'leave') {
      this.snackbar
        .open(this.translateService.instant('leaveTeam'), 'OK', {
          duration: 5000,
        })
        .onAction()
        .subscribe(() => {
          this.leaveTeam();
        });
    } else if (confirmType === 'delete') {
      this.snackbar
        .open(this.translateService.instant('deleteTeam'), 'OK', {
          duration: 5000,
        })
        .onAction()
        .subscribe(() => {
          this.deleteTeam();
        });
    } else if (confirmType === 'join') {
      this.snackbar
        .open(this.translateService.instant('joinTeam'), 'OK', {
          duration: 5000,
        })
        .onAction()
        .subscribe(() => {
          this.joinTeam();
        });
    }
  }

  leaveTeam() {
    this.store.dispatch(leaveTeam());
  }

  deleteTeam() {
    this.store.dispatch(deleteTeam({ teamId: this.teamDetails?.teamId }));
  }

  joinTeam() {
    this.store.dispatch(joinTeam({ teamId: this.teamDetails?.teamId }));
  }

  switchMode(mode: string) {
    if (mode === 'create') {
      this.createMode = !this.createMode;
    } else if (mode === 'edit') {
      this.editMode = !this.editMode;
    }
  }

  closeTeamCreate() {
    this.createMode = false;
    this.editMode = false;
  }
}
