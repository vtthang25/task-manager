import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      assignedTo: 'User A',
      completed: false,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      assignedTo: 'User B',
      completed: false,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      assignedTo: 'User C',
      completed: true,
    },
  ];

  getAll(): Observable<Task[]> {
    return of(this.tasks);
  }

  add(task: Task): Observable<Task> {
    this.tasks.push(task);
    return of(task);
  }

  complete(taskId: string): Observable<void> {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      Object.assign(task, { completed: true });
      return of(undefined);
    } else {
      return throwError(() => new Error('Task not found'));
    }
  }

  assign(taskId: string, assignedTo: string): Observable<void> {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.assignedTo = assignedTo;
      return of(undefined);
    } else {
      return throwError(() => new Error('Task not found'));
    }
  }
}
