export class ListUseRoleVM {
    id: number;
    userName: string;
    email: string;
    roleName: string;
}

 export class RegisterUserVM {
    password: string;
    email: string;
    username: string;
    teamId: number;
}

export class LogInVM {
    password: string;
    email: string;
    userId: number;
}