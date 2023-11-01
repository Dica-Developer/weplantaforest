import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTreesComponent } from './team-trees.component';

describe('TeamTreesComponent', () => {
  let component: TeamTreesComponent;
  let fixture: ComponentFixture<TeamTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
