import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectVerificationSuccess, verifyRegistration } from 'src/app/store/auth.store';

@Component({
  selector: 'app-verify-registration-page',
  templateUrl: './verify-registration-page.component.html',
  styleUrls: ['./verify-registration-page.component.scss'],
})
export class VerifyRegistrationPageComponent implements OnInit {
  verificationSuccess$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.verificationSuccess$ = this.store.select(selectVerificationSuccess);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.store.dispatch(
        verifyRegistration({
          id: +params['id'],
          key: params['key'],
          language: 'de',
        }),
      );
    });
  }
}
