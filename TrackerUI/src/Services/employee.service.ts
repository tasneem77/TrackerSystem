import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEmployeeVM, EditEmployeeVM, ListEmployeeVM } from 'Models/EmployeeVM';
import { environment } from '../environments/environment';
import { ListTeamVM } from 'Models/TeamVM';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
    constructor(private httpClient : HttpClient) { }
   
    httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
  
      
    GetTeams(): Observable <ListTeamVM[] >{
      return this.httpClient.get<ListTeamVM[]> (`${environment.ListTeams}`,this.httpHeader) ;
    }
    
    GetEmployees(): Observable <ListEmployeeVM[] >{
        return this.httpClient.get<ListEmployeeVM[]> (`${environment.ListEmployees}`,this.httpHeader) ;
      }


      CountEmployees(): Observable <any>{
        return this.httpClient.get<any> (`${environment.CountEmployees}`,this.httpHeader) ;
      }
 
  
    GetEmployeeById(id: number): Observable <EditEmployeeVM>{
      return this.httpClient.get<EditEmployeeVM> (`${environment.GetEmployeeById}${id}`,this.httpHeader) ;
    }
   
    CreateEmployee(EmployeeObj: CreateEmployeeVM): Observable <any>{
      return this.httpClient.post<any>(`${environment.CreateEmployee}`,EmployeeObj,this.httpHeader) ;
    }

    
    UpdateEmployee(EmployeeObj: EditEmployeeVM): Observable <EditEmployeeVM>{
      return this.httpClient.put<EditEmployeeVM> (`${environment.UpdateEmployee}`,EmployeeObj,this.httpHeader) ;
    }
  
    DeleteEmployee(id: number): Observable <any>{
      return this.httpClient.delete<any> (`${environment.DeleteEmployee}${id}`,this.httpHeader) ;
    }

    postFile(fileToUpload: File): Observable<boolean> {
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.httpClient.post(`${environment.UploadEmployeeImage}`, formData).pipe(map(() => { return true; }));
    }
  }
  