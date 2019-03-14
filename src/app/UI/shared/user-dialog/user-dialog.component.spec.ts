import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDialogComponent } from './user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { APP_BASE_HREF } from '@angular/common';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let mockService = jasmine.createSpyObj(['getAllUsers']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [
        UserDialogComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});