import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { selectLoginError, login } from '../store/auth.store';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginError$: Observable<string>;

  loginForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  constructor(private store: Store<AppState>) {
    this.loginError$ = store.select(selectLoginError);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(
      login({
        name: this.loginForm.get('name').value,
        password: this.loginForm.get('password').value,
      })
    );
  }
}