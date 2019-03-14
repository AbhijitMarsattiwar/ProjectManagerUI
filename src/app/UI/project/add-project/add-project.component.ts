import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserDialogComponent } from '../../shared/user-dialog/user-dialog.component';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';
import { UtilityService } from '../../../Services/utility.service'
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  editMode: Boolean;
  selectedProjId: number;
  selectedMgrId: number;
  srchTerm: string = undefined;
  project: Project;
  searchProps: string[] = ['ProjectName', 'TasksCount', 'StartDate', 'Completed', 'EndDate', 'Priority'];
  projects: Project[];
  userDialogRef: MatDialogRef<UserDialogComponent>;
  msgDialogRef: MatDialogRef<MessageDialogComponent>;
  path: string[] = ['StartDate'];
  order: number = 1; // 1 asc, -1 desc;
  //initializing p to one
  p: number = 1;
  constructor(private formBuilder: FormBuilder
    , private dialog: MatDialog
    , private utility: UtilityService
    , private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.initialize();
    this.loadProjects();
  }

  initialize() {
    this.editMode = false;
    this.selectedMgrId = null;
    this.projectForm = this.formBuilder.group({
      projectName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      dateRequired: new FormControl(false),
      priority: new FormControl(0, Validators.min(1)),
      projectManager: new FormControl('', Validators.required),
      startDate: new FormControl({ value: null, disabled: true }),
      endDate: new FormControl({ value: null, disabled: true })
    });
  }

  get projectName() { return this.projectForm.get('projectName'); }
  get projectManager() { return this.projectForm.get('projectManager'); }
  get startDate() { return this.projectForm.get('startDate'); }
  get endDate() { return this.projectForm.get('endDate'); }
  get dateRequired() { return this.projectForm.get('dateRequired'); }
  get priority() { return this.projectForm.get('priority'); }

  openUserDialog() {
    this.userDialogRef = this.dialog.open(UserDialogComponent, {
      height: '500px', width:'650px' 
    });

    this.userDialogRef.afterClosed().subscribe((selectedUser: User) => {
      if (selectedUser) {
        this.projectForm.patchValue({
          projectManager: selectedUser.FirstName + ' ' + selectedUser.LastName
        });
        this.selectedMgrId = selectedUser.EmployeeId;
      }
    });
  }

  toggleDate() {
    let dateRequired = this.projectForm.value.dateRequired;
    if (!dateRequired) {
      let today = new Date();
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      this.projectForm.patchValue({
        startDate: today,
        endDate: nextDay
      });
      this.projectForm.controls['startDate'].enable();
      this.projectForm.controls['endDate'].enable();
    }
    else {
      this.projectForm.patchValue({
        startDate: null,
        endDate: null
      });
      this.projectForm.controls['startDate'].disable();
      this.projectForm.controls['endDate'].disable();
    }
  }

  addProject(form: NgForm) {
    if (!this.projectForm.valid) { return; }
    if (!this.getFormValuesAndValidate()) { return; }

    this.projectService.addProject(this.project)
      .subscribe(
      response => {
        alert('Project added successfully.');
        this.loadProjects();
        this.reset(form);
      },
      error => {
        alert('An error occurred while adding the project. Please try again later.');
      });
  }

  updateProject(form: NgForm) {
    if (!this.projectForm.valid) { return; }
    if (!this.getFormValuesAndValidate()) { return; }
    this.project.ProjectId = this.selectedProjId;

    this.projectService.updateProject(this.project)
      .subscribe(
      response => {
        alert('Project updated successfully.');
        this.loadProjects();
        this.reset(form);
      },
      error => {
        alert('An error occurred while updating the project. Please try again later.');
      });
  }

  suspendProject(id: number) {
    this.projectService.deleteProject(id)
      .subscribe(
      response => {
        alert('Project suspended successfully.');
        this.loadProjects();
      },
      error => {
        alert('An error occurred while suspending the project. Please try again later.');
      });
  }

  getFormValuesAndValidate(): boolean {
    let projectInput = this.projectForm.value;

    this.project = {
      ProjectName: projectInput.projectName,
      StartDate: this.utility.getStringifiedDate(projectInput.startDate),
      EndDate: this.utility.getStringifiedDate(projectInput.endDate),
      Priority: projectInput.priority,
      ProjectManagerId: this.selectedMgrId,
      ProjectManagerFullName: '',
      Completed: 0,
      ProjectId: 0,
      TasksCount: 0
    }

    if (!this.utility.validate(projectInput.startDate, projectInput.endDate)) {
      this.msgDialogRef = this.dialog.open(MessageDialogComponent, {
        data: { message: 'End date should be greater then Start date' }
      });
      return false;
    }
    return true;
  }

  editProject(project: any) {
    this.selectedProjId = project.ProjectId;
    this.projectForm.patchValue({
      projectName: project.ProjectName,
      projectManager: project.ProjectManagerFullName,
      priority: project.Priority,
    });
    // Enable the date fields if date values are present
    if (project.StartDate) {
      this.projectForm.patchValue({
        dateRequired: true,
        startDate: new Date(project.StartDate),
        endDate: new Date(project.EndDate)
      });
      this.projectForm.controls['startDate'].enable();
      this.projectForm.controls['endDate'].enable();
    }
    this.selectedMgrId = project.ProjectManagerId;
    this.editMode = true;
  }

  loadProjects() {
    this.projectService.getAllProjects()
      .subscribe(
      project => {
        this.projects = project;
      },
      error => {
        alert('An error occurred while retrieving projects.');
      });
  }

  reset(form: NgForm): void {
    form.resetForm();
    this.initialize();
  }

  sortRecords(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1);
    return false;
  }
}