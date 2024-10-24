import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import {
  ProjectCarouselItemDateDto,
  ProjectCarouselItemAmountDto,
} from '../../../../store/project.store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIf, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-project-carousel-item',
    templateUrl: './project-carousel-item.component.html',
    styleUrls: ['./project-carousel-item.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        TranslateModule,
    ],
})
export class ProjectCarouselItemComponent implements OnInit {
  _item: ProjectCarouselItemDateDto | ProjectCarouselItemAmountDto;
  imageUrl: string;
  html

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

    if (this._item['co2Saved']) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(this._item['co2Saved'] + ' t ' + this.translate.instant('CO2'))
      this._item = {
        ...this._item,
        co2Saved: Number.parseFloat(this._item['co2Saved']).toFixed(2),
      };
    }
  }

  constructor(
    private router: Router,
    protected sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  linkToProfile() {
    this.router.navigate(['/user', this._item['name']]);
  }
}
