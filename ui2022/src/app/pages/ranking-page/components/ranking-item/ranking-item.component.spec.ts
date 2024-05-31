import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingItemComponent } from './ranking-item.component';

describe('RankingItemComponent', () => {
  let component: RankingItemComponent;
  let fixture: ComponentFixture<RankingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RankingItemComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RankingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
