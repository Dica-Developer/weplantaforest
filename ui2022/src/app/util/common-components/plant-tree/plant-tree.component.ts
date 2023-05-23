import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plant-tree',
  templateUrl: './plant-tree.component.html',
  styleUrls: ['./plant-tree.component.scss'],
})
export class PlantTreeComponent implements OnInit {
  hover: boolean;
  trees: { name: string; urlColor: string; urlBW: string }[] = [];
  constructor() {}

  ngOnInit(): void {
    this.trees.push(
      {
        name: 'Buche',
        urlColor: environment.backendUrl + '/treeType/image/Buche_treeImageColor.jpg/1000/1000',
        urlBW: environment.backendUrl + '/treeType/image/Buche_treeImageBW.jpg/1000/1000',
      },
      {
        name: 'Eiche',
        urlColor: environment.backendUrl + '/treeType/image/Eiche_treeImageColor.jpg/1000/1000',
        urlBW: environment.backendUrl + '/treeType/image/Eiche_treeImageBW.jpg/1000/1000',
      },
      {
        name: 'Kiefer',
        urlColor: environment.backendUrl + '/treeType/image/Kiefer_treeImageColor.jpg/1000/1000',
        urlBW: environment.backendUrl + '/treeType/image/Kiefer_treeImageBW.jpg/1000/1000',
      },
    );
  }
}
