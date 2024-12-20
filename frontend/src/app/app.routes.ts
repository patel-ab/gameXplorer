import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
];
