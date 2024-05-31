import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterIconsListComponent } from '../footer-icons-list/footer-icons-list.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [RouterLink, FooterIconsListComponent, TranslateModule]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
