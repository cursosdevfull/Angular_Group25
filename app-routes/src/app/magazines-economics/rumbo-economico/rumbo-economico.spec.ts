import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumboEconomico } from './rumbo-economico';

describe('RumboEconomico', () => {
  let component: RumboEconomico;
  let fixture: ComponentFixture<RumboEconomico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RumboEconomico],
    }).compileComponents();

    fixture = TestBed.createComponent(RumboEconomico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
