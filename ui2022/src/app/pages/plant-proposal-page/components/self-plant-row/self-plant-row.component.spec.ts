import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPlantRowComponent } from './self-plant-row.component';

describe('SelfPlantRowComponent', () => {
  let component: SelfPlantRowComponent;
  let fixture: ComponentFixture<SelfPlantRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SelfPlantRowComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SelfPlantRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
