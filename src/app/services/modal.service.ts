import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ManageDocumentComponent } from "../shared/_components";
import { DocumentInterface } from "../shared/_models";



@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbService: NgbModal
  ) {}

  openDocumentModal(
    doc: DocumentInterface,
    projectId: number,
    existingDocs: DocumentInterface[] = [],
    callback: (val: any) => any
  ) {
    const manageDocumentInst = this.ngbService.open(ManageDocumentComponent, {
      size: 'lg'
    });

    (manageDocumentInst.componentInstance as ManageDocumentComponent).existingDocs = existingDocs;
    (manageDocumentInst.componentInstance as ManageDocumentComponent).projectId = projectId;
    (manageDocumentInst.componentInstance as ManageDocumentComponent).doc = doc;

    manageDocumentInst.result.then(callback);
  }
}