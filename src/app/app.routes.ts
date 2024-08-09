import { Routes } from '@angular/router';

import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';

export const routes: Routes = [
  { path: '', component: SurveyFormComponent },
  { path: 'results', component: SurveyResultsComponent },
];
