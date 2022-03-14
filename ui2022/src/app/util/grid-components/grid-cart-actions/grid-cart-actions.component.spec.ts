import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCartActionsComponent } from './grid-cart-actions.component';

describe('GridCartActionsComponent', () => {
  let component: GridCartActionsComponent;
  let fixture: ComponentFixture<GridCartActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCartActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCartActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
