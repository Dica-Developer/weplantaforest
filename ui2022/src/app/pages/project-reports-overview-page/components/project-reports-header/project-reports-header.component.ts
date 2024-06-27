import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-project-reports-header',
    templateUrl: './project-reports-header.component.html',
    styleUrls: ['./project-reports-header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        TranslateModule,
    ],
})
export class ProjectReportsHeaderComponent implements OnInit {
  @Input() type: string = '';
  @Output() typeSelected = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  setType(type: string) {
    this.typeSelected.emit(type);
  }
}
