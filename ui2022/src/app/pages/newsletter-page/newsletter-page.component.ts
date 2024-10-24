import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NewsletterComponent } from 'src/app/util/common-components/newsletter/newsletter.component';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NewsletterComponent
  ],
  templateUrl: './newsletter-page.component.html',
  styleUrl: './newsletter-page.component.scss'
})
export class NewsletterPageComponent {

  constructor(
    private platformHelper: PlatformHelper,
  ) {
  }

  ngOnInit() {
    this.platformHelper.scrollTop()
  }

}
