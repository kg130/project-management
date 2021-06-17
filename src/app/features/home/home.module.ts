import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import * as _fromComponents from "./components";


const routes = [
  { path: '', component: _fromComponents.HomeComponent }
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