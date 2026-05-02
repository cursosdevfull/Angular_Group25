import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTitle } from './user-title';

describe('UserTitle', () => {
  let component: UserTitle;
  let fixture: ComponentFixture<UserTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
