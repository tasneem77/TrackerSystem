import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ListUseRoleVM, LogInVM, RegisterUserVM } from 'Models/UserVM';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  
  RegisterUser(userObj: RegisterUserVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.RegisterUser}`, userObj, this.httpHeader);
  }

  LogIn(userObj: LogInVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.LogIn}`, userObj, this.httpHeader);
  }

  ListUserRoles(): Observable<ListUseRoleVM[]> {
    return this.httpClient.post<ListUseRoleVM[]>(`${environment.ListUserRoles}`, this.httpHeader);
  }

  DeleteUserRole(id: number): Observable <any>{
    return this.httpClient.delete<any> (`${environment.DeleteUserRole}${id}`,this.httpHeader) ;
  }
}