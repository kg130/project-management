import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as _fromComponents from './_components';
import * as _fromPipes from './_pipes';


@NgModule({
  declarations: [
    _fromComponents.HeaderComponent,
    _fromComponents.DocumentDetailsComponent,
    _fromComponents.ManageDocumentComponent,

    _fromPipes.ProjectStatusPipe,
    _fromPipes.ProjectTypePipe,
    _fromPipes.StatusColorPipe,
    _fromPipes.ExpireNotifyPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    _fromComponents.HeaderComponent,
    _fromComponents.DocumentDetailsComponent,
    _fromComponents.ManageDocumentComponent,

    _fromPipes.ProjectStatusPipe,
    _fromPipes.ProjectTypePipe,
    _fromPipes.StatusColorPipe,
    _fromPipes.ExpireNotifyPipe,
  ]
})
export class SharedModule {}