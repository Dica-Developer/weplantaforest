import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { search, selectSearchResults } from 'src/app/store/search.store';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-search-overlay',
    templateUrl: './search-overlay.component.html',
    styleUrls: ['./search-overlay.component.scss'],
    standalone: true,
    imports: [
        MatIcon,
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        RouterLink,
        AsyncPipe,
        TranslateModule,
    ],
})
export class SearchOverlayComponent implements OnInit {
  @Output() searchClosed = new EventEmitter();
  overlayIsOpen = false;
  control: FormControl = new FormControl('');
  searchResults$ = this.store.select(selectSearchResults);
  valueChangeSub: Subscription;
  @ViewChild('search') searchElement: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.valueChangeSub = this.control.valueChanges.subscribe((searchValue) => {
      if (searchValue && searchValue.length > 1) {
        searchValue = searchValue.trim();
        this.store.dispatch(search({ searchValue }));
      }
    });
  }

  focusSearch() {
    setTimeout(() => {
      // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    }, 0);
  }

  closeSearch() {
    this.searchClosed.emit();
    this.control.setValue('');
    this.store.dispatch(search({ searchValue: '' }));
  }
}
