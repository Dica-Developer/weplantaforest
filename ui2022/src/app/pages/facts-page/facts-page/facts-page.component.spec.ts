import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsPageComponent } from './facts-page.component';

describe('FactsPageComponent', () => {
  let component: FactsPageComponent;
  let fixture: ComponentFixture<FactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FactsPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
