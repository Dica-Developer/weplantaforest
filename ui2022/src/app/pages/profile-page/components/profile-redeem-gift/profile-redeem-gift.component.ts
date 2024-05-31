import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import { redeemGift } from '../../../../store/profile.store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-profile-redeem-gift',
    templateUrl: './profile-redeem-gift.component.html',
    styleUrls: ['./profile-redeem-gift.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInput,
        ButtonComponent,
        TranslateModule,
    ],
})
export class ProfileRedeemGiftComponent implements OnInit, AfterViewInit, OnDestroy {
  giftForm: FormGroup = new FormGroup({
    value1: new FormControl('', [Validators.required, Validators.minLength(4)]),
    value2: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    value3: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    value4: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
  });

  value1ChangeSub: Subscription;
  value2ChangeSub: Subscription;
  value3ChangeSub: Subscription;

  @ViewChild('value1')
  value1Input: ElementRef;

  @ViewChild('value2')
  value2Input: ElementRef;

  @ViewChild('value3')
  value3Input: ElementRef;

  @ViewChild('value4')
  value4Input: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.value1ChangeSub = this.giftForm.get('value1').valueChanges.subscribe((value) => {
      if (value) {
        // count amount of '-' in value
        const count = (value.match(/-/g) || []).length;
        const spaceCount = (value.match(/ /g) || []).length;
        if (count === 3) {
          //split value into 4 parts based divided by '-'
          const values = value.split('-');
          //set form values
          this.giftForm.get('value1').setValue(values[0]);
          this.giftForm.get('value2').setValue(values[1]);
          this.giftForm.get('value3').setValue(values[2]);
          this.giftForm.get('value4').setValue(values[3]);
        } else if (spaceCount === 3) {
          const values = value.split(' ');
          this.giftForm.get('value1').setValue(values[0]);
          this.giftForm.get('value2').setValue(values[1]);
          this.giftForm.get('value3').setValue(values[2]);
          this.giftForm.get('value4').setValue(values[3]);
        }

        // jump to next input if length 4 is reached
        else if (value.length === 4) {
          this.value2Input.nativeElement.focus();
        }
      }
    });

    this.value2ChangeSub = this.giftForm.get('value2').valueChanges.subscribe((value) => {
      if (value) {
        if (value.length === 4) {
          this.value3Input.nativeElement.focus();
        }
      }
    });

    this.value3ChangeSub = this.giftForm.get('value3').valueChanges.subscribe((value) => {
      if (value) {
        if (value.length === 4) {
          this.value4Input.nativeElement.focus();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.value1ChangeSub?.unsubscribe();
    this.value2ChangeSub?.unsubscribe();
    this.value3ChangeSub?.unsubscribe();
  }

  redeemGiftCode() {
    const code =
      this.giftForm.get('value1').value +
      '-' +
      this.giftForm.get('value2').value +
      '-' +
      this.giftForm.get('value3').value +
      '-' +
      this.giftForm.get('value4').value;
    this.store.dispatch(redeemGift({ code }));
  }
}
