import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { downloadReceiptPdf } from 'src/app/store/carts.store';
import { loadProfileDetails, redeemGift, selectProfileDetails } from 'src/app/store/profile.store';
import { selectActiveProjectReports } from 'src/app/store/project-report.store';
import { selectTeamDetails } from 'src/app/store/team.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, AfterViewInit, OnDestroy {
  profileDetails$ = this.store.select(selectProfileDetails);
  plantings$ = this.store.select(selectActiveProjectReports);
  teamDetails$ = this.store.select(selectTeamDetails);
  showEdit: boolean = false;

  giftForm: FormGroup = new FormGroup({
    value1: new FormControl('', [Validators.required(), Validators.minLength(4)]),
    value2: new FormControl('', [
      Validators.required(),
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    value3: new FormControl('', [
      Validators.required(),
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
    value4: new FormControl('', [
      Validators.required(),
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

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
      if (paramMap.get('username') === localStorage.getItem('username')) {
        this.showEdit = true;
      } else {
        this.showEdit = false;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.giftForm);
  }

  ngAfterViewInit(): void {
    this.value1ChangeSub = this.giftForm.get('value1').valueChanges.subscribe((value) => {
      if (value) {
        // count amount of '-' in value
        const count = (value.match(/-/g) || []).length;
        if (count === 3) {
          //split value into 4 parts based divided by '-'
          const values = value.split('-');
          //set form values
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

  downloadReceipt(receiptId: number) {
    this.store.dispatch(downloadReceiptPdf({ receiptId }));
  }
}
