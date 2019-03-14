import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Project } from "../Models/project";
import { HttpClientModule } from '@angular/common/http';

describe('projectService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let projectService: ProjectService;
  let MockProjects: Project[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    projectService = TestBed.get(ProjectService);

    MockProjects = [
      { ProjectId: 1, ProjectName: 'Project1',TasksCount: 2,Completed: 2,StartDate: '10/10/2018',EndDate: '11/05/2018',Priority: 1,ProjectManagerId: 1234569,ProjectManagerFullName: 'Test Manager1'},
      { ProjectId: 2, ProjectName: 'Project2',TasksCount: 5,Completed: 7,StartDate: '11/05/2018',EndDate: '11/10/2018',Priority: 2,ProjectManagerId: 1234567,ProjectManagerFullName: 'Test Manager2'},
      { ProjectId: 3, ProjectName: 'Project3',TasksCount: 3,Completed: 9,StartDate: '11/01/2018',EndDate: '11/09/2018',Priority: 3,ProjectManagerId: 1234568,ProjectManagerFullName: 'Test Manager3'}
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getProjects ', () => {
    let expectedProjects: Project[];

    beforeEach(() => {
      projectService = TestBed.get(ProjectService);
      expectedProjects = MockProjects;
    });

    it('should get all Projects', () => {
      projectService.getAllProjects().subscribe(
        projects => expect(projects).toEqual(expectedProjects, 'should get all Projects'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.getAllProjectsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedProjects);
    });

    it('should get empty Projects', () => {
      projectService.getAllProjects().subscribe(
        projects => expect(projects.length).toEqual(0, 'should work with empty Projects'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.getAllProjectsUrl);
      req.flush([]);
    });

  });

  describe('#updateProject', () => {
    it('should be able to update a Project', () => {

      const project: Project = MockProjects[0];

      projectService.updateProject(project).subscribe(
        data => expect(data).toEqual(project, 'should update and return the Project'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.updateProjectUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(project);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: project });
      req.event(expectedResponse);
    });
  });

  describe('#suspendProject', () => {

    it('should be able to delete a Project', () => {

      const projectId: number = 2;

      projectService.deleteProject(projectId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(projectService.deleteProjectUrl + '/?projectId=' + projectId);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addProject', () => {
    it('should not create without mandatory fields', () => {
      const project: Project = MockProjects[1];
      expect(project.ProjectName).toBeDefined();
      expect(project.Priority).toBeDefined();
      expect(project.ProjectManagerId).toBeDefined();
  });

  it('should be able to create a Project', () => {
      const project: Project = MockProjects[1];

      projectService.addProject(project).subscribe(
        data => expect(data).toEqual(project, 'should add and return the Project'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.addProjectUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(project);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: project });
      req.event(expectedResponse);
  });  
});
});