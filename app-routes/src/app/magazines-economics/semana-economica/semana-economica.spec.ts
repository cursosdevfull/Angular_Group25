import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanaEconomica } from './semana-economica';

describe('SemanaEconomica', () => {
  let component: SemanaEconomica;
  let fixture: ComponentFixture<SemanaEconomica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanaEconomica],
    }).compileComponents();

    fixture = TestBed.createComponent(SemanaEconomica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
