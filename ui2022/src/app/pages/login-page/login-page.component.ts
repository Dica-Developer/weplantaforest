import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { selectLoginError, login, loginFailed } from '../../store/auth.store';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginError$: Observable<string>;
  showPassword: boolean = false;
  loginForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  logoUrl = environment.baseUrl + '/assets/ipat_logo.png';

  constructor(private store: Store<AppState>) {
    this.loginError$ = store.select(selectLoginError);
  }

  ngOnInit(): void {
    this.store.dispatch(loginFailed({ error: '' }));
  }

  onSubmit(): void {
    this.store.dispatch(
      login({
        name: this.loginForm.get('name').value,
        password: this.loginForm.get('password').value,
      }),
    );
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
