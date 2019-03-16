import { User } from './user';

export class Project {
    projectId: number;
    projectName: string;    
    //completed: string = 'NO';
    startDate: string;
    endDate: string;
    priority: number;

    //tasksCount: number =0;
    //projectManagerId: number;
    //projectManagerFullName: string;
    user: User;
}
