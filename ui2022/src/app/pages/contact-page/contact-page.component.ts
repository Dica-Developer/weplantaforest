import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  contactForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phonenumber: new UntypedFormControl(''),
    message: new UntypedFormControl(''),
  });

  video;
  btn;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submitting');

    // this.store.dispatch(
    //   contact({
    //     name: this.contactForm.get('name').value,
    //     password: this.contactForm.get('email').value,
    //   }),
    // );
  }
}
