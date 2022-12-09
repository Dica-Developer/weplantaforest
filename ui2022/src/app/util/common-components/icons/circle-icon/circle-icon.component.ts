import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-icon',
  templateUrl: './circle-icon.component.html',
  styleUrls: ['./circle-icon.component.scss'],
})
export class CircleIconComponent implements OnInit {
  @Input() width: number = 20;
  @Input() height: number = 20;

  constructor() {}

  ngOnInit(): void {}
}
