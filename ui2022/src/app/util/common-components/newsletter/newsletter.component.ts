import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectCookies } from 'src/app/store/infrastructure.store';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  fullScreenNewsletter: boolean = false;
  cookiesAccepted$: Observable<boolean> = this.store.select(selectCookies);
  html = this.sanitizer.bypassSecurityTrustHtml(
    '<iframe width="100%" height="312" src="https://t924dfe8a.emailsys1a.net/126/2029/86f32163be/subscribe/form.html"></iframe>',
  );
  safeUrl;

  @ViewChild('iframe') submitButton: ElementRef<HTMLElement>;
  constructor(
    private router: Router,
    protected sanitizer: DomSanitizer,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.router.url.includes('newsletter')) {
      this.fullScreenNewsletter = true;
    }
  }

  subscribeToNewsletter() {}
}
