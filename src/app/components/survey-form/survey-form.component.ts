import { forkJoin } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { filterObjectPropertyByKey } from '../../../utils/utils';
import { Survey } from '../../services/survey-service/survey.model';
import { SurveyService } from '../../services/survey-service/survey.service';
import { LoaderComponent } from '../loader/loader.component';
import { SurveySelectBoxComponent } from '../survey-select-box/survey-select-box.component';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveySelectBoxComponent,
    LoaderComponent,
  ],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css',
})
export class SurveyFormComponent implements OnInit, OnChanges {
  educationLevelOptions: Survey[] = [];
  educationalFormOptions: Survey[] = [];
  educationStartYearOptions: Survey[] = [];
  educationSpecialtyOptions: Survey[] = [];

  educationDisciplineOptions: Survey[] = [];
  educationLecturersOptions: Survey[] = [];

  disciplineOptionsLoaded: boolean = false;
  lecturerOptionsLoaded: boolean = false;

  disciplineDataLoaded: boolean = false;
  lecturerDataLoaded: boolean = false;

  firstPageCompleted: boolean = false;

  errorMessage: string = '';
  rate: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  // currentStep: number = 1;

  surveyForm!: FormGroup;

  // selectValues: { [key: string]: string } = {};

  constructor(private surveyService: SurveyService, private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      educationLevel: '',
      educationalForm: '',
      year: '',
      speciality: '',
      title: '',
      lecturer: '',
    });
  }

  // TODO: Update loaded data based on answers
  ngOnInit(): void {
    this.surveyForm.valueChanges.subscribe(() => {
      this.checkIfDisciplineLoaded();
      this.checkIfLecturerLoaded();
    });
    this.fetchFirstFourOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  fetchFirstFourOptions(): void {
    forkJoin([
      this.surveyService.getSubjectByEducationLevel(),
      this.surveyService.getSubjectByEducationForm(),
      this.surveyService.getSubjectByYear(),
      this.surveyService.getSubjectBySpecialty(),
    ]).subscribe({
      next: ([
        educationLevelArr,
        educationalFormArr,
        educationStartYearArr,
        educationSpecialtyArr,
      ]) => {
        this.educationLevelOptions = educationLevelArr;
        this.educationalFormOptions = educationalFormArr;
        this.educationStartYearOptions = educationStartYearArr;
        this.educationSpecialtyOptions = educationSpecialtyArr;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        alert('Error: ' + this.errorMessage);
      },
      complete: () => {},
    });
  }

  // TODO: Add check for if value is not empty and loaded
  fetchDiscipline(): void {
    this.surveyService
      .getSubjectByParams(
        this.surveyForm.get('educationLevel')?.value,
        this.surveyForm.get('educationalForm')?.value,
        this.surveyForm.get('year')?.value,
        this.surveyForm.get('speciality')?.value
      )
      .subscribe({
        next: (data) => {
          this.educationDisciplineOptions = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.disciplineDataLoaded = true;
        },
      });
  }

  fetchLecturers(): void {
    this.surveyService
      .getLecturesByParams(
        this.surveyForm.get('educationLevel')?.value,
        this.surveyForm.get('educationalForm')?.value,
        this.surveyForm.get('year')?.value,
        this.surveyForm.get('speciality')?.value,
        this.surveyForm.get('title')?.value
      )
      .subscribe({
        next: (data) => {
          this.educationLecturersOptions = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.lecturerDataLoaded = true;
        },
      });
  }

  // onSelectionChange(event: { id: string; value: string }): void {
  //   this.selectValues[event.id] = event.value;
  // }

  isFirstFourQuestionsAnswered(): boolean {
    // ! due to angular detection mechanism triggers, this method will called multiple times
    // ! avoid resource heavy operations like fetching data when using structural directives
    return (
      this.surveyForm.get('educationLevel')?.value &&
      this.surveyForm.get('educationalForm')?.value &&
      this.surveyForm.get('year')?.value &&
      this.surveyForm.get('speciality')?.value
    );
  }

  isDisciplineQuestionsAnswered(): boolean {
    return this.surveyForm.get('title')?.value;
  }

  isAllQuestionsAnswered(): boolean {
    return (
      this.surveyForm.get('educationLevel')?.value &&
      this.surveyForm.get('educationalForm')?.value &&
      this.surveyForm.get('year')?.value &&
      this.surveyForm.get('speciality')?.value &&
      this.surveyForm.get('title')?.value &&
      this.surveyForm.get('lecturer')?.value
    );
  }

  checkIfDisciplineLoaded(): void {
    let currentValue = this.surveyForm.get('title')?.value;
    if (this.isFirstFourQuestionsAnswered() && !this.disciplineOptionsLoaded) {
      this.fetchDiscipline();
      this.disciplineOptionsLoaded = true;
    }
  }

  checkIfLecturerLoaded(): void {
    if (this.isDisciplineQuestionsAnswered() && !this.lecturerOptionsLoaded) {
      this.lecturerOptionsLoaded = true;
      this.fetchLecturers();
    }
  }

  getEducationLevelValues() {
    return filterObjectPropertyByKey(
      this.educationLevelOptions,
      'educationLevel'
    );
  }

  getEducationalFormValues() {
    return filterObjectPropertyByKey(
      this.educationalFormOptions,
      'educationalForm'
    );
  }

  getEducationStartYearValues() {
    return filterObjectPropertyByKey(
      this.educationStartYearOptions,
      'educationStartYear'
    );
  }

  getEducationSpecialtyValues() {
    return filterObjectPropertyByKey(
      this.educationSpecialtyOptions,
      'educationSpecialty'
    );
  }

  getEducationDisciplineValues() {
    return filterObjectPropertyByKey(this.educationDisciplineOptions, 'title');
  }

  getEducationLecturersValues() {
    return filterObjectPropertyByKey(
      this.educationLecturersOptions,
      'lecturer'
    );
  }

  onSubmit() {
    this.firstPageCompleted = true;
  }
}
