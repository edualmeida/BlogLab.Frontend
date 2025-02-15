import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuardService } from './guards/auth.guard';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import {ArticleExistsGuard} from './guards/article-exists.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'article',
    component: ViewArticleComponent,
    canActivate: [authGuardService, ArticleExistsGuard],
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'edit-article',
    component: EditArticleComponent,
    canActivate: [adminAuthGuard],
  },
];
