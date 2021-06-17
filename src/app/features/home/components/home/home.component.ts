import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/app/shared/_models';
import { QueryService } from 'src/app/services/query.service';
import { MutationService } from 'src/app/services/mutation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: ProjectModel[] = [];

  constructor(
    private queryService: QueryService,
    private mutationService: MutationService
  ) { }

  ngOnInit(): void {
    this.queryService.queryProjects().subscribe((resp: any) => {
      if (resp) {
        this.projects = resp;
      }
    })
  }

  deleteProject(project: ProjectModel): void {
    this.mutationService.deleteProject(project._id).subscribe(resp => {
      if (resp) {
        this.projects = this.projects.filter(i => i._id !== project._id);
      }
    })
  }
}
