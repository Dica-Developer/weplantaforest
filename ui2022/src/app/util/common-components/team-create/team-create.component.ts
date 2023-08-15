import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import { createTeam, selectTeamCreated } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent implements OnInit {
  @Input() profileDetails;
  @Input() teamDetails;

  @Output() teamCreated = new EventEmitter();

  teamForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
  });

  teamCreated$ = this.store.select(selectTeamCreated);
  isCreatingTeam = false;

  constructor(
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.teamForm.valid) {
      this.store.dispatch(
        createTeam({
          name: this.teamForm.value.name,
          description: this.teamForm.value.description,
        }),
      );
      this.teamCreated.emit();
    } else {
      this.snackbar.open(this.translateService.instant('formInvalid'), 'OK', {
        duration: 4000,
      });
    }
  }
}
