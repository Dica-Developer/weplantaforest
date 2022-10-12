import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { selectPasswordResetSent, resetPassword, verifyPasswordResetLink, selectVerifyPasswordResetLink } from '../store/auth.store';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl(''),
    passwordConfirmation: new FormControl(''),
  });
  id: string = '';
  key: string = '';

  passwordResetSent$: Observable<boolean> = this.store.select(selectPasswordResetSent);
  verifyPasswordResetLink$: Observable<boolean> = this.store.select(selectVerifyPasswordResetLink);

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) {}

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

  onSubmit(): void {
    this.store.dispatch(
      resetPassword({
        id: this.id,
        password: this.resetPasswordForm.get('password').value,
        key: this.key,
        language: 'DEUTSCH',
      }),
    );
  }
}
