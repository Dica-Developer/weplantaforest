import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { UtilModule } from '../../util/util.module';
import { HeaderComponent } from './components/header/header.component';
import { ForestTourComponent } from './components/forest-tour/forest-tour.component';
import { PlantedTreesComponent } from './components/planted-trees/planted-trees.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    ForestTourComponent,
    PlantedTreesComponent,
    ProjectsSectionComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
