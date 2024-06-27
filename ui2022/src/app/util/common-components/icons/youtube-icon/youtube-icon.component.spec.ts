import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeIconComponent } from './youtube-icon.component';

describe('YoutubeIconComponent', () => {
  let component: YoutubeIconComponent;
  let fixture: ComponentFixture<YoutubeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [YoutubeIconComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
