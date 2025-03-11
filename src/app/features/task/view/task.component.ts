import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InclusionFormComponent } from '../components/inclusion-form/inclusion-form.component';
import { TaskListComponent } from '../components/task-list/task-list.component';
@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    InclusionFormComponent,
    TaskListComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

}
