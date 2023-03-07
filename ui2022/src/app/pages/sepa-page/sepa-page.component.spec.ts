import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepaPageComponent } from './sepa-page.component';

describe('SepaPageComponent', () => {
  let component: SepaPageComponent;
  let fixture: ComponentFixture<SepaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SepaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
