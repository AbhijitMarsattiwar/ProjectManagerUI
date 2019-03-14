import { Component, OnInit } from '@angular/core';
import { ParentTask } from '../../../Models/parent-task';
import { MatDialogRef } from '@angular/material';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  tasks: ParentTask[];
  srchTerm: string = undefined;
  p: number = 1;
  constructor(private dialogRef: MatDialogRef<TaskDialogComponent>
    , private taskService: TaskService
  ) { }

  ngOnInit() {
    this.loadParentTasks();
  }

  loadParentTasks() {
    this.taskService.getParentTasks()
      .subscribe(
      task => {
        this.tasks = task;
      },
      error => {
        alert('An error occurred while retrieving users.');
      });
  }

  close(task: ParentTask) {
    this.dialogRef.close(task);
  }
}
