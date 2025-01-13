import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './pages/article/article.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { authGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'article',
    component: ArticleComponent, canActivate: [authGuardService]
  },
  {
    path: 'login',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
