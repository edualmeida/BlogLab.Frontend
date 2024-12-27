import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
