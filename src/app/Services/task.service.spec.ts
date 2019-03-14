import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from './task.service';
import { Task } from "../Models/task";
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let taskService: TaskService;
  let MockTasks: Task[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    taskService = TestBed.get(TaskService);

    MockTasks = [
      { TaskId: 1, TaskName: "Task1", ParentId: 1, ParentName: "PTask1", Priority: 2, StartDate: "10/01/2018", EndDate: "11/15/2018", ProjectId: 1, ProjectName: "Project1", UserId: 1234567, UserName: "Test User1", TaskStatus: "A" },
      { TaskId: 2, TaskName: "Task2", ParentId: 1, ParentName: "PTask1", Priority: 3, StartDate: "10/16/2018", EndDate: "10/30/2018", ProjectId: 1, ProjectName: "Project1", UserId: 1234568, UserName: "Test User2", TaskStatus: "A" },
      { TaskId: 3, TaskName: "Task3", ParentId: 2, ParentName: "PTask2", Priority: 4, StartDate: "10/01/2018", EndDate: "10/15/2018", ProjectId: 1, ProjectName: "Project1", UserId: 1234569, UserName: "Test User3", TaskStatus: "C" },
      { TaskId: 4, TaskName: "Task4", ParentId: 2, ParentName: "PTask2", Priority: 5, StartDate: "10/16/2018", EndDate: "10/31/2018", ProjectId: 1, ProjectName: "Project1", UserId: 1234570, UserName: "Test User4", TaskStatus: "A" },
      { TaskId: 5, TaskName: "Task5", ParentId: 3, ParentName: "PTask3", Priority: 6, StartDate: "11/01/2018", EndDate: "11/30/2018", ProjectId: 2, ProjectName: "Project2", UserId: 1234571, UserName: "Test User5", TaskStatus: "A" }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getTasks ', () => {
    let expectedTasks: Task[];

    beforeEach(() => {
      taskService = TestBed.get(TaskService);
      expectedTasks = MockTasks;
    });

    it('should get all Tasks', () => {

      let projectId = 3;
      taskService.getAllTasks(projectId).subscribe(
        tasks => expect(tasks).toEqual(expectedTasks, 'should get all Tasks'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getAllTasksUrl + '/?projectId=' + projectId);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTasks);
    });

    it('should get empty Tasks', () => {
      let projectId = 3;
      taskService.getAllTasks(projectId).subscribe(
        tasks => expect(tasks.length).toEqual(0, 'should work with empty Tasks'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getAllTasksUrl + '/?projectId=' + projectId);
      req.flush([]); 
    });

    it('should get a specific Task', () => {
      const taskId: number = 2;
      let expectedTask = MockTasks[taskId - 1];

      taskService.getTaskById(taskId).subscribe(
        task => expect(task).toEqual(expectedTask, 'should get expected Task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getTaskByIdUrl + '/?taskId=' + taskId);      
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTask);
    });
  });

  describe('#updateTask', () => {
    it('should be able to update a Task', () => {

      const task: Task = MockTasks[0];

      taskService.updateTask(task).subscribe(
        data => expect(data).toEqual(task, 'should update and return the Task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.updateTaskUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });

  describe('#endTask', () => {

    it('should be able to complete a Task', () => {

      const taskId: number = 2;

      const expectedTask: Task = MockTasks[2];

      taskService.endTask(taskId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(taskService.endTaskUrl + '/?taskId=' + taskId);
      expect(req.request.method).toEqual('PUT');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addTask', () => {

    it('should not create without mandatory fields', () => {
      const task: Task = MockTasks[0];
      expect(task.ProjectId).toBeDefined();
      expect(task.TaskName).toBeDefined();
      expect(task.Priority).toBeDefined();
      expect(task.UserId).toBeDefined();      
    });

    it('should be able to create a Task', () => {

      const task: Task = MockTasks[1];

      taskService.addTask(task).subscribe(
        data => expect(data).toEqual(task, 'should add and return the Task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.addTaskUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });
});
