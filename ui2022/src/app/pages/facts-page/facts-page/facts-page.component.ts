import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

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

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getCo2().subscribe((res) => {
      console.log(res);
    });
    this.statisticsService.getTreesPerOrgType().subscribe((res) => {
      console.log(res);
    });
    this.statisticsService.getTreesPerYear().subscribe((res) => {
      console.log(res);
    });
    this.statisticsService.getUsersPerYear().subscribe((res) => {
      console.log(res);
    });
  }
}
