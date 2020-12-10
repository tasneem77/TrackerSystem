import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { CreateClientVM, EditClientVM, ListClientVM } from 'Models/ClientVM';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };

  GetClients(): Observable<ListClientVM[]> {
    return this.httpClient.get<ListClientVM[]>(`${environment.ListClients}`, this.httpHeader);
  }


  GetClientById(id: number): Observable<EditClientVM> {
    return this.httpClient.get<EditClientVM>(`${environment.GetClientById}${id}`, this.httpHeader);
  }

  CreateClient(ClientObj: CreateClientVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.CreateClient}`, ClientObj, this.httpHeader);
  }


  UpdateClient(ClientObj: EditClientVM): Observable<EditClientVM> {
    return this.httpClient.put<EditClientVM>(`${environment.UpdateClient}`, ClientObj, this.httpHeader);
  }

  DeleteClient(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.DeleteClient}${id}`, this.httpHeader);
  }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   return this.httpClient.post(`${environment.UploadClientImage}`, formData).pipe(map(() => { return true; }));
  // }
}
