import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-info-overlay',
  templateUrl: './tree-info-overlay.component.html',
  styleUrls: ['./tree-info-overlay.component.scss'],
})
export class TreeInfoOverlayComponent implements OnInit {
  @Output() treeinfoClosed = new EventEmitter();

  trees: any[] = [
    {
      name: 'Lärche',
      imgUrl: 'assets/lucy.jpg',
    },
    {
      name: 'Tanne',
      imgUrl: 'assets/lucy.jpg',
    },
    {
      name: 'Eiche',
      imgUrl: 'assets/lucy.jpg',
    },
    {
      name: 'Buche',
      imgUrl: 'assets/lucy.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  closeOverlay() {
    this.treeinfoClosed.emit();
  }
}
