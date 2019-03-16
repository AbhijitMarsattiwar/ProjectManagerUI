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
import { ParentTask } from 'src/app/Models/parent-task';
import { Project } from 'src/app/Models/project';
import { User } from 'src/app/Models/user';

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
  selectedTaskParent: ParentTask;
  parentTask: boolean;
  private sub: any;
  id: number;
  oldTask: Task;
  newTask: Task;
  project: Project;
  user: User;

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
      projectName: this.oldTask.project.projectName,
      taskName: this.oldTask.taskName,
      //parentTaskName: this.oldTask.parentTask.parentTask,
      priority: this.oldTask.priority,
      startDate: new Date(this.oldTask.startDate),
      endDate: new Date(this.oldTask.endDate),
      userName: this.oldTask.user.firstName
    });

    if(this.oldTask.parentTask){
      this.taskForm.patchValue({        
        parentTaskName: this.oldTask.parentTask.parentTask
      });
    }
    this.selectedTaskParent = this.oldTask.parentTask;
    this.project = this.oldTask.project;
    this.user = this.oldTask.user;
  }

  get projectName() { return this.taskForm.get('projectName'); }
  get taskName() { return this.taskForm.get('taskName'); }
  get parentTaskName() { return this.taskForm.get('parentTaskName'); }
  get priority() { return this.taskForm.get('priority'); }
  get startDate() { return this.taskForm.get('startDate'); }
  get endDate() { return this.taskForm.get('endDate'); }
  get userName() { return this.taskForm.get('userName'); }

  openTaskDialog() {
    this.taskDialogRef = this.dialog.open(TaskDialogComponent, { height: '500px', width: '650px' });
    this.taskDialogRef.afterClosed().subscribe((selectedTask: ParentTask) => {
      if (selectedTask) {
        this.taskForm.patchValue({
          parentTaskName: selectedTask.parentTask
        });
        this.selectedTaskParent = selectedTask;
      }
    });
  }

  updateTask() {
    if (!this.taskForm.valid) { return; }
    let taskInput = this.taskForm.value;

    this.newTask = {
      taskName: taskInput.taskName,
      startDate: this.utility.getStringifiedDate(taskInput.startDate),
      endDate: this.utility.getStringifiedDate(taskInput.endDate),
      priority: taskInput.priority,
      //ParentId: this.selectedTaskId,
      //ParentName: '',
      //UserId: this.oldTask.UserId,
      //UserName: '',
      taskId: this.id,
      //ProjectId: this.oldTask.ProjectId,
      //ProjectName: '',
      //TaskStatus: ''
      isEnded: 0,
      parentTask:this.selectedTaskParent,
      project: this.project,
      user: this.user
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
    this.selectedTaskParent = null;
  }

  reset(): void {
    this.loadTask();
  }
}
