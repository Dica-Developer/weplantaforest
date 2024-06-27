import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrelIconComponent } from './barrel-icon.component';

describe('BarrelIconComponent', () => {
  let component: BarrelIconComponent;
  let fixture: ComponentFixture<BarrelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BarrelIconComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BarrelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
