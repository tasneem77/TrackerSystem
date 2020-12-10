import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateRequestDetailVM, CreateRequestVM, EditRequestVM, ListOrganizationVM, ListPeriorityVM, ListRequestCategoryVM, ListRequestDetailVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListRequestVM, RequestCalendarVM, RequestDateVM, RequestDetailCalendarVM } from 'Models/RequestVM';
import { ListEmployeeVM } from 'Models/EmployeeVM';


@Injectable({
  providedIn: 'root'
})

export class RequestService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };


  // GetRequests(): Observable<ListRequestVM[]> {
  //   return this.httpClient.get<ListRequestVM[]>(`${environment.ListTechRequests}`, this.httpHeader);
  // }


  GetRequests(userId:number): Observable <ListRequestVM[] >{
    return this.httpClient.get<ListRequestVM[]> (`${environment.ListTechRequests}${userId}`,this.httpHeader) ;
  }

  CountRequests(userId:number): Observable <any>{
    return this.httpClient.get<any> (`${environment.CountRequests}${userId}`,this.httpHeader) ;
  }

  GetRequestDetailsByRequestId(requestId: number): Observable<ListRequestDetailVM[]> {
    return this.httpClient.get<ListRequestDetailVM[]>(`${environment.ListRequestDetails}${requestId}`, this.httpHeader);
  }
  GetRequestsByProjectId(projectId: number): Observable<ListRequestVM[]> {
    return this.httpClient.get<ListRequestVM[]>(`${environment.ListRequestsByProjectId}${projectId}`, this.httpHeader);
  }
  GetRequestsByPeriorityId(periorityId: number): Observable<ListRequestVM[]> {
    return this.httpClient.get<ListRequestVM[]>(`${environment.ListRequestsByPeriorityId}${periorityId}`, this.httpHeader);
  }
  GetRequestsByCategoryId(categoryId: number): Observable<ListRequestVM[]> {
    return this.httpClient.get<ListRequestVM[]>(`${environment.ListRequestsByCategoryId}${categoryId}`, this.httpHeader);
  }
  GetRequestsByStatusId(statusId: number): Observable<ListRequestVM[]> {
    return this.httpClient.get<ListRequestVM[]>(`${environment.ListRequestsByStatusId}${statusId}`, this.httpHeader);
  }



  GetRequestCalendar(): Observable<RequestCalendarVM[]> {
    return this.httpClient.get<RequestCalendarVM[]>(`${environment.CalendarRequests}`, this.httpHeader);
  }
  GetRequestDetailCalendar(requestId: number): Observable<RequestDetailCalendarVM[]> {
    return this.httpClient.get<RequestDetailCalendarVM[]>(`${environment.CalendarRequestDetails}${requestId}`, this.httpHeader);
  }
  GetRequestDetailPlannedCalendar(requestId: number): Observable<RequestDetailCalendarVM[]> {
    return this.httpClient.get<RequestDetailCalendarVM[]>(`${environment.CalendarRequestDetailPlannedCalendar}${requestId}`, this.httpHeader);
  }
  GetRequestDetailActualCalendar(requestId: number): Observable<RequestDetailCalendarVM[]> {
    return this.httpClient.get<RequestDetailCalendarVM[]>(`${environment.CalendarRequestDetailActualCalendar}${requestId}`, this.httpHeader);
  }



  GetRequestDetailPlannedCalendarByUserId(requestId: number,userId:number): Observable<RequestDetailCalendarVM[]> {
    return this.httpClient.get<RequestDetailCalendarVM[]>(`${environment.CalendarRequestDetailPlannedCalendar}${requestId}/${userId}`, this.httpHeader);
  }
  GetRequestDetailActualCalendarByUserId(requestId: number,userId:number): Observable<RequestDetailCalendarVM[]> {
    return this.httpClient.get<RequestDetailCalendarVM[]>(`${environment.CalendarRequestDetailActualCalendar}${requestId}/${userId}`, this.httpHeader);
  }






  GetRequestsByDate(RequestDateObj: RequestDateVM): Observable <ListRequestVM[]>{
    return this.httpClient.post<ListRequestVM[]>(`${environment.ListRequestsByDate}`,RequestDateObj,this.httpHeader) ;
  }




  GetRequestTypes(): Observable<ListRequestTypeVM[]> {
    return this.httpClient.get<ListRequestTypeVM[]>(`${environment.ListRequestTypes}`, this.httpHeader);
  }
  GetRequestTypeStatus(): Observable<ListRequestTypeStatusVM[]> {
    return this.httpClient.get<ListRequestTypeStatusVM[]>(`${environment.ListRequestTypeStatus}`, this.httpHeader);
  }


  ListTLByProjectId(projectId:number): Observable<ListEmployeeVM[]> {
    return this.httpClient.get<ListEmployeeVM[]>(`${environment.ListTLByProjectId}${projectId}`, this.httpHeader);
  }

  
  GetRequestImpacts(): Observable<ListRequestImpactVM[]> {
    return this.httpClient.get<ListRequestImpactVM[]>(`${environment.ListRequestImpacts}`, this.httpHeader);
  }
  GetRequestLevels(): Observable<ListRequestLevelVM[]> {
    return this.httpClient.get<ListRequestLevelVM[]>(`${environment.ListRequestLevels}`, this.httpHeader);
  }
  GetRequestModes(): Observable<ListRequestModeVM[]> {
    return this.httpClient.get<ListRequestModeVM[]>(`${environment.ListRequestModes}`, this.httpHeader);
  }
  GetRequestPeriorities(): Observable<ListPeriorityVM[]> {
    return this.httpClient.get<ListPeriorityVM[]>(`${environment.ListRequestPeriorities}`, this.httpHeader);
  }
  GetRequestCategories(): Observable<ListRequestCategoryVM[]> {
    return this.httpClient.get<ListRequestCategoryVM[]>(`${environment.ListRequestCategories}`, this.httpHeader);
  }

  GetOrganizations(): Observable<ListOrganizationVM[]> {
    return this.httpClient.get<ListOrganizationVM[]>(`${environment.ListOrganizations}`, this.httpHeader);
  }


  ListRequestSubCategoriesByCategoryId(categoryId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.ListRequestSubCategoriesByCategoryId}${categoryId}`, this.httpHeader);
  }


  // GetRequestUrgencies(): Observable <ListUrgentVM[] >{
  //   return this.httpClient.get<ListUrgentVM[]> (`${environment.ListUrgencies}`,this.httpHeader) ;
  // }




  GetRequestById(id: number): Observable<EditRequestVM> {
    return this.httpClient.get<EditRequestVM>(`${environment.GetRequestById}${id}`, this.httpHeader);
  }

  CreateRequest(RequestObj: CreateRequestVM): Observable<CreateRequestVM> {
    return this.httpClient.post<CreateRequestVM>(`${environment.CreateRequest}`, RequestObj, this.httpHeader);
  }


  CreateRequestDetail(RequestDetailObj: CreateRequestDetailVM): Observable<CreateRequestDetailVM> {
    return this.httpClient.post<CreateRequestDetailVM>(`${environment.CreateRequestDetail}`, RequestDetailObj, this.httpHeader);
  }


  UpdateRequest(RequestObj: EditRequestVM): Observable<EditRequestVM> {
    return this.httpClient.put<EditRequestVM>(`${environment.UpdateRequest}`, RequestObj, this.httpHeader);
  }


  DeleteRequest(id: number) {
    return this.httpClient.delete<any>(`${environment.DeleteRequest}${id}`, this.httpHeader);
  }

  DeleteRequestDetails(id: number) {
    return this.httpClient.delete<any>(`${environment.DeleteRequestDetail}${id}`, this.httpHeader);
  }
}
