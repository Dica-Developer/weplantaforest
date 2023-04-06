import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartConfiguration } from 'chart.js';
import { combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.scss'],
})
export class FactsPageComponent implements OnInit {
  labels: string[] = [];
  piechartLabels: string[] = [];
  amountOfTrees: number[] = [];
  amountOfTreesSum: number[] = [];
  co2Saved: number[] = [];
  amountOfUsers: number[] = [];
  amountOfUsersSum: number[] = [];
  amountTreesPerOrg: number[] = [];
  chartsInitialized = false;

  getTreesPerYear$ = this.statisticsService.getTreesPerYear();
  getCo2$ = this.statisticsService.getCo2();
  getUsersPerYear$ = this.statisticsService.getUsersPerYear();
  getTreesPerOrgType$ = this.statisticsService.getTreesPerOrgType();

  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  constructor(
    private statisticsService: StatisticsService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    let privateOrg = this.translateService.instant('PRIVATE');
    let commercialOrg = this.translateService.instant('COMMERCIAL');
    let nonprofitOrg = this.translateService.instant('NONPROFIT');
    let educationalOrg = this.translateService.instant('EDUCATIONAL');
    this.piechartLabels.push(privateOrg, commercialOrg, nonprofitOrg, educationalOrg);

    combineLatest([
      this.getTreesPerYear$,
      this.getCo2$,
      this.getUsersPerYear$,
      this.getTreesPerOrgType$,
    ]).subscribe(([treesPerYear, co2, usersPerYear, treesPerOrg]) => {
      (treesPerYear as any[]).forEach((year, index) => {
        this.labels.push(year.label);
        this.amountOfTrees.push(year.amount);
        if (index === 0) {
          this.amountOfTreesSum.push(year.amount);
        } else {
          this.amountOfTreesSum.push(this.amountOfTreesSum[index - 1] + year.amount);
        }
      });
      (co2 as any[]).forEach((year, index) => {
        this.co2Saved.push(year.co2);
      });
      (usersPerYear as any[]).forEach((year, index) => {
        this.amountOfUsers.push(year.amount);
        if (index === 0) {
          this.amountOfUsersSum.push(year.amount);
        } else {
          this.amountOfUsersSum.push(this.amountOfUsersSum[index - 1] + year.amount);
        }
      });
      (treesPerOrg as any[]).forEach((orgType, index) => {
        this.amountTreesPerOrg.push(orgType.amount);
      });
      this.chartsInitialized = true;
    });
  }

  public amountPerYearData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{ label: '', data: this.amountOfTrees, backgroundColor: 'rgb(130, 171, 31)' }],
  };
  public amountOfTreesSumData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        label: '',
        data: this.amountOfTreesSum,
        pointBackgroundColor: 'rgb(130, 171, 31)',
        fill: 'origin',
        backgroundColor: 'rgb(130, 171, 31, 0.35)',
        borderColor: 'rgb(130, 171, 31, 0.7)',
      },
    ],
  };
  public co2SumData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        label: '',
        data: this.co2Saved,
        pointBackgroundColor: 'rgb(130, 171, 31)',
        fill: 'origin',
        backgroundColor: 'rgb(130, 171, 31, 0.35)',
        borderColor: 'rgb(130, 171, 31, 0.7)',
      },
    ],
  };
  public usersPerYearData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{ label: '', data: this.amountOfUsers, backgroundColor: 'rgb(130, 171, 31)' }],
  };
  public usersSumData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        label: '',
        data: this.amountOfUsersSum,
        pointBackgroundColor: 'rgb(130, 171, 31)',
        fill: 'origin',
        backgroundColor: 'rgb(130, 171, 31, 0.35)',
        borderColor: 'rgb(130, 171, 31, 0.7)',
      },
    ],
  };
  public treesPerOrgData: ChartConfiguration<'pie'>['data'] = {
    labels: this.piechartLabels,
    datasets: [
      {
        label: '',
        data: this.amountTreesPerOrg,
        backgroundColor: [
          'rgb(130, 171, 31)',
          'rgb(70, 100, 31)',
          'rgb(10, 50, 31)',
          'rgb(50, 171, 31)',
        ],
        hoverOffset: 6,
      },
    ],
  };
}
