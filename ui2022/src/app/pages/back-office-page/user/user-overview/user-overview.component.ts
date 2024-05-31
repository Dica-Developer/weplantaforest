import { Component, OnInit } from '@angular/core';
import { UserGridComponent } from '../user-grid/user-grid.component';

@Component({
    selector: 'app-user-overview',
    templateUrl: './user-overview.component.html',
    styleUrls: ['./user-overview.component.scss'],
    standalone: true,
    imports: [UserGridComponent]
})
export class UserOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
