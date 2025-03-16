import { Component, ChangeDetectionStrategy, inject, DestroyRef, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../category/service/category.service';
import { createTaskForm } from '../../../constants/create-task-form';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../service/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs/operators';
import { NgClass } from '@angular/common';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-include-task-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent {

  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly destroy$ = inject(DestroyRef);

  public readonly categories = this.categoryService.categories;
  public readonly newTaskForm = createTaskForm();

  // Sinal para armazenar a pesquisa
  public searchQuery = signal<string>('');

  // Sinal para armazenar a tarefa que está sendo editada
  public editingTaskId = signal<string | null>(null);

  // Computed para controlar o estado do formulário
  public isIncludeTaskFormDisabled = computed(() => {
    if (this.taskService.isLoadingTask()) {
      this.newTaskForm.disable();
      return true;
    }
    this.newTaskForm.enable();
    return false;
  });

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;
    this.categoryService.selectedCategoryId.set(categoryId);
  }

  // Adiciona ou edita uma tarefa
  public onEnterToAddOrEditTask(): void {
    if (this.newTaskForm.invalid) return;
  
    this.taskService.isLoadingTask.set(true);
  
    const formValue = this.newTaskForm.value;
    const title = formValue.title ?? '';
    const categoryId = formValue.categoryId ?? '';
  
    if (this.editingTaskId()) {
      // Atualizar Tarefa
      const updatedTask: Task = {
        id: this.editingTaskId()!,
        title,
        categoryId,
        isCompleted: false
      };
  
      this.taskService.updateTask(updatedTask)
        .pipe(
          finalize(() => {
            this.taskService.isLoadingTask.set(false);
            this.editingTaskId.set(null);
            this.newTaskForm.reset();
          }),
          takeUntilDestroyed(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.taskService.tasks.update(tasks =>
              tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
            );
            this.snackBarConfigHandler('Tarefa atualizada');
          },
          error: error => this.snackBarConfigHandler(error.message)
        });
  
    } else {
      // Criar Nova Tarefa
      const newTask: Partial<Task> = { title, categoryId, isCompleted: false };
  
      this.taskService.createTask(newTask)
        .pipe(
          delay(4000),
          finalize(() => this.taskService.isLoadingTask.set(false)),
          takeUntilDestroyed(this.destroy$)
        )
        .subscribe({
          next: task => {
            // Adiciona a nova tarefa à lista de tarefas
            this.taskService.tasks.update(tasks => [...tasks, task]);
            this.newTaskForm.reset();
          },
          error: error => this.snackBarConfigHandler(error.message),
          complete: () => this.snackBarConfigHandler('Tarefa incluída')
        });
    }
  }


  // Editar uma tarefa
  public editTask(task: Task): void {
    this.editingTaskId.set(task.id);
    this.newTaskForm.patchValue({ title: task.title, categoryId: task.categoryId });
  }

  // Deletar uma tarefa
  public deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId)
      .pipe(
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.taskService.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
          this.snackBarConfigHandler('Tarefa deletada');
        },
        error: error => this.snackBarConfigHandler(error.message)
      });
  }

  // Manipular barra de notificações
  public snackBarConfigHandler(message: string): void {
    this.snackBarService.showSnackBar(message, 4000, 'end', 'top');
  }

  // Filtro de tarefas baseado na pesquisa
  public filteredTasks = computed(() => {
    return this.taskService.tasks().filter(task =>
      task.title.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });
}
