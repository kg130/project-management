import { Injectable } from "@angular/core";
import { DocumentInterface, ProjectModel } from "../shared/_models";


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

  queryDocumentMapper(docs: any[], summary = false): DocumentInterface[] {
    return docs.map(i => {
      const data: DocumentInterface = {
        createdby: i['documents/createdby'],
        createddate: i['documents/createddate'],
        expirenotify: i['documents/expirenotify'],
        signedby: i['documents/signedby'],
        signeddate: i['documents/signeddate'],
        expiredate: i['documents/expiredate'],
        name: i['documents/name'],
        phase: i['documents/phase'],
        projectid: i['documents/projectid']?._id,
        parentid: i['documents/parentid']?._id,
        remarks: i['documents/remarks'],
        status: i['documents/status'],
        _id: i['_id'],
      }

      if (summary) {
        data.project = this.queryProjectMapper([i['project']])[0]
      }
      return data;
    })
  }
}