import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './component/task-details/task-details.component';
import { TaskListComponent } from './component/task-list/task-list.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
];
