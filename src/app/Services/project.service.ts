import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/Models/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getAllProjectsUrl: string = `${environment.apiBaseUrl}/project/getallprojects`;
  addProjectUrl: string = `${environment.apiBaseUrl}/project/create`;
  updateProjectUrl: string = `${environment.apiBaseUrl}/project/update`;
  deleteProjectUrl: string = `${environment.apiBaseUrl}/project/suspend`;

  constructor(private http: HttpClient) { }

  getAllProjects():  Observable<Project[]> {
    return this.http.get<Project[]>(this.getAllProjectsUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.addProjectUrl, project)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.updateProjectUrl, project)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  deleteProject(id: number): Observable<Project> {
    let url = `${this.deleteProjectUrl}/?projectId=${id}`;
    return this.http.delete<Project>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }
}
