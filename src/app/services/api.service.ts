import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, options: any): Observable<any> {
    return this.http.get(url, options);
  }

  post(url: string, body: any, options: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  put(url: string, body: any, options: any): Observable<any> {
    return this.http.put(url, body, options);
  }

  delete(url: string, options: any): Observable<any> {
    return this.http.delete(url, options);
  }
}