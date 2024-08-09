import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultsComponent } from './survey-results.component';

describe('SurveyTableComponent', () => {
  let component: SurveyResultsComponent;
  let fixture: ComponentFixture<SurveyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
