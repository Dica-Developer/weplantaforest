import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEventActionsComponent } from './grid-event-actions.component';

describe('GridEventActionsComponent', () => {
  let component: GridEventActionsComponent;
  let fixture: ComponentFixture<GridEventActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GridEventActionsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEventActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
