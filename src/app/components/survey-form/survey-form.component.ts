import { forkJoin } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { filterObjectPropertyByKey } from '../../../utils/utils';
import { Survey } from '../../services/survey-service/survey.model';
import { SurveyService } from '../../services/survey-service/survey.service';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../loader/loader.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SurveySelectBoxComponent } from '../survey-select-box/survey-select-box.component';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveySelectBoxComponent,
    LoaderComponent,
    ProgressBarComponent,
    HeaderComponent,
  ],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css',
})
export class SurveyFormComponent implements OnInit, OnChanges {
  educationLevelArr: Survey[] = [];
  educationalFormArr: Survey[] = [];
  educationStartYearArr: Survey[] = [];
  educationSpecialtyArr: Survey[] = [];

  educationDisciplineArr: Survey[] = [];
  educationLecturersArr: Survey[] = [];

  disciplineOptionsLoaded: boolean = false;
  lecturerOptionsLoaded: boolean = false;

  disciplineDataLoaded: boolean = false;
  lecturerDataLoaded: boolean = false;
  formValuesChanged: boolean = false;
  currentObjValues: any;

  firstPageCompleted: boolean = false;

  errorMessage: string = '';
  rate: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  surveyForm!: FormGroup;
  totalInputs: number = 0;
  completedInputs: number = 0;
  // selectValues: { [key: string]: string } = {};

  get progress() {
    return Math.ceil((this.completedInputs / this.totalInputs) * 100);
  }

  constructor(
    private surveyService: SurveyService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.surveyForm = this.fb.group({
      educationLevel: '',
      educationalForm: '',
      year: '',
      speciality: '',
      title: '',
      lecturer: '',
      competence: '',
      knowledge: '',
      practicality: '',
      tools: '',
      communication: '',
      informativeness: '',
      objectivity: '',
      classroom: '',
      conferences: '',
      friendliness: '',
      preferences: '',
      comment: '',
    });
    this.totalInputs = Object.keys(this.surveyForm.controls).length;
  }

  // TODO: Update loaded data based on answers
  ngOnInit(): void {
    this.fetchFirstFourOptions();
    this.surveyForm.valueChanges.subscribe(() => {
      // this.formValuesChanged = true;
      this.updateProgress();
      // if (
      //   this.isEducationLevelQuestionsAnswered() &&
      //   this.isEducationFormQuestionsAnswered() &&
      //   this.isEducationStartYearQuestionsAnswered() &&
      //   this.isEducationSpecialtyQuestionsAnswered()
      // ) {
      //   if (this.currentObjValues != Object.values(this.surveyForm.controls)) {
      //     // Lecturer option is based on discipline values
      //     this.fetchDiscipline();
      //     this.fetchLecturers();
      //     this.currentObjValues = Object.values(this.surveyForm.controls);
      //   }
      // }
      this.checkIfDisciplineLoaded();
      this.checkIfLecturerLoaded();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  updateProgress() {
    this.completedInputs = this.getFormControlsCountWithValues();
  }

  /**
   * Fetches data for `getSubjectByEducationLevel()`, `getSubjectByEducationForm()`,
   * `getSubjectByYear()` and `getSubjectBySpecialty()`
   */
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
        this.educationLevelArr = educationLevelArr;
        this.educationalFormArr = educationalFormArr;
        this.educationStartYearArr = educationStartYearArr;
        this.educationSpecialtyArr = educationSpecialtyArr;
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
          this.educationDisciplineArr = data;
          console.log(
            'sent:',
            this.surveyForm.get('educationLevel')?.value,
            this.surveyForm.get('educationalForm')?.value,
            this.surveyForm.get('year')?.value,
            this.surveyForm.get('speciality')?.value
          );
          console.log('received: ', data);
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
          this.educationLecturersArr = data;
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

  // ! due to angular detection mechanism triggers, this method will called multiple times
  // ! avoid resource heavy operations like fetching data when using structural directives

  isEducationLevelQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('educationLevel')?.value;
  }

  isEducationFormQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('educationalForm')?.value;
  }

  isEducationStartYearQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('year')?.value;
  }

  isEducationSpecialtyQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('speciality')?.value;
  }

  isDisciplineQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('title')?.value;
  }

  isLecturerQuestionsAnswered(): boolean {
    return !!this.surveyForm.get('lecturer')?.value;
  }

  isAllSelectionsAnswered() {
    return this.totalInputs === this.getFormControlsCountWithValues();
  }

  checkIfDisciplineLoaded(): void {
    if (
      this.isEducationLevelQuestionsAnswered() &&
      this.isEducationFormQuestionsAnswered() &&
      this.isEducationStartYearQuestionsAnswered() &&
      this.isEducationSpecialtyQuestionsAnswered() &&
      this.disciplineOptionsLoaded === false
    ) {
      this.fetchDiscipline();
      this.disciplineOptionsLoaded = true;
    }
  }

  checkIfLecturerLoaded(): void {
    if (
      this.isDisciplineQuestionsAnswered() &&
      this.lecturerOptionsLoaded === false
    ) {
      this.lecturerOptionsLoaded = true;
      this.fetchLecturers();
    }
  }

  getFormControlsCountWithValues(): number {
    return Object.values(this.surveyForm.controls).filter(
      (control) => control.value
    ).length;
  }

  getChildrenDataById(parentId: string): string[] {
    const parentElement = this.renderer.selectRootElement(`#${parentId}`, true);
    const children = parentElement.querySelectorAll('select');
    let values: string[] = [];
    children.forEach((child: HTMLSelectElement) => {
      values.push(child.value);
    });
    return values;
  }

  // TODO: The lecturer should disappear as option when they are evaluated
  getEducationLevelValues() {
    return filterObjectPropertyByKey(this.educationLevelArr, 'educationLevel');
  }

  getEducationalFormValues() {
    return filterObjectPropertyByKey(
      this.educationalFormArr,
      'educationalForm'
    );
  }

  getEducationStartYearValues() {
    return filterObjectPropertyByKey(
      this.educationStartYearArr,
      'educationStartYear'
    );
  }

  getEducationSpecialtyValues() {
    return filterObjectPropertyByKey(
      this.educationSpecialtyArr,
      'educationSpecialty'
    );
  }

  getEducationDisciplineValues() {
    return filterObjectPropertyByKey(this.educationDisciplineArr, 'title');
  }

  getEducationLecturersValues() {
    return filterObjectPropertyByKey(this.educationLecturersArr, 'lecturer');
  }

  onSubmit() {
    this.firstPageCompleted = true;
  }

  // TODO: Send data
  onSendAnswers() {
    let answers: { [key: string]: string } = {};
    let answer: string[] = this.getChildrenDataById('second-page');
    for (let i = 0; i < 11; i++) {
      answers[`answer${i + 1}`] = answer[i];
    }
    answers['lecturer'] = this.surveyForm.get('lecturer')?.value;
    answers['subject'] = this.surveyForm.get('title')?.value;
    answers['extra'] = this.surveyForm.get('comment')?.value;
    console.log(answers);
    this.surveyService.postAnswer(answers);
    alert('Answers sent!');
    location.reload();
  }
}
