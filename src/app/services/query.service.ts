import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DocumentInterface, ProjectModel } from "../shared/_models";
import { fetchDocumentsByProjectId, fetchProjectById, fetchProjectsQuery, fetchSummary } from "../shared/_transactions";
import { ApiService } from "./api.service";
import { MapperService } from "./mapper.service";


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  projectUrl = `${environment.baseUrl}/fdb/${environment.networkName}/${environment.dbId}`;
  url = `${this.projectUrl}/query`;

  constructor(
    private apiService: ApiService,
    private mapperService: MapperService
  ) {}

  queryProjects(): Observable<ProjectModel[]> {
    const query = fetchProjectsQuery;
    return this.apiService.post(this.url, query, {}).pipe(map((resp: any[]) => {
      return this.mapperService.queryProjectMapper(resp);
    }));
  }

  querySummary(): Observable<DocumentInterface[]> {
    const query = fetchSummary();
    return this.apiService.post(this.url, query, {}).pipe(map((resp: any[]) => {
      return this.mapperService.queryDocumentMapper(resp);
    }));
  }

  queryProjectById(projectId: number): Observable<ProjectModel[]> {
    const query = fetchProjectById(projectId);
    return this.apiService.post(this.url, query, {}).pipe(map((resp: any[]) => {
      return this.mapperService.queryProjectMapper(resp);
    }));
  }

  queryDocumentsByProjectId(projectId: number): Observable<DocumentInterface[]> {
    const query = fetchDocumentsByProjectId(projectId);
    return this.apiService.post(this.url, query, {}).pipe(map((resp: any[]) => {
      return this.mapperService.queryDocumentMapper(resp);
    }));
  }
}