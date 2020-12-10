export class ListEmployeeVM {
    Id: number;
    Name: string;
    Phone: number;
    // /WhatsApp: string;
    TeamName: string;
    EmpImg: string;
    Email: string

}

export class CreateEmployeeVM {
    Name: String;
    Phone: string;
    WhatsApp: string;
    Dob: Date;
    TeamId: number;
    EmpImg: string;
    Email: string
    Address: string;
}

export class EditEmployeeVM {
    Id: number;
    Name: string;
    Phone: string;
    WhatsApp: string;
    dob: string;
    TeamId: number;
    EmpImg: string;
    Email: string
    Address: string;
}
export class ListProjectEmployeeVM {
    id: number;
    name: string;
    checked:boolean;
}