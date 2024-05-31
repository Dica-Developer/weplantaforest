import { Component, OnInit } from '@angular/core';
import { PlantedTreesComponent } from './components/planted-trees/planted-trees.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { PlantingProcessComponent } from '../../util/common-components/planting-process/planting-process.component';
import { PlantTreeComponent } from '../../util/common-components/plant-tree/plant-tree.component';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { HeaderComponent } from './components/header/header.component';

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
    ],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
