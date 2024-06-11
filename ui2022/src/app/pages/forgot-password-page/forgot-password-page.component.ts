import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  resetPasswordRequest,
  resetState,
  selectPasswordResetRequestSent,
} from '../../store/auth.store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
  });

  passwordResetRequestSent$: Observable<boolean> = this.store.select(
    selectPasswordResetRequestSent,
  );

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.store.dispatch(resetState());
  }

  onSubmit(): void {
    this.store.dispatch(
      resetPasswordRequest({
        name: this.forgotPasswordForm.get('name').value,
        language: 'DEUTSCH',
      }),
    );
  }
}
