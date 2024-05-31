import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [MatButton],
})
export class ButtonComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  type: string;

  @Output()
  clicked: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  buttonClicked() {
    this.clicked.emit(null);
  }
}
