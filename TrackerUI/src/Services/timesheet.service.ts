import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateTimeSheetVM, EditTimeSheetVM, ListStatusVM, ListTimeSheetVM } from 'Models/TimeSheetVM';


@Injectable({
  providedIn: 'root'
})

export class TimeSheetService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};

 
    GetTimeSheets(): Observable <ListTimeSheetVM[] >{
        return this.httpClient.get<ListTimeSheetVM[]> (`${environment.ListTimeSheets}`,this.httpHeader) ;
      }

      GetStatus(): Observable <ListStatusVM[] >{
        return this.httpClient.get<ListStatusVM[]> (`${environment.ListStatus}`,this.httpHeader) ;
      }
    GetTimeSheetById(id: number): Observable <EditTimeSheetVM>{
      return this.httpClient.get<EditTimeSheetVM> (`${environment.GetTimeSheetById}${id}`,this.httpHeader) ;
    }

    CreateTimeSheet(TimeSheetObj: CreateTimeSheetVM): Observable <CreateTimeSheetVM>{
      return this.httpClient.post<CreateTimeSheetVM>(`${environment.CreateTimeSheet}`,TimeSheetObj,this.httpHeader) ;
    }
    UpdateTimeSheet(TimeSheetObj: EditTimeSheetVM): Observable <EditTimeSheetVM>{
      return this.httpClient.put<EditTimeSheetVM> (`${environment.UpdateTimeSheet}`,TimeSheetObj,this.httpHeader) ;
    }
    DeleteTimeSheet(id: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteTimeSheet}${id}`,this.httpHeader) ;
    }
  }
  