import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { GstdashboardComponent } from './gstdashboard/gstdashboard.component';
import { GstcasesComponent } from './gstcases/gstcases.component';
import { GstaddComponent } from './gstcases/gstadd/gstadd.component';

const routes: Routes = [
  {
    path: 'gstdashboard',
    component: GstdashboardComponent,
    title: ' Tax Store - Gst Dashboard',
  },
  {
    path: 'gstcases',
    component: GstcasesComponent,
    title: ' Tax Store - Gst Cases',
  }
];

@NgModule({
  declarations: [ GstdashboardComponent, GstcasesComponent, GstaddComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class GstModule { }
