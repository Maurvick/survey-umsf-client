import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Survey } from './survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  getSubjectByEducationLevel() {
    let apiUrl = environment.baseUrl + '/survey/subject/all/educationLevel';
    return this.http.get<Survey[]>(apiUrl);
  }

  getSubjectByEducationForm() {
    let apiUrl = environment.baseUrl + '/survey/subject/all/year';
    return this.http.get<Survey[]>(apiUrl);
  }

  getSubjectByYear() {
    let apiUrl = environment.baseUrl + '/survey/subject/all/year';
    return this.http.get<Survey[]>(apiUrl);
  }

  getSubjectBySpecialty() {
    let apiUrl = environment.baseUrl + '/survey/subject/all/speciality';
    return this.http.get<Survey[]>(apiUrl);
  }

  getSubjectByParams(
    educationLevel: string,
    educationalForm: string,
    educationStartYear: string,
    educationSpecialty: string
  ) {
    let apiUrl = environment.baseUrl + '/survey/subject/getSubjectByParams';
    // Object keys will be used as url params, so do not change naming of keys or it will be cause 400 code error.
    let params = {
      educationLevel: educationLevel,
      educationalForm: educationalForm,
      year: educationStartYear,
      speciality: educationSpecialty,
    };

    return this.http.get<Survey[]>(apiUrl, { params });
  }

  getLecturesByParams(
    educationLevel: string,
    educationalForm: string,
    educationStartYear: string,
    educationSpecialty: string,
    educationTitle: string
  ) {
    let apiUrl = environment.baseUrl + '/survey/subject/getLecturerByParams';
    let params = {
      educationLevel: educationLevel,
      educationalForm: educationalForm,
      year: educationStartYear,
      speciality: educationSpecialty,
      title: educationTitle,
    };

    return this.http.get<Survey[]>(apiUrl, { params });
  }

  postAnswer(answer: object) {
    let apiUrl = environment.baseUrl + '/survey/answer/send';
    return this.http.post(apiUrl, answer);
  }

  getLecturerBySpecialty(specialty: string) {
    let apiUrl =
      environment.baseUrl + '/survey/subject/getLecturerStatsByParams';
    let params = {
      speciality: specialty,
    };
    return this.http.get<Survey[]>(apiUrl, { params });
  }

  getAnswersByLecturer(lecturer: string) {
    let apiUrl = environment.baseUrl + '/survey/answer/getByLecturer';
    let params = {
      lecturer: lecturer,
    };
    return this.http.get<Survey[]>(apiUrl, { params });
  }

  getCommentsByLecturer(lecturer: string) {
    let apiUrl = environment.baseUrl + '/survey/answer/getCommentByLecturer';
    let params = {
      lecturer: lecturer,
    };

    return this.http.get<Survey[]>(apiUrl, { params });
  }
}
