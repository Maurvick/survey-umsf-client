import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Survey } from '../../services/survey-service/survey.model';
import { SurveyService } from '../../services/survey-service/survey.service';
import { SelectBoxComponent } from '../select-box/select-box.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-survey-table',
  standalone: true,
  imports: [
    SelectBoxComponent,
    ReactiveFormsModule,
    CommonModule,
    TableComponent,
  ],
  templateUrl: './survey-results.component.html',
  styleUrl: './survey-results.component.css',
})
export class SurveyResultsComponent implements OnInit {
  specialtyArr: Survey[] = [];
  lecturersArr: Survey[] = [];
  statsArr: any[] = [];

  resultsForm!: FormGroup;

  specialtySelectValue: string = '';
  lecturerSelectValue: string = '';

  tableHeadingValues: string[] = [
    'Викладач',
    'Дисципліна',
    'Q1',
    'Q2',
    'Q3',
    'Q4',
    'Q5',
    'Q6',
    'Q7',
    'Q8',
    'Q9',
    'Q10',
    'Q11',
    'Середня оцінка',
    'Оцінили',
  ];
  tableBodyValues: string[] = ['Середня оцінка', ''];

  avgScores = ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  countAvg = ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  subject: any[] = [];
  lecturerStats: any[] = [];

  constructor(
    private surveyService: SurveyService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.fetchSpecialties();
    this.resultsForm = new FormGroup({
      speciality: new FormControl(''),
      lecturer: new FormControl(''),
    });
    this.resultsForm.get('speciality')?.valueChanges.subscribe((value) => {
      this.specialtySelectValue = value;
      if (this.resultsForm.get('speciality')?.value) {
        this.fetchLecturers();
      }
    });
    this.resultsForm.get('lecturer')?.valueChanges.subscribe((value) => {
      this.lecturerSelectValue = value;
      if (this.resultsForm.get('lecturer')?.value) {
        this.fetchStats();
      }
    });
  }

  fetchSpecialties(): void {
    this.surveyService.getSubjectBySpecialty().subscribe({
      next: (data) => {
        this.specialtyArr = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  fetchLecturers(): void {
    this.surveyService
      .getLecturerBySpecialty(this.specialtySelectValue)
      .subscribe({
        next: (data) => {
          this.lecturersArr = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
  }

  fetchStats(): void {
    this.surveyService
      .getAnswersByLecturer(this.lecturerSelectValue)
      .subscribe({
        next: (data) => {
          this.lecturerStats = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log(this.lecturerStats);
        },
      });
  }

  getSortedStats() {
    let arr: string[] = [];
    for (let obj of this.lecturerStats) {
      for (let key in obj) {
        arr.push(obj[key]);
      }
    }
    return arr;
  }

  onClick() {}

  createStatsTable() {
    let table = this.renderer.selectRootElement('#table', true);
  }
}
