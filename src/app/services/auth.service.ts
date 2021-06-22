import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  networkName = environment.networkName;
  dbId = environment.dbId;

  loggedIn: BehaviorSubject<any> = new BehaviorSubject(false);
  user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.loggedIn.next(!!this.fetchToken());
  }

  signIn(loginObj: any): Observable<any> {
    const url = `${this.baseUrl}/fdb/${this.networkName}/${this.dbId}/pw/login`;
    return this.apiService.post(url, loginObj, {}).pipe(map((resp) => {
      if (resp) {
        this.persistToken(resp);
        this.loggedIn.next(true);
      }
      return resp;
    }));
  }

  signUp(loginObj: any): Observable<any> {
    const url = `${this.baseUrl}/fdb/${this.networkName}/${this.dbId}/pw/generate`;
    return this.apiService.post(url, loginObj, {});
  }

  fetchUserInfo(): void {
    
  }

  persistToken(token: string): void {
    localStorage.setItem('token', token);
  }

  fetchToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }
}