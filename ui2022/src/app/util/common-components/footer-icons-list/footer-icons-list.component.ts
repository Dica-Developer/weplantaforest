import { Component, OnInit } from '@angular/core';
import { FacebookIconComponent } from '../icons/facebook-icon/facebook-icon.component';
import { YoutubeIconComponent } from '../icons/youtube-icon/youtube-icon.component';
import { InstagramIconComponent } from '../icons/instagram-icon/instagram-icon.component';

@Component({
    selector: 'app-footer-icons-list',
    templateUrl: './footer-icons-list.component.html',
    styleUrls: ['./footer-icons-list.component.scss'],
    standalone: true,
    imports: [InstagramIconComponent, YoutubeIconComponent, FacebookIconComponent]
})
export class FooterIconsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
