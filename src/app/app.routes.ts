import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuardService } from './services/interceptors/auth-guard.interceptor';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { adminAuthGuardService } from './services/interceptors/admin-auth-guard.service';
import {ArticleExistsGuard} from './guards/ArticleExistsGuard';

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
    canActivate: [adminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
