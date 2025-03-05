import { Component } from '@angular/core';
import { CategoryComponent } from '../../features/category/view/category.component';
import {MatDividerModule} from '@angular/material/divider';
import { TaskComponent } from '../../features/task/task.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, MatDividerModule, TaskComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
