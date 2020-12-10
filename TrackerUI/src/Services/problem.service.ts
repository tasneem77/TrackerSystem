import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateProblemVM, EditProblemVM, ListPeriorityVM,  ListProblemVM,  ListRequestCategoryVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListUrgentVM } from 'Models/ProblemVM';


@Injectable({
  providedIn: 'root'
})
 
export class ProblemService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};

 
    GetProblems(): Observable <ListProblemVM[] >{
        return this.httpClient.get<ListProblemVM[]> (`${environment.ListProblems}`,this.httpHeader) ;
      }



      GetRequestTypes(): Observable <ListRequestTypeVM[] >{
        return this.httpClient.get<ListRequestTypeVM[]> (`${environment.ListRequestTypes}`,this.httpHeader) ;
      }
      GetRequestTypeStatus(): Observable <ListRequestTypeStatusVM[] >{
        return this.httpClient.get<ListRequestTypeStatusVM[]> (`${environment.ListRequestTypeStatus}`,this.httpHeader) ;
      }
      GetRequestImpacts(): Observable <ListRequestImpactVM[] >{
        return this.httpClient.get<ListRequestImpactVM[]> (`${environment.ListRequestImpacts}`,this.httpHeader) ;
      }
      GetRequestLevels(): Observable <ListRequestLevelVM[] >{
        return this.httpClient.get<ListRequestLevelVM[]> (`${environment.ListRequestLevels}`,this.httpHeader) ;
      }
      GetRequestModes(): Observable <ListRequestModeVM[] >{
        return this.httpClient.get<ListRequestModeVM[]> (`${environment.ListRequestModes}`,this.httpHeader) ;
      }
      GetRequestPeriorities(): Observable <ListPeriorityVM[] >{
        return this.httpClient.get<ListPeriorityVM[]> (`${environment.ListRequestPeriorities}`,this.httpHeader) ;
      }
      GetRequestCategories(): Observable <ListRequestCategoryVM[] >{
        return this.httpClient.get<ListRequestCategoryVM[]> (`${environment.ListRequestCategories}`,this.httpHeader) ;
      }
      GetRequestUrgencies(): Observable <ListUrgentVM[] >{
        return this.httpClient.get<ListUrgentVM[]> (`${environment.ListUrgencies}`,this.httpHeader) ;
      }


    
    GetProblemById(id: number): Observable <EditProblemVM>{
      return this.httpClient.get<EditProblemVM> (`${environment.GetProblemById}${id}`,this.httpHeader) ;
    }

    CreateProblem(ProblemObj: CreateProblemVM): Observable <CreateProblemVM>{
      return this.httpClient.post<CreateProblemVM>(`${environment.CreateProblem}`,ProblemObj,this.httpHeader) ;
    }
    UpdateProblem(ProblemObj: EditProblemVM): Observable <EditProblemVM>{
      return this.httpClient.put<EditProblemVM> (`${environment.UpdateProblem}`,ProblemObj,this.httpHeader) ;
    }
    DeleteProblem(id: number){
      return this.httpClient.delete<any> (`${environment.DeleteProblem}${id}`,this.httpHeader) ;
    }
  }
  