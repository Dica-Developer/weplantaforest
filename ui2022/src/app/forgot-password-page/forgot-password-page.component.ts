import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { resetPasswordRequest, selectPasswordResetRequestSent } from '../store/auth.store';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  passwordResetRequestSent$: Observable<boolean> = this.store.select(selectPasswordResetRequestSent);

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