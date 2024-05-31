import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTypeImageUploadComponent } from './tree-type-image-upload.component';

describe('TreeTypeImageUploadComponent', () => {
  let component: TreeTypeImageUploadComponent;
  let fixture: ComponentFixture<TreeTypeImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TreeTypeImageUploadComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TreeTypeImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
