import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectReportDetails } from 'src/app/store/project-report.store';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {
  @Input() projectReport: ProjectReportDetails;
  activeProject: boolean;
  description: string;
  imageUrls: String[] = [];
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.activeProject = this.projectReport.projectReportData.active;
    this.imageUrls = [];
    for (let image of this.projectReport.images) {
      let url =
        environment.backendUrl + '/project/image/' + encodeURI(image.imageFileName) + '/1140/570';
      this.imageUrls.push(url);
    }
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.projectReportData.description,
      this.translateService.currentLang,
    );
  }
}
