import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CategoryService } from '../../../../category/service/category.service';
import { MatSelectChange } from '@angular/material/select';

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
  
    public readonly categories = this.categoryService.categories;
    
    public selectionChangeHandler(event: MatSelectChange): void{
      const categoryId = event.value;

      this.categoryService.selectedCategoryId.set(categoryId);
    }
}
