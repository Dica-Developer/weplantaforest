import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss'],
    standalone: true,
    imports: [MatIcon],
})
export class PagingComponent implements OnInit {
  @Input()
  activePage: number;

  @Input()
  totalPageCount: number;

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  changePage(page: number) {
    this.pageChanged.emit(page);
  }
}
