import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInfoOverlayComponent } from './tree-info-overlay.component';

describe('TreeInfoOverlayComponent', () => {
  let component: TreeInfoOverlayComponent;
  let fixture: ComponentFixture<TreeInfoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeInfoOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeInfoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
