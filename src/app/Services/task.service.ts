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

  getParentTasksUrl: string = `${environment.apiBaseUrl}/task/getparenttasks`;
  createParentTaskUrl: string = `${environment.apiBaseUrl}/task/createparenttask`;

  getAllTasksUrl: string = `${environment.apiBaseUrl}/task/getalltasks`;
  getTaskByIdUrl: string = `${environment.apiBaseUrl}/task/gettaskbyid`;
  addTaskUrl: string = `${environment.apiBaseUrl}/task/create`;
  updateTaskUrl: string = `${environment.apiBaseUrl}/task/update`;
  endTaskUrl: string = `${environment.apiBaseUrl}/task/endtask`;

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

  getAllTasks(id: number):  Observable<Task[]> {
    return this.http.get<Task[]>(`${this.getAllTasksUrl}/?projectId=${id}`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.getTaskByIdUrl}/?taskId=${id}`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addTask(task: Task): Observable<ParentTask> {
    return this.http.post<ParentTask>(this.addTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.updateTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  endTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.endTaskUrl}/?taskId=${id}`, null)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

}
