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
      encodeURI(this.projectReport.projectImageFileName) +
      '/800/400';
    this.progress =
      (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
      100;
    this.description = this.getFirstParagraph(
      this.textHelper.getTextForLanguage(
        this.projectReport.description,
        this.translateService.currentLang,
      ),
    );
  }

  showBackgroundImage(check: boolean) {
    if (check && this.projectReport.projectImageFileName) {
      this.backgroundImgUrl = 'url(' + this.imgUrl + ')';
      this.zIndex = -1;
    } else {
      this.backgroundImgUrl = 'none';
      this.zIndex = 1;
    }
  }

  route() {
    this.router.navigate(['/project/' + this.projectReport.projectName]);
  }

  getFirstParagraph(text) {
    if (text && text.includes('<p>')) {
      text = text.substr(3);
      text = text.substr(0, text.indexOf('</p>'));
    }
    return text;
  }
}
