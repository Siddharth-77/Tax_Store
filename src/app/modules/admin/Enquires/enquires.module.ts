import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NewenquiresComponent } from './newenquires/newenquires.component';
import { LoginlogComponent } from './loginlog/loginlog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddenquiresComponent } from './newenquires/addenquires/addenquires.component';
import { UpdateenquiresComponent } from './newenquires/updateenquires/updateenquires.component';
import { AtoDetailsComponent } from './newenquires/updateenquires/ato-details/ato-details.component';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard' ,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: ' Tax Store - Dashboard',
  },
  {
    path: 'newenquires',
    component: NewenquiresComponent,
    title: ' Tax Store - NewEnquires',
  },
  {
    path: 'loginlog',
    component: LoginlogComponent,
    title: ' Tax Store - Loginlog',
  },
  {
    path: 'newenquires/:enquiryId',
    component: UpdateenquiresComponent,
    title: ' Tax Store - NewEnquires',
  },
  {
    path: 'portal',
    component: PortalComponent,
    title: ' Tax Store - Portal',
  }
];



@NgModule({
  declarations: [ NewenquiresComponent, DashboardComponent, LoginlogComponent, AddenquiresComponent, UpdateenquiresComponent, AtoDetailsComponent, PortalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class EnquiresModule { }
