import { Component, Input, OnInit } from '@angular/core';
import { TreeTypeAdmin, updateTreetype, deleteTreeType } from '../../../../store/treeType.store';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextHelper } from '../../../../util/text.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/util/common-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { TreeTypeImageUploadComponent } from './components/tree-type-image-upload/tree-type-image-upload.component';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-treetype-edit',
    templateUrl: './treetype-edit.component.html',
    styleUrls: ['./treetype-edit.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        TreeTypeImageUploadComponent,
        MatIconButton,
        MatIcon,
        MatButton,
        MatDivider,
        TranslateModule,
    ],
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
    trunkImageColor: new UntypedFormControl(null),
    leafImage: new UntypedFormControl(null),
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
  leafImageColorFile: any;
  trunkImageColorFile: any;

  constructor(
    private fb: UntypedFormBuilder,
    private textHelper: TextHelper,
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    public dialog: MatDialog
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
    this.form.get('leafImage').setValue(treeType.leafImage);
    this.form.get('trunkImageColor').setValue(treeType.trunkImageColor);
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
      case 'leafImage':
        this.leafImageColorFile = event.image;
        break;
      case 'trunkImageColor':
        this.trunkImageColorFile = event.image;
        break;
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
        leafImage: this.form.get('leafImage').value,
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
      if (this.leafImageColorFile) {
        images.push({ imageType: 'leafImage', imgSrc: this.leafImageColorFile });
      }
      if (this.trunkImageColorFile) {
        images.push({ imageType: 'trunkImageColor', imgSrc: this.trunkImageColorFile });
      }
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
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteTreeType({ treeTypeId: this.form.get('id').value }));
      }
    });
  }
}
