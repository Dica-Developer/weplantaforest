import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  formDisabledFlagReset,
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
  });

  captchaInput: string = '';
  captchaToken: string = '';
  captchaValid: boolean = false;

  formSubmittedSub: Subscription;
  formSubmitted: boolean = false;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.dispatch(formDisabledFlagReset());
    this.formSubmittedSub = this.store.select(selectFormDisabled).subscribe((created) => {
      if (created) {
        this.offerForm.disable();
        this.formSubmitted = true;
        this.snackBar.open(this.translateService.instant('formSubmitted'), 'OK', {
          duration: 4000,
          panelClass: ['success-snackbar'],
        });
      }
    });
  }

  updateCaptchaStatus(event: any) {
    this.captchaValid = event;
  }

  onSubmit(): void {
    if (this.offerForm.valid && this.captchaValid) {
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
      this.snackBar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
      });
    }
  }

  ngOnDestroy() {
    this.formSubmittedSub?.unsubscribe();
  }
}
