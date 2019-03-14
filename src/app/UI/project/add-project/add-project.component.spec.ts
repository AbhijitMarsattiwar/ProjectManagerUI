import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProjectComponent } from './add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSliderModule, 
  MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { OrderByPipe } from 'src/app/Pipes/order-by.pipe';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let mockService = jasmine.createSpyObj(['addProject']);

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
        AddProjectComponent, FilterPipe, OrderByPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProjectService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
