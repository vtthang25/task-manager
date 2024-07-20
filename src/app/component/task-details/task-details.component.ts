import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { selectTaskById } from '../../store/selectors/tasks.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class TaskDetailsComponent implements OnInit {
  public task$: Observable<Task> | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.task$ = this.store
        .select(selectTaskById(taskId))
        .pipe(filter((task): task is Task => task !== undefined));
    }
  }
}
