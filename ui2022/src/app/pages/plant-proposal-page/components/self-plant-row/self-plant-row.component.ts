import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-self-plant-row',
    templateUrl: './self-plant-row.component.html',
    styleUrls: ['./self-plant-row.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class SelfPlantRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
