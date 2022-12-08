import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  label: string;

  @Output()
  clicked: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  buttonClicked() {
    this.clicked.emit(null);
  }
}
