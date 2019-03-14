import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  users: User[];
  srchTerm: string = undefined;
  p: number = 1;
  
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>
    , private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers()
      .subscribe(
      user => {
        this.users = user;
      },
      error => {
        alert('An error occurred while retrieving users.');
      });
  }

  close(user: User) {
    this.dialogRef.close(user);
  }
}

