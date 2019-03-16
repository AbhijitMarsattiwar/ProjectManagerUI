import { ParentTask } from './parent-task';
import { Project } from './project';
import { User } from './user';

export class Task {    
    taskId:number;
    taskName:string;
    startDate:Date;
    endDate:Date;
    priority:number;
    isEnded:number;
    parentTask: ParentTask;
    project: Project;
    user: User;
}
