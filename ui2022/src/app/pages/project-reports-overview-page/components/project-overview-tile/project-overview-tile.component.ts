import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-overview-tile',
  templateUrl: './project-overview-tile.component.html',
  styleUrls: ['./project-overview-tile.component.scss'],
})
export class ProjectOverviewTileComponent implements OnInit {
  @Input() projectReport;
  imgUrl: string;
  progress: number;
  description: string;
  constructor(
    private textHelper: TextHelper,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.imgUrl =
      environment.backendUrl +
      '/project/image/' +
      encodeURI(this.projectReport.projectImageFileName) +
      '/300/300';
    // this.imgUrl = environment.baseUrl + '/assets/forest.png';
    this.progress =
      (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
      100;
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.description,
      this.translateService.currentLang,
    );
  }

  // routeToProject() {
  //   this.router.navigate(['/project/' + encodeURIComponent(this.projectReport.projectName)]);
  // }
}
