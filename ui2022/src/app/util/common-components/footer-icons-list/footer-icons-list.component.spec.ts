import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterIconsListComponent } from './footer-icons-list.component';

describe('FooterIconsListComponent', () => {
  let component: FooterIconsListComponent;
  let fixture: ComponentFixture<FooterIconsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FooterIconsListComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FooterIconsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
