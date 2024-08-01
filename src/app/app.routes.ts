import { Routes } from '@angular/router';

import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { SurveyTableComponent } from './components/survey-table/survey-table.component';

export const routes: Routes = [
  { path: '', component: SurveyFormComponent },
  { path: 'results', component: SurveyTableComponent },
];
