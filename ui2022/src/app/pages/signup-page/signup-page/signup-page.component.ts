import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { selectSignupError, signup } from 'src/app/store/auth.store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupError$: Observable<string>;

  signupForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    repeatPassword: new UntypedFormControl(''),
    mail: new UntypedFormControl(''),
    newsletter: new UntypedFormControl(false),
    orgType: new UntypedFormControl('PRIVATE'),
    language: new UntypedFormControl('DEUTSCH'),
  });

  logoUrl = environment.baseUrl + '/assets/ipat_logo.png';

  constructor(private store: Store<AppState>, private translateService: TranslateService) {
    this.signupError$ = store.select(selectSignupError);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('signing up');
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
    } else {
      console.log('error');
    }
  }
}
