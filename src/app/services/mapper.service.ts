import { Injectable } from "@angular/core";
import { ProjectModel } from "../shared/_models";



@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() {}

  queryProjectMapper(projectResp: any[]): ProjectModel[] {
    return projectResp.map(i => {
      return {
        location: i['projects/location'],
        name: i['projects/name'],
        ownership: i['projects/ownership'],
        size: i['projects/size'],
        start: i['projects/start'],
        status: i['projects/status'],
        type: i['projects/type'],
        _id: i['_id'],
      }
    });
  }
}