import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteConfirmationComponent } from './account-delete-confirmation.component';

describe('AccountDeleteConfirmationComponent', () => {
  let component: AccountDeleteConfirmationComponent;
  let fixture: ComponentFixture<AccountDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDeleteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
