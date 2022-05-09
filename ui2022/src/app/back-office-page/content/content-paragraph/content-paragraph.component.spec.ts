import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentParagraphComponent } from './content-paragraph.component';

describe('ContentParagraphComponent', () => {
  let component: ContentParagraphComponent;
  let fixture: ComponentFixture<ContentParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
