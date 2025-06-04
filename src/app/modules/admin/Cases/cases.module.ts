import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UnallocatedComponent } from './unallocated/unallocated.component';
import { TeamChangeComponent } from './unallocated/team-change/team-change.component';
import { InterviewComponent } from './unallocated/interview/interview.component';
import { AtoClientComponent } from './unallocated/interview/ato-client/ato-client.component';
import { InterviewPopupComponent } from './unallocated/interview/interview-popup/interview-popup.component';
import { AtobankdetailsComponent } from './unallocated/interview/atobankdetails/atobankdetails.component';
import { TaxInvoiceComponent } from './unallocated/interview/tax-invoice/tax-invoice.component';
import { RecalculationComponent } from './unallocated/interview/recalculation/recalculation.component';
import { ApproveComponent } from './unallocated/interview/approve/approve.component';
import { FundComponent } from './unallocated/interview/fund/fund.component';
import { AlloctedComponent } from './allocted/allocted.component';

const routes: Routes = [
  {
    path: 'unallocated',
    component: UnallocatedComponent,
    title: ' Tax Store - Unallocated',
  },
  {
    path: 'allocated',
    component: AlloctedComponent,
    title: ' Tax Store - Allocated',
  },
  {
    path: 'unallocated/:interviewId',
    component: InterviewComponent
  }
];

@NgModule({
  declarations: [
    UnallocatedComponent,
    TeamChangeComponent,
    InterviewComponent,
    AtoClientComponent,
    InterviewPopupComponent,
    AtobankdetailsComponent,
    TaxInvoiceComponent,
    RecalculationComponent,
    ApproveComponent,
    FundComponent,
    AlloctedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class CasesModule { }
