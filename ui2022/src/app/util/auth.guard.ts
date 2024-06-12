import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformHelper } from './helper/platform.helper';

@Injectable()
export class AuthGuard  {
  constructor(public router: Router, private platformHelper: PlatformHelper) {}
  canActivate(): boolean {
    if (this.platformHelper.getLocalstorage('jwt')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
