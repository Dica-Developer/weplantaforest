import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestPlantingsComponent } from './newest-plantings.component';

describe('NewestPlantingsComponent', () => {
  let component: NewestPlantingsComponent;
  let fixture: ComponentFixture<NewestPlantingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewestPlantingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestPlantingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
