import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSliderModule, 
  MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { OrderByPipe } from 'src/app/Pipes/order-by.pipe';
import { UserService } from 'src/app/Services/user.service';
import { TaskService } from 'src/app/Services/task.service';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let mockService = jasmine.createSpyObj(['addUser']);
  let taskService = jasmine.createSpyObj(['addTask']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatSliderModule,
        MatDialogModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [
        AddTaskComponent, FilterPipe, OrderByPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockService },
        { provide: TaskService, useValue: taskService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});