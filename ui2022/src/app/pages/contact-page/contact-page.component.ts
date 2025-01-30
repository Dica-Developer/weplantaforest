import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  ContactRequest,
  resetContactForm,
  selectContactRequestSent,
  submitContactRequestAction,
} from 'src/app/store/contact.store';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { CaptchaComponent } from '../../util/common-components/captcha/captcha.component';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CaptchaComponent,
    ButtonComponent,
    TranslateModule,
  ],
})
export class ContactPageComponent implements OnInit, OnDestroy {
  contactForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    mail: new UntypedFormControl('', [Validators.required, Validators.email]),
    message: new UntypedFormControl('', Validators.required),
  });

  requestSentSubscription: Subscription;

  captchaInput: string = '';
  captchaValid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private platformHelper: PlatformHelper
  ) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.contactForm.reset();
    this.store.dispatch(resetContactForm());
    this.requestSentSubscription = this.store
      .select(selectContactRequestSent)
      .subscribe((isSent) => {
        if (isSent) {
          this.contactForm.disable();
          this.snackbar.open(this.translateService.instant('contactFormSubmitted'), 'OK', {
            duration: 4000,
            panelClass: ['success-snackbar'],
          });
          this.contactForm.reset();
        } else {
          this.contactForm.enable();
        }
      });
  }

  onSubmit(): void {
    if (this.captchaValid && this.contactForm.valid) {
      let contactRequest: ContactRequest = {
        name: this.contactForm.get('name').value,
        reason: '',
        mail: this.contactForm.get('mail').value,
        phone: '',
        message: this.contactForm.get('message').value,
      };
      this.store.dispatch(submitContactRequestAction({ request: contactRequest }));
    } else if (this.contactForm.get('name').invalid) {
      this.snackbar.open(this.translateService.instant('nameRequired'), 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    } else if (this.contactForm.get('mail').invalid) {
      this.snackbar.open(this.translateService.instant('mailRequired'), 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    } else if (this.contactForm.get('message').invalid) {
      this.snackbar.open(this.translateService.instant('messageRequired'), 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    } else if (!this.captchaValid) {
      this.snackbar.open(this.translateService.instant('wrongCaptcha'), 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    }
  }

  updateCaptchaStatus(event: any) {
    this.captchaValid = event;
  }

  ngOnDestroy(): void {
    if (this.requestSentSubscription) {
      this.requestSentSubscription.unsubscribe();
    }
  }
}
