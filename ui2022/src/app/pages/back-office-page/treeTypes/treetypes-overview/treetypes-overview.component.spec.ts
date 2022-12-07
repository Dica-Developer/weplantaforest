import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreetypesOverviewComponent } from './treetypes-overview.component';

describe('TreetypesOverviewComponent', () => {
  let component: TreetypesOverviewComponent;
  let fixture: ComponentFixture<TreetypesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreetypesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetypesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
