import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
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

@Component({
  selector: 'app-include-task-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent {

  private readonly categoryService = inject(CategoryService);

  private readonly taskService = inject(TaskService);

  public readonly categories = this.categoryService.categories;

  public newTaskForm = createTaskForm();

  //desinscreve do obsevable
  public destroy$ = inject(DestroyRef);

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  //inserção
  public onEnterToAddTask(): void {
    if (this.newTaskForm.invalid) return;

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService.createTask(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.insertATasksInTheTasksList(task),
        error: error => {
          throw new Error(error.message);
        },
        complete: () => alert('Tarefa incluida!'),
      });
  }


}
