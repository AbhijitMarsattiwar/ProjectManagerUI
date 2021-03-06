import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectDialogComponent } from 'src/app/UI/shared/project-dialog/project-dialog.component';
import { Task } from 'src/app/Models/task';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';
import { Project } from 'src/app/Models/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  projectDialogRef: MatDialogRef<ProjectDialogComponent>;
  selectedProj: string;
  selectedProjId: number;
  tasks: Task[];
  path: string[] = ['startDate'];
  order: number = 1; // 1 asc, -1 desc;
  loading: boolean;
  //initializing p to one
  p: number = 1;
  constructor(private dialog: MatDialog
    , private router: Router
    , private taskService: TaskService
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  openProjectDialog() {
    this.projectDialogRef = this.dialog.open(ProjectDialogComponent,{ height: '500px', width: '700px'  });

    this.projectDialogRef.afterClosed().subscribe((selectedProj: Project) => {
      if (selectedProj) {
        this.selectedProj = selectedProj.projectName;
        this.selectedProjId = selectedProj.projectId;
        this.loadTasksForProject();
      }
    });
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getAllTasks()
      .subscribe(
      task => {
        this.tasks = task;
        this.loading = false;
      },
      error => {
        alert('An error occurred while retrieving tasks.');
        this.loading = false;
      });
  }

  loadTasksForProject() {
    this.loading = true;
    console.log(this.selectedProjId);
    this.taskService.getAllTasksByProject(this.selectedProjId)
      .subscribe(
      task => {
        this.tasks = task;
        this.loading = false;
      },
      error => {
        alert('An error occurred while retrieving tasks.');
        this.loading = false;
      });
  }

  endTask(task: Task) {
    task.isEnded = 1;
    this.taskService.endTask(task)
      .subscribe(
      response => {
        alert('Task completed successfully.');
        this.loadTasks();
      },
      error => {
        alert('An error occurred while updating the task. Please try again later.');
      });
  }

  sortRecords(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1);
    return false;
  }
}
