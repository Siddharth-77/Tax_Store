/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';

@Component({
  selector: 'app-gstadd',
  templateUrl: './gstadd.component.html',
  styleUrls: ['./gstadd.component.scss']
})
export class GstaddComponent implements OnInit {

  torsAdd: FormGroup;
  formValues: any;
  existData: any;
  trick: any[] = [];
  selectedUserData: any;
  trickData: any;
  yearDifference: any;

  constructor(
    private dialog: MatDialog,
    private taxService: TaxstoreService,
    private snackBar: MatSnackBar,
    private dailogRef: MatDialogRef<GstaddComponent>,
    ) { }

  ngOnInit(): void {
    this.torsAdd = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(10)]),
      tfn: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required]),
      // referralCode: new FormControl('', Validators.required),
      clientType: new FormControl('', Validators.required),
    });
    this.existingData();
  }

  existingData(){
    this.taxService.getGstexistingData().subscribe((res: any) => {
      this.trick = res.data.enquiry;
      console.log(this.trick);
  });
  }
  handleSelectData(data: any) {
    console.log('datavaluer' , data);
    this.trickData = data;
    if (this.trickData){
      this.torsAdd.patchValue(this.trickData);
    }
    // this.torsAdd.patchValue({
    //   firstName: data.firstName,
    //   email: data.email,
    //   phoneNumber: data.phoneNumber,
    //   lastName: data.lastName,
    //   tfn: data.tfn,
    //   dob: data.dob,
    //   referralCode: data.referralCode,
    // });
    console.log('this.torsAdd.value', this.torsAdd.value);
  }

  clearData(){
    this.trickData = null;
    this.torsAdd.reset();
  }

  onSubmit(){
  if (this.torsAdd.invalid) {
    alert('jfhdgjh');
      return;
  }
  const obj = {
    ...this.torsAdd.value,
    gst:true
  };
    this.taxService.createEnquiry(obj).subscribe((res: any)=>{
      this.snackBar.open(res.message, 'Close', {
        duration: 3000,
        panelClass: ['alert-success'],
    });
      console.log(res, 'res');
      this.dailogRef.close('submit');
    });
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  dialodClosse(){
    this.dialog.closeAll();
  }

  torsAddAlert(){
    this.snackBar.open('Fill required fields','OK',{
      duration: 3000
    });
  }
}
