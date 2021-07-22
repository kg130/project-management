import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectModel, ProjectStatusArr, ProjectTypeArr } from 'src/app/shared/_models';
import { MutationService } from 'src/app/services/mutation.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QueryService } from 'src/app/services/query.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  project: ProjectModel = {} as ProjectModel;
  projectFormGroup: FormGroup = new FormGroup({});
  projectStatusArr = [...ProjectStatusArr];
  projectTypeArr = [...ProjectTypeArr];

  get mode(): string {
    return this.project && this.project._id ? 'edit' : 'create';
  }

  constructor(
    private mutationService: MutationService,
    private queryService: QueryService,
    private toasterService: ToasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectFormGroup = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(''),
      startDate: new FormControl(new Date()),
      size: new FormControl(),
      type: new FormControl(0),
      ownership: new FormControl(''),
      status: new FormControl(0),
    });
    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.queryService.queryProjectById(parseInt(params.id)).subscribe(project => {
          this.project = project[0] || {};
          this.projectFormGroup = new FormGroup({
            name: new FormControl(this.project.name),
            location: new FormControl(this.project.location),
            startDate: new FormControl(this.formatDate(new Date(this.project.start))),
            size: new FormControl(this.project.size),
            type: new FormControl(this.project.type),
            ownership: new FormControl(this.project.ownership),
            status: new FormControl(this.project.status),
          })
        })
      }
    });
  }

  createProject(): void {
    const { startDate, ...val } = this.projectFormGroup.value;
    val.start = new Date(startDate).getTime();
    val.type = parseInt(val.type);
    val.status = parseInt(val.status);

    let subscription: Observable<any>;
    if (this.mode === 'edit') {
      val._id = this.project._id;
      subscription = this.mutationService.manageProject([val]);
    } else {
      val._id = "projects";
      subscription = this.mutationService.manageProject([val]).pipe(switchMap(resp => {
        if (resp) {
          return this.mutationService.createDocuments(resp?.tempids['projects']);
        }
        return [];
      }))
    }
    subscription.subscribe(resp => {
      if (resp) {
        this.toasterService.successToastr(`Project ${this.mode === 'edit' ? 'Edited' : 'Created'}`);
        this.router.navigate(['/']);
      }
    })
  }

  private formatDate(date: Date) {
    const d = date;
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
