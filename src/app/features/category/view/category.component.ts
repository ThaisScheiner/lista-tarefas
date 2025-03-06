import { Component, inject, Pipe } from '@angular/core';
import { MainListComponent } from '../components/main-list/main-list.component';
import { ColorsListComponent } from '../components/colors-list/colors-list.component';
import { CategoryService } from '../service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [
    MainListComponent,
    ColorsListComponent,
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  private readonly categoryService = inject(CategoryService);

}
