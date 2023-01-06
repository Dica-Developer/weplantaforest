import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barrel-icon',
  templateUrl: './barrel-icon.component.html',
  styleUrls: ['./barrel-icon.component.scss'],
})
export class BarrelIconComponent implements OnInit {
  @Input() inToolbar: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.inToolbar) {
      document.getElementById('svg-icon').classList.add('inToolbar');
    }
  }
}
