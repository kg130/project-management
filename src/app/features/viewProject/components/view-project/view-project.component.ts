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
        this.queryService.queryDocumentsByProjectId(id).subscribe((docs: DocumentInterface[]) => this.documents = docs);
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
    this.mutationService.deleteDocument(doc._id).subscribe(resp => {
      if (resp) {
        this.documents = this.documents.filter(document => document._id !== doc._id);
      }
    })
  }
}
