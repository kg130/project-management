import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  networkName = environment.networkName;
  dbId = environment.dbId;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  signIn(loginObj: any): Observable<any> {
    const url = `${this.baseUrl}/fdb/${this.networkName}/${this.dbId}/pw/login`;
    return this.apiService.post(url, loginObj, {});
  }

  signUp(loginObj: any): Observable<any> {
    const url = `${this.baseUrl}/fdb/${this.networkName}/${this.dbId}/pw/generate`;
    return this.apiService.post(url, loginObj, {});
  }

  persistToken(token: string): void {
    localStorage.setItem('token', token);
  }

  fetchToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}