import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { search, selectSearchResults } from 'src/app/store/search.store';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss'],
})
export class SearchOverlayComponent implements OnInit {
  @Output() searchClosed = new EventEmitter();
  overlayIsOpen = false;
  control: FormControl = new FormControl('');
  searchResults$ = this.store.select(selectSearchResults);
  valueChangeSub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.valueChangeSub = this.control.valueChanges.subscribe((searchValue) => {
      if (searchValue && searchValue.length > 1) {
        this.store.dispatch(search({ searchValue }));
      }
    });
  }

  closeSearch() {
    this.searchClosed.emit();
    this.control.setValue('');
    this.store.dispatch(search({ searchValue: '' }));
  }
}
