import { Component, Input, OnInit } from '@angular/core';
import { TreeTypeAdmin, updateTreetype, deleteTreeType } from '../../../../store/treeType.store';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { TextHelper } from '../../../../util/text.helper';
import { environment } from '../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TreeTypeImageType } from 'src/app/services/treeType.service';

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
  imagePreviewSrc: any;

  constructor(
    private fb: UntypedFormBuilder,
    private textHelper: TextHelper,
    private store: Store<AppState>,
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

    if (this.form.get('treeImageColor').value) {
      this.imagePreviewSrc =
        environment.backendUrl +
        '/treeType/image/' +
        this.form.get('treeImageColor').value +
        '/150/150';
    } else {
      this.imagePreviewSrc = null;
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.treeImageColorFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreviewSrc = reader.result);
      reader.readAsDataURL(this.treeImageColorFile);
    }
  }

  updateTreetype(imageType: TreeTypeImageType) {
    if (this.form.valid) {
      const name = this.textHelper.createMultiLanguageEntry(
        this.form.get('nameDe').value,
        this.form.get('nameEn').value,
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
        leaf,
        fruit,
        trunk,
        description: '',
        annualCo2SavingInTons: this.form.get('annualCo2SavingInTons').value,
        treeImageColor: this.form.get('treeImageColor').value,
        infoLink: '',
      };
      this.store.dispatch(
        updateTreetype({
          request,
          images: [{ imageType: 'treeImageColor', imgSrc: this.treeImageColorFile }],
        }),
      );
    }
  }

  delete() {
    this.store.dispatch(deleteTreeType({ treeTypeId: this.form.get('id').value }));
  }
}
