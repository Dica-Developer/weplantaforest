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
  imgUrl: string;
  description: string;
  imageUrls: String[] = ['assets/lucy.jpg', 'assets/upside.jpg', 'assets/lucy.jpg'];
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    // this.imgUrl =
    //   environment.backendUrl +
    //   '/project/image/' +
    //   encodeURI(this.projectReport.projectImageFileName) +
    //   '/300/300';
    this.imgUrl = environment.baseUrl + '/assets/lucy.jpg';
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.projectReportData.description,
      this.translateService.currentLang,
    );
  }
}
