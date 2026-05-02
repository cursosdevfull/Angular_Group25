import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingtonPost } from './washington-post';

describe('WashingtonPost', () => {
  let component: WashingtonPost;
  let fixture: ComponentFixture<WashingtonPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WashingtonPost],
    }).compileComponents();

    fixture = TestBed.createComponent(WashingtonPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
