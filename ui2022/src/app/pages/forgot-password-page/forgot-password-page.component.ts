import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { resetPasswordRequest, selectPasswordResetRequestSent } from '../../store/auth.store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
  });

  passwordResetRequestSent$: Observable<boolean> = this.store.select(
    selectPasswordResetRequestSent,
  );
  logoUrl = environment.baseUrl + 'assets/ipat_logo.png';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(
      resetPasswordRequest({
        email: this.forgotPasswordForm.get('email').value,
        language: 'DEUTSCH',
      }),
    );
  }
}
