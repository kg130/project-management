import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import * as _fromComponents from "./components";


const routes = [
  { path: '', component: _fromComponents.LoginComponent }
];



@NgModule({
  declarations: [
    _fromComponents.LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}