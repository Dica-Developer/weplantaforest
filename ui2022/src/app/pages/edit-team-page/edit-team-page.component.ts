import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUploadingImage } from 'src/app/store/profile.store';
import {
  loadTeamDetails,
  selectTeamDetails,
  updateTeamImage,
  updateTeamProperty,
} from 'src/app/store/team.store';
import { SliderHelper } from 'src/app/util/helper/slider.helper';

@Component({
  selector: 'app-edit-team-page',
  templateUrl: './edit-team-page.component.html',
  styleUrls: ['./edit-team-page.component.scss'],
})
export class EditTeamPageComponent implements OnInit, OnDestroy {
  teamDetails$ = this.store.select(selectTeamDetails);
  teamForm: UntypedFormGroup;
  randomNumber: number = 0;
  imageFile: any;
  imagePreviewSrc: any = null;
  uploadingImage$ = this.store.select(selectUploadingImage);
  uploadImageSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private sliderHelper: SliderHelper,
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadTeamDetails({ teamName: paramMap.get('teamName') }));
      this.teamDetails$.subscribe((res) => {
        if (res) {
          this.teamForm = new FormGroup({
            teamId: new UntypedFormControl(res.teamId),
            teamName: new UntypedFormControl(res.teamName),
            description: new UntypedFormControl(res.description),
          });
        }
      });
    });
  }

  ngOnInit(): void {
    this.uploadImageSub = this.store.select(selectUploadingImage).subscribe((uploading) => {
      if (!uploading) {
        this.randomNumber = this.sliderHelper.getRandomNumber();
      }
    });
  }

  updateTeam() {
    if (this.imagePreviewSrc) {
      console.log(this.imagePreviewSrc);
      // this.store.dispatch(
      //   updateTeamImage({ teamId: this.teamForm.value.teamId, image: this.imageFile }),
      // );
      // this.imagePreviewSrc = null;
    }
    if (this.teamForm.get('description').dirty) {
      console.log(this.teamForm.get('description').value);
      this.store.dispatch(
        updateTeamProperty({
          teamId: this.teamForm.value.teamId,
          teamName: this.teamForm.value.teamName,
          propertyToUpdate: 'description',
          controlValue: this.teamForm.get('description').value,
        }),
      );
    }
    if (this.teamForm.get('teamName').dirty) {
      this.store.dispatch(
        updateTeamProperty({
          teamId: this.teamForm.value.teamId,
          teamName: this.teamForm.value.teamName,
          propertyToUpdate: 'name',
          controlValue: this.teamForm.get('teamName').value,
        }),
      );
    }
    this.snackbar.open(this.translateService.instant('teamUpdated'), 'OK', {
      duration: 4000,
      panelClass: ['success-snackbar'],
    });
    this.routeToTeam();
  }

  routeToTeam() {
    this.router.navigate(['/team/' + this.teamForm.value.teamName]);
  }

  ngOnDestroy(): void {
    this.uploadImageSub?.unsubscribe();
  }
}
