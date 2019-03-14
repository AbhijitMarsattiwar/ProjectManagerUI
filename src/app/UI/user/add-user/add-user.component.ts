import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../Services/user.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  editMode: Boolean;
  user: User;
  users: User[];
  srchTerm: string = undefined;
 //initializing p to one
 p: number = 1;
  // For sorting
  path: string[] = ['EmployeeId'];
  order: number = 1; // 1 asc, -1 desc;

  constructor(private formBuilder: FormBuilder
    , private userService: UserService
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.loadUsers();
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl('', Validators.required),
      employeeId: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(7)]
      })
    });
  }

  // Form properties
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get employeeId() { return this.userForm.get('employeeId'); }

  sortRecords(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1);
    return false;
  }

  addUser(form: NgForm) {
    if (!this.userForm.valid) { return; }
    this.getFormValues();

    if (!this.validate(this.user.EmployeeId)) {
      alert('The Employee id already exists.');
      return;
    }

    this.userService.addUser(this.user)
      .subscribe(
      response => {
        alert('User added successfully.');
        this.loadUsers();
        this.reset(form);
      },
      error => {
        alert('An error occurred while adding the user. Please try again later.');
      });
  }

  updateUser(form: NgForm) {
    if (!this.userForm.valid) { return; }
    this.getFormValues();
    this.userService.updateUser(this.user)
      .subscribe(
      response => {
        alert('User updated successfully.');
        this.loadUsers();
        this.reset(form);
      },
      error => {
        alert('An error occurred while updating the user. Please try again later.');
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
      response => {
        alert('User deleted successfully.');
        this.loadUsers();
      },
      error => {
        alert('An error occurred while deleting the user. Please try again later.');
      });
  }

  getFormValues() {
    var userDetail = this.userForm.getRawValue();
    this.user = {
      EmployeeId: userDetail.employeeId,
      FirstName: userDetail.firstName,
      LastName: userDetail.lastName
    }
  }

  loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        user => {
          this.users = user;
        },
        error => {
          alert('An error occurred while retrieving users.');
        });
  }

  validate(employeeId: number) {
    var isIdTaken = this.users.some(function(el){ return el.EmployeeId == employeeId});
    return !isIdTaken;
  }
  
  reset(form: NgForm): void {
    form.resetForm();
    this.userForm.controls['employeeId'].enable();
    this.editMode = false;
  }

  editUser(user: User) {
    this.userForm.patchValue({
      firstName: user.FirstName,
      lastName: user.LastName,
      employeeId: user.EmployeeId
    });
    this.userForm.controls['employeeId'].disable();
    this.editMode = true;
  }
}