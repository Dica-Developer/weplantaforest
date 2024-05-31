import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemComponent } from './carousel-item.component';

describe('CarouselItemComponent', () => {
  let component: CarouselItemComponent;
  let fixture: ComponentFixture<CarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CarouselItemComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
