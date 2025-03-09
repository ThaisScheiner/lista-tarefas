import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../category/service/category.service';

@Component({
  selector: 'app-inclusion-form',
  imports: [IncludeTaskFormComponent, CommonModule],
  templateUrl: './inclusion-form.component.html',
  styleUrl: './inclusion-form.component.scss'
})
export class InclusionFormComponent {
  
  private readonly categoryService = inject(CategoryService);

  //public readonly taskService = inject(TaskService);

  public get selectedCategoryId(): string {
  const categoryId = this.categoryService.selectedCategoryId();
  console.log('Categoria selecionada:', categoryId);
  return categoryId || 'default';
}

  
  public colorVariants: { [key: string]: string } = {
    'casa': 'bg-green',
    'estudo': 'bg-orange',
    'trabalho': 'bg-blue',
    'pessoal': 'bg-red',
    'saude': 'bg-purple'
  };
  
  

}
