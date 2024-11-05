import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-barrel-icon',
    templateUrl: './barrel-icon.component.html',
    styleUrls: ['./barrel-icon.component.scss'],
    standalone: true,
})
export class BarrelIconComponent implements OnInit {
  @Input() inToolbar: Boolean = false;

  constructor() {}

  ngOnInit(): void {
  }
}
