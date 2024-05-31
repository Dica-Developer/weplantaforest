import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamPageComponent } from './edit-team-page.component';

describe('EditTeamPageComponent', () => {
  let component: EditTeamPageComponent;
  let fixture: ComponentFixture<EditTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditTeamPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
