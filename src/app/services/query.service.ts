import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ProjectModel } from "../shared/_models";
import { ApiService } from "./api.service";
import { MapperService } from "./mapper.service";


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  baseUrl = environment.baseUrl;
  networkName = environment.networkName;
  dbId = environment.dbId;

  constructor(
    private apiService: ApiService,
    private mapperService: MapperService
  ) {}

  queryProjects(): Observable<ProjectModel[]> {
    const url = `${this.baseUrl}/fdb/${this.networkName}/${this.dbId}/query`;
    const query = { "select": ["*"], "from": "projects" };
    return this.apiService.post(url, query, {}).pipe(map((resp: any[]) => {
      return this.mapperService.queryProjectMapper(resp);
    }));
  }
}