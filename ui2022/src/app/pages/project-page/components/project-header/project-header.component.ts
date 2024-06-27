import { Component, Input, OnInit } from '@angular/core';
import { ProjectReportDetails } from 'src/app/store/project-report.store';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-project-header',
    templateUrl: './project-header.component.html',
    styleUrls: ['./project-header.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule],
})
export class ProjectHeaderComponent implements OnInit {
  @Input() projectReport: ProjectReportDetails;
  percentage: number;

  constructor() {}

  ngOnInit(): void {
    this.percentage = +(
      (this.projectReport.projectReportData.amountOfPlantedTrees /
        this.projectReport.projectReportData.amountOfMaximumTreesToPlant) *
      100
    ).toFixed(1);
  }
}
