import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import {
  selectSignupDone,
  selectSignupError,
  signup,
  signupDoneReset,
} from 'src/app/store/auth.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupError$: Observable<string>;
  signupDone$: Observable<boolean>;
  showPassword: boolean = false;

  signupForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
    repeatPassword: new UntypedFormControl('', Validators.required),
    mail: new UntypedFormControl('', [Validators.required, Validators.email]),
    newsletter: new UntypedFormControl(false, Validators.required),
    orgType: new UntypedFormControl('PRIVATE', Validators.required),
    language: new UntypedFormControl('DEUTSCH', Validators.required),
    terms: new UntypedFormControl(false, Validators.requiredTrue),
    privacyPolicy: new UntypedFormControl(false, Validators.requiredTrue),
  });

  newsletterOptions: any[] = [
    { value: true, label: 'yes' },
    { value: false, label: 'no' },
  ];

  languageOptions: any[] = [
    { value: 'ENGLISH', label: 'english' },
    { value: 'DEUTSCH', label: 'german' },
  ];

  orgTypeOptions: any[] = [
    { value: 'NONPROFIT', label: 'NONPROFIT' },
    { value: 'PRIVATE', label: 'PRIVATE' },
    { value: 'COMMERCIAL', label: 'COMMERCIAL' },
    { value: 'EDUCATIONAL', label: 'EDUCATIONAL' },
  ];

  logoUrl = environment.baseUrl + '/assets/ipat_logo.png';

  captchaInput: string = '';
  captchaValid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {
    this.signupError$ = store.select(selectSignupError);
    this.signupDone$ = store.select(selectSignupDone);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.dispatch(signupDoneReset());
  }

  private checkPasswords(): boolean {
    const pass = this.signupForm.get('password').value;
    const confirmPass = this.signupForm.get('repeatPassword').value;
    return pass === confirmPass;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.checkPasswords() && this.captchaValid) {
      this.store.dispatch(
        signup({
          name: this.signupForm.get('name').value,
          password: this.signupForm.get('password').value,
          mail: this.signupForm.get('mail').value,
          newsletter: this.signupForm.get('newsletter').value,
          orgType: this.signupForm.get('orgType').value,
          language: this.signupForm.get('language').value,
        }),
      );
    } else if (!this.captchaValid) {
      this.snackbar.open(this.translateService.instant('wrongCaptcha'), 'OK', {
        duration: 4000,
      });
    } else if (!this.checkPasswords()) {
      this.snackbar.open(this.translateService.instant('passwordsDontMatch'), 'OK', {
        duration: 4000,
      });
    } else if (!this.signupForm.get('terms').value || !this.signupForm.get('privacyPolicy').value) {
      this.snackbar.open(this.translateService.instant('acceptTerms'), 'OK', {
        duration: 4000,
      });
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
      });
    }
  }

  updateCaptchaStatus(event: any) {
    this.captchaValid = event;
  }
}
