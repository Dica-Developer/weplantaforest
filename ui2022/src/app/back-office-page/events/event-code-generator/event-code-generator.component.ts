import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ActiveProject,
  selectActiveProjects,
} from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { UntypedFormControl } from '@angular/forms';
import { TextHelper } from '../../../util/text.helper';
import { createPlantbagForBackend, generateCodes } from '../../../store/plantbag.store';
import {
  validatePlantbag,
  PlantbagState,
  selectPlantbag,
} from '../../../store/plantbag.store';

@Component({
  selector: 'app-event-code-generator',
  templateUrl: './event-code-generator.component.html',
  styleUrls: ['./event-code-generator.component.scss'],
})
export class EventCodeGeneratorComponent implements OnInit, OnDestroy {
  activeProjectsSub: Subscription;
  activeProjects: ActiveProject[] = [];

  amountControl: UntypedFormControl = new UntypedFormControl(0);

  plantbag: PlantbagState;
  plantbagSub: Subscription;

  @Input()
  userId: number;

  @Input()
  eventId: number;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.activeProjectsSub = this.store
      .select(selectActiveProjects)
      .subscribe((res) => {
        this.activeProjects = res;
      });
    this.plantbagSub = this.store.select(selectPlantbag).subscribe((res) => {
      this.plantbag = res;
    });
  }

  ngOnDestroy(): void {
    this.activeProjectsSub.unsubscribe();
    this.plantbagSub.unsubscribe();
  }

  getGerman(text: string) {
    return this.textHelper.getTextForLanguage(text, 'de');
  }

  generateCodes() {
    const plantBag = createPlantbagForBackend(this.plantbag);
    const request = {
      plantBag,
      amountOfPlantBags: this.amountControl.value,
      cartState: 'GENERATED',
      userId: this.userId
    };
    this.store.dispatch(validatePlantbag({ request, followUpAction: generateCodes({request, eventId: this.eventId}) }));
  }
}
