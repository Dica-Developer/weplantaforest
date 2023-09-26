import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import {
  ProjectCarouselItemDateDto,
  ProjectCarouselItemAmountDto,
} from '../../../../store/project.store';

@Component({
  selector: 'app-project-carousel-item',
  templateUrl: './project-carousel-item.component.html',
  styleUrls: ['./project-carousel-item.component.scss'],
})
export class ProjectCarouselItemComponent implements OnInit {
  _item: ProjectCarouselItemDateDto | ProjectCarouselItemAmountDto;

  imageUrl: string;

  @Input()
  set item(item: ProjectCarouselItemDateDto | ProjectCarouselItemAmountDto) {
    this._item = item;
    if (item['treeTypeImageName']) {
      this.imageUrl = `${environment.backendUrl}/treeType/image/${encodeURIComponent(
        item['treeTypeImageName'],
      )}/60/60`;
    } else if (item['imageName']) {
      this.imageUrl = `${environment.backendUrl}/user/image/${encodeURIComponent(
        item['imageName'],
      )}/60/60`;
    } else {
      this.imageUrl = 'assets/default_user.jpg';
    }

    if(this._item['co2Saved']) {
      this._item = {...this._item, co2Saved: Number.parseFloat(this._item['co2Saved']).toFixed(2)}
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  linkToProfile() {
    this.router.navigate(['/profile', this._item['username']]);
  }
}
