import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-header',
    templateUrl: './blog-header.component.html',
    styleUrls: ['./blog-header.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule],
})
export class BlogHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
