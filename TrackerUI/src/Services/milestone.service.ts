import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateMileStoneVM, EditMileStoneVM, ListMileStoneVM } from 'Models/MileStoneVM';
import { environment } from '../environments/environment';
import { ListProjectVM } from 'Models/ProjectVM';

@Injectable({
  providedIn: 'root'
})

export class MileStoneService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
  
      
   
    GetProjects(): Observable <ListProjectVM[] >{
      return this.httpClient.get<ListProjectVM[]> (`${environment.ListProjects}`,this.httpHeader) ;
    }


    GetListMileStonesByProjectId(projectId:number): Observable <ListMileStoneVM[] >{
      return this.httpClient.get<ListMileStoneVM[]> (`${environment.GetMileStonesByProjectId}/${projectId}`,this.httpHeader) ;
    }

    
    
    GetListMileStones(): Observable <ListMileStoneVM[] >{
      return this.httpClient.get<ListMileStoneVM[]> (`${environment.ListMileStones}`,this.httpHeader) ;
    }
    
 
    GetMileStoneById(id: number): Observable <EditMileStoneVM>{
      return this.httpClient.get<EditMileStoneVM> (`${environment.GetMileStoneById}${id}`,this.httpHeader) ;
    }
   
    CreateMileStone(MileStoneObj: CreateMileStoneVM): Observable <any>{
      return this.httpClient.post<any>(`${environment.CreateMileStone}`,MileStoneObj,this.httpHeader) ;
    }

    
    UpdateMileStone(MileStoneObj: EditMileStoneVM): Observable <EditMileStoneVM>{
      return this.httpClient.put<EditMileStoneVM> (`${environment.UpdateMileStone}`,MileStoneObj,this.httpHeader) ;
    }
  
    DeleteMileStone(id: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteMileStone}${id}`,this.httpHeader) ;
    }

  
  }
  