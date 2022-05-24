import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoImgBoxComponent } from './no-img-box.component';

describe('NoImgBoxComponent', () => {
  let component: NoImgBoxComponent;
  let fixture: ComponentFixture<NoImgBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoImgBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoImgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
