import { FilterPipe } from './filter.pipe';
import { Project } from 'src/app/Models/project';

describe('FilterPipe', () => {
  let testPipe = new FilterPipe(); 
  let searchProps: string[] = ['ProjectName', 'TasksCount', 'StartDate', 'Completed', 'EndDate', 'Priority'];
  let projects: Project[] = [
    { ProjectId: 1, ProjectName: 'Project1',TasksCount: 2,Completed: 2,StartDate: '10/10/2018',EndDate: '11/05/2018',Priority: 1,ProjectManagerId: 1234569,ProjectManagerFullName: 'Test Manager1'},
    { ProjectId: 2, ProjectName: 'Project2',TasksCount: 5,Completed: 7,StartDate: '11/05/2018',EndDate: '11/10/2018',Priority: 2,ProjectManagerId: 1234567,ProjectManagerFullName: 'Test Manager2'},
    { ProjectId: 3, ProjectName: 'Project3',TasksCount: 3,Completed: 9,StartDate: '11/01/2018',EndDate: '11/09/2018',Priority: 3,ProjectManagerId: 1234568,ProjectManagerFullName: 'Test Manager3'}
  ];

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter based on Project', () => {
    let filter: any = 'Project3'
    let expectedResult: any[] = [
      { ProjectId: 3, ProjectName: 'Project3',TasksCount: 3,Completed: 9,StartDate: '11/01/2018',EndDate: '11/09/2018',Priority: 3,ProjectManagerId: 1234568,ProjectManagerFullName: 'Test Manager3'}
    ];
    expect(testPipe.transform(projects, filter, searchProps)).toEqual(expectedResult);
  });

  it('should not filter based on Manager', () => {
    let filter: any = 'Test Manager3'
    let expectedResult: any[] = [];
    expect(testPipe.transform(projects, filter, searchProps)).toEqual(expectedResult);
  });

});

