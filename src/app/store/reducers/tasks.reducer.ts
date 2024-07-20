import { Action, createReducer, on } from '@ngrx/store';

import { Task } from '../../models/task.model';
import {
  loadTasksSuccess,
  addTask,
  completeTask,
  filterTasks,
  assignTask,
} from '../actions/tasks.actions';

export const initialState: Task[] = [];

const _tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => [...tasks]),
  on(addTask, (state, { task }) => [...state, task]),
  on(completeTask, (state, { taskId }) =>
    state.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  ),
  on(filterTasks, (state, { filter }) =>
    state.filter((task) => task.title.includes(filter))
  ),
  on(assignTask, (state, { taskId, assignedTo }) =>
    state.map((task) => (task.id === taskId ? { ...task, assignedTo } : task))
  )
);

export function tasksReducer(
  state: Task[] | undefined,
  action: Action<string>
) {
  return _tasksReducer(state, action);
}
