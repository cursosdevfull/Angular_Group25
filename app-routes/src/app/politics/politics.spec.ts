import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Politics } from './politics';

describe('Politics', () => {
  let component: Politics;
  let fixture: ComponentFixture<Politics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Politics],
    }).compileComponents();

    fixture = TestBed.createComponent(Politics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
