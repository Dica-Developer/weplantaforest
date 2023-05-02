import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  fullScreenNewsletter: boolean = false;
  html = this.sanitizer.bypassSecurityTrustHtml(
    '<iframe width="100%" height="150" src="https://t924dfe8a.emailsys1a.net/126/2029/86f32163be/subscribe/form.html"></iframe>',
  );
  safeUrl;

  @ViewChild('iframe') submitButton: ElementRef<HTMLElement>;
  constructor(private router: Router, protected sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.router.url.includes('newsletter')) {
      this.fullScreenNewsletter = true;
    }
  }

  subscribeToNewsletter() {}
}
