import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProjectVM, DetailProjectVM, EditProjectVM, ListProjectStakeHolder, ListProjectTeamEmployee, ListProjectVM, ProjectStakeHolder, ProjectTeamEmployee, ProjectVM } from 'Models/ProjectVM';
import { environment } from '../environments/environment';
import { EditProjectComponent } from 'app/ProjectComponent/edit-project/edit-project.component';
import { ListTeamVM } from 'Models/TeamVM';
import { ListProjectEmployeeVM } from 'Models/EmployeeVM';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
  
    GetProjects(userId:number): Observable <ListProjectVM[] >{
        return this.httpClient.get<ListProjectVM[]> (`${environment.ListProjects}${userId}`,this.httpHeader) ;
      }

      CountProjects(userId:number): Observable <any>{
        return this.httpClient.get<any> (`${environment.CountProjects}${userId}`,this.httpHeader) ;
      }
 
      GetAllProjects(): Observable <ListProjectVM[] >{
        return this.httpClient.get<ListProjectVM[]> (`${environment.ListProjects}`,this.httpHeader) ;
      }
 
      GetTeams(): Observable <ListTeamVM[] >{
        return this.httpClient.get<ListTeamVM[]> (`${environment.ListTeams}`,this.httpHeader) ;
      }

    
      GetEmployeesByTeamId( teamId:number): Observable <ListProjectEmployeeVM[] >{
        return this.httpClient.get<ListProjectEmployeeVM[]> (`${environment.ListEmployeesByTeamId}/${teamId}`,this.httpHeader) ;
      }
 

    GetProjectById(id: number): Observable <EditProjectVM>{
      return this.httpClient.get<EditProjectVM> (`${environment.GetProjectById}${id}`,this.httpHeader) ;
    }
   
    GetProjectDetailById(id: number): Observable <DetailProjectVM>{
      return this.httpClient.get<DetailProjectVM> (`${environment.GetProjectDetailById}${id}`,this.httpHeader) ;
    }
   
    GetListProjectTeamEmployeeByProjectId(projectId: number): Observable <ListProjectTeamEmployee[]>{
      return this.httpClient.get<ListProjectTeamEmployee[]> (`${environment.GetProjectTeamEmployeeByProjectId}${projectId}`,this.httpHeader) ;
    }
   

    GetProjectStakeHoldersByProjectId(projectId: number): Observable <ListProjectStakeHolder[]>{
      return this.httpClient.get<ListProjectStakeHolder[]> (`${environment.GetProjectStakeHoldersByProjectId}${projectId}`,this.httpHeader) ;
    }
   

    CreateProject(projectObj: CreateProjectVM): Observable <CreateProjectVM>{
      return this.httpClient.post<CreateProjectVM>(`${environment.CreateProject}`,projectObj,this.httpHeader) ;
    }

     
    CreateProjectTeamEmployees(lstProjectTeamEmployees: ProjectTeamEmployee[]): Observable <ProjectTeamEmployee[]>{
      return this.httpClient.post<ProjectTeamEmployee[]>(`${environment.CreateProjectTeamEmployees}`,lstProjectTeamEmployees,this.httpHeader) ;
    }

    CreateStakeHolder(StakeHolderObj: any): Observable <number>{
      return this.httpClient.post<any>(`${environment.CreateStakeHolder}`,StakeHolderObj,this.httpHeader) ;
    }


    CreateProjectStakeHolders(lstProjectTeamEmployees: ProjectStakeHolder[]): Observable <ProjectStakeHolder[]>{
      return this.httpClient.post<ProjectStakeHolder[]>(`${environment.CreateProjectStakeHolders}`,lstProjectTeamEmployees,this.httpHeader) ;
    }


    UpdateProject(projectObj: EditProjectVM): Observable <EditProjectVM>{
      return this.httpClient.put<EditProjectVM> (`${environment.UpdateProject}`,projectObj,this.httpHeader) ;
    }

    UpdateProjectTeamEmployeeIsActive(projectTeamEmployeeId:number): Observable <ProjectTeamEmployee>{
      return this.httpClient.put<ProjectTeamEmployee> (`${environment.UpdateProjectTeamEmployeeIsActive}/${projectTeamEmployeeId}`,this.httpHeader) ;
    }
  
    DeleteProject(id: number){
      return this.httpClient.delete(`${environment.DeleteProject}${id}`,this.httpHeader) ;
    }

    DeleteProjectTeamEmployee(projectTeamEmployeeId: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteProjectTeamEmployee}${projectTeamEmployeeId}`,this.httpHeader) ;
    }


    DeleteProjectStakeHolder(pshId: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteProjectStakeHolder}${pshId}`,this.httpHeader) ;
    }


    
  }
  