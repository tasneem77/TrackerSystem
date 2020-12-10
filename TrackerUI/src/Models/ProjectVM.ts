export class ListProjectVM {
    Id: number;
    Name: string;
    Discription: string;
    StartDate: Date;
    EndDate: Date;
    StartTime: any;
    EndTime: any;
    Stackholders: string;
}

export class CreateProjectVM {
    Name: string;
    StartDate: string;
    EndDate: string;
    // StartTime: string;
    // EndTime: string;
    Discription: string;
    StakeHolderName: string;
    ClientId: number;
    OrganizationId: number;



    Title: string;
    Description:string;
    MSStartDate: string;
    MSEndDate: string;
    MileStartTime: any;
    MSEndTime: any;
    ProjectId:number;
}

export class EditProjectVM {
    id: number;
    name: string;
    discription: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    StakeHolderName: string;



    Title: string;
    Description:string;
    MSStartDate: string;
    MSEndDate: string;
    MileStartTime: any;
    MSEndTime: any;
    ProjectId:number;
}


export class DetailProjectVM {
    id: number;
    name: string;
    discription: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    clientName: string;
    organizationName: string;
}

export class ProjectVM {
    id: number;
    name: string;
    discription: string;
    startDate: Date;
    endDate: Date;
    startTime: any;
    endTime: any;
    stackholders: string;
}

export class ProjectTeamEmployee {
    teamId: number;
    employeeId: number;
    projectId: number;
    ptePositionId: number;
    isActive: boolean;
}


export class ProjectStakeHolder {
    projectId: number;
    SHId: number;
}

export class ListProjectTeamEmployee {
    projectTeamEmployeeId: number;
    employeeName: number;
    teamName: number;
    isActive: boolean;
}

export class ListProjectMileStones {
    Title: string;
    Description:string;
    StartDate: string;
    EndDate: string;
    StartTime: any;
    EndTime: any;
    ProjectId:number;
}


export class ListProjectStakeHolder {
    id: string;
    pshName: String;
}