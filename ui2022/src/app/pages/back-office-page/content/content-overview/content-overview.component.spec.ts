import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOverviewComponent } from './content-overview.component';

describe('ContentOverviewComponent', () => {
  let component: ContentOverviewComponent;
  let fixture: ComponentFixture<ContentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
