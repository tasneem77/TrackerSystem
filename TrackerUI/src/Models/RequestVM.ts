export class ListRequestVM {
    id: number;
    subject: string;
    periorityName: string;
    periorityId: number;
    urgentId: number;
    started: Date;
}

export class ListRequestDetailVM {
    id: number;
    title: string;
    statusName: string;

    plannedStartDateTime: string;
    actualStartDateTime: string;

    plannedEndDateTime: string;
    actualEndDateTime: string;

    reqCode: string;
}


export class ListRequestVM2 {
    date: string;
    title: string;
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
export class ListOrganizationVM {
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
export class ListRequestSubCategoryVM {
    id: number;
    name: string;
}


export class RadioButtonListItems {
    id: string;
    Name: string;
}
export class CreateRequestVM {
    subject: string;
    note: string;
    description: string;
    createdDate: string;
    createdTime: string;
    started: string;
    ended: string;
    requestTypeId: number;
    requestStatusId: number;
    requestModeId: number;
    requestLevelId: number;
    impactId: number;
    periorityId: number;
    categoryId: number;
    clientId: number;
    projectId: number;
    organizationId: number;
    subCategoryId: number;
}

export class EditRequestVM {
    id: number;
    subject: string;
    note: string;
    description: string;
    createdDate: string;
    createdTime: string;
    started: string;
    ended: string;
    requestTypeId: number;
    requestStatusId: number;
    requestModeId: number;
    requestLevelId: number;
    impactId: number;
    periorityId: number;
    categoryId: number;
    clientId: number;
    projectId: number;
    organizationId: number;
    subCategoryId: number;
    reqCode: string;
}
export class CreateRequestDetailVM {
    requestId: number;
    statusId: number;
    loggedId:number;
    plannedStartDate: string;
    plannedStartTime: string;
    plannedEndDate: string;
    plannedEndTime: string;
    actualStartDate: string;
    actualStartTime: string;
    actualEndDate: string;
    actualEndTime: string;
    title: string;
    description: string;
    actualStarted: string;
    actualEnded: string;
    plannedStarted: string;
    plannedEnded: string;
    fromEmpId:number;
    toEmpId:number;
}



export class RequestCalendarVM {
    id: number;
    title: string;
    allDay: boolean;
    start: string;
    end: string;
    color: string;
    textColor: string;
}


export class RequestDetailCalendarVM {
    id: number;
    title: string;
    allDay: boolean;
    start: string;
    end: string;
    color: string;
    textColor: string;
}

export class RequestDateVM {
    startDate: string;
    endDate: string;
}