import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

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
    RouterModule.forChild(routes)
  ]
})
export class ViewProjectModule {}