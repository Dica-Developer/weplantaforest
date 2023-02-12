import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPageComponent } from './team-page.component';

describe('TeamPageComponent', () => {
  let component: TeamPageComponent;
  let fixture: ComponentFixture<TeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
