import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuardService } from './services/interceptors/auth-guard.service';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { adminAuthGuardService } from './services/interceptors/admin-auth-guard.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'create-article',
    component: CreateArticleComponent, canActivate: [adminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
