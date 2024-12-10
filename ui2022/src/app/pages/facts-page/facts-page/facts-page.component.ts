import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartConfiguration } from 'chart.js';
import { Observable, Subscription, combineLatest, take } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { BaseChartDirective } from 'ng2-charts';
import { loadCo2, loadTreesPerOrgType, loadTreesPerYear, loadUsersPerYear, selectCo2, selectCo2Loading, selectTreesPerOrgType, selectTreesPerOrgTypeLoading, selectTreesPerYear, selectTreesPerYearLoading, selectUsersPerYear, selectUsersPerYearLoading } from 'src/app/store/statistics.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.scss'],
  standalone: true,
  imports: [
    BaseChartDirective,
    RouterLink,
    NgIf,
    AsyncPipe,
    TranslateModule,
    MatProgressSpinnerModule
  ],
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
  combinedSub: Subscription;
  treesPerYearLoading: Observable<boolean> = this.store.select(selectTreesPerYearLoading)
  co2Loading: Observable<boolean> = this.store.select(selectCo2Loading)
  usersPerYearLoading: Observable<boolean> = this.store.select(selectUsersPerYearLoading)
  treesPerOrgTypeLoading: Observable<boolean> = this.store.select(selectTreesPerOrgTypeLoading)

  getTreesPerYear$ = this.store.select(selectTreesPerYear)
  getUsersPerYear$ = this.store.select(selectUsersPerYear)
  getTreesPerOrgType$ = this.store.select(selectTreesPerOrgType)
  getCo2$ = this.store.select(selectCo2)
  treesPerYearSub: Subscription;
  usersPerYearSub: Subscription;
  treesPerOrgTypeSub: Subscription;
  co2Sub: Subscription;

  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  public pieChartoptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private store: Store<AppState>,
    private statisticsService: StatisticsService,
    private translateService: TranslateService,
    public platformHelper: PlatformHelper
  ) {
    this.store.dispatch(loadTreesPerYear())
    this.store.dispatch(loadUsersPerYear())
    this.store.dispatch(loadTreesPerOrgType())
    this.store.dispatch(loadCo2())
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    let privateOrg = this.translateService.instant('PRIVATE');
    let commercialOrg = this.translateService.instant('COMMERCIAL');
    let nonprofitOrg = this.translateService.instant('NONPROFIT');
    let educationalOrg = this.translateService.instant('EDUCATIONAL');
    this.piechartLabels.push(privateOrg, commercialOrg, nonprofitOrg, educationalOrg);

    this.treesPerYearSub = this.getTreesPerYear$.subscribe(treesPerYear => {
      (treesPerYear as any[]).forEach((year, index) => {
        this.labels.push(year.label);
        this.amountOfTrees.push(year.amount);
        if (index === 0) {
          this.amountOfTreesSum.push(year.amount);
        } else {
          this.amountOfTreesSum.push(this.amountOfTreesSum[index - 1] + year.amount);
        }
      });
    })
    this.usersPerYearSub = this.getUsersPerYear$.subscribe(usersPerYear => {
      (usersPerYear as any[]).forEach((year, index) => {
        this.amountOfUsers.push(year.amount);
        if (index === 0) {
          this.amountOfUsersSum.push(year.amount);
        } else {
          this.amountOfUsersSum.push(this.amountOfUsersSum[index - 1] + year.amount);
        }
      });
    })
    this.treesPerOrgTypeSub = this.getTreesPerOrgType$.subscribe(treesPerOrg => {
      (treesPerOrg as any[]).forEach((orgType, index) => {
        this.amountTreesPerOrg.push(orgType.amount);
      });
    })
    this.co2Sub = this.getCo2$.subscribe(co2 => {
      (co2 as any[]).forEach((year, index) => {
        this.co2Saved.push(year.co2);
      });
    })

    this.combinedSub = combineLatest([
      this.getTreesPerYear$,
      this.getUsersPerYear$,
      this.getCo2$,
      this.getTreesPerOrgType$,
    ]).subscribe(([treesPerYear, usersPerYear, co2, treesPerOrg]) => {
        this.chartsInitialized = true;
        this.updateCharts()
      });
  }

  updateCharts() {
    if (this.platformHelper.isBrowser) {
      this.chart?.update()
    }
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
