import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createCertificate, ProfileCart } from '../../../../store/profile.store';
import { AppState } from '../../../../store/app.state';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-certificates',
  templateUrl: './profile-certificates.component.html',
  styleUrls: ['./profile-certificates.component.scss'],
})
export class ProfileCertificatesComponent implements OnInit, OnDestroy {
  @Input()
  set carts(carts: ProfileCart[]) {
    this.cartsArray = carts;
    this.totalPosts = carts.length;
    this.createReceiptPages(this.postsPerPage, carts);
  }
  cartsArray: ProfileCart[] = [];
  cartPages: Map<number, ProfileCart[]> = new Map<number, ProfileCart[]>();

  translationSub: Subscription;

  customTextControl: FormControl = new FormControl('');

  cartIds: number[] = [];

  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 0;

  displayedColumns: string[] = ['createdOn', 'invoiceNumber', 'PDF'];
  dataSource;

  constructor(private translateService: TranslateService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.translationSub = this.translateService.get('certificateDefaultText').subscribe((text) => {
      this.customTextControl.setValue(text);
    });
  }

  ngOnDestroy(): void {
    this.translationSub?.unsubscribe();
  }

  getDate(timeStamp: number): Date {
    return new Date(timeStamp);
  }

  getPriceFormatted(price: number): string {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  toggleCertificate(event: any, cartId: number): void {
    if (event.checked) {
      this.cartIds.push(cartId);
    } else {
      this.cartIds = this.cartIds.filter((id) => id !== cartId);
    }
  }

  createCertificate() {
    this.store.dispatch(
      createCertificate({
        requestDto: { cartIds: this.cartIds, text: this.customTextControl.value },
      }),
    );
  }

  createReceiptPages(pageSize: number, carts: ProfileCart[]) {
    this.cartPages = new Map<number, ProfileCart[]>();
    let pageCnt = 0;
    if (carts && carts.length > 0) {
      for (let i = 0; i < carts.length; i += pageSize) {
        const chunk = carts.slice(i, i + pageSize);
        this.cartPages.set(pageCnt, chunk);
        pageCnt++;
      }
    }
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.postsPerPage = pageData.pageSize;
    this.createReceiptPages(this.postsPerPage, this.cartsArray);
  }
}
