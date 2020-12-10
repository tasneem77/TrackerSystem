import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListPTEPositionVM } from 'Models/PTEPositionVM';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PTEPositionService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
  
    GetPTEPosition(): Observable <ListPTEPositionVM[] >{
        return this.httpClient.get<ListPTEPositionVM[]> (`${environment.ListPTEPositions}`,this.httpHeader) ;
      }
 
  
    // GetTeamById(id: number): Observable <EditTeamVM>{
    //   return this.httpClient.get<EditTeamVM> (`${environment.GetTeamById}${id}`,this.httpHeader) ;
    // }
   
    // CreateTeam(TeamObj: CreateTeamVM): Observable <CreateTeamVM>{
    //   return this.httpClient.post<CreateTeamVM>(`${environment.CreateTeam}`,TeamObj,this.httpHeader) ;
    // }

    
    // UpdateTeam(TeamObj: EditTeamVM): Observable <EditTeamVM>{
    //   return this.httpClient.put<EditTeamVM> (`${environment.UpdateTeam}`,TeamObj,this.httpHeader) ;
    // }
  
    // DeleteTeam(id: number): Observable <any>{
    //   return this.httpClient.delete<any> (`${environment.DeleteTeam}${id}`,this.httpHeader) ;
    // }
  }
  