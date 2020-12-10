export class ListTimeSheetVM {
    id: number;
    title: string;
    startDate:string;
    endDate:string;
}

export class ListStatusVM {
    id: number;
    statusName: string;
}


export class CreateTimeSheetVM {
    taskId:number;
    employeeId:number;
    statusId:number;
    title: string;
    comment:string;
    completePercent: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  

}

export class EditTimeSheetVM {
    id: number;
    taskId:number;
    employeeId:number;
    statusId:number;
    title: string;
    comment:string;
    completePercentage: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}