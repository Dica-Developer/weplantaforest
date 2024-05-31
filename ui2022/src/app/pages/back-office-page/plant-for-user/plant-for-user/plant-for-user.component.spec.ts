import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantForUserComponent } from './plant-for-user.component';

describe('PlantForUserComponent', () => {
  let component: PlantForUserComponent;
  let fixture: ComponentFixture<PlantForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlantForUserComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
