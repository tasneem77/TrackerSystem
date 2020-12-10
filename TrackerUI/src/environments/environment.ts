// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,


  CountProjects: 'http://localhost:49773/api/Project/CountProjects/',
  CountRequests: 'http://localhost:49773/api/TechRequest/CountRequests/',
  CountEmployees: 'http://localhost:49773/api/Employee/CountEmployees',


  ListProjects: 'http://localhost:49773/api/Project/ListProjects/',
  GetProjectDetailById: 'http://localhost:49773/api/Project/GetProjectDetailById/',
  GetProjectById: 'http://localhost:49773/api/Project/GetProjectById/',
  CreateProject: 'http://localhost:49773/api/Project/CreateProject',
  UpdateProject: 'http://localhost:49773/api/Project/UpdateProject',
  DeleteProject: 'http://localhost:49773/api/Project/DeleteProject/',
  CreateProjectTeamEmployees: 'http://localhost:49773/api/Project/CreateProjectTeamEmployees',
  CreateProjectStakeHolders: 'http://localhost:49773/api/Project/CreateProjectStakeHolders',

  GetProjectTeamEmployeeByProjectId: 'http://localhost:49773/api/Project/GetProjectTeamEmployeeByProjectId/',
  UpdateProjectTeamEmployeeIsActive: 'http://localhost:49773/api/Project/UpdateProjectTeamEmployeeIsActive',
  DeleteProjectTeamEmployee: 'http://localhost:49773/api/Project/DeleteProjectTeamEmployee/',
  GetProjectStakeHoldersByProjectId: 'http://localhost:49773/api/Project/GetProjectStakeHoldersByProjectId/',
  // UpdateProjectTeamEmployeeIsActive: 'http://localhost:49773/api/Project/UpdateProjectTeamEmployeeIsActive',
  DeleteProjectStakeHolder: 'http://localhost:49773/api/Project/DeleteProjectStakeHolder/',

  ListTeams: 'http://localhost:49773/api/Team/ListTeams',
  GetTeamById: 'http://localhost:49773/api/Team/GetTeamById/',
  CreateTeam: 'http://localhost:49773/api/Team/CreateTeam',
  UpdateTeam: 'http://localhost:49773/api/Team/UpdateTeam',
  DeleteTeam: 'http://localhost:49773/api/Team/DeleteTeam/',

  ListEmployees: 'http://localhost:49773/api/Employee/ListEmployees',
  ListEmployeesByTeamId: 'http://localhost:49773/api/Employee/ListEmployeesByTeamId',
  GetEmployeeById: 'http://localhost:49773/api/Employee/GetEmployeeById/',
  CreateEmployee: 'http://localhost:49773/api/Employee/CreateEmployee',
  UpdateEmployee: 'http://localhost:49773/api/Employee/UpdateEmployee',
  DeleteEmployee: 'http://localhost:49773/api/Employee/DeleteEmployee/',
  UploadEmployeeImage: 'http://localhost:49773/api/Employee/UploadEmployeeImage/',

  ListMileStones: 'http://localhost:49773/api/MileStone/ListMileStones',
  GetMileStonesByProjectId: 'http://localhost:49773/api/MileStone/GetMileStoneByProjectId',
  GetProjectsByMileStoneId: 'http://localhost:49773/api/MileStone/GetProjectsByMileStoneId/',
  GetMileStoneById: 'http://localhost:49773/api/MileStone/GetMileStoneById/',
  CreateMileStone: 'http://localhost:49773/api/MileStone/CreateMileStone',
  UpdateMileStone: 'http://localhost:49773/api/MileStone/UpdateMileStone',
  DeleteMileStone: 'http://localhost:49773/api/MileStone/DeleteMileStone/',

  ListTasks: 'http://localhost:49773/api/MSTask/ListTasks',
  GetTaskById: 'http://localhost:49773/api/MSTask/GetTaskById/',
  CreateTask: 'http://localhost:49773/api/MSTask/CreateTask',
  UpdateTask: 'http://localhost:49773/api/MSTask/UpdateTask',
  DeleteTask: 'http://localhost:49773/api/MSTask/DeleteTask/',
  CreateTaskMileStoneEmployees: 'http://localhost:49773/api/MSTask/CreateTaskMileStoneEmployees',
  GetTaskMileStoneEmployeeByTaskId: 'http://localhost:49773/api/MSTask/GetTaskMileStoneEmployeeByTaskId/',
  DeleteTaskMileStoneEmployee: 'http://localhost:49773/api/MSTask/DeleteTaskMileStoneEmployee/',
  ListTeamsByProjectId: 'http://localhost:49773/api/MSTask/GetTeamByMileStoneProjectId/',
  ListTeamsNotINProjectId: 'http://localhost:49773/api/MSTask/GetTeamNotINByMileStoneProjectId/',

  ListStatus: 'http://localhost:49773/api/TimeSheet/ListAllStatus',
  ListTimeSheets: 'http://localhost:49773/api/TimeSheet/ListTimeSheets',
  GetTimeSheetById: 'http://localhost:49773/api/TimeSheet/GetTimeSheetById/',
  CreateTimeSheet: 'http://localhost:49773/api/TimeSheet/CreateTimeSheet',
  UpdateTimeSheet: 'http://localhost:49773/api/TimeSheet/UpdateTimeSheet',
  DeleteTimeSheet: 'http://localhost:49773/api/TimeSheet/DeleteTimeSheet/',

  CalendarRequestDetails: 'http://localhost:49773/api/TechRequest/CalendarRequestDetails/',
  CalendarRequestDetailPlannedCalendar: 'http://localhost:49773/api/TechRequest/CalendarRequestDetailPlannedCalendar/',
  CalendarRequestDetailActualCalendar: 'http://localhost:49773/api/TechRequest/CalendarRequestDetailActualCalendar/',
  CalendarRequestDetailPlannedCalendarByUserId: 'http://localhost:49773/api/TechRequest/CalendarRequestDetailPlannedCalendar/',
  CalendarRequestDetailActualCalendarByUserId: 'http://localhost:49773/api/TechRequest/CalendarRequestDetailActualCalendar/',
  CalendarRequests: 'http://localhost:49773/api/TechRequest/CalendarRequests',

  ListTechRequests: 'http://localhost:49773/api/TechRequest/ListTechRequests/',
  ListRequestsByProjectId: 'http://localhost:49773/api/TechRequest/ListRequestsByProjectId/',
  ListRequestsByPeriorityId: 'http://localhost:49773/api/TechRequest/ListRequestsByPeriorityId/',
  ListRequestsByStatusId: 'http://localhost:49773/api/TechRequest/ListRequestsByStatusId/',
  ListRequestsByCategoryId: 'http://localhost:49773/api/TechRequest/ListRequestsByCategoryId/',
  ListRequestsByDate: 'http://localhost:49773/api/TechRequest/ListRequestsByDate',
  ListTLByProjectId: 'http://localhost:49773/api/TechRequest/ListTLByProjectId/',

  ListRequestTypes: 'http://localhost:49773/api/TechRequest/ListRequestTypes',
  ListRequestCategories: 'http://localhost:49773/api/TechRequest/ListRequestCategories',
  ListRequestSubCategoriesByCategoryId: 'http://localhost:49773/api/TechRequest/ListRequestSubCategoriesByCategoryId/',
  ListRequestImpacts: 'http://localhost:49773/api/TechRequest/ListRequestImpacts',
  ListOrganizations: 'http://localhost:49773/api/TechRequest/ListOrganizations',
  ListRequestPeriorities: 'http://localhost:49773/api/TechRequest/ListRequestPeriorities',
  ListRequestLevels: 'http://localhost:49773/api/TechRequest/ListRequestLevels',
  ListRequestModes: 'http://localhost:49773/api/TechRequest/ListRequestModes',
  ListRequestTypeStatus: 'http://localhost:49773/api/TechRequest/ListRequestTypeStatus',
  ListUrgencies: 'http://localhost:49773/api/TechRequest/ListUrgencies',
 
  GetRequestById: 'http://localhost:49773/api/TechRequest/GetRequestById/',
  CreateRequest: 'http://localhost:49773/api/TechRequest/CreateRequest',
  DeleteRequest: 'http://localhost:49773/api/TechRequest/DeleteRequest/',
  UpdateRequest: 'http://localhost:49773/api/TechRequest/UpdateRequest',
  ListRequestDetails: 'http://localhost:49773/api/TechRequest/ListRequestDetails/',
  CreateRequestDetail: 'http://localhost:49773/api/TechRequest/CreateRequestDetail',
  DeleteRequestDetail: 'http://localhost:49773/api/TechRequest/DeleteRequestDetail/',

  ListClients: 'http://localhost:49773/api/Client/ListClients',
  GetClientById: 'http://localhost:49773/api/Client/GetClientById/',
  CreateClient: 'http://localhost:49773/api/Client/CreateClient',
  UpdateClient: 'http://localhost:49773/api/Client/UpdateClient',
  DeleteClient: 'http://localhost:49773/api/Client/DeleteClient/',

  ListProblems: 'http://localhost:49773/api/Problem/ListProblems',
  GetProblemById: 'http://localhost:49773/api/Problem/GetProblemById/',
  CreateProblem: 'http://localhost:49773/api/Problem/CreateProblem',
  DeleteProblem: 'http://localhost:49773/api/Problem/DeleteProblem/',
  UpdateProblem: 'http://localhost:49773/api/Problem/UpdateProblem',

  ListPTEPositions: 'http://localhost:49773/api/Pteposition/ListPTEPositions',
  CreateStakeHolder: 'http://localhost:49773/api/StakeHolder/CreateStakeHolder',

  ListRoles: 'http://localhost:49773/api/Role/ListRoles',
  GetRoleById: 'http://localhost:49773/api/Role/GetRoleById/',
  CreateRole: 'http://localhost:49773/api/Role/CreateRole',
  UpdateRole: 'http://localhost:49773/api/Role/UpdateRole',
  DeleteRole: 'http://localhost:49773/api/Role/DeleteRole/',


  ListUserRoles: 'http://localhost:49773/api/Account/ListUserRoles',
  DeleteUserRole: 'http://localhost:49773/api/Account/DeleteUserRole/',
  UpdateUserRole: 'http://localhost:49773/api/Account/UpdateUserRole/',
  RegisterUser: 'http://localhost:49773/api/Account/RegisterUser',

  LogIn: 'http://localhost:49773/api/Account/Login',
};
