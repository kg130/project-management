import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

import * as _fromComponents from './components';

const routes: any[] = [
  { path: '', component: _fromComponents.SummaryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    _fromComponents.SummaryComponent
  ]
})
export class SummaryModule {}