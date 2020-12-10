export class ListMileStoneVM {
    Id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    startTime: any;
    endTime: any;
}

export class CreateMileStoneVM {
    Title: string;
    Description:string;
    StartDate: string;
    EndDate: string;
    StartTime: any;
    EndTime: any;
    ProjectId:number;
}

export class EditMileStoneVM {
    id: number;
    title: string;
     description:string;
    startDate: string;
    endDate: string;
    startTime: any;
    endTime: any;
    projectId:number;
}

export class TaskMileStoneEmployee {
    milestoneId: number;
    employeeId: number;
    taskId: number;
}


export class ListTaskMileStoneEmployees{
    taskMileStoneEmployeeId: number;
    employeeName: number;
    teamName: number;

}