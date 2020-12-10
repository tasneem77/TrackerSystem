export class ListProblemVM {
    id: number;
    title: string;
    dueDate:string;
}

export class ListRequestTypeStatusVM {
    id: number;
    name: string;
}
export class ListRequestTypeVM {
    id: number;
    name: string;
}
export class ListUrgentVM {
    id: number;
    name: string;
}
export class ListPeriorityVM {
    id: number;
    name: string;
}

export class ListRequestLevelVM {
    id: number;
    name: string;
}

export class ListRequestModeVM {
    id: number;
    name: string;
}

export class ListRequestImpactVM {
    id: number;
    name: string;
}

export class ListRequestCategoryVM {
    id: number;
    name: string;
}



export class CreateProblemVM {
    title:string;
    description: string;
    dueDate:string;
    closedDate:string;
    requestTypeId:number;
    requestStatusId:number;
    requestModeId:number;
    requestLevelId:number;
    urgencyId:number;
    impactId:number;
    periorityId:number;
    categoryId:number;
    clientId:number;
}

export class EditProblemVM {
    id: number;
    title:string;
    dueDate:string;
    closedDate:string;
    description: string;
    requestTypeId:number;
    requestStatusId:number;
    requestModeId:number;
    requestLevelId:number;
    urgencyId:number;
    impactId:number;
    periorityId:number;
    categoryId:number;
    clientId:number;
}
