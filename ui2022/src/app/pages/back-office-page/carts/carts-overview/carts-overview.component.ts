import { Component, OnInit } from '@angular/core';
import { CartGridComponent } from '../cart-grid/cart-grid.component';
import { CartFilterComponent } from '../cart-filter/cart-filter.component';

@Component({
    selector: 'app-carts-overview',
    templateUrl: './carts-overview.component.html',
    styleUrls: ['./carts-overview.component.scss'],
    standalone: true,
    imports: [CartFilterComponent, CartGridComponent],
})
export class CartsOverviewComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
