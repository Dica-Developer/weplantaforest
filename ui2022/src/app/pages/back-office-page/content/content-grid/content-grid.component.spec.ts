import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGridComponent } from './content-grid.component';

describe('ContentGridComponent', () => {
  let component: ContentGridComponent;
  let fixture: ComponentFixture<ContentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
