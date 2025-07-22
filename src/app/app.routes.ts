import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { App } from './app';
import { TaskManagerComponent } from './components/task-manager.component';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './components/sign-up.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: TaskManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
