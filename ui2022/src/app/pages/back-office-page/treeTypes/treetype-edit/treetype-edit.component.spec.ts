import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreetypeEditComponent } from './treetype-edit.component';

describe('TreetypeEditComponent', () => {
  let component: TreetypeEditComponent;
  let fixture: ComponentFixture<TreetypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TreetypeEditComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
