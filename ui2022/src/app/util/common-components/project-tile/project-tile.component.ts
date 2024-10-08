import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TextHelper } from 'src/app/util/helper/text.helper';

@Component({
    selector: 'app-project-tile',
    templateUrl: './project-tile.component.html',
    styleUrls: ['./project-tile.component.scss'],
    standalone: true,
    imports: [TranslateModule],
})
export class ProjectTileComponent implements OnInit {
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
      '/1200/600';
    // this.imgUrl = environment.baseUrl + '/assets/forest.png';
    this.progress =
      (this.projectReport.amountOfPlantedTrees / this.projectReport.amountOfMaximumTreesToPlant) *
      100;
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.description,
      this.translateService.currentLang,
    );
  }

  routeToProject() {
    this.router.navigate(['/project/' + this.projectReport.projectName]);
  }
}
