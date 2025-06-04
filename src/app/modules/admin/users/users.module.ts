import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceReportComponent } from './attendence-report/attendence-report.component';
import { TeamsUsersComponent } from './teams-users/teams-users.component';
import { TorsUsersComponent } from './tors-users/tors-users.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TorsAdduserComponent } from './tors-users/tors-adduser/tors-adduser.component';
import { TeamsAddusersComponent } from './teams-users/teams-addusers/teams-addusers.component';
import { TorsDeleteComponent } from './tors-users/tors-delete/tors-delete.component';

const routes: Routes = [
  {
      path: 'tors-users',
      component: TorsUsersComponent,
      title: ' Tax Store - Tors Users',
  },
  {
      path: 'team-users',
      component: TeamsUsersComponent,
      title: ' Tax Store - Team Users',
  },
  {
      path: 'attendance-report',
      component: AttendenceReportComponent,
      title: ' Tax Store - Attendance Report',
  },
];



@NgModule({
  declarations: [AttendenceReportComponent, TeamsUsersComponent, TorsUsersComponent, TorsAdduserComponent, TeamsAddusersComponent, TorsDeleteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class UsersModule { }
