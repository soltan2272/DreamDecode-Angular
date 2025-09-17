import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterpretation } from './add-interpretation';

describe('AddInterpretation', () => {
  let component: AddInterpretation;
  let fixture: ComponentFixture<AddInterpretation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInterpretation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterpretation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
