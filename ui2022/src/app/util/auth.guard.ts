import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard  {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('jwt')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
