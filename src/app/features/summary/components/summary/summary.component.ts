import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { MutationService } from 'src/app/services/mutation.service';
import { QueryService } from 'src/app/services/query.service';
import { DocumentInterface } from 'src/app/shared/_models';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  documents: DocumentInterface[] = [];

  constructor(
    private queryService: QueryService,
    private mutationService: MutationService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchSummary();
  }

  fetchSummary(): void {
    this.queryService.querySummary().subscribe((docs: DocumentInterface[]) => {
      this.documents = docs.filter(doc => !doc.parentid);
      docs.forEach(doc => {
        if (!!doc.parentid) {
          const parentDocument = this.documents.find(parentDoc => parentDoc._id === doc.parentid);
          if (parentDocument) {
            parentDocument.childDocs = [...parentDocument.childDocs || [], doc];
          }
        }
      })
    });
  }

  fetchDocumentsByProjectId(projectId: number): Observable<DocumentInterface[]> {
    return this.queryService.queryDocumentsByProjectId(projectId);
  }

  openProject(doc: DocumentInterface): void {
    this.router.navigate(['/', 'projects', doc.project?._id], {queryParams: {
      phase: doc.phase || 0
    }});
  }

  editDocument(doc: DocumentInterface): void {
    this.fetchDocumentsByProjectId(doc.project?._id || 0).subscribe(existingDocs => {
      this.modalService.openDocumentModal(
        doc,
        doc.project?._id || 0,
        existingDocs.filter(i => !i.parentid && i._id !== doc._id),
        (val) => {
          if (val) {
            this.fetchSummary();
          }
        }
      )
    })
  }

  deleteDocument(doc: DocumentInterface): void {
    const ids = [doc._id, ...doc.childDocs?.map(val => val._id) || []];
    this.mutationService.deleteDocument(ids).subscribe(_ => {
      if (!doc.parentid) {
        this.documents = this.documents.filter(document => document._id !== doc._id);
      } else {
        const parentDoc = this.documents.find(document => document._id === doc.parentid);
        if (parentDoc) {
          parentDoc.childDocs = parentDoc.childDocs?.filter(document => document._id !== doc._id);
        }
      }
    })
  }
}
