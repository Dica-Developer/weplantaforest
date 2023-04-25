import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
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

  formSubmitted: boolean = false;

  formSubmittedSub: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(formDisabledFlagReset());
    this.formSubmittedSub = this.store.select(selectFormDisabled).subscribe((created) => {
      if (created) {
        this.offerForm.disable();
        this.formSubmitted = true;
      }
    });
  }

  onSubmit(): void {
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
  }

  ngOnDestroy() {
    this.formSubmittedSub?.unsubscribe();
  }
}
