import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTreesComponent } from './transfer-trees.component';

describe('TransferTreesComponent', () => {
  let component: TransferTreesComponent;
  let fixture: ComponentFixture<TransferTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TransferTreesComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
