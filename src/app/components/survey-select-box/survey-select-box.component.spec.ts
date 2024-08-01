import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySelectBoxComponent } from './survey-select-box.component';

describe('SurveySelectBoxComponent', () => {
  let component: SurveySelectBoxComponent;
  let fixture: ComponentFixture<SurveySelectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveySelectBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveySelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
