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
  @Input() projectInfo;
  imgUrl: string;
  progress: number;
  description: string;
  backgroundImgUrl: string = 'none';
  zIndex: number = 1;

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

    // this.imgUrl =
    //   environment.backendUrl +
    //   '/project/image/' +
    //   encodeURI(this.projectReport.projectImageFileName) +
    //   '/1000/500';
    // this.progress =
    //   (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
    //   100;
    // this.description = this.getFirstParagraph(
    //   this.textHelper.getTextForLanguage(
    //     this.projectReport.description,
    //     this.translateService.currentLang,
    //   ),
    // );
  }

  showBackgroundImage(check: boolean) {
    if (check && this.projectInfo.images[0].imageFileName) {
      this.backgroundImgUrl = 'url(' + this.imgUrl + ')';
      this.zIndex = -1;
    } else {
      this.backgroundImgUrl = 'none';
      this.zIndex = 1;
    }
  }

  route() {
    this.router.navigate(['/project/' + this.projectInfo.projectReportData.projectName]);
  }

  getFirstParagraph(text) {
    if (text && text.includes('<p>')) {
      text = text.substr(3);
      text = text.substr(0, text.indexOf('</p>'));
    }
    return text;
  }
}
