import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SliderHelper } from '../../helper/slider.helper';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  standalone: true,
  imports: [
    NgFor,
  ],
})
export class SliderComponent {
  @Input() stepsArray: number[] = [1, 5, 10, 50, 100];
  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private sliderHelper: SliderHelper) { }

  ngOnInit() {
  }

  showValue(value: number) {
    this.valueChanged.emit(this.stepsArray[value]);
  }
}
