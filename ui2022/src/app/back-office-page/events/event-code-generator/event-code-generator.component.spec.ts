import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCodeGeneratorComponent } from './event-code-generator.component';

describe('EventCodeGeneratorComponent', () => {
  let component: EventCodeGeneratorComponent;
  let fixture: ComponentFixture<EventCodeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCodeGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
