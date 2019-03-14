import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskService } from 'src/app/Services/task.service';
import { APP_BASE_HREF } from '@angular/common';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let mockService = jasmine.createSpyObj(['getParentTasks']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [
        TaskDialogComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
