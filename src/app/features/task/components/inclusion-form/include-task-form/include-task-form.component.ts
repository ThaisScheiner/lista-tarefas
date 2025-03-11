import { Component, ChangeDetectionStrategy, inject, DestroyRef, computed } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../category/service/category.service';
import { MatSelectChange } from '@angular/material/select';
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

  public readonly categories = this.categoryService.categories;

  public readonly newTaskForm = createTaskForm();

  //desinscreve do obsevable
  private readonly destroy$ = inject(DestroyRef);

  private readonly snackBarService = inject(SnackBarService);

  //toda vez que o estado do loading mudou, ira habilitar ou desabilitar o form
  public isIncludeTaskFormDisabled = computed(() => {
    //se for true
    if (this.taskService.isLoadingTask()) {
      this.newTaskForm.disable();
      return this.taskService.isLoadingTask();
    }

    this.newTaskForm.enable();
    return this.taskService.isLoadingTask();
  });

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  //inserção
  public onEnterToAddTask(): void {
    if (this.newTaskForm.invalid) return;

    this.taskService.isLoadingTask.set(true);

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService.createTask(newTask)
      .pipe(
        delay(4000),
        finalize(() => this.taskService.isLoadingTask.set(false)), //para desbloquear o form depois de add task
        takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.insertATasksInTheTasksList(task),
        error: error => {
          this.snackBarConfigHandler(error.message);
        },
        complete: () => this.snackBarConfigHandler('Tarefa incluída'),
      });
  }

  public snackBarConfigHandler(message: string): void {
    this.snackBarService.showSnackBar(
      message,
      4000,
      'end',
      'top'
    );
  }
}
