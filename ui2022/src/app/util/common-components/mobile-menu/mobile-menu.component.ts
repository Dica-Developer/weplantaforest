import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  @Output() menuClosed = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  loginClicked() {}

  closeMenu() {
    this.menuClosed.emit();
  }
}
