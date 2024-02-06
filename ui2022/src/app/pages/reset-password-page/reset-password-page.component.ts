import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import {
  selectPasswordResetSent,
  resetPassword,
  verifyPasswordResetLink,
  selectVerifyPasswordResetLink,
} from '../../store/auth.store';
import { environment } from '../../../environments/environment';
import { PasswordValidation } from '../../util/validators/compare-password.validator';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm = new UntypedFormGroup(
    {
      password: new UntypedFormControl(''),
      passwordConfirmation: new UntypedFormControl(''),
    },
    PasswordValidation.MatchPassword,
  );
  id: string = '';
  key: string = '';
  showPassword: boolean = false;

  logoUrl = environment.baseUrl + 'assets/ipat_logo.png';

  passwordResetSent$: Observable<boolean> = this.store.select(selectPasswordResetSent);
  verifyPasswordResetLink$: Observable<boolean> = this.store.select(selectVerifyPasswordResetLink);

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((res) => {
      this.id = res['id'];
      this.key = res['key'];

      this.store.dispatch(
        verifyPasswordResetLink({
          id: this.id,
          key: this.key,
          language: 'DEUTSCH',
        }),
      );
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.store.dispatch(
        resetPassword({
          id: this.id,
          password: this.resetPasswordForm.get('password').value,
          key: this.key,
          language: 'DEUTSCH',
        }),
      );
    } else {
      this.snackbar.open(this.translateService.instant('passwordsDontMatch'), 'OK', {
        duration: 4000,
      });
    }
  }
}
