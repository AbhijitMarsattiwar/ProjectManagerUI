import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/Models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ParentTask } from 'src/app/Models/parent-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getParentTasksUrl: string = `${environment.apiBaseUrl}/parentTasks`;
  createParentTaskUrl: string = `${environment.apiBaseUrl}/addParentTask`;
  getAllTasksUrl: string = `${environment.apiBaseUrl}/tasks`;
  getAllTasksForProjectUrl: string = `${environment.apiBaseUrl}/tasks/projects/`;
  endTaskUrl: string = `${environment.apiBaseUrl}/tasks/`;
  addTaskUrl: string = `${environment.apiBaseUrl}/addTask`;

  getTaskByIdUrl: string = `${environment.apiBaseUrl}/tasks/`;
  updateTaskUrl: string = `${environment.apiBaseUrl}/tasks/`;

  constructor(private http: HttpClient) { }

  getParentTasks():  Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.getParentTasksUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addParentTask(task: ParentTask): Observable<ParentTask> {
    return this.http.post<ParentTask>(this.createParentTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  getAllTasksByProject(id: number):  Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasksForProjectUrl + id)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  getAllTasks():Observable<any>{    
    return this.http.get<Task[]>(this.getAllTasksUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(this.getTaskByIdUrl+taskId)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.addTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.updateTaskUrl+task.taskId, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  endTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.endTaskUrl+'/'+task.taskId,task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

}
