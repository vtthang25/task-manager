import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const selectTasksState = createFeatureSelector<Task[]>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  (tasks: Task[]) => tasks
);
export const selectFilteredTasks = (filter: string) =>
  createSelector(selectTasksState, (tasks: Task[]) =>
    tasks.filter((task) => task.title.includes(filter))
  );
export const selectTaskById = (taskId: string) =>
  createSelector(selectTasksState, (tasks: Task[]) =>
    tasks.find((task) => task.id === taskId)
  );
