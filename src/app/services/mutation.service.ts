import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DocumentInterface, ProjectModel } from "../shared/_models";
import { ApiService } from "./api.service";
import { QueryService } from "./query.service";
import { 
  createDocumentsMutation, createDocumentMutation, deleteProjectMutation, deleteDocumentMutation 
} from "../shared/_transactions";


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

  manageDocument(docObj: DocumentInterface): Observable<any> {
    return this.apiService.post(this.url, createDocumentMutation(docObj), {});
  }

  deleteDocument(docIds: (number | string)[]): Observable<any> {
    const transactObj = deleteDocumentMutation(docIds);
    return this.apiService.post(this.url, transactObj, {});
  }

  deleteProject(projectId: number): Observable<any> {
    return this.queryService.queryDocumentsByProjectId(projectId).pipe(switchMap(value => {
      const transactObj = [...deleteProjectMutation(projectId), ...deleteDocumentMutation(value.map(doc => doc._id))];
      return this.apiService.post(this.url, transactObj, {});
    }))
  }
}