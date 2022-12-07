import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPreviewComponent } from './content-preview.component';

describe('ContentPreviewComponent', () => {
  let component: ContentPreviewComponent;
  let fixture: ComponentFixture<ContentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
