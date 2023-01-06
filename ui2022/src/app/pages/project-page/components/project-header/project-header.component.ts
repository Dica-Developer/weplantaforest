import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss'],
})
export class ProjectHeaderComponent implements OnInit {
  @Input() projectReport;
  progress: number;

  constructor() {}

  ngOnInit(): void {
    // this.progress =
    //   (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
    //   100;
  }
}
