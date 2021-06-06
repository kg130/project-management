import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as _fromComponents from './_components';


@NgModule({
  declarations: [
    _fromComponents.HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    _fromComponents.HeaderComponent
  ]
})
export class SharedModule {}