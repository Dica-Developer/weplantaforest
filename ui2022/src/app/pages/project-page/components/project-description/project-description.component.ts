import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {
  @Input() projectReport;
  imgUrl: string;

  constructor() {}

  ngOnInit(): void {
    // this.imgUrl =
    //   environment.backendUrl +
    //   '/project/image/' +
    //   encodeURI(this.projectReport.projectImageFileName) +
    //   '/300/300';
    this.imgUrl = environment.baseUrl + '/assets/forest.png';
  }
}
