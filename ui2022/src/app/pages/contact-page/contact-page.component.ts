import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ContactRequest, submitContactRequestAction } from 'src/app/store/contact.store';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  contactForm = new UntypedFormGroup({
    reason: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    mail: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    message: new UntypedFormControl(''),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSubmit(): void {
    let contactRequest: ContactRequest = {
      reason: this.contactForm.get('reason').value,
      name: this.contactForm.get('name').value,
      mail: this.contactForm.get('mail').value,
      phone: this.contactForm.get('phone').value,
      message: this.contactForm.get('message').value,
    };
    this.store.dispatch(submitContactRequestAction({ request: contactRequest }));
  }
}
