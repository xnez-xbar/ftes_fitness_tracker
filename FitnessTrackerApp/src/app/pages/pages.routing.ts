import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    children: [
        { path: '', component: DashboardComponent },
        { path: 'about', component: AboutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
