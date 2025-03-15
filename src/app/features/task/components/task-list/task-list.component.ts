import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AsyncPipe } from '@angular/common';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';
import { MatIconModule } from '@angular/material/icon';
import { IncludeTaskFormComponent } from '../inclusion-form/include-task-form/include-task-form.component';

@Component({
  selector: 'app-task-list',
  imports: [
    AsyncPipe,
    NoTasksComponent,
    MatIconModule,
    IncludeTaskFormComponent
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

private readonly taskService = inject(TaskService);


  // Sinal para armazenar a pesquisa
  public searchQuery = signal<string>('');
  

  // Filtro de tarefas baseado na pesquisa
    public filteredTasks = computed(() => {
      return this.taskService.tasks().filter(task =>
        task.title.toLowerCase().includes(this.searchQuery().toLowerCase())
      );
    });
}
