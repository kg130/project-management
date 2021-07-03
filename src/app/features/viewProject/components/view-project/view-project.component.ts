import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  expanded: Map<number, boolean> = new Map().set(1, true);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private queryService: QueryService,
    private mutationService: MutationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params.id || '0');
      if (id) {
        this.queryService.queryProjectById(id).subscribe((project: ProjectModel[]) => this.project = project[0]);
        this.queryService.queryDocumentsByProjectId(id).subscribe((docs: DocumentInterface[]) => {
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
    });
  }

  deleteProject(project: ProjectModel): void {
    this.mutationService.deleteProject(project._id).subscribe(resp => {
      if (resp) {
        this.router.navigate(['/']);
      }
    })
  }

  editDocument(doc: DocumentInterface): void {
    this.mutationService.manageDocument([doc]).subscribe(resp => {
      if (resp) {
        this.documents = this.documents.filter(document => document._id !== doc._id);
        this.documents.push(doc);
      }
    })
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
    } else {
      this.expanded.set(phaseNum, false);
    }
  }
}
