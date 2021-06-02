import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './features/auth/auth.module';
import { SummaryModule } from './features/summary/summary.module';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => AuthModule },
  { path: '', canActivate: [AuthGuard], loadChildren: () => SummaryModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
