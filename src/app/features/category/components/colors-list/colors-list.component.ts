import { Component, inject } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';

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

  getColor(color: string): string {
    const colorMap: { [key: string]: string } = {
      red: "#dc2626",
      blue: "#2563eb",
      green: "#16a34a",
      orange: "#EA580C",
      purple: "#9333EA"
    };

    return colorMap[color] || "#000"; // Retorna preto se a cor não existir
  }

}
