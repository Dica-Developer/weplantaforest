import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    reason: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    mail: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    message: new UntypedFormControl(''),
  });

  requestSentSubscription: Subscription;

  captchaInput: string = '';
  captchaValid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
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
    if (this.captchaValid) {
      let contactRequest: ContactRequest = {
        reason: this.contactForm.get('reason').value,
        name: this.contactForm.get('name').value,
        mail: this.contactForm.get('mail').value,
        phone: this.contactForm.get('phone').value,
        message: this.contactForm.get('message').value,
      };
      this.store.dispatch(submitContactRequestAction({ request: contactRequest }));
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
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
