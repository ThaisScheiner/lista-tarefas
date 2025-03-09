import { Component, inject } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { categoryBackgroundColors } from '../../constants/category-colors';

@Component({
  selector: 'app-colors-list',
  imports: [
        MatDividerModule,
        CommonModule
      ],
  templateUrl: './colors-list.component.html',
  styleUrl: './colors-list.component.scss'
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;

  public categoryBackgroundColors = categoryBackgroundColors;

}
