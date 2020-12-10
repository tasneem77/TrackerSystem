export class ListTaskVM {
    id: number;
    title: string;
    startDate:string;
    endDate:string;
}

export class CreateTaskVM {
    title: string;
    brief:string;
    mileStoneId:number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  

}

export class EditTaskVM {
    id: number;
    projectId:number;
    mileStoneId:number;
    title: string;
    brief:string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}