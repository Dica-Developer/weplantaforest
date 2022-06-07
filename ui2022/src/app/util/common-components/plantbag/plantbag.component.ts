import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  PlantbagState,
  selectPlantbag,
  selectPlantbagPrice,
} from '../../../store/plantbag.store';
import { Observable } from 'rxjs';
import { TextHelper } from '../../text.helper';

@Component({
  selector: 'app-plantbag',
  templateUrl: './plantbag.component.html',
  styleUrls: ['./plantbag.component.scss'],
})
export class PlantbagComponent implements OnInit {
  plantbag$: Observable<PlantbagState>;

  plantbagPrice: Observable<number>;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.plantbag$ = this.store.select(selectPlantbag);
    this.plantbagPrice = this.store.select(selectPlantbagPrice);
  }

  getGermanText(text: string): string {
    return this.textHelper.getTextForLanguage(text, 'de');
  }
}
