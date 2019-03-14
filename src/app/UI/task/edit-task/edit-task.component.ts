import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TaskDialogComponent } from '../../shared/task-dialog/task-dialog.component';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Task } from 'src/app/Models/task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  //task description, priority, change/remove parent task, start date, end date

  taskForm: FormGroup;
  taskDialogRef: MatDialogRef<TaskDialogComponent>;
  msgDialogRef: MatDialogRef<MessageDialogComponent>;
  selectedTaskId: number;
  parentTask: boolean;
  private sub: any;
  id: number;
  oldTask: Task;
  newTask: Task;

  constructor(private formBuilder: FormBuilder
    , private dialog: MatDialog
    , private utility: UtilityService
    , private route: ActivatedRoute
    , private router: Router
    , private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      projectName: new FormControl(''),
      taskName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      priority: new FormControl(0, Validators.min(1)),
      parentTaskName: new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      userName: new FormControl('')
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadTask();
    });
  }

  loadTask() {

    this.taskService.getTaskById(this.id)
      .subscribe(
      task => {
        this.oldTask = task;
        this.initializeForm();
      },
      error => {
        alert('An error occurred while retrieving task.');
      });
  }

  initializeForm() {
    this.taskForm.patchValue({
      projectName: this.oldTask.ProjectName,
      taskName: this.oldTask.TaskName,
      parentTaskName: this.oldTask.ParentName,
      priority: this.oldTask.Priority,
      startDate: new Date(this.oldTask.StartDate),
      endDate: new Date(this.oldTask.EndDate),
      userName: this.oldTask.UserName
    });
    this.selectedTaskId = this.oldTask.ParentId;
  }

  get projectName() { return this.taskForm.get('projectName'); }
  get taskName() { return this.taskForm.get('taskName'); }
  get parentTaskName() { return this.taskForm.get('parentTaskName'); }
  get priority() { return this.taskForm.get('priority'); }
  get startDate() { return this.taskForm.get('startDate'); }
  get endDate() { return this.taskForm.get('endDate'); }
  get userName() { return this.taskForm.get('userName'); }

  openTaskDialog() {
    this.taskDialogRef = this.dialog.open(TaskDialogComponent, { height: '500px' });

    this.taskDialogRef.afterClosed().subscribe((selectedTask: any) => {
      if (selectedTask) {
        this.taskForm.patchValue({
          parentTaskName: selectedTask.TaskName
        });
        this.selectedTaskId = selectedTask.TaskId;
      }
    });
  }

  updateTask() {
    if (!this.taskForm.valid) { return; }
    let taskInput = this.taskForm.value;

    this.newTask = {
      TaskName: taskInput.taskName,
      StartDate: this.utility.getStringifiedDate(taskInput.startDate),
      EndDate: this.utility.getStringifiedDate(taskInput.endDate),
      Priority: taskInput.priority,
      ParentId: this.selectedTaskId,
      ParentName: '',
      UserId: this.oldTask.UserId,
      UserName: '',
      TaskId: this.id,
      ProjectId: this.oldTask.ProjectId,
      ProjectName: '',
      TaskStatus: ''
    }

    if (!this.utility.validate(taskInput.startDate, taskInput.endDate)) {
      this.msgDialogRef = this.dialog.open(MessageDialogComponent, {
        data: { message: 'End date should be greater then Start date' }
      });
      return;
    }

    this.taskService.updateTask(this.newTask)
      .subscribe(
      response => {
        alert('Task updated successfully.');
        this.router.navigateByUrl('/viewTask');
      },
      error => {
        alert('An error occurred while updating the task. Please try again later.');
      });

  }

  clearParentTask() {
    this.taskForm.patchValue({
      parentTaskName: ''
    });
    this.selectedTaskId = null;
  }

  reset(): void {
    this.loadTask();
  }
}
