import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadProfileDetails, selectProfileDetails } from 'src/app/store/profile.store';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  profileForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    teamName: new UntypedFormControl(''),
    aboutMe: new UntypedFormControl(''),
    location: new UntypedFormControl(''),
    organisation: new UntypedFormControl(''),
    homepage: new UntypedFormControl(''),
    newsletter: new UntypedFormControl(false),
  });
  selectedRadio: Boolean;

  profileDetails$ = this.store.select(selectProfileDetails);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
    });
  }

  ngOnInit(): void {}

  updateProfile() {}
}
