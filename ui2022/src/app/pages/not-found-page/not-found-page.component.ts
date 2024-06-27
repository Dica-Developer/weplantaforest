import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../util/common-components/footer/footer.component';
import { ToolbarComponent } from '../../util/common-components/toolbar/toolbar.component';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
    standalone: true,
    imports: [ToolbarComponent, FooterComponent]
})
export class NotFoundPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
