import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestTourComponent } from './forest-tour.component';

describe('ForestTourComponent', () => {
  let component: ForestTourComponent;
  let fixture: ComponentFixture<ForestTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ForestTourComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ForestTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
