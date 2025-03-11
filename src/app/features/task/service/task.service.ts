import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly _httpClient = inject(HttpClient);

  public tasks = signal<Task[]>([]);

  public numberOfTasks = computed(() => this.tasks().length);

  public readonly _apiUrl = environment.apiUrl;

  //caso o usuario click varias vezes enter 
  public isLoadingTask = signal(false);

  public getTasks(): Observable<Task[]>{
    return this._httpClient.get<Task[]>(`${this._apiUrl}/tasks`).pipe(
      tap(tasks =>{
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public createTask(task: Partial<Task>): Observable<Task>{
    return this._httpClient
      .post<Task>(`${this._apiUrl}/tasks`, task)
  }

  public insertATasksInTheTasksList(newTask: Task): void{
     this.tasks.update(tasks => {
      const newTasksList = [...tasks, newTask];
      return this.getSortedTasks(newTasksList);
    });
  }

  public updateTask(updatedTask: Task): Observable<Task>{
    return this._httpClient.put<Task>(
      `${this._apiUrl}/tasks/${updatedTask.id}`,
      updatedTask
    );  
  }

  //alterar o estado, se esta completado a task
  public updateIsCompletedStatus(taskId: string, isCompleted: boolean): Observable<Task>{
    return this._httpClient.patch<Task>(`${this._apiUrl}/tasks/${taskId}`, {
      isCompleted,
    });
  }


  //atualizar a lista depois de altera-la recebe a tarefa editada
  //remove a tarefa anterior e atualiza a tarefa ja editada
  public updateATasksInTheTasksList(updatedTask: Task): void{
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(
        task => task.id !== updatedTask.id
      );

      //todas as tasks que tem com excessao da que foi alterada
      const updatedTaskList = [...allTasksWithUpdatedTaskRemoved,updatedTask ]

      return this.getSortedTasks(updatedTaskList);
    })
  }

  public deleteTask(taskId: string): Observable<Task>{
    return this._httpClient.delete<Task>(`${this._apiUrl}/tasks/${taskId}`);
  }

  public deleteATasksInTheTasksList(taskId: string): void{
    this.tasks.update(tasks => tasks.filter(task => taskId !== taskId));
  }
  
  //ordena a lista de tarefas após a edição 
  public getSortedTasks(tasks: Task[]): Task[]{
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }

}
