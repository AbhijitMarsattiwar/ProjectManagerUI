import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserDialogComponent } from '../../shared/user-dialog/user-dialog.component';
import { ProjectDialogComponent } from '../../shared/project-dialog/project-dialog.component';
import { TaskDialogComponent } from '../../shared/task-dialog/task-dialog.component';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { TaskService } from 'src/app/Services/task.service';
import { Task } from 'src/app/Models/task';
import { ParentTask } from 'src/app/Models/parent-task';
import { Project } from 'src/app/Models/project';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  projectDialogRef: MatDialogRef<ProjectDialogComponent>;
  taskDialogRef: MatDialogRef<TaskDialogComponent>;
  userDialogRef: MatDialogRef<UserDialogComponent>;
  msgDialogRef: MatDialogRef<MessageDialogComponent>;
  selectedProjId: number;
  selectedProj: Project;
  selectedTaskId: number;
  selectedTask: ParentTask;
  selectedUserId: number;
  selectedUser: User;
  parentTask: boolean;
  prntTask: ParentTask;
  task: Task;

  constructor(private formBuilder: FormBuilder
    , private dialog: MatDialog
    , private utility: UtilityService
    , private taskService: TaskService
  ) { }

  ngOnInit() {
    this.parentTask = false;
    let today = new Date();
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    this.taskForm = this.formBuilder.group({
      projectName: new FormControl('', Validators.required),
      taskName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      isParentTask: new FormControl(false),
      priority: new FormControl(0, Validators.min(1)),
      parentTaskName: new FormControl(''),
      startDate: new FormControl(today),
      endDate: new FormControl(nextDay),
      userName: new FormControl('', Validators.required)
    });
  }

  get projectName() { return this.taskForm.get('projectName'); }
  get taskName() { return this.taskForm.get('taskName'); }
  get isParentTask() { return this.taskForm.get('isParentTask'); }
  get parentTaskName() { return this.taskForm.get('parentTaskName'); }
  get priority() { return this.taskForm.get('priority'); }
  get startDate() { return this.taskForm.get('startDate'); }
  get endDate() { return this.taskForm.get('endDate'); }
  get userName() { return this.taskForm.get('userName'); }

  openProjectDialog() {
    this.projectDialogRef = this.dialog.open(ProjectDialogComponent, { height: '500px', width: '700px' });

    this.projectDialogRef.afterClosed().subscribe((selectedProj: Project) => {
      if (selectedProj) {
        this.taskForm.patchValue({
          projectName: selectedProj.projectName
        });
        this.selectedProjId = selectedProj.projectId;
        this.selectedProj = selectedProj
      }
    });
  }

  openTaskDialog() {
    this.taskDialogRef = this.dialog.open(TaskDialogComponent, { height: '500px', width: '650px' });

    this.taskDialogRef.afterClosed().subscribe((selectedTask: ParentTask) => {
      if (selectedTask) {
        this.taskForm.patchValue({
          parentTaskName: selectedTask.parentTask
        });
        this.selectedTaskId = selectedTask.parentId;
        this.selectedTask = selectedTask;
      }
    });
  }

  openUserDialog() {
    this.userDialogRef = this.dialog.open(UserDialogComponent, { height: '500px', width: '650px' });

    this.userDialogRef.afterClosed().subscribe((selectedUser: User) => {
      if (selectedUser) {
        this.taskForm.patchValue({
          userName: selectedUser.firstName + ' ' + selectedUser.lastName
        });
        this.selectedUserId = selectedUser.empId;
        this.selectedUser = selectedUser;
      }
    });
  }

  handleParentTask() {
    this.parentTask = !this.parentTask;
    let isParentTask = this.taskForm.value.isParentTask;
    if (!isParentTask) {
      this.taskForm.patchValue({
        projectName: '',
        priority: 0,
        parentTaskName: '',
        startDate: null,
        endDate: null,
        userName: ''
      });
      this.taskForm.controls['projectName'].disable();
      this.taskForm.controls['priority'].disable();
      this.taskForm.controls['parentTaskName'].disable();
      this.taskForm.controls['startDate'].disable();
      this.taskForm.controls['endDate'].disable();
      this.taskForm.controls['userName'].disable();
    }
    else {
      let today = new Date();
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      this.taskForm.patchValue({
        startDate: new Date(today),
        endDate: new Date(nextDay)
      });
      this.taskForm.controls['projectName'].enable();
      this.taskForm.controls['priority'].enable();
      this.taskForm.controls['parentTaskName'].enable();
      this.taskForm.controls['startDate'].enable();
      this.taskForm.controls['endDate'].enable();
      this.taskForm.controls['userName'].enable();
    }
  }

  addTask(form: NgForm) {
    if (!this.taskForm.valid) { return; }
    let taskInput = this.taskForm.value;
    console.log(this.taskForm.value);

    if (this.parentTask) {
      this.prntTask = {
        parentTask: taskInput.taskName,
        parentId: null
      }

      this.taskService.addParentTask(this.prntTask)
        .subscribe(
        response => {
          alert('Parent task added successfully.');
          this.reset(form);
        },
        error => {
          alert('An error occurred while adding the parent task. Please try again later.');
        });
    }
    else {
      this.task = {
        //ProjectId: this.selectedProjId,
        project: this.selectedProj,
        taskName: taskInput.taskName,
        startDate: this.utility.getStringifiedDate(taskInput.startDate),
        endDate: this.utility.getStringifiedDate(taskInput.endDate),
        priority: taskInput.priority,
        //parentId: this.selectedTaskId,
        parentTask: this.selectedTask,
        //UserId: this.selectedUserId,
        user: this.selectedUser,
        //ParentName: '',
        //ProjectName: '',
        taskId: null,
        isEnded: 0,
        //UserName: ''
      }

      if (!this.utility.validate(taskInput.startDate, taskInput.endDate)) {
        this.msgDialogRef = this.dialog.open(MessageDialogComponent, {
          data: { message: 'End date should be greater then Start date' }
        });
        return;
      }

      this.taskService.addTask(this.task)
        .subscribe(
        response => {
          alert('Task added successfully.');
          this.reset(form);
        },
        error => {
          alert('An error occurred while adding the task. Please try again later.');
        });
    }
  }

  clearParentTask() {
    this.taskForm.patchValue({
      parentTaskName: ''
    });
    this.selectedTaskId = null;
    this.selectedTask = null;
  }

  reset(form: NgForm): void {
    form.resetForm();
    this.taskForm.controls['projectName'].enable();
    this.taskForm.controls['priority'].enable();
    this.taskForm.controls['parentTaskName'].enable();
    this.taskForm.controls['startDate'].enable();
    this.taskForm.controls['endDate'].enable();
    this.taskForm.controls['userName'].enable();
    this.ngOnInit();
  }
}
