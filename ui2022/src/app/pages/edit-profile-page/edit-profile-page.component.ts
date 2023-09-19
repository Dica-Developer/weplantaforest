import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import {
  loadProfileDetails,
  selectProfileDetails,
  selectUploadingImage,
  updateProfileImage,
  updateProfileProperty,
} from 'src/app/store/profile.store';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  profileForm: UntypedFormGroup;
  profileDetails$ = this.store.select(selectProfileDetails);
  selectedNewsletter: Boolean;

  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  imageFile: any;
  imagePreviewSrc: any = null;
  uploadingImage$ = this.store.select(selectUploadingImage);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
      this.profileDetails$.subscribe((res) => {
        if (res) {
          this.profileForm = new FormGroup({
            username: new UntypedFormControl(res.userName),
            mail: new UntypedFormControl(res.mail),
            aboutMe: new UntypedFormControl(res.aboutMe),
            location: new UntypedFormControl(res.location),
            organisation: new UntypedFormControl(res.organisation),
            homepage: new UntypedFormControl(res.homepage),
            lang: new UntypedFormControl(res.lang),
          });
          this.profileForm.get('mail').disable();
          this.profileForm.get('username').disable();
        }
      });
    });
  }

  ngOnInit(): void {}

  updateProfile() {
    let username = localStorage.getItem('username');
    if (this.imagePreviewSrc) {
      this.store.dispatch(updateProfileImage({ userName: username, image: this.imageFile }));
      this.imagePreviewSrc = null;
    }
    if (this.profileForm.get('aboutMe').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'ABOUTME',
          controlValue: this.profileForm.get('aboutMe').value,
        }),
      );
    }
    if (this.profileForm.get('location').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'LOCATION',
          controlValue: this.profileForm.get('location').value,
        }),
      );
    }

    if (this.profileForm.get('organisation').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'ORGANISATION',
          controlValue: this.profileForm.get('organisation').value,
        }),
      );
    }
    if (this.profileForm.get('homepage').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'HOMEPAGE',
          controlValue: this.profileForm.get('homepage').value,
        }),
      );
    }
    if (this.profileForm.get('lang').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'LANGUAGE',
          controlValue: this.profileForm.get('lang').value,
        }),
      );
    }

    this.snackbar.open(this.translateService.instant('profileUpdated'), 'OK', {
      duration: 4000,
      panelClass: ['success-snackbar'],
    });
    this.routeToProfile();
  }

  routeToProfile() {
    this.router.navigate(['/profile/' + localStorage.getItem('username')]);
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreviewSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
    }
  }
}
