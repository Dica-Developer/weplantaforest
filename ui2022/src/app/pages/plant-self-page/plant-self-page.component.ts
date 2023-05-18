import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Options } from '@angular-slider/ngx-slider';
import { TreeType } from 'src/app/store/project.store';
import { Observable, Subscription } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { TextHelper } from 'src/app/util/text.helper';
import {
  selectSelfPlantCreated,
  selfPlantFlagReset,
  sendSelfPlant,
} from 'src/app/store/plant.store';
import { selectAuthenticated } from 'src/app/store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-self-page',
  templateUrl: './plant-self-page.component.html',
  styleUrls: ['./plant-self-page.component.scss'],
})
export class PlantSelfPageComponent implements OnInit {
  controlObj: UntypedFormGroup;
  selectedTreeType: TreeType;
  treeTypes: TreeType[] = [];
  sliderDefaultValue: number = 5;
  screenWidth;
  mapHeight: string = '700px';

  mainImageFile: any;
  imageSrc: any;

  treeTypes$ = this.store.select(selectTreeTypes);
  selectAuthenticated$: Observable<boolean>;
  selectTreetypesSub: Subscription;
  selfPlantCreatedSub: Subscription;

  selfPlantForm = new UntypedFormGroup({
    plantedOn: new UntypedFormControl(new Date(), [Validators.required]),
    shortDescription: new UntypedFormControl(''),
    amount: new UntypedFormControl(this.sliderDefaultValue),
    imageName: new UntypedFormControl(''),
    treeTypeId: new UntypedFormControl(null, [Validators.required]),
    latitude: new UntypedFormControl(null, [Validators.required]),
    longitude: new UntypedFormControl(null, [Validators.required]),
    mainImageFile: new UntypedFormControl(null, [Validators.required]),
  });

  sliderOptions: Options = {
    step: 1,
    floor: 1,
    ceil: 10,
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: false,
    hidePointerLabels: false,
  };

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private router: Router,
  ) {
    this.store.dispatch(loadTreeTypes());
    this.selectTreetypesSub = store.select(selectTreeTypes).subscribe((res) => {
      for (let tt of res) {
        this.treeTypes.push({
          id: tt.id,
          treeImageColor: tt.treeImageColor,
          treeImageBW: tt.treeImageBW,
          fruitImageColor: tt.fruitImageColor,
          fruitImageBW: tt.fruitImageBW,
          description: tt.description,
          fruit: tt.fruit,
          leaf: tt.leaf,
          trunk: tt.trunk,
          name: this.textHelper.getTextForLanguage(tt.name, 'de'),
        });
      }
    });
    this.getScreenSize();
    this.selectAuthenticated$ = this.store.select(selectAuthenticated);
  }

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.screenWidth < 764) {
      this.mapHeight = '500px';
    }
    this.store.dispatch(selfPlantFlagReset());
    this.selfPlantCreatedSub = this.store.select(selectSelfPlantCreated).subscribe((created) => {
      if (created) {
        this.selfPlantForm.disable();
      }
    });
  }

  addTreesToForm(event) {
    this.selfPlantForm.get('amount').setValue(event);
  }

  treeTypeChanged($event) {
    this.selectedTreeType = $event.value;
    this.selfPlantForm.get('treeTypeId').setValue($event.value);
  }

  setTreeCoordinates(event: any) {
    this.selfPlantForm.get('latitude').setValue(event.lat);
    this.selfPlantForm.get('longitude').setValue(event.lng);
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.selfPlantForm.get('mainImageFile').setValue(fileInputEvent.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.selfPlantForm.get('mainImageFile').value);
    }
  }

  submitPlanting() {
    const data = this.selfPlantForm.value;
    data.plantedOn = data.plantedOn.getTime();
    this.store.dispatch(sendSelfPlant({ selfPlantData: data }));
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.selfPlantCreatedSub?.unsubscribe();
    this.selectTreetypesSub?.unsubscribe();
  }
}
