import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProjectActionsComponent } from './grid-project-actions.component';

describe('GridProjectActionsComponent', () => {
  let component: GridProjectActionsComponent;
  let fixture: ComponentFixture<GridProjectActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GridProjectActionsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridProjectActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
