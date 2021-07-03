import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as _fromComponents from './_components';
import * as _fromPipes from './_pipes';


@NgModule({
  declarations: [
    _fromComponents.HeaderComponent,
    _fromComponents.DocumentDetailsComponent,

    _fromPipes.ProjectStatusPipe,
    _fromPipes.ProjectTypePipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    _fromComponents.HeaderComponent,
    _fromComponents.DocumentDetailsComponent,

    _fromPipes.ProjectStatusPipe,
    _fromPipes.ProjectTypePipe
  ]
})
export class SharedModule {}