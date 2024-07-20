import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  addTask,
  completeTask,
  assignTask,
} from '../actions/tasks.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getAll().pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) =>
        this.taskService.add(action.task).pipe(
          map((task) => addTask({ task })),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTask),
      mergeMap((action) =>
        this.taskService.complete(action.taskId).pipe(
          map(() => completeTask({ taskId: action.taskId })),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  assignTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assignTask),
      mergeMap((action) =>
        this.taskService.assign(action.taskId, action.assignedTo).pipe(
          map(() =>
            assignTask({ taskId: action.taskId, assignedTo: action.assignedTo })
          ),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
