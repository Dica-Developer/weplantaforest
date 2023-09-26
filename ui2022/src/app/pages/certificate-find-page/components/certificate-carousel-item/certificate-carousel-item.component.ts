import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CertificatePlanting } from '../../../../store/profile.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-carousel-item',
  templateUrl: './certificate-carousel-item.component.html',
  styleUrls: ['./certificate-carousel-item.component.scss'],
})
export class CertificateCarouselItemComponent implements OnInit {
  _item: CertificatePlanting;
  imageUrl: string;

  @Input()
  set item(item: CertificatePlanting) {
    this._item = item;
    this.imageUrl = `${environment.backendUrl}/treeType/image/${item.treeType?.treeImageColor}/60/60`;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToProject() {
    this.router.navigate(['/project', this._item.projectArticle.project.name]);
  }
}
