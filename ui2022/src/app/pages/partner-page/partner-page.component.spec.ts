import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPageComponent } from './partner-page.component';

describe('PartnerPageComponent', () => {
  let component: PartnerPageComponent;
  let fixture: ComponentFixture<PartnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
