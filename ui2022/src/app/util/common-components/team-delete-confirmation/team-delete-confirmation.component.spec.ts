import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeleteConfirmationComponent } from './team-delete-confirmation.component';

describe('TeamDeleteConfirmationComponent', () => {
  let component: TeamDeleteConfirmationComponent;
  let fixture: ComponentFixture<TeamDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDeleteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
