import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSliderModule, 
  MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { OrderByPipe } from 'src/app/Pipes/order-by.pipe';
import { UserService } from 'src/app/Services/user.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let mockService = jasmine.createSpyObj(['addUser']);

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
        AddUserComponent, FilterPipe, OrderByPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockService },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
