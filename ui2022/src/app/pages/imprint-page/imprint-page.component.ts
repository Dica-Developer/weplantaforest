import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  lang = 'DEUTSCH';
  imprints;
  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.contentService.getImprint(this.lang).subscribe((res) => {
      this.imprints = res;
      console.log(res);
    });
  }
}
