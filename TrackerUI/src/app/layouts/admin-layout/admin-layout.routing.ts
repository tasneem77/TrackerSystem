import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ListProjectsComponent } from 'app/ProjectComponent/list-projects/list-projects.component';
import { EditProjectComponent } from 'app/ProjectComponent/edit-project/edit-project.component';
import { AddProjectComponent } from 'app/ProjectComponent/add-project/add-project.component';
import { ListTeamsComponent } from 'app/TeamComponent/list-teams/list-teams.component';
import { AddTeamComponent } from 'app/TeamComponent/add-team/add-team.component';
import { EditTeamComponent } from 'app/TeamComponent/edit-team/edit-team.component';
import { ListEmployeesComponent } from 'app/EmployeeComponent/list-employees/list-employees.component';
import { EditEmployeeComponent } from 'app/EmployeeComponent/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from 'app/EmployeeComponent/add-employee/add-employee.component';
import { ListMilestonesComponent } from 'app/MileStoneComponent/list-milestones/list-milestones.component';
import { AddMileStoneComponent } from 'app/MileStoneComponent/add-mile-stone/add-mile-stone.component';
import { EditMileStoneComponent } from 'app/MileStoneComponent/edit-mile-stone/edit-mile-stone.component';
import { ListTasksComponent } from 'app/TaskComponent/list-tasks/list-tasks.component';
import { EditTaskComponent } from 'app/TaskComponent/edit-task/edit-task.component';
import { AddTaskComponent } from 'app/TaskComponent/add-task/add-task.component';
import { ListTimesheetComponent } from 'app/TimeSheetComponent/list-timesheet/list-timesheet.component';
import { AddTimesheetComponent } from 'app/TimeSheetComponent/add-timesheet/add-timesheet.component';
import { ListRequestsComponent } from 'app/RequestComponent/list-requests/list-requests.component';
import { AddRequestComponent } from 'app/RequestComponent/add-request/add-request.component';
import { EditRequestComponent } from 'app/RequestComponent/edit-request/edit-request.component';
import { RequestCalendarComponent } from 'app/RequestComponent/request-calendar/request-calendar.component';
import { ListClientsComponent } from 'app/ClientComponent/list-clients/list-clients.component';
import { EditClientComponent } from 'app/ClientComponent/edit-client/edit-client.component';
import { AddClientComponent } from 'app/ClientComponent/add-client/add-client.component';
import { ListProblemsComponent } from 'app/ProblemComponent/list-problems/list-problems.component';
import { EditProblemComponent } from 'app/ProblemComponent/edit-problem/edit-problem.component';
import { AddProblemComponent } from 'app/ProblemComponent/add-problem/add-problem.component';
import { RequestDetailsComponent } from 'app/RequestComponent/list-requestdetails/list-requestdetails.component';
import { AddrequestdetailsComponent } from 'app/RequestComponent/addrequestdetails/addrequestdetails.component';
import { RequestdetailCalendarComponent } from 'app/RequestComponent/requestdetail-calendar/requestdetail-calendar.component';
import { LoginComponent } from 'app/UserComponent/login-component/login.component';
import { AddUserComponent } from 'app/UserComponent/add-user/add-user.component';
import { AddRoleComponent } from 'app/UserComponent/add-role/add-role.component';
import { ListUsersComponent } from 'app/UserComponent/list-users/list-users.component';
import { ListRolesComponent } from 'app/UserComponent/list-roles/list-roles.component';
import { EditRoleComponent } from 'app/UserComponent/edit-role/edit-role.component';
import { ViewProjectComponent } from 'app/ProjectComponent/view-project/view-project.component';
export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ListProjectsComponent },
  { path: 'project/:id', component: EditProjectComponent },
  { path: 'project', component: AddProjectComponent },
  { path: 'viewProject/:id', component: ViewProjectComponent },

  { path: 'teams', component: ListTeamsComponent },
  { path: 'team/:id', component: EditTeamComponent },
  { path: 'team', component: AddTeamComponent },

  { path: 'employees', component: ListEmployeesComponent },
  { path: 'employee/:id', component: EditEmployeeComponent },
  { path: 'employee', component: AddEmployeeComponent },

  //{ path: 'milestones', component: ListMilestonesComponent },

  { path: 'milestones/:projectId', component: ListMilestonesComponent },
  { path: 'addmilestone/:projectId', component: AddMileStoneComponent },
  { path: 'milestone/:id', component: EditMileStoneComponent },
  { path: 'milestone', component: AddMileStoneComponent },


  { path: 'tasks', component: ListTasksComponent },
  { path: 'task/:id', component: EditTaskComponent },
  { path: 'task', component: AddTaskComponent },

  { path: 'timesheets', component: ListTimesheetComponent },
  //  { path: 'timesheet/:id',      component: EditTaskComponent },
  { path: 'timesheet', component: AddTimesheetComponent },


  { path: 'requests', component: ListRequestsComponent },
  { path: 'request/:id', component: EditRequestComponent },
  { path: 'request', component: AddRequestComponent },
  { path: 'requestDetails/:id', component: RequestDetailsComponent },
  { path: 'addrequestDetail', component: AddrequestdetailsComponent },
  // { path: 'editrequestDetail'/:id, component: AddrequestdetailsComponent },
  { path: 'requestCalendar', component: RequestCalendarComponent },
  { path: 'requestDetailCalendar/:id/:userId', component: RequestdetailCalendarComponent },



  { path: 'clients', component: ListClientsComponent },
  { path: 'client/:id', component: EditClientComponent },
  { path: 'client', component: AddClientComponent },


  { path: 'problems', component: ListProblemsComponent },
  { path: 'problem/:id', component: EditProblemComponent },
  { path: 'problem', component: AddProblemComponent },

  { path: 'userroles', component: ListUsersComponent },
  { path: 'adduser', component: AddUserComponent },


  { path: 'roles', component: ListRolesComponent },
  { path: 'role/:id', component: EditRoleComponent },
  { path: 'addrole', component: AddRoleComponent },



];
