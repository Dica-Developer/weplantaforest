import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-logo-icon',
    templateUrl: './logo-icon.component.html',
    styleUrls: ['./logo-icon.component.scss'],
    standalone: true,
})
export class LogoIconComponent implements OnInit {
  @Input()
  width: number = 56;

  @Input()
  black: boolean = false;

  @Input()
  height: number = 56;

  constructor() {}

  ngOnInit(): void {
  }
}
