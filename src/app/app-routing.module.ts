import { AppLayoutComponent } from './Pages/app-layout/app-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/utils/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {
        path: 'project',
        loadChildren: './modules/project/project.module#ProjectModule'
      },
      {
        path: 'task',
        loadChildren: './modules/task/task.module#TaskModule'
      },
      {
        path: '**',
        redirectTo: '/app'
      }
    ],
    // canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
