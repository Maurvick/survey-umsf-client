import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTableComponent } from './survey-table.component';

describe('SurveyTableComponent', () => {
  let component: SurveyTableComponent;
  let fixture: ComponentFixture<SurveyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
