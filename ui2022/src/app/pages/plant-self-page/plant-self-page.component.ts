import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TreeType } from 'src/app/store/project.store';
import { Observable, Subscription } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { TextHelper } from 'src/app/util/helper/text.helper';
import {
  selectSelfPlantCreated,
  selfPlantFlagReset,
  sendSelfPlant,
} from 'src/app/store/plant.store';
import { selectAuthenticated } from 'src/app/store/auth.store';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { LeafletMapComponent } from '../../util/common-components/leaflet-map/leaflet-map.component';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { LanguageHelper } from 'src/app/util/helper/language.helper';
import { SliderComponent } from 'src/app/util/common-components/slider/slider.component';

@Component({
  selector: 'app-plant-self-page',
  templateUrl: './plant-self-page.component.html',
  styleUrls: ['./plant-self-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatDatepickerActions,
    MatButton,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatSelect,
    NgFor,
    MatOption,
    LeafletMapComponent,
    OfferAreaComponent,
    AsyncPipe,
    TranslateModule,
    SliderComponent
  ],
})
export class PlantSelfPageComponent implements OnInit {
  controlObj: UntypedFormGroup;
  selectedTreeType: TreeType;
  treeTypes: TreeType[] = [];
  screenWidth;
  mapHeight: string = '700px';

  mainImageFile: any;
  imageSrc: any;

  stepsArray = [1, 2, 5, 8, 10]
  treeTypes$ = this.store.select(selectTreeTypes);
  selectAuthenticated$: Observable<boolean>;
  selectTreetypesSub: Subscription;
  selfPlantCreatedSub: Subscription;

  sliderDefaultValue: number = 5;
  selfPlantForm = new UntypedFormGroup({
    plantedOn: new UntypedFormControl(new Date(), [Validators.required]),
    amount: new UntypedFormControl(this.sliderDefaultValue),
    description: new UntypedFormControl('', []),
    imageName: new UntypedFormControl('', []),
    treeTypeId: new UntypedFormControl(null, [Validators.required]),
    latitude: new UntypedFormControl(null, [Validators.required]),
    longitude: new UntypedFormControl(null, [Validators.required]),
    mainImageFile: new UntypedFormControl(null, []),
  });

  isBrowser: boolean;

  constructor(
    private store: Store<AppState>,
    private languageHelper: LanguageHelper,
    public textHelper: TextHelper,
    private router: Router,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private platformHelper: PlatformHelper
  ) {
    this.isBrowser = this.platformHelper.checkIfBrowser();
    this.store.dispatch(loadTreeTypes());
    this.selectTreetypesSub = store.select(selectTreeTypes).subscribe((res) => {
      this.treeTypes = [];
      for (let tt of res) {
        this.treeTypes.push({
          id: tt.id,
          treeImageColor: tt.treeImageColor,
          treeImageBW: tt.treeImageBW,
          fruitImageColor: tt.fruitImageColor,
          fruitImageBW: tt.fruitImageBW,
          trunkImageColor: tt.trunkImageColor,
          leafImage: tt.leafImage,
          description: tt.description,
          fruit: tt.fruit,
          leaf: tt.leaf,
          trunk: tt.trunk,
          name: this.textHelper.getTextForLanguage(tt.name, this.languageHelper.getUserLanguage()),
        });
      }
      this.treeTypes = this.treeTypes.filter((treeType) => !treeType.name.includes('Default'));
    });
    this.getScreenSize();
    this.selectAuthenticated$ = this.store.select(selectAuthenticated);
  }

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    if (this.platformHelper.checkIfBrowser()) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
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

  addTreesToForm(event: any) {
    this.selfPlantForm.get('amount').setValue(event);
  }

  treeTypeChanged($event: any) {
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
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.selfPlantForm.get('mainImageFile').value);
    }
  }

  submitPlanting() {
    const data = this.selfPlantForm.value;
    data.plantedOn = new Date(data.plantedOn).getTime();
    if (this.selfPlantForm.valid) {
      this.store.dispatch(sendSelfPlant({ selfPlantData: data }));
    } else if (this.selfPlantForm.get('latitude').invalid) {
      this.snackbar.open(this.translateService.instant('markOnMapPls'), 'OK', {
        duration: 4000,
      });
    } else if (this.selfPlantForm.get('treeTypeId').invalid) {
      this.snackbar.open(this.translateService.instant('selectTreetype'), 'OK', {
        duration: 4000,
      });
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
      });
    }
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.selfPlantCreatedSub?.unsubscribe();
    this.selectTreetypesSub?.unsubscribe();
  }
}
