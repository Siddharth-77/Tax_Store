/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable eqeqeq */
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseValidators } from '@fuse/validators';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';

@Component({
  selector: 'app-tors-adduser',
  templateUrl: './tors-adduser.component.html',
  styleUrls: ['./tors-adduser.component.scss']
})
export class TorsAdduserComponent implements OnInit {
  torsAdd: FormGroup;
  formValues: any;
  modifyData = this.data;
  userId: any;
  userData: any;
  modify: boolean = false;

  constructor(
    private taxservice: TaxstoreService,
    private dialogRef: MatDialogRef<TorsAdduserComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      password: { data: any };
    }
    ) { }


  ngOnInit(): void {
    console.log('data',this.modifyData);
    this.userData = this.modifyData;
    this.torsAdd = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      role: new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.required]),
      hourlyReport: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),

    },{
      validators: FuseValidators.mustMatch('password', 'cpassword')
    });
    if(this.modifyData){
      this.modify = true;
      this.torsAdd.patchValue({
        firstName:this.userData.firstName,
        lastName:this.userData.lastName,
        email:this.userData.email,
        phoneNumber:this.userData.phoneNumber,
        role:this.userData.role,
        userName:this.userData.userName,
        hourlyReport:this.userData.hourlyReport,
      });
      this.userId=this.userData._id;
      this.torsAdd.get('password').clearValidators();
      this.torsAdd.get('passwordConfirm').clearValidators();
      this.torsAdd.updateValueAndValidity();
    }
  }

  modifyPassword(e: any) {
    if (this.modifyData && e.target.value) {
      this.modifyPasswordControlValidators();
    }
  }

  modifyPasswordControlValidators() {
    this.torsAdd.get('password').setValidators([
      Validators.required,
      Validators.minLength(8)
      // Add more password validation as needed (e.g., pattern validators)
    ]);

    this.torsAdd.get('passwordConfirm').setValidators([
      Validators.required,
      Validators.minLength(8),
      // Custom validator to ensure passwords match
      FuseValidators.mustMatch('password', 'passwordConfirm')
    ]);

    this.torsAdd.get('password').updateValueAndValidity();
    this.torsAdd.get('passwordConfirm').updateValueAndValidity();
  }

  onSubmit(){
    if(this.torsAdd.invalid){
      this.torsAddAlert();
      return;
    }
    let obj;
    if(this.modifyData){
      obj={
        userId:this.userId,
        ...this.torsAdd.value
      };
    }else{
      obj={
        ...this.torsAdd.value
      };
    }
    this.taxservice.createTors(obj).subscribe((tom: any)=>{
      console.log('tom',tom);
      this.dialogRef.close(tom);
    },
    (error) => {
      this.snackBar.open( error.error.message,'OK',{
        duration: 3000
      });
    }
    );
  }
  torsAddAlert(){
    this.snackBar.open('Fill required fields','OK',{
      duration: 3000
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
    this.dialogRef.close('close');
  }

}
