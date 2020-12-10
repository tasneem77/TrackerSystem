import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateTaskVM, EditTaskVM, ListTaskVM } from 'Models/TaskVM';
import { ListMileStoneVM, ListTaskMileStoneEmployees, TaskMileStoneEmployee } from 'Models/MileStoneVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { ListTeamVM } from 'Models/TeamVM';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};

 
    GetTasks(): Observable <ListTaskVM[] >{
        return this.httpClient.get<ListTaskVM[]> (`${environment.ListTasks}`,this.httpHeader) ;
      }
    GetTaskById(id: number): Observable <EditTaskVM>{
      return this.httpClient.get<EditTaskVM> (`${environment.GetTaskById}${id}`,this.httpHeader) ;
    }
   GetListMileStones(): Observable <ListMileStoneVM[] >{
      return this.httpClient.get<ListMileStoneVM[]> (`${environment.ListMileStones}`,this.httpHeader) ;
    }
    GetListTaskMileStoneEmployeeByTaskId(taskId: number): Observable <ListTaskMileStoneEmployees[]>{
      return this.httpClient.get<ListTaskMileStoneEmployees[]> (`${environment.GetTaskMileStoneEmployeeByTaskId}${taskId}`,this.httpHeader) ;
    }
   
    GetProjectsByMileStoneId(milestoneId: number): Observable <ListProjectVM[]>{
      return this.httpClient.get<ListProjectVM[]> (`${environment.GetProjectsByMileStoneId}${milestoneId}`,this.httpHeader) ;
    }
   
    ListTeamsByProjectId(projectId: number): Observable <ListTeamVM[]>{
      return this.httpClient.get<ListTeamVM[]> (`${environment.ListTeamsByProjectId}${projectId}`,this.httpHeader) ;
    }

       
    ListTeamsNotINProjectId(projectId: number): Observable <ListTeamVM[]>{
      return this.httpClient.get<ListTeamVM[]> (`${environment.ListTeamsNotINProjectId}${projectId}`,this.httpHeader) ;
    }


    CreateTask(TaskObj: CreateTaskVM): Observable <CreateTaskVM>{
      return this.httpClient.post<CreateTaskVM>(`${environment.CreateTask}`,TaskObj,this.httpHeader) ;
    }

    CreateTaskMileStoneEmployees(lstTaskMileStoneEmployees: TaskMileStoneEmployee[]): Observable <TaskMileStoneEmployee[]>{
      return this.httpClient.post<TaskMileStoneEmployee[]>(`${environment.CreateTaskMileStoneEmployees}`,lstTaskMileStoneEmployees,this.httpHeader) ;
    }


    UpdateTask(TaskObj: EditTaskVM): Observable <EditTaskVM>{
      return this.httpClient.put<EditTaskVM> (`${environment.UpdateTask}`,TaskObj,this.httpHeader) ;
    }
    DeleteTask(id: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteTask}${id}`,this.httpHeader) ;
    }

    DeleteTaskMileStoneEmployee(taskMileStoneEmployeeId: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteTaskMileStoneEmployee}${taskMileStoneEmployeeId}`,this.httpHeader) ;
    }

  }
  