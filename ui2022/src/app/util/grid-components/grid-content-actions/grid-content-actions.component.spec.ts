import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContentActionsComponent } from './grid-content-actions.component';

describe('GridContentActionsComponent', () => {
  let component: GridContentActionsComponent;
  let fixture: ComponentFixture<GridContentActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridContentActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
