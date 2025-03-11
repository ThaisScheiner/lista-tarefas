import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AsyncPipe } from '@angular/common';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';

@Component({
  selector: 'app-task-list',
  imports: [
    AsyncPipe,
    NoTasksComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TaskService);

  public tasks$ = this.tasksService.getTasks();
  
  public tasks = this.tasksService.tasks;

  public numberOfTasks = this.tasksService.numberOfTasks;
}
