import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUploadingImage } from '../../../../store/profile.store';
import { SliderHelper } from 'src/app/util/helper/slider.helper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { logout, softDeleteAccount } from 'src/app/store/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountDeleteConfirmationComponent } from 'src/app/util/common-components/account-delete-confirmation/account-delete-confirmation.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    MatTooltip,
    TranslateModule,
  ],
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  @Input() profileDetails;
  @Input() showEdit;

  uploadImageSub: Subscription;

  // since there is an issue with the image url not updating(which means its exactly the same after an image update)
  // when the image is changed, there has to be a little hack here to force the image to update
  // so we create a random number when the uploadImage select delivers a false and put it at the end of the image url
  randomNumber: number = 0;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private sliderHelper: SliderHelper,
    private platformHelper: PlatformHelper,
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.uploadImageSub = this.store.select(selectUploadingImage).subscribe((uploading) => {
      if (!uploading) {
        this.randomNumber = this.sliderHelper.getRandomNumber();
      }
    });
  }

  ngOnDestroy(): void {
    this.uploadImageSub?.unsubscribe();
  }

  editProfile() {
    let username = this.platformHelper.getLocalstorage('username');
    this.router.navigate(['/editProfile/' + username]);
  }

  softDeleteAccount() {
    this.snackbar.openFromComponent(AccountDeleteConfirmationComponent, {
      panelClass: ['cookie-snackbar'],
    });
  }
}
