import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDialogComponent } from './project-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { APP_BASE_HREF } from '@angular/common';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('ProjectDialogComponent', () => {
  let component: ProjectDialogComponent;
  let fixture: ComponentFixture<ProjectDialogComponent>;
  let mockService = jasmine.createSpyObj(['getAllProjects']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [
        ProjectDialogComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProjectService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(ProjectDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
