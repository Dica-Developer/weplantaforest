import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadCaptcha, selectCaptcha, selectCaptchaImg } from 'src/app/store/infrastructure.store';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements OnInit {
  @Input() captchaInput: string = '';
  @Input() captchaToken: string = '';
  @Output() captchaStatusEmit = new EventEmitter<boolean>();
  captchaImg;
  captchaTokenSub: Subscription;
  captchaImgSub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCaptcha());
    this.captchaTokenSub = this.store.select(selectCaptcha).subscribe((res) => {
      this.captchaToken = res;
    });
    this.captchaImgSub = this.store.select(selectCaptchaImg).subscribe((res) => {
      this.captchaImg = res;
    });
  }

  updateUserInput(event: any) {
    this.captchaInput = event;
    this.captchaStatusEmit.emit(this.compareCaptcha());
  }

  compareCaptcha() {
    if (this.captchaInput === this.captchaToken) {
      return true;
    } else {
      return false;
    }
  }

  refetchNewToken() {
    this.store.dispatch(loadCaptcha());
  }
}
