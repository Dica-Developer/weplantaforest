import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Output() menuClosed = new EventEmitter();
  @Output() clickedSearchEmitter = new EventEmitter();
  @Output() clickedLogin = new EventEmitter();
  @Output() clickedLogout = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  loginClicked() {
    this.clickedLogin.emit();
  }

  logoutClicked() {
    this.clickedLogout.emit();
  }

  closeMenu() {
    this.menuClosed.emit();
  }

  routeToProfile() {
    this.router.navigate(['/user/' + localStorage.getItem('username')]);
  }

  searchClicked() {
    this.clickedSearchEmitter.emit();
  }
}
