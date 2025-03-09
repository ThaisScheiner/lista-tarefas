import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-list',
  imports: [CommonModule],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainListComponent {

  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
}
