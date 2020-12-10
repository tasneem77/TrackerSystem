import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTeamVM, EditTeamVM, ListTeamVM } from 'Models/TeamVM';
import { environment } from '../environments/environment';
import { EditTeamComponent } from 'app/TeamComponent/edit-team/edit-team.component';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
  
    GetTeams(): Observable <ListTeamVM[] >{
        return this.httpClient.get<ListTeamVM[]> (`${environment.ListTeams}`,this.httpHeader) ;
      }
 
  
    GetTeamById(id: number): Observable <EditTeamVM>{
      return this.httpClient.get<EditTeamVM> (`${environment.GetTeamById}${id}`,this.httpHeader) ;
    }
   
    CreateTeam(TeamObj: CreateTeamVM): Observable <CreateTeamVM>{
      return this.httpClient.post<CreateTeamVM>(`${environment.CreateTeam}`,TeamObj,this.httpHeader) ;
    }

    
    UpdateTeam(TeamObj: EditTeamVM): Observable <EditTeamVM>{
      return this.httpClient.put<EditTeamVM> (`${environment.UpdateTeam}`,TeamObj,this.httpHeader) ;
    }
  
    DeleteTeam(id: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteTeam}${id}`,this.httpHeader) ;
    }
  }
  