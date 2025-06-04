/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AtoClientComponent } from './ato-client/ato-client.component';
import { InterviewPopupComponent } from './interview-popup/interview-popup.component';
import { AtobankdetailsComponent } from './atobankdetails/atobankdetails.component';
import { TaxInvoiceComponent } from './tax-invoice/tax-invoice.component';
import { RecalculationComponent } from './recalculation/recalculation.component';
import { ApproveComponent } from './approve/approve.component';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {
  isEditable = false;
  primaryForm: FormGroup;
  tripleButton: boolean = false;
  torsForm: boolean = false;
  ffrForm: boolean = false;
  paidForm: boolean = false;
  interviewId: any = '';
  clientId: any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    triple: [''],
    client: ['']
  });

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private taxService: TaxstoreService,
    private router: ActivatedRoute,
    ) {
      this.interviewId = this.router.snapshot.paramMap.get('interviewId');
    }

  ngOnInit(): void {
    this.primaryForm = new FormGroup({
      clientyears: new FormControl(''),
      triple: new FormControl(''),
    });

    this.taxService.getUnalloInter(this.interviewId).subscribe((res: any) => {
      console.log('res', res);
      // this.clientId = res.data.interview;
    });
  }





  searchAtoClient(){
    const dialogRef = this.dialog.open(AtoClientComponent);
  }
  openInterview(){
    const dialogRef = this.dialog.open(InterviewPopupComponent);
  }
  updateBankDetails(){
    const dialogRef = this.dialog.open(AtobankdetailsComponent);
  }
  invoiceLog(){
    const dialogRef = this.dialog.open(TaxInvoiceComponent);
  }
  recalculation(){
    const dialogRef = this.dialog.open(RecalculationComponent);
  }
  approve(){
    const dialogRef = this.dialog.open(ApproveComponent);
  }

  selectChange(){
    this.tripleButton = true;
  }
  tors(){
    this.torsForm = true;
  }
  tors1(){
    this.torsForm = false;
  }
  ffr(){
    this.ffrForm = true;
  }
  ffr1(){
    this.ffrForm = false;
  }
  paid(){
    this.paidForm = true;
  }
  paid1(){
    this.paidForm = false;
  }

}
