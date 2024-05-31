import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTreesComponent } from './profile-trees.component';

describe('ProfileTreesComponent', () => {
  let component: ProfileTreesComponent;
  let fixture: ComponentFixture<ProfileTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProfileTreesComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
