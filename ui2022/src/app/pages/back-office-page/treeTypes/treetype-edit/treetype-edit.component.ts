import { Component, Input, OnInit } from '@angular/core';
import { TreeTypeAdmin, updateTreetype, deleteTreeType } from '../../../../store/treeType.store';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { TextHelper } from '../../../../util/text.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-treetype-edit',
  templateUrl: './treetype-edit.component.html',
  styleUrls: ['./treetype-edit.component.scss'],
})
export class TreetypeEditComponent implements OnInit {
  @Input()
  treeType: TreeTypeAdmin;

  form: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    annualCo2SavingInTons: new UntypedFormControl(0.01),
    descriptionDe: new UntypedFormControl(''),
    descriptionEn: new UntypedFormControl(''),
    treeImageColor: new UntypedFormControl(null),
    treeImageBW: new UntypedFormControl(null),
    fruitImageColor: new UntypedFormControl(null),
    fruitImageBW: new UntypedFormControl(null),
    trunkImageColor: new UntypedFormControl(null),
    // trunkImageBW: new UntypedFormControl(null),
    // leafImageColor: new UntypedFormControl(null),
    // leafImageBW: new UntypedFormControl(null),
    infoLink: new UntypedFormControl(''),
    nameDe: new UntypedFormControl(''),
    nameEn: new UntypedFormControl(''),
    leafDe: new UntypedFormControl(''),
    leafEn: new UntypedFormControl(''),
    fruitDe: new UntypedFormControl(''),
    fruitEn: new UntypedFormControl(''),
    trunkDe: new UntypedFormControl(''),
    trunkEn: new UntypedFormControl(''),
  });

  treeImageColorFile: any;
  treeImageBWFile: any;
  fruitImageColorFile: any;
  fruitImageBWFile: any;
  trunkImageColorFile: any;
  trunkImageBWFile: any;
  leafImageColorFile: any;
  leafImageBWFile: any;

  constructor(
    private fb: UntypedFormBuilder,
    private textHelper: TextHelper,
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.initForm(this.treeType);
  }

  initForm(treeType: TreeTypeAdmin) {
    this.form.get('id').setValue(treeType.id);
    this.form.get('annualCo2SavingInTons').setValue(treeType.annualCo2SavingInTons);
    this.form
      .get('descriptionDe')
      .setValue(this.textHelper.getTextForLanguage(treeType.description, 'de'));
    this.form
      .get('descriptionEn')
      .setValue(this.textHelper.getTextForLanguage(treeType.description, 'en'));
    this.form.get('nameDe').setValue(this.textHelper.getTextForLanguage(treeType.name, 'de'));
    this.form.get('nameEn').setValue(this.textHelper.getTextForLanguage(treeType.name, 'en'));
    this.form.get('leafDe').setValue(this.textHelper.getTextForLanguage(treeType.leaf, 'de'));
    this.form.get('leafEn').setValue(this.textHelper.getTextForLanguage(treeType.leaf, 'en'));
    this.form.get('fruitDe').setValue(this.textHelper.getTextForLanguage(treeType.fruit, 'de'));
    this.form.get('fruitEn').setValue(this.textHelper.getTextForLanguage(treeType.fruit, 'en'));
    this.form.get('trunkDe').setValue(this.textHelper.getTextForLanguage(treeType.trunk, 'de'));
    this.form.get('trunkEn').setValue(this.textHelper.getTextForLanguage(treeType.trunk, 'en'));
    this.form.get('treeImageColor').setValue(treeType.treeImageColor);
    this.form.get('treeImageBW').setValue(treeType.treeImageBW);
    this.form.get('fruitImageColor').setValue(treeType.fruitImageColor);
    this.form.get('fruitImageBW').setValue(treeType.fruitImageBW);
    this.form.get('trunkImageColor').setValue(treeType.trunkImageColor);
    // this.form.get('trunkImageBW').setValue(treeType.trunkImageBW);
    // this.form.get('leafImageColor').setValue(treeType.leafImageColor);
    // this.form.get('leafImageBW').setValue(treeType.leafImageBW);
  }

  setImageFile(event: any) {
    switch (event.imageType) {
      case 'treeImageColor':
        this.treeImageColorFile = event.image;
        break;
      case 'treeImageBW':
        this.treeImageBWFile = event.image;
        break;
      case 'fruitImageColor':
        this.fruitImageColorFile = event.image;
        break;
      case 'fruitImageBW':
        this.fruitImageBWFile = event.image;
        break;
      case 'trunkImageColor':
        this.trunkImageColorFile = event.image;
        break;
      // case 'trunkImageBW':
      //   this.trunkImageBWFile = event.image;
      //   break;
      // case 'leafImageColor':
      //   this.leafImageColorFile = event.image;
      //   break;
      // case 'leafImageBW':
      //   this.leafImageBWFile = event.image;
      //   break;
      default:
        break;
    }
  }

  updateTreetype() {
    if (this.form.valid) {
      const name = this.textHelper.createMultiLanguageEntry(
        this.form.get('nameDe').value,
        this.form.get('nameEn').value,
      );
      const description = this.textHelper.createMultiLanguageEntry(
        this.form.get('descriptionDe').value,
        this.form.get('descriptionEn').value,
      );
      const leaf = this.textHelper.createMultiLanguageEntry(
        this.form.get('leafDe').value,
        this.form.get('leafEn').value,
      );
      const fruit = this.textHelper.createMultiLanguageEntry(
        this.form.get('fruitDe').value,
        this.form.get('fruitEn').value,
      );
      const trunk = this.textHelper.createMultiLanguageEntry(
        this.form.get('trunkDe').value,
        this.form.get('trunkEn').value,
      );
      const request: TreeTypeAdmin = {
        id: this.form.get('id').value,
        name,
        description,
        leaf,
        fruit,
        trunk,
        annualCo2SavingInTons: this.form.get('annualCo2SavingInTons').value,
        treeImageColor: this.form.get('treeImageColor').value,
        treeImageBW: this.form.get('treeImageBW').value,
        fruitImageColor: this.form.get('fruitImageColor').value,
        fruitImageBW: this.form.get('fruitImageBW').value,
        trunkImageColor: this.form.get('trunkImageColor').value,
        // trunkImageBW: this.form.get('trunkImageBW').value,
        // leafImageColor: this.form.get('leafImageColor').value,
        // leafImageBW: this.form.get('leafImageBW').value,
        infoLink: '',
      };
      const images = [];
      if (this.treeImageColorFile) {
        images.push({ imageType: 'treeImageColor', imgSrc: this.treeImageColorFile });
      }
      if (this.treeImageBWFile) {
        images.push({ imageType: 'treeImageBW', imgSrc: this.treeImageBWFile });
      }
      if (this.fruitImageColorFile) {
        images.push({ imageType: 'fruitImageColor', imgSrc: this.fruitImageColorFile });
      }
      if (this.fruitImageBWFile) {
        images.push({ imageType: 'fruitImageBW', imgSrc: this.fruitImageBWFile });
      }
      if (this.trunkImageColorFile) {
        images.push({ imageType: 'trunkImageColor', imgSrc: this.trunkImageColorFile });
      }
      // if (this.trunkImageBWFile) {
      //   images.push({ imageType: 'trunkImageBW', imgSrc: this.trunkImageBWFile });
      // }
      // if (this.leafImageColorFile) {
      //   images.push({ imageType: 'leafImageColor', imgSrc: this.leafImageColorFile });
      // }
      // if (this.leafImageBWFile) {
      //   images.push({ imageType: 'leafImageBW', imgSrc: this.leafImageBWFile });
      // }
      this.store.dispatch(
        updateTreetype({
          request,
          images: images,
        }),
      );
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 5000,
      });
    }
  }

  delete() {
    this.snackbar
      .open(this.translateService.instant('deleteConfirmation'), 'OK', {
        duration: 5000,
      })
      .onAction()
      .subscribe(() => {
        this.store.dispatch(deleteTreeType({ treeTypeId: this.form.get('id').value }));
      });
  }
}
