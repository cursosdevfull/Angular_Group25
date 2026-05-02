import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYorkTimes } from './new-york-times';

describe('NewYorkTimes', () => {
  let component: NewYorkTimes;
  let fixture: ComponentFixture<NewYorkTimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewYorkTimes],
    }).compileComponents();

    fixture = TestBed.createComponent(NewYorkTimes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
