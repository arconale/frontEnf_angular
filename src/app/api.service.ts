import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:8000/api/orders";
  httpreq = ""
  constructor(private httpClient: HttpClient) { }
  

  public get(parametre=null){  
    if(parametre != null)
    {
        this.httpreq = "customer="+parametre.fullName+"&status="+parametre.status
    }
		return this.httpClient.get(this.SERVER_URL, {  params: new HttpParams({fromString: this.httpreq})});  
  }  
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public post(action:any, payload: any){
     return this.httpClient.post<any>(`${this.SERVER_URL}/${action}`, payload);
  }

}
