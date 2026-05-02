import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMagazines } from './home-magazines';

describe('HomeMagazines', () => {
  let component: HomeMagazines;
  let fixture: ComponentFixture<HomeMagazines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMagazines],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMagazines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
