import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TextHelper } from '../../text.helper';

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
})
export class ProjectTileComponent implements OnInit {
  @Input() projectInfo;
  imgUrl: string;
  progress: number = 0;
  description: string = '';

  constructor(
    private textHelper: TextHelper,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.imgUrl =
      environment.backendUrl +
      '/project/image/' +
      encodeURI(this.projectInfo.images[0].imageFileName) +
      '/1200/600';
    this.progress =
      (this.projectInfo.projectReportData.amountOfPlantedTrees /
        this.projectInfo.projectReportData.amountOfMaximumTreesToPlant) *
      100;
    this.description = this.textHelper.getTextForLanguage(
      this.projectInfo.projectReportData.description,
      this.translateService.currentLang,
    );
  }

  routeToProject() {
    this.router.navigate(['/project/' + this.projectInfo.projectReportData.projectName]);
  }
}
