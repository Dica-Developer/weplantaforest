import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShovelIconComponent } from './shovel-icon.component';

describe('ShovelIconComponent', () => {
  let component: ShovelIconComponent;
  let fixture: ComponentFixture<ShovelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ShovelIconComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ShovelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
