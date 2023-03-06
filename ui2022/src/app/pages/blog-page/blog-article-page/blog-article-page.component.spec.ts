import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticlePageComponent } from './blog-article-page.component';

describe('BlogArticlePageComponent', () => {
  let component: BlogArticlePageComponent;
  let fixture: ComponentFixture<BlogArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogArticlePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
