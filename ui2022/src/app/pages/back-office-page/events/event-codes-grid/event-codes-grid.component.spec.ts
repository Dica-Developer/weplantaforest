import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCodesGridComponent } from './event-codes-grid.component';

describe('EventCodesGridComponent', () => {
  let component: EventCodesGridComponent;
  let fixture: ComponentFixture<EventCodesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCodesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCodesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
