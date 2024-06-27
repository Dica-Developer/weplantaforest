import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeIconComponent } from './tree-icon.component';

describe('TreeIconComponent', () => {
  let component: TreeIconComponent;
  let fixture: ComponentFixture<TreeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TreeIconComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TreeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
