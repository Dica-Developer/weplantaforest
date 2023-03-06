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
  description: string;
  // imageUrls: String[] = [
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  //   'assets/upside.jpg',
  //   'assets/lucy.jpg',
  // ];
  imageUrls: String[] = [];
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.imageUrls = [];
    for (let image of this.projectReport.images) {
      let url =
        environment.backendUrl + '/project/image/' + encodeURI(image.imageFileName) + '/300/300';
      this.imageUrls.push(url);
    }
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.projectReportData.description,
      this.translateService.currentLang,
    );
  }
}
