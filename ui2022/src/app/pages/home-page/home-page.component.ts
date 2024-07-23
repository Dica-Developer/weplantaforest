import { Component, OnInit } from '@angular/core';
import { PlantedTreesComponent } from './components/planted-trees/planted-trees.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { PlantTreeComponent } from '../../util/common-components/plant-tree/plant-tree.component';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { HeaderComponent } from './components/header/header.component';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { PlantingProcessComponent } from './components/planting-process/planting-process.component';
import { RankingsComponent } from './components/rankings/rankings.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    OfferAreaComponent,
    PlantTreeComponent,
    PlantingProcessComponent,
    ProjectsSectionComponent,
    PlantedTreesComponent,
    RankingsComponent
  ],
})
export class HomePageComponent implements OnInit {
  constructor(private platformHelper: PlatformHelper) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
  }
}
