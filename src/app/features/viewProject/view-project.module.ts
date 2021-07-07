import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from "src/app/shared/shared.module";
import * as _fromComponents from './components';

const routes: Route[] = [
  { path: '', component: _fromComponents.ViewProjectComponent }
];

@NgModule({
  declarations: [
    _fromComponents.ViewProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(routes),
    SweetAlert2Module
  ]
})
export class ViewProjectModule {}