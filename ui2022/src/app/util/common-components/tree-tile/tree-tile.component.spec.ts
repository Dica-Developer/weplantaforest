import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTileComponent } from './tree-tile.component';

describe('TreeTileComponent', () => {
  let component: TreeTileComponent;
  let fixture: ComponentFixture<TreeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
