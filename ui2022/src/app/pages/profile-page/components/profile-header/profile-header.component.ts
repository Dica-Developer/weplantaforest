import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUploadingImage } from '../../../../store/profile.store';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  @Input() profileDetails;
  @Input() showEdit;

  uploadImageSub: Subscription;

  // since there is an issue with the image url not updating(which means its exactly the same after an image update)
  // when the image is changed, there has to be a little hack here to force the image to update
  // so we create a random number when the uploadImage select delivers a false and put it at the end of the image url
  randomNumber: number = 0;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.uploadImageSub = this.store.select(selectUploadingImage).subscribe((uploading) => {
      if (!uploading) {
        this.randomNumber = this.getRandomNumber();
      }
    });
  }

  ngOnDestroy(): void {
    this.uploadImageSub?.unsubscribe();
  }

  editProfile() {
    let username = localStorage.getItem('username');
    this.router.navigate(['/editProfile/' + username]);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }
}
