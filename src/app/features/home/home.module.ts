import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";

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
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {}