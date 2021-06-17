import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProjectModel } from "../shared/_models";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class MutationService {

  projectUrl = `${environment.baseUrl}/fdb/${environment.networkName}/${environment.dbId}`;

  constructor(
    private apiService: ApiService
  ) {}

  createProject(projectObj: ProjectModel[]): Observable<any> {
    const url = `${this.projectUrl}/transact`;
    return this.apiService.post(url, projectObj, {});
  }

  updateProject(projectObj: ProjectModel): Observable<any> {
    const url = `${this.projectUrl}/transact`;
    return this.apiService.post(url, projectObj, {});
  }

  deleteProject(projectId: string): Observable<any> {
    const url = `${this.projectUrl}/transact`;
    const transactObj = [{
      "_id": projectId,
      "_action": "delete"
    }];
    return this.apiService.post(url, transactObj, {});
  }
}