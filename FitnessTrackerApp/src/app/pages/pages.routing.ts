import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './about/about.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ], 
    children: [
        { path: '', component: DashboardComponent },
        { path: 'about', component: AboutComponent },
        { path: 'account-settings', component: AccountSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
