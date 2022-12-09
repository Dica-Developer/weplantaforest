import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
})
export class ProjectTileComponent implements OnInit {
  @Input() projectReport;
  imgUrl: string;
  progress: number;

  constructor() {}

  ngOnInit(): void {
    // this.imgUrl =
    //   environment.backendUrl +
    //   '/project/image/' +
    //   this.projectReport.projectImageFileName
    this.imgUrl = environment.baseUrl + '/assets/forest.png';
    this.progress =
      (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
      100;
  }
}
