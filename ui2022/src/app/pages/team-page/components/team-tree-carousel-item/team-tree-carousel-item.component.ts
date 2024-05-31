import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-team-tree-carousel-item',
    templateUrl: './team-tree-carousel-item.component.html',
    styleUrls: ['./team-tree-carousel-item.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        TranslateModule,
    ],
})
export class TeamTreeCarouselItemComponent implements OnInit {
  _item: any;
  imageUrl: string;

  @Input()
  set item(item: any) {
    this._item = item;
    if (item.imagePath) {
      this.imageUrl = `${environment.backendUrl}/tree/image/${item.imagePath}/60/60`;
    } else {
      this.imageUrl = `${environment.backendUrl}/treeType/image/${item.treeType?.treeImageColor}/60/60`;
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  route() {
    if(this._item.projectArticle?.project?.name) {
      this.router.navigate(['/project', this._item.projectArticle?.project?.name]);
    }
  }
}
