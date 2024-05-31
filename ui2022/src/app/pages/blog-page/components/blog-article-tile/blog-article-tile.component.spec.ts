import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleTileComponent } from './blog-article-tile.component';

describe('BlogArticleTileComponent', () => {
  let component: BlogArticleTileComponent;
  let fixture: ComponentFixture<BlogArticleTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BlogArticleTileComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
