import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantproposalPreviewRowComponent } from './plantproposal-preview-row.component';

describe('PlantproposalPreviewRowComponent', () => {
  let component: PlantproposalPreviewRowComponent;
  let fixture: ComponentFixture<PlantproposalPreviewRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantproposalPreviewRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantproposalPreviewRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
