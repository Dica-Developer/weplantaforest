import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../../../../app/store/app.state';
import { selectHasTeam, selectUploadingImage } from '../../../store/profile.store';
import {
  deleteTeam,
  joinTeam,
  leaveTeam,
  selectIsAdmin,
  selectIsMember,
} from 'src/app/store/team.store';
import { Observable, Subscription } from 'rxjs';
import { SliderHelper } from '../../helper/slider.helper';

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
  hasTeam$: Observable<boolean> = this.store.select(selectHasTeam);
  uploadImageSub: Subscription;

  // since there is an issue with the image url not updating(which means its exactly the same after an image update)
  // when the image is changed, there has to be a little hack here to force the image to update
  // so we create a random number when the uploadImage select delivers a false and put it at the end of the image url
  randomNumber: number = 0;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    public dialog: MatDialog,
    private sliderHelper: SliderHelper,
  ) {}

  ngOnInit(): void {
    this.uploadImageSub = this.store.select(selectUploadingImage).subscribe((uploading) => {
      if (!uploading) {
        this.randomNumber = this.sliderHelper.getRandomNumber();
      }
    });
  }

  routeToTeam() {
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

  isMyProfile() {
    return this.profileDetails.userName === localStorage.getItem('username');
  }

  editTeam() {
    this.router.navigate(['/editTeam/' + this.teamDetails.teamName]);
  }

  openConfirmation(confirmType: string) {
    if (confirmType === 'leave') {
      this.snackbar
        .open(this.translateService.instant('leaveTeam'), 'OK', {
          duration: 5000,
          panelClass: ['warning-snackbar'],
        })
        .onAction()
        .subscribe(() => {
          this.leaveTeam();
        });
    } else if (confirmType === 'delete') {
      this.snackbar
        .open(this.translateService.instant('deleteConfirmation'), 'OK', {
          duration: 5000,
          panelClass: ['warning-snackbar'],
        })
        .onAction()
        .subscribe(() => {
          this.deleteTeam();
        });
    } else if (confirmType === 'join') {
      this.snackbar
        .open(this.translateService.instant('joinTeam'), 'OK', {
          duration: 5000,
          panelClass: ['warning-snackbar'],
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

  isLoggedIn() {
    return localStorage.getItem('username');
  }
}
