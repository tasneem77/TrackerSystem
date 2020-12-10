import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RegisterUserVM } from 'Models/UserVM';
import { CreateRoleVM, EditRoleVM, ListRoleVM } from 'Models/RoleVM';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };

  
  CreateRole(roleObj: CreateRoleVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.CreateRole}`, roleObj, this.httpHeader);
  }
  GetRoles(): Observable<ListRoleVM[]> {
    return this.httpClient.get<ListRoleVM[]>(`${environment.ListRoles}`, this.httpHeader);
  }

  GetRoleById(id: number): Observable <EditRoleVM>{
    return this.httpClient.get<EditRoleVM> (`${environment.GetRoleById}${id}`,this.httpHeader) ;
  }
 
  UpdateRole(RoleObj: EditRoleVM): Observable<EditRoleVM> {
    return this.httpClient.put<EditRoleVM>(`${environment.UpdateRole}`, RoleObj, this.httpHeader);
  }

  DeleteRole(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteRole}${id}`, this.httpHeader);
  }


}