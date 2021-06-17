import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectStatusArr, ProjectTypeArr } from 'src/app/shared/_models';
import { MutationService } from 'src/app/services/mutation.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  project: FormGroup = new FormGroup({});
  projectStatusArr = [...ProjectStatusArr];
  projectTypeArr = [...ProjectTypeArr];

  constructor(
    private mutationService: MutationService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.project = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(''),
      startDate: new FormControl(new Date()),
      size: new FormControl(),
      type: new FormControl(0),
      ownership: new FormControl(''),
      status: new FormControl(0),
    })
  }

  createProject(): void {
    const { startDate, ...val } = this.project.value;
    val.start = new Date(this.project.value.startDate).getTime();
    val.type = parseInt(val.type);
    val.status = parseInt(val.status);
    val._id = "projects";

    console.log(val);
    this.mutationService.createProject([val]).subscribe(resp => {
      if (resp) {
        this.toasterService.successToastr('Project Created');
        this.router.navigate(['/']);
      }
    })
  }
}
