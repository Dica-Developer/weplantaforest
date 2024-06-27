import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectCookies } from 'src/app/store/infrastructure.store';
import { ButtonComponent } from 'src/app/util/common-components/button/button.component';
import { NewsletterComponent } from 'src/app/util/common-components/newsletter/newsletter.component';
import { CookieHelper } from 'src/app/util/helper/cookie.helper';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    TranslateModule,
    NewsletterComponent
  ],
  templateUrl: './newsletter-page.component.html',
  styleUrl: './newsletter-page.component.scss'
})
export class NewsletterPageComponent {
  cookiesAccepted$: Observable<boolean> = this.store.select(selectCookies);

  constructor(
    private store: Store<AppState>,
    private cookieHelper: CookieHelper,
    private platformHelper: PlatformHelper,
  ) {
  }

  ngOnInit() {
    this.platformHelper.scrollTop()
  }

  showCookieConfirmation() {
    this.cookieHelper.openCookieConfirmation();
  }
}
