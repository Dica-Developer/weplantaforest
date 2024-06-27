import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../util/common-components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../../util/common-components/toolbar/toolbar.component';

@Component({
    selector: 'app-user-router-outlet',
    templateUrl: './user-router-outlet.component.html',
    styleUrls: ['./user-router-outlet.component.scss'],
    standalone: true,
    imports: [ToolbarComponent, RouterOutlet, FooterComponent]
})
export class UserRouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
