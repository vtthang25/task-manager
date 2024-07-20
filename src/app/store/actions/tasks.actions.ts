import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task List] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task List] Load Tasks Failure',
  props<{ error: any }>()
);

export const addTask = createAction(
  '[Task List] Add Task',
  props<{ task: Task }>()
);
export const completeTask = createAction(
  '[Task List] Complete Task',
  props<{ taskId: string }>()
);
export const filterTasks = createAction(
  '[Task List] Filter Tasks',
  props<{ filter: string }>()
);
export const assignTask = createAction(
  '[Task List] Assign Task',
  props<{ taskId: string; assignedTo: string }>()
);
