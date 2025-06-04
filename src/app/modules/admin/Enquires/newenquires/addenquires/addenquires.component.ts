/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';

@Component({
  selector: 'app-addenquires',
  templateUrl: './addenquires.component.html',
  styleUrls: ['./addenquires.component.scss']
})
export class AddenquiresComponent implements OnInit {

  torsAdd: FormGroup;
  formValues: any;

  snackBar = inject(MatSnackBar);

  constructor(
    private dialog: MatDialog,
    private taxService: TaxstoreService,
    private dialogRef: MatDialogRef<AddenquiresComponent>,
    ) { }

  ngOnInit(): void {
    this.torsAdd = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      tfn: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required]),
      referralCode: new FormControl(''),
    });
  }

  onSubmit(){
    if(this.torsAdd.invalid){
      return;
    }
    const obj = {
      ...this.torsAdd.value,
      enquiry: true
    };
    this.torsAdd.value.enquiry = true;
    this.taxService.createEnquiry(obj).subscribe((res: any)=>{
      console.log(res, 'res');
      this.dialogRef.close('submit');
    },
    (err: any) => {
      this.snackBar.open(err.error.message, 'Close', {
          duration: 3000,
          panelClass: ['alert-red'],
      });
      console.log('err', err);

  }
    );
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
}
