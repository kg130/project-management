import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";

import * as _fromComponents from './components';


const routes: Route[] = [
  { path: '', component: _fromComponents.CreateProjectComponent },
  { path: ':id', component: _fromComponents.CreateProjectComponent }
];

@NgModule({
  declarations: [
    _fromComponents.CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateProjectModule {}