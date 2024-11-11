import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
import { TeamCreateEditComponent } from '../team-create-edit/team-create-edit.component';
import { ButtonComponent } from '../button/button.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from '../../helper/platform.helper';
import { TeamDeleteConfirmationComponent } from '../team-delete-confirmation/team-delete-confirmation.component';

@Component({
  selector: 'app-team-header',
  templateUrl: './team-header.component.html',
  styleUrls: ['./team-header.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    MatTooltip,
    ButtonComponent,
    TeamCreateEditComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class TeamHeaderComponent implements OnInit {
  @Input() teamDetails;
  @Input() profileDetails;
  @Input() isTeampage = false;
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
    private platformHelper: PlatformHelper
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
    return this.profileDetails.userName === this.platformHelper.getLocalstorage('username');
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
      this.snackbar.openFromComponent(TeamDeleteConfirmationComponent, {
        panelClass: ['cookie-snackbar'],
        data:  {
          teamId: this.teamDetails.teamId
        }
      })
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
    setTimeout(() => {
      this.router.navigate(['/user/' + this.platformHelper.getLocalstorage('username')]);
    }, 250);
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
    return this.platformHelper.getLocalstorage('username');
  }
}
