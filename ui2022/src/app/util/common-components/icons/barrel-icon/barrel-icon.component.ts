import { Component, Input, OnInit } from '@angular/core';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-barrel-icon',
  templateUrl: './barrel-icon.component.html',
  styleUrls: ['./barrel-icon.component.scss'],
  standalone: true,
})
export class BarrelIconComponent implements OnInit {
  @Input() inToolbar: Boolean = false;

  constructor(private platformHelper: PlatformHelper) {}

  ngOnInit(): void {
    if (this.inToolbar && this.platformHelper.checkIfBrowser()) {
      document.getElementById('svg-icon').classList.add('inToolbar');
    }
  }
}
