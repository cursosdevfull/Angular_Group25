import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicagoNews } from './chicago-news';

describe('ChicagoNews', () => {
  let component: ChicagoNews;
  let fixture: ComponentFixture<ChicagoNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChicagoNews],
    }).compileComponents();

    fixture = TestBed.createComponent(ChicagoNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
