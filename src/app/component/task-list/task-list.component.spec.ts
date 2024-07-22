import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import {
  addTask,
  assignTask,
  completeTask,
  loadTasks,
} from '../../store/actions/tasks.actions';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  const initialState = {
    tasks: [],
    filteredTasks: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        RouterTestingModule,
        FormsModule,
        NzTableModule,
        NzInputModule,
        NzButtonModule,
        CommonModule,
      ],
      declarations: [],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadTasks());
  });

  it('should dispatch addTask', () => {
    const task: Task = {
      id: '1',
      title: 'New Task',
      completed: false,
      assignedTo: '',
      description: '',
    };
    const dispatchSpy = spyOn(store, 'dispatch');
    component.addTask(task);
    expect(dispatchSpy).toHaveBeenCalledWith(addTask({ task }));
  });

  it('should dispatch completeTask', () => {
    const taskId = '1';
    const dispatchSpy = spyOn(store, 'dispatch');
    component.completeTask(taskId);
    expect(dispatchSpy).toHaveBeenCalledWith(completeTask({ taskId }));
  });

  it('should dispatch assignTask', () => {
    const taskId = '1';
    const assignedTo = 'John Doe';
    const dispatchSpy = spyOn(store, 'dispatch');
    component.assignTask(taskId, assignedTo);
    expect(dispatchSpy).toHaveBeenCalledWith(
      assignTask({ taskId, assignedTo })
    );
  });
});
