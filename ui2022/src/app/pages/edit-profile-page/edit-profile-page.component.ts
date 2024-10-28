import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { addError } from '../../store/error.state';
import {
  loadProfileDetails,
  selectProfileDetails,
  selectUploadingImage,
  updateProfileImage,
  updateProfileProperty,
} from 'src/app/store/profile.store';
import { SliderHelper } from 'src/app/util/helper/slider.helper';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatSuffix,
    MatInput,
    MatSelect,
    NgFor,
    MatOption,
    ButtonComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class EditProfilePageComponent implements OnInit, OnDestroy {
  profileForm: UntypedFormGroup;
  profileDetails$ = this.store.select(selectProfileDetails);
  selectedNewsletter: Boolean;

  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  orgTypeOptions: any[] = [
    { value: 'PRIVATE', label: 'PRIVATE' },
    { value: 'COMMERCIAL', label: 'COMMERCIAL' },
    { value: 'NONPROFIT', label: 'NONPROFIT' },
    { value: 'EDUCATIONAL', label: 'EDUCATIONAL' },
  ];
  imageFile: any;
  imagePreviewSrc: any = null;
  uploadingImage$ = this.store.select(selectUploadingImage);

  uploadImageSub: Subscription;

  showPassword: boolean = false;

  // since there is an issue with the image url not updating(which means its exactly the same after an image update)
  // when the image is changed, there has to be a little hack here to force the image to update
  // so we create a random number when the uploadImage select delivers a false and put it at the end of the image url
  randomNumber: number = 0;
  routeParamsSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private sliderHelper: SliderHelper,
    private platformHelper: PlatformHelper
  ) {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
      this.profileDetails$.pipe(take(1)).subscribe((res) => {
        if (res) {
          this.profileForm = new FormGroup({
            username: new UntypedFormControl(res.userName),
            mail: new UntypedFormControl(res.mail),
            aboutMe: new UntypedFormControl(res.aboutMe),
            location: new UntypedFormControl(res.location),
            organisation: new UntypedFormControl(res.organisation),
            homepage: new UntypedFormControl(res.homepage),
            lang: new UntypedFormControl(res.lang),
            organizationType: new UntypedFormControl(res.organizationType),
            password: new UntypedFormControl(''),
            repeatPassword: new UntypedFormControl(''),
          });
        }
      });
    });
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.uploadImageSub = this.store.select(selectUploadingImage).subscribe((uploading) => {
      if (!uploading) {
        this.randomNumber = this.sliderHelper.getRandomNumber();
      }
    });
  }

  updateProfile() {
    let username = this.platformHelper.getLocalstorage('username');
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
    if (this.profileForm.get('mail').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'MAIL',
          controlValue: this.profileForm.get('mail').value,
        }),
      );
    }
    if (this.profileForm.get('username').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'NAME',
          controlValue: this.profileForm.get('username').value,
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
    if (this.profileForm.get('organizationType').dirty) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'ORGANIZATION_TYPE',
          controlValue: this.profileForm.get('organizationType').value,
        }),
      );
    }
    if (
      this.profileForm.get('password').dirty &&
        this.profileForm.get('repeatPassword').dirty &&
        this.profileForm.get('password').value === this.profileForm.get('repeatPassword').value
    ) {
      this.store.dispatch(
        updateProfileProperty({
          username,
          propertyToUpdate: 'PASSWORD',
          controlValue: this.profileForm.get('password').value,
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
    this.router.navigate(['/user/' + this.platformHelper.getLocalstorage('username')]);
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      if (fileInputEvent.target.files[0].size >= 1048576) {
        this.store.dispatch(
          addError({
            error: {
              key: 'IMAGE_VALIDATION_ERROR',
              message: 'notGreaterThan1MB',
            },
          }),
        );
        return;
      }

      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreviewSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
    }
  }

  showWarning(fieldToChange: string) {
    if (fieldToChange === 'email') {
      this.snackbar.open(this.translateService.instant('emailChangedWarning'), 'OK', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    } else if (fieldToChange === 'username') {
      this.snackbar.open(this.translateService.instant('usernameChangedWarning'), 'OK', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    } else if (fieldToChange === 'password') {
      this.snackbar.open(this.translateService.instant('passwordChangedWarning'), 'OK', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.uploadImageSub?.unsubscribe();
    this.routeParamsSub?.unsubscribe();
  }
}
