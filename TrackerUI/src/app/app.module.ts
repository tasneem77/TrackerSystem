import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTimepickerModule } from 'mat-timepicker';


import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrModule } from 'ngx-toastr';


import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import momentPlugin from '@fullcalendar/moment'

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { TeamService } from 'Services/team.service';
import { EmployeeService } from 'Services/employee.service';
import { TimeFormatPipe } from './time-format.pipe';
import { MileStoneService } from 'Services/milestone.service';
import { TaskService } from 'Services/task.service';
import { TimeSheetService } from 'Services/timesheet.service';
import { RequestService } from 'Services/request.service';
import { ProjectService } from 'Services/project.service';


import { ListProjectsComponent } from './ProjectComponent/list-projects/list-projects.component';
import { EditProjectComponent } from './ProjectComponent/edit-project/edit-project.component';
import { AddProjectComponent } from './ProjectComponent/add-project/add-project.component';
import { ListTeamsComponent } from './TeamComponent/list-teams/list-teams.component';
import { AddTeamComponent } from './TeamComponent/add-team/add-team.component';
import { EditTeamComponent } from './TeamComponent/edit-team/edit-team.component';
import { ListEmployeesComponent } from './EmployeeComponent/list-employees/list-employees.component';
import { AddEmployeeComponent } from './EmployeeComponent/add-employee/add-employee.component';
import { EditEmployeeComponent } from './EmployeeComponent/edit-employee/edit-employee.component';
import { ListMilestonesComponent } from './MileStoneComponent/list-milestones/list-milestones.component';
import { AddMileStoneComponent } from './MileStoneComponent/add-mile-stone/add-mile-stone.component';
import { EditMileStoneComponent } from './MileStoneComponent/edit-mile-stone/edit-mile-stone.component';
import { ListTasksComponent } from './TaskComponent/list-tasks/list-tasks.component';
import { AddTaskComponent } from './TaskComponent/add-task/add-task.component';
import { EditTaskComponent } from './TaskComponent/edit-task/edit-task.component';
import { ListTimesheetComponent } from './TimeSheetComponent/list-timesheet/list-timesheet.component';
import { AddTimesheetComponent } from './TimeSheetComponent/add-timesheet/add-timesheet.component';
import { ListRequestsComponent } from './RequestComponent/list-requests/list-requests.component';
import { AddRequestComponent } from './RequestComponent/add-request/add-request.component';
import { EditRequestComponent } from './RequestComponent/edit-request/edit-request.component';
import { RequestCalendarComponent } from './RequestComponent/request-calendar/request-calendar.component';
import { ListClientsComponent } from './ClientComponent/list-clients/list-clients.component';
import { EditClientComponent } from './ClientComponent/edit-client/edit-client.component';
import { AddClientComponent } from './ClientComponent/add-client/add-client.component';
import { ListProblemsComponent } from './ProblemComponent/list-problems/list-problems.component';
import { AddProblemComponent } from './ProblemComponent/add-problem/add-problem.component';
import { EditProblemComponent } from './ProblemComponent/edit-problem/edit-problem.component';
import { RequestDetailsComponent } from './RequestComponent/list-requestdetails/list-requestdetails.component';
import { AddrequestdetailsComponent } from './RequestComponent/addrequestdetails/addrequestdetails.component';
import { RequestdetailCalendarComponent } from './RequestComponent/requestdetail-calendar/requestdetail-calendar.component';
import { LoginComponent } from './UserComponent/login-component/login.component';
import { AddUserComponent } from './UserComponent/add-user/add-user.component';
import { AddRoleComponent } from './UserComponent/add-role/add-role.component';
import { EditRoleComponent } from './UserComponent/edit-role/edit-role.component';
import { ListRolesComponent } from './UserComponent/list-roles/list-roles.component';
import { ListUsersComponent } from './UserComponent/list-users/list-users.component';
import { ViewProjectComponent } from './ProjectComponent/view-project/view-project.component';
import { GlobalVariables } from 'Helpers/GlobalVariables';
// import { DashboardComponent } from './dashboard/dashboard.component';

// import {
//   AgmCoreModule
// } from '@agm/core';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin, listPlugin, momentPlugin
]);
@NgModule({
  imports: [
    AngularEditorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatTimepickerModule,
    BrowserModule,
    NgxMaterialTimepickerModule,
    ConfirmDialogModule,
    MatIconModule,
    ToastrModule.forRoot(),
    NgxMaterialTimepickerModule,
    TableModule,
    FullCalendarModule,
    MatSelectModule,
    DataTablesModule.forRoot(),
    MatTableModule,
    MatListModule,
    ToastrModule.forRoot({
      // timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatTabsModule,
    MatToolbarModule,
    MatCardModule


    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListProjectsComponent,
    EditProjectComponent,
    AddProjectComponent,
    ListTeamsComponent,
    AddTeamComponent,
    EditTeamComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    TimeFormatPipe,
    ListMilestonesComponent,
    AddMileStoneComponent,
    EditMileStoneComponent,
    ListTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    ListTimesheetComponent,
    AddTimesheetComponent,
    ListRequestsComponent,
    AddRequestComponent,
    EditRequestComponent,
    RequestCalendarComponent,
    ListClientsComponent,
    EditClientComponent,
    AddClientComponent,
    ListProblemsComponent,
    AddProblemComponent,
    EditProblemComponent,
    RequestDetailsComponent,
    AddrequestdetailsComponent,
    RequestdetailCalendarComponent,
    LoginComponent,
    AddUserComponent,
    AddRoleComponent,
    EditRoleComponent,
    ListRolesComponent,
    ListUsersComponent,
    ViewProjectComponent

  ],
  providers: [DatePipe, ConfirmationService, ProjectService, TeamService, EmployeeService, MileStoneService, TaskService, TimeSheetService, RequestService,GlobalVariables],
  bootstrap: [AppComponent]
})
export class AppModule { }


// export function keyPressNumbers(event) {
//   var charCode = (event.which) ? event.which : event.keyCode;
//   // Only Numbers 0-9
//   if ((charCode < 48 || charCode > 57)) {
//     event.preventDefault();
//     return false;
//   } else {
//     return true;
//   }
// }
