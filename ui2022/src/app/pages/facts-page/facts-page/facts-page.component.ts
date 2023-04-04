import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartConfiguration } from 'chart.js';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.scss'],
})
export class FactsPageComponent implements OnInit {
  co2;
  trees;
  users;
  treesPerOrg;
  labels: string[] = [];
  amountOfTrees: number[] = [];
  amountOfTreesSummed: number[] = [];
  co2Saved: number[] = [];
  amountOfUsers: number[] = [];
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
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
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
          this.amountOfTreesSummed.push(year.amount);
        } else {
          this.amountOfTreesSummed.push(this.amountOfTreesSummed[index - 1] + year.amount);
        }
      });
      // for (let year of co2 as any[]) {
      //   this.co2Saved.push(year.amount);
      // }
      // for (let year of usersPerYear as any[]) {
      //   this.amountOfTrees.push(year.amount);
      // }
      // for (let year of treesPerOrg as any[]) {
      //   this.amountOfUsers.push(year.amount);
      // }
      this.chartsInitialized = true;
    });

    // this.statisticsService.getTreesPerYear().subscribe((response: any[]) => {
    //   for (let year of response) {
    //     this.labels.push(year.label);
    //     this.amountOfTrees.push(year.amount);
    //   }
    //   this.chartsInitialized = true;
    // });
    // console.log(this.amountOfTrees);

    // this.statisticsService.getCo2().subscribe((res) => {
    //   console.log(res);
    // });
    // this.statisticsService.getUsersPerYear().subscribe((res) => {
    //   console.log(res);
    // });
    // this.statisticsService.getTreesPerOrgType().subscribe((res) => {
    //   console.log(res);
    // });
  }

  public amountPerYearData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{ label: '', data: this.amountOfTrees, backgroundColor: 'rgb(130, 171, 31)' }],
  };
  public amountOfTreesSummedData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: [
      {
        label: '',
        data: this.amountOfTreesSummed,
        pointBackgroundColor: 'rgb(130, 171, 31)',
        fill: 'origin',
        backgroundColor: 'rgb(130, 171, 31, 0.35)',
        borderColor: 'rgb(130, 171, 31, 0.7)',
      },
    ],
  };
}
