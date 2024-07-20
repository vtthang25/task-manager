import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import {
  addTask,
  assignTask,
  completeTask,
  loadTasks,
} from '../../store/actions/tasks.actions';
import {
  selectAllTasks,
  selectFilteredTasks,
} from '../../store/selectors/tasks.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    AsyncPipe,
    CommonModule
  ],
})
export class TaskListComponent {
  public tasks$: Observable<Task[]>;
  public task: Task[] = [];
  filter: string = '';

  constructor(private store: Store, private router: Router) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.tasks$.pipe().subscribe((tasks) => {
      this.task = tasks;
    });
  }

  addTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  completeTask(taskId: string) {
    this.store.dispatch(completeTask({ taskId }));
  }

  filterTasks() {
    this.tasks$ = this.store.select(selectFilteredTasks(this.filter));
  }

  assignTask(taskId: string, assignedTo: string) {
    this.store.dispatch(assignTask({ taskId, assignedTo }));
  }

  viewTaskDetails(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }
}
