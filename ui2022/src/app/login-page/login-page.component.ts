import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { selectLoginError, login } from '../store/auth.store';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginError$: Observable<string>;

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
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