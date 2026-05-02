import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngelesPost } from './angeles-post';

describe('AngelesPost', () => {
  let component: AngelesPost;
  let fixture: ComponentFixture<AngelesPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngelesPost],
    }).compileComponents();

    fixture = TestBed.createComponent(AngelesPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
