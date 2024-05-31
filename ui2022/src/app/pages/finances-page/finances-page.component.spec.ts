import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesPageComponent } from './finances-page.component';

describe('FinancesPageComponent', () => {
  let component: FinancesPageComponent;
  let fixture: ComponentFixture<FinancesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FinancesPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FinancesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
