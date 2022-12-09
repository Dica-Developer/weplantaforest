import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { UtilModule } from '../../util/util.module';
import { HeaderComponent } from './components/header/header.component';
import { ForestTourComponent } from './components/forest-tour/forest-tour.component';
import { PlantedTreesComponent } from './components/planted-trees/planted-trees.component';

@NgModule({
  declarations: [HomePageComponent, HeaderComponent, ForestTourComponent, PlantedTreesComponent],
  imports: [CommonModule, UtilModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
