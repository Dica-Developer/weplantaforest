import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-tile',
  templateUrl: './tree-tile.component.html',
  styleUrls: ['./tree-tile.component.scss']
})
export class TreeTileComponent implements OnInit {

  @Input()
  name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
