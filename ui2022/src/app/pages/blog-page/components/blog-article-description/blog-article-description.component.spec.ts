import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleDescriptionComponent } from './blog-article-description.component';

describe('BlogArticleDescriptionComponent', () => {
  let component: BlogArticleDescriptionComponent;
  let fixture: ComponentFixture<BlogArticleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BlogArticleDescriptionComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
