import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantProposalPageComponent } from './plant-proposal-page.component';

describe('PlantProposalPageComponent', () => {
  let component: PlantProposalPageComponent;
  let fixture: ComponentFixture<PlantProposalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlantProposalPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PlantProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
