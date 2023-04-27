import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  formDisabledFlagReset,
  loadCaptcha,
  selectCaptcha,
  selectCaptchaImg,
  selectFormDisabled,
  submitOfferArea,
} from 'src/app/store/infrastructure.store';

@Component({
  selector: 'app-offer-project-page',
  templateUrl: './offer-project-page.component.html',
  styleUrls: ['./offer-project-page.component.scss'],
})
export class OfferProjectPageComponent implements OnInit {
  offerForm = new UntypedFormGroup({
    first: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    mail: new UntypedFormControl(''),
    comment: new UntypedFormControl(''),
    captcha: new UntypedFormControl(''),
  });

  captchaInput: string = '';

  captchaToken: string = '';
  captchaImg;
  captchaTokenSub: Subscription;
  captchaImgSub: Subscription;

  formSubmitted: boolean = false;

  formSubmittedSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(formDisabledFlagReset());
    this.store.dispatch(loadCaptcha());
    this.formSubmittedSub = this.store.select(selectFormDisabled).subscribe((created) => {
      if (created) {
        this.offerForm.disable();
        this.formSubmitted = true;
      }
    });
    this.captchaTokenSub = this.store.select(selectCaptcha).subscribe((res) => {
      this.captchaToken = res;
    });
    this.captchaImgSub = this.store.select(selectCaptchaImg).subscribe((res) => {
      this.captchaImg = res;
    });
  }

  onSubmit(): void {
    if (this.offerForm.valid && this.compareCaptcha()) {
      this.store.dispatch(
        submitOfferArea({
          offer: {
            first: this.offerForm.get('first').value,
            name: this.offerForm.get('name').value,
            mail: this.offerForm.get('mail').value,
            comment: this.offerForm.get('comment').value,
          },
        }),
      );
    } else {
      console.log('wrong captcha or invalid form');
    }
  }

  updateUserInput(event: any) {
    this.captchaInput = event;
  }

  compareCaptcha() {
    if (this.captchaInput === this.captchaToken) {
      return true;
    } else {
      this.snackBar.open(this.translateService.instant('wrongCaptcha'), 'ok', {
        duration: 4000,
      });
      return false;
    }
  }

  refetchNewToken() {
    this.store.dispatch(loadCaptcha());
  }

  ngOnDestroy() {
    this.formSubmittedSub?.unsubscribe();
    this.captchaTokenSub?.unsubscribe();
    this.captchaImgSub?.unsubscribe();
  }
}
