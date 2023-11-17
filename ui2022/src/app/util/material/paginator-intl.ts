import { Injectable, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

// @Injectable()
// export class PaginatorI18n extends MatPaginatorIntl implements OnInit {
//   constructor(private translate: TranslateService) {
//     super();
//   }

//   ngOnInit() {
//     this.translateLabels();
//   }

//   translateLabels() {
//     super.itemsPerPageLabel = this.translate.instant('itemsPerPage');
//     console.log(this.translate.instant('itemsPerPage'));
//     super.nextPageLabel = this.translate.instant('nextPage');
//     super.previousPageLabel = this.translate.instant('previousPage');
//     this.changes.next();
//   }
// }

export class PaginatorIntlService extends MatPaginatorIntl {
  translate: TranslateService;

  getRangeLabel = function (page, pageSize, length) {
    const of = this.translate.instant('paginator.of');
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    super.itemsPerPageLabel = this.translate.instant('paginator.itemsPerPage');
    super.nextPageLabel = this.translate.instant('paginator.nextPage');
    super.previousPageLabel = this.translate.instant('paginator.previousPage');
    this.changes.next();
  }
}
