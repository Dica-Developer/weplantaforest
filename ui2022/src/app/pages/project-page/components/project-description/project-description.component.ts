import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() showProjectPlanting: EventEmitter<void> = new EventEmitter<void>();

  activeProject: boolean;
  description: string;
  images: { imageUrl: string; caption: string }[] = [];
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.activeProject = this.projectReport.projectReportData.active;
    this.images = [];
    for (let image of this.projectReport.images) {
      let url =
        environment.backendUrl + '/project/image/' + encodeURI(image.imageFileName) + '/1140/570';
      let caption = this.textHelper.getTextForLanguage(image.description, this.translateService.currentLang);      
      this.images.push({imageUrl: url, caption});
    }
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.projectReportData.description,
      this.translateService.currentLang,
    );
  }

  showProjectPlantingClicked() {
    this.showProjectPlanting.emit();
  }
}
