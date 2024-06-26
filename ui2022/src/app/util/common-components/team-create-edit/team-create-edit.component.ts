import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import { createTeam, updateTeam } from 'src/app/store/team.store';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-team-create-edit',
    templateUrl: './team-create-edit.component.html',
    styleUrls: ['./team-create-edit.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        TranslateModule,
    ],
})
export class TeamCreateEditComponent implements OnInit {
  @Input() teamDetails;
  @Input() editMode;

  @Output() closeComponent = new EventEmitter();

  teamForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    mainImageFile: new UntypedFormControl(''),
  });

  isCreatingTeam = false;
  mainImageFile: any;
  imageSrc: any;

  constructor(
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    if (this.editMode) {
      this.teamForm.patchValue({
        name: this.teamDetails.teamName,
        description: this.teamDetails.description,
      });
    }
  }

  onSubmit() {
    if (this.teamForm.valid) {
      if (!this.editMode) {
        this.store.dispatch(
          createTeam({
            name: this.teamForm.value.name,
            description: this.teamForm.value.description,
          }),
        );
      }
      this.closeComponent.emit();
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
      });
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.teamForm.get('mainImageFile').setValue(fileInputEvent.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.teamForm.get('mainImageFile').value);
    }
  }

  cancel() {
    this.closeComponent.emit();
  }
}
