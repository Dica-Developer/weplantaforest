import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantProposalRowComponent } from './plant-proposal-row.component';

describe('PlantProposalRowComponent', () => {
  let component: PlantProposalRowComponent;
  let fixture: ComponentFixture<PlantProposalRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantProposalRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantProposalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
