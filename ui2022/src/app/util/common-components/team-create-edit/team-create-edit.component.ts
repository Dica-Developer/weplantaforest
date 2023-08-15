import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import { createTeam, updateTeam } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-create-edit',
  templateUrl: './team-create-edit.component.html',
  styleUrls: ['./team-create-edit.component.scss'],
})
export class TeamCreateEditComponent implements OnInit {
  @Input() teamDetails;
  @Input() editMode;

  @Output() closeComponent = new EventEmitter();

  teamForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
  });

  isCreatingTeam = false;

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
      } else {
        this.store.dispatch(
          updateTeam({
            teamId: this.teamDetails.teamId,
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

  cancel() {
    this.closeComponent.emit();
  }
}
