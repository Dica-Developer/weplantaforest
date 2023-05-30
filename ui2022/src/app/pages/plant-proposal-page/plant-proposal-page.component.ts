import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-proposal-page',
  templateUrl: './plant-proposal-page.component.html',
  styleUrls: ['./plant-proposal-page.component.scss'],
})
export class PlantProposalPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
