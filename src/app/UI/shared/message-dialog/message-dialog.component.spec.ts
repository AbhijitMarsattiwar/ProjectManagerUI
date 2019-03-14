import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageDialogComponent } from './message-dialog.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule
      ],
      declarations: [
        MessageDialogComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});