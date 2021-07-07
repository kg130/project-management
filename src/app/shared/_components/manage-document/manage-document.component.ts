import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MutationService } from 'src/app/services/mutation.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { DocumentInterface, DocumentStatusArr, Status } from '../../_models';


@Component({
  selector: 'app-manage-document',
  templateUrl: './manage-document.component.html',
  styleUrls: ['./manage-document.component.scss']
})
export class ManageDocumentComponent implements OnInit {

  @Input() projectId!: number;
  @Input() existingDocs: DocumentInterface[] = [];
  @Input() doc: DocumentInterface = {
    expiredate: 0,
    signeddate: 0,
    signedby: '',
    createdby: 'primeDev',
    projectid: this.projectId,
    createddate: new Date().getTime(),
    status: Status.DRAFT,
    expirenotify: 0,
    phase: 1,
    remarks: '',
    parentid: '',
    name: '',
    _id: ''
  } as DocumentInterface;

  documentFormGroup: FormGroup = new FormGroup({});
  phaseArr = [1, 2, 3, 4];
  documentStatusArr = [...DocumentStatusArr];

  get mode(): string {
    return this.doc && this.doc._id ? 'edit' : 'create';
  }

  get parentDocs(): DocumentInterface[] {
    return this.existingDocs.filter(doc => doc.phase === parseInt(this.documentFormGroup.value.phase))
  }

  constructor(
    private mutationService: MutationService,
    private toasterService: ToasterService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.documentFormGroup = new FormGroup({
      name: new FormControl(this.doc.name),
      status: new FormControl(this.doc.status),
      expireDate: new FormControl(this.formatDate(this.doc.expiredate ? new Date(this.doc.expiredate): undefined)),
      signedDate: new FormControl(this.formatDate(this.doc.signeddate ? new Date(this.doc.signeddate): undefined)),
      signedby: new FormControl(this.doc.signedby),
      expirenotify: new FormControl(this.doc.expirenotify || 0 / (1000 * 3600 * 24)),
      phase: new FormControl(this.doc.phase),
      remarks: new FormControl(this.doc.remarks),
      parentid: new FormControl(this.doc.parentid),
    });
  }

  manageDocument(): void {
    const { signedDate, expireDate, ...val } = this.documentFormGroup.value;
    val.signeddate = new Date(signedDate).getTime() || undefined;
    val.expiredate = new Date(expireDate).getTime() || undefined;
    val.expirenotify = val.expirenotify * 24 * 3600 * 1000;
    val.phase = parseInt(val.phase);
    val.status = parseInt(val.status);
    val.parentid = parseInt(val.parentid) || 0;
    val._id = "documents";
    val.projectid = this.projectId;

    if (this.mode === 'edit') {
      val._id = this.doc._id;
    }

    this.mutationService.manageDocument(val).subscribe(resp => {
      if (resp) {
        this.toasterService.successToastr(`Document ${this.mode === 'edit' ? 'Details Saved' : 'Created'}`);
        this.activeModal.close(true);
      }
    })
  }

  private formatDate(d?: Date) {
    if (!d) {
      return '';
    }
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
