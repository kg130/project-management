import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DocumentInterface, ProjectModel } from "../shared/_models";
import { createDocumentsMutation, deleteProjectMutation, deleteDocumentMutation } from "../shared/_transactions";
import { ApiService } from "./api.service";
import { QueryService } from "./query.service";


@Injectable({
  providedIn: 'root'
})
export class MutationService {

  projectUrl = `${environment.baseUrl}/fdb/${environment.networkName}/${environment.dbId}`;
  url = `${this.projectUrl}/transact`;

  constructor(
    private apiService: ApiService,
    private queryService: QueryService
  ) {}

  manageProject(projectObj: ProjectModel[]): Observable<any> {
    return this.apiService.post(this.url, projectObj, {});
  }

  createDocuments(projectId: number): Observable<any> {
    return this.apiService.post(this.url, createDocumentsMutation(projectId), {});
  }

  manageDocument(docObj: DocumentInterface[]): Observable<any> {
    return this.apiService.post(this.url, docObj, {});
  }

  deleteDocument(docId: number | string): Observable<any> {
    const transactObj = deleteDocumentMutation(docId);
    return this.apiService.post(this.url, transactObj, {});
  }

  deleteProject(projectId: number): Observable<any> {
    return this.queryService.queryDocumentsByProjectId(projectId).pipe(switchMap(value => {
      const transactObj = deleteProjectMutation(projectId);
      value.map(doc => doc._id).forEach(id => transactObj.push(...deleteDocumentMutation(id)));
      return this.apiService.post(this.url, transactObj, {});
    }))
  }
}