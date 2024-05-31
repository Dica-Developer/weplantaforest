import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleHeaderComponent } from './blog-article-header.component';

describe('BlogArticleHeaderComponent', () => {
  let component: BlogArticleHeaderComponent;
  let fixture: ComponentFixture<BlogArticleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BlogArticleHeaderComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
