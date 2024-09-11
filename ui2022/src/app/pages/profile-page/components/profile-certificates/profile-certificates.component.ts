import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createCertificate, ProfileCart } from '../../../../store/profile.store';
import { AppState } from '../../../../store/app.state';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-certificates',
  templateUrl: './profile-certificates.component.html',
  styleUrls: ['./profile-certificates.component.scss'],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatCheckbox,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    DatePipe,
    TranslateModule,
  ],
})
export class ProfileCertificatesComponent implements OnInit, OnDestroy {
  @Input()
  set carts(carts: ProfileCart[]) {
    this.cartsArray = carts.slice().reverse();
    this.totalPosts = carts.length;
    this.createReceiptPages(this.postsPerPage, carts.slice().reverse());
  }
  cartsArray: ProfileCart[] = [];
  cartPages: Map<number, ProfileCart[]> = new Map<number, ProfileCart[]>();

  customTextControl: FormControl = new FormControl('');

  cartIds: number[] = [];

  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 0;

  displayedColumns: string[] = ['createdOn', 'invoiceNumber', 'PDF'];
  dataSource;

  constructor(private snackbar: MatSnackBar, private translateService: TranslateService, private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.customTextControl.setValue(this.translateService.instant('certificateDefaultText'));
  }

  ngOnDestroy(): void {}

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
    console.log(this.cartIds)
    if (this.cartIds.length > 0) {
      this.store.dispatch(
        createCertificate({
          requestDto: { cartIds: this.cartIds, text: this.customTextControl.value },
        }),
      );
    } else {
      this.snackbar.open(this.translateService.instant('selectPlantbag'), 'ok', {
        duration: 4000,
        panelClass: ['warning-snackbar']
      })
    }
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
