import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { MutationService } from 'src/app/services/mutation.service';
import { QueryService } from 'src/app/services/query.service';
import { DocumentInterface, ProjectModel } from 'src/app/shared/_models';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  project: ProjectModel = {} as ProjectModel;
  documents: DocumentInterface[] = [];
  expanded: Map<number, boolean> = new Map();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private queryService: QueryService,
    private mutationService: MutationService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params.id || '0');
      if (id) {
        this.queryService.queryProjectById(id).subscribe((project: ProjectModel[]) => this.project = project[0]);
        this.fetchDocuments(id);
      }
    });
    this.expanded.set(parseInt(this.activatedRoute.snapshot.queryParams?.phase) || 0, true);
  }

  fetchDocuments(projectId: number) {
    this.queryService.queryDocumentsByProjectId(projectId).subscribe((docs: DocumentInterface[]) => {
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
 
  deleteProject(project: ProjectModel): void {
    this.mutationService.deleteProject(project._id).subscribe(resp => {
      if (resp) {
        this.router.navigate(['/']);
      }
    })
  }

  addDocument(): void {
    this.modalService.openDocumentModal(
      {} as DocumentInterface,
      this.project._id,
      this.documents,
      (val) => {
        if (val) {
          this.fetchDocuments(this.project._id);
        }
      }
    )
  }

  editDocument(doc: DocumentInterface): void {
    this.modalService.openDocumentModal(
      doc,
      this.project._id,
      this.documents.filter(i => i._id !== doc._id),
      (val) => {
        if (val) {
          this.fetchDocuments(this.project._id);
        }
      }
    )
  }

  deleteDocument(doc: DocumentInterface): void {
    const ids = [doc._id, ...doc.childDocs?.map(val => val._id) || []];
    this.mutationService.deleteDocument(ids).subscribe(_ => {
      const index = this.documents.findIndex(document => document._id === doc._id);
      if (index > -1) {
        this.documents = this.documents.filter(document => document._id !== doc._id);
      } else {
        const parentDoc = this.documents.find(document => document._id === doc.parentid);
        if (parentDoc) {
          parentDoc.childDocs = parentDoc.childDocs?.filter(document => document._id !== doc._id);
        }
      }
    })
  }

  phaseClick(phaseNum: number): void {
    if (!this.expanded.get(phaseNum)) {
      this.expanded.set(phaseNum, true);
      this.router.navigate(
        [], {
          relativeTo: this.activatedRoute,
          queryParams: {
            phase: phaseNum
          }, 
        }
      );
    } else {
      this.expanded.set(phaseNum, false);
    }
  }
}
