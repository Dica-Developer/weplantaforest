import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ProjectReportDetails } from 'src/app/store/project-report.store';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { LightboxGalleryComponent } from '../../../../util/common-components/lightbox-gallery/lightbox-gallery.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { NgIf } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { SafeHtmlPipe } from 'src/app/util/common-components/safehtml.pipe';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    RouterLink,
    LightboxGalleryComponent,
    TranslateModule,
    SafeHtmlPipe
  ],
})
export class ProjectDescriptionComponent implements OnInit {
  @Input() projectReport: ProjectReportDetails;

  @Output() showProjectPlanting: EventEmitter<void> = new EventEmitter<void>();

  activeProject: boolean;
  allPlanted: boolean = false;
  description: string;
  images: { imageUrl: string; caption: string }[] = [];
  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private translateService: TranslateService) {}

  ngOnInit(): void {
    this.activeProject = this.projectReport.projectReportData.active;
    let alreadyPlanted = this.projectReport.projectReportData.amountOfPlantedTrees;
    let maxToPlant = this.projectReport.projectReportData.amountOfMaximumTreesToPlant;

    if ((maxToPlant - alreadyPlanted) === 0) {
      this.allPlanted = true;
    }
    this.images = [];
    for (let image of this.projectReport.images) {
      let url =
        environment.backendUrl + '/project/image/' + encodeURI(image.imageFileName) + '/2000/1000';
      let caption = this.textHelper.getTextForLanguage(
        image.description,
        this.translateService.currentLang,
      );
      this.images.unshift({ imageUrl: url, caption });
    }
    this.description = this.textHelper.getTextForLanguage(
      this.projectReport.projectReportData.description,
      this.translateService.currentLang,
    );
  }

  showProjectPlantingClicked() {
    this.showProjectPlanting.emit();
    this.platformHelper.scrollTop()
  }
}
