import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './features/auth/auth.module';
import { CreateProjectModule } from './features/createProject/createProject.module';
import { HomeModule } from './features/home/home.module';
import { SummaryModule } from './features/summary/summary.module';
import { AuthGuard } from './shared/utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'login', loadChildren: () => AuthModule },
  { path: 'projects', canActivate: [AuthGuard], loadChildren: () => HomeModule },
  { path: 'summary', canActivate: [AuthGuard], loadChildren: () => SummaryModule },
  { path: 'create', canActivate: [AuthGuard], loadChildren: () => CreateProjectModule },
  { path: 'update', canActivate: [AuthGuard], loadChildren: () => CreateProjectModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
