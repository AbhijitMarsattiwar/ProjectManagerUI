import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, 
   MatSliderModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './UI/project/add-project/add-project.component';
import { AddTaskComponent } from './UI/task/add-task/add-task.component';
import { ViewTaskComponent } from './UI/task/view-task/view-task.component';
import { EditTaskComponent } from './UI/task/edit-task/edit-task.component';
import { AddUserComponent } from './UI/user/add-user/add-user.component';
import { MessageDialogComponent } from './UI/shared/message-dialog/message-dialog.component';
import { ProjectDialogComponent } from './UI/shared/project-dialog/project-dialog.component';
import { TaskDialogComponent } from './UI/shared/task-dialog/task-dialog.component';
import { UserDialogComponent } from './UI/shared/user-dialog/user-dialog.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { OrderByPipe } from './Pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    AddUserComponent,
    MessageDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent,
    UserDialogComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserDialogComponent, MessageDialogComponent, ProjectDialogComponent, TaskDialogComponent]
})
export class AppModule { }
