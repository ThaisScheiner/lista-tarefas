import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../category/service/category.service';
import { CommonModule } from '@angular/common';
import { categoryIdBackgroundColors } from '../../../category/constants/category-colors';

@Component({
  selector: 'app-inclusion-form',
  imports: [IncludeTaskFormComponent, CommonModule],
  templateUrl: './inclusion-form.component.html',
  styleUrl: './inclusion-form.component.scss'
})
export class InclusionFormComponent {
  
  private readonly categoryService = inject(CategoryService);

  //public readonly taskService = inject(TaskService);

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryIdBackgroundColors;
}
