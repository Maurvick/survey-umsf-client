import { forkJoin } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  Component,
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
import { SelectBoxComponent } from '../select-box/select-box.component';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectBoxComponent,
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

  isDisciplineOptionsLoaded: boolean = false;
  isLecturerOptionsLoaded: boolean = false;

  isAppLoaded: boolean = false;

  firstPageCompleted: boolean = false;

  errorMessage: string = '';
  rate: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  totalInputs: number = 0;
  completedInputs: number = 0;

  surveyForm!: FormGroup;

  get progress() {
    return Math.ceil((this.completedInputs / this.totalInputs) * 100);
  }

  constructor(
    private surveyService: SurveyService,
    private fb: FormBuilder,
    private renderer: Renderer2
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

  ngOnInit(): void {
    this.fetchFirstFourOptions();
    this.trackFirstFourOptions();
    this.surveyForm.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  updateProgress() {
    this.completedInputs = this.getFormControlsCountWithValues();
  }

  /**
   * Fetches data for `educationLevel` select, `educationForm` select,
   * `year` select and `specialty` select
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
      complete: () => {
        this.isAppLoaded = true;
      },
    });
  }

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
          if (this.educationDisciplineArr.length === 0) {
            alert('No data found!');
            location.reload();
          }
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
          if (this.educationLecturersArr.length === 0) {
            alert('No data found!');
            location.reload();
          }
        },
      });
  }

  /**
   * Tracks changes in values for `educationLevel`, `educationForm`,
   * `year`, `specialty`, `title` selects and loads data based on new values.
   */
  trackFirstFourOptions() {
    this.surveyForm.get('educationLevel')?.valueChanges.subscribe(() => {
      if (
        // Fetch data only when all previous questions are answered
        this.isEducationLevelQuestionsAnswered() &&
        this.isEducationFormQuestionsAnswered() &&
        this.isEducationStartYearQuestionsAnswered() &&
        this.isEducationSpecialtyQuestionsAnswered()
      ) {
        this.fetchDiscipline();
      }
    });
    this.surveyForm.get('educationalForm')?.valueChanges.subscribe(() => {
      if (
        this.isEducationLevelQuestionsAnswered() &&
        this.isEducationFormQuestionsAnswered() &&
        this.isEducationStartYearQuestionsAnswered() &&
        this.isEducationSpecialtyQuestionsAnswered()
      ) {
        this.fetchDiscipline();
      }
    });
    this.surveyForm.get('year')?.valueChanges.subscribe(() => {
      if (
        this.isEducationLevelQuestionsAnswered() &&
        this.isEducationFormQuestionsAnswered() &&
        this.isEducationStartYearQuestionsAnswered() &&
        this.isEducationSpecialtyQuestionsAnswered()
      ) {
        this.fetchDiscipline();
      }
    });
    this.surveyForm.get('speciality')?.valueChanges.subscribe(() => {
      if (
        this.isEducationLevelQuestionsAnswered() &&
        this.isEducationFormQuestionsAnswered() &&
        this.isEducationStartYearQuestionsAnswered() &&
        this.isEducationSpecialtyQuestionsAnswered()
      ) {
        this.fetchDiscipline();
      }
    });
    this.surveyForm.get('title')?.valueChanges.subscribe(() => {
      this.fetchLecturers();
    });
  }

  // ! due to angular detection mechanism triggers, this method will called multiple times
  // ! avoid resource heavy operations like fetching data when using structural directives

  // TODO: This is probably should be rewritten
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

  onSubmit() {
    this.firstPageCompleted = true;
  }

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
