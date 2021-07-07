import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "src/app/shared/shared.module";
import { ViewProjectModule } from "../viewProject/view-project.module";
import * as _fromComponents from "./components";


const routes: Route[] = [
  { path: '', component: _fromComponents.HomeComponent },
  { path: ':id', loadChildren: () => ViewProjectModule }
];


@NgModule({
  declarations: [
    _fromComponents.HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {}