import { Component, Input, OnInit } from '@angular/core';
import { TreeTypeAdmin, updateTreetype, deleteTreeType } from '../../../store/treeType.store';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TextHelper } from '../../../util/text.helper';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-treetype-edit',
  templateUrl: './treetype-edit.component.html',
  styleUrls: ['./treetype-edit.component.scss'],
})
export class TreetypeEditComponent implements OnInit {
  @Input()
  treeType: TreeTypeAdmin;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    annualCo2SavingInTons: new FormControl(0.01),
    descriptionDe: new FormControl(''),
    descriptionEn: new FormControl(''),
    imageFile: new FormControl(null),
    infoLink: new FormControl(''),
    nameDe: new FormControl(''),
    nameEn: new FormControl(''),
  });

  imageFile: any;
  imageSrc: any;

  constructor(
    private fb: FormBuilder,
    private textHelper: TextHelper,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initForm(this.treeType);
  }

  initForm(treeType: TreeTypeAdmin) {
    this.form.get('id').setValue(treeType.id);
    this.form
      .get('annualCo2SavingInTons')
      .setValue(treeType.annualCo2SavingInTons);
    this.form
      .get('descriptionDe')
      .setValue(this.textHelper.getTextForLanguage(treeType.description, 'de'));
    this.form
      .get('descriptionEn')
      .setValue(this.textHelper.getTextForLanguage(treeType.description, 'en'));
    this.form
      .get('nameDe')
      .setValue(this.textHelper.getTextForLanguage(treeType.name, 'de'));
    this.form
      .get('nameEn')
      .setValue(this.textHelper.getTextForLanguage(treeType.name, 'en'));
    this.form.get('imageFile').setValue(treeType.imageFile);

    if (this.form.get('imageFile').value) {
      this.imageSrc =
        environment.backendUrl +
        '/treeType/image/' +
        this.form.get('imageFile').value +
        '/150/150';
    } else {
      this.imageSrc = null;
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
    }
  }

  updateTreetype() {
    const name = this.textHelper.createMultiLanguageEntry(
      this.form.get('nameDe').value,
      this.form.get('nameEn').value
    );
    const request: TreeTypeAdmin = {
      id: this.form.get('id').value,
      name,
      description: '',
      annualCo2SavingInTons: this.form.get('annualCo2SavingInTons').value,
      imageFile: this.form.get('imageFile').value,
      infoLink: '',
    };
    this.store.dispatch(updateTreetype({ request, imageFile: this.imageFile }));
  }

  delete() {
    this.store.dispatch(deleteTreeType({treeTypeId: this.form.get('id').value}));
  }
}
