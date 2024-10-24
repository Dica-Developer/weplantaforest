import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { selectCookies } from 'src/app/store/infrastructure.store';
import { CookieHelper } from '../../helper/cookie.helper';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ButtonComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class NewsletterComponent implements OnInit {
  cookiesAccepted$: Observable<boolean> = this.store.select(selectCookies);
  fullScreenNewsletter: boolean = false;
  safeUrl;
  html = this.sanitizer.bypassSecurityTrustHtml(
    '<iframe width="100%" height="312" src="https://t924dfe8a.emailsys1a.net/126/2029/86f32163be/subscribe/form.html"></iframe>',
  );

  @ViewChild('iframe') submitButton: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    protected sanitizer: DomSanitizer,
    private cookieHelper: CookieHelper,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('newsletter')) {
      this.fullScreenNewsletter = true;
    }
  }

  showCookieConfirmation() {
    this.cookieHelper.openCookieConfirmation();
  }

  subscribeToNewsletter() {}

}
