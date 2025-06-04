/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtoDetailsComponent } from './ato-details/ato-details.component';
import {
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-updateenquires',
    templateUrl: './updateenquires.component.html',
    styleUrls: ['./updateenquires.component.scss'],
})
export class UpdateenquiresComponent implements OnInit {
    enquiryForm: FormGroup;
    enquiryId: any = '';
    updateData: any = {};
    clientId: any;
    constructor(
        private dialog: MatDialog,
        private taxService: TaxstoreService,
        private router: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.enquiryId = this.router.snapshot.paramMap.get('enquiryId');
    }

    ngOnInit(): void {
        this.enquiryForm = new FormGroup(
            {
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                secondaryEmail: new FormControl(''),
                phoneNumber: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(9),
                ]),
                secondaryMobile: new FormControl(''),
                tfn: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(9),
                ]),
                dob: new FormControl('', Validators.required),
                disableEmail: new FormControl(false),
                disableSMS: new FormControl(false),
            },
            // { validators: this.requireCheckboxesToBeChecked() }
        );
        this.taxService.enquiryById(this.enquiryId).subscribe((res: any) => {
            this.clientId = res.data.enquiry.clientId._id;
            this.enquiryForm.patchValue({
                firstName: res.data.enquiry.clientId.firstName,
                lastName: res.data.enquiry.clientId.lastName,
                email: res.data.enquiry.clientId.email,
                phoneNumber: res.data.enquiry.clientId.phoneNumber,
                tfn: res.data.enquiry.clientId.tfn,
                dob:  res.data.enquiry.clientId.dob,
            });
            this.updateData = res.data.enquiry;
            // console.log('Edata', res);
        });
    }

    // requireCheckboxesToBeChecked(): ValidatorFn {
    //     return (group: AbstractControl): { [key: string]: any } | null => {
    //         const disableEmail = group.get('disableEmail').value;
    //         const disableSMS = group.get('disableSMS').value;

    //         if (!(disableEmail || disableSMS)) {
    //             return { requireOneChecked: true };
    //         }

    //         return null;
    //     };
    // }

    onSubmit() {
        this.enquiryForm.markAllAsTouched();
        if (this.enquiryForm.invalid) {
            // console.log(this.enquiryForm.value);
            this.formAlert();
        } else {
            let trop;
            if (this.updateData) {
                trop = {
                    clientId: this.clientId ,
                    ...this.enquiryForm.value,

                };
            }
            this.taxService.updateEnquiry(trop).subscribe((res: any) => {
                console.log('res', res);
            });
        }
    }
    formAlert() {
        this.snackBar.open('Fill the required Feilds', 'OK', {
            duration: 2000,
        });
    }

    atoSearch() {
        const dialogRef = this.dialog.open(AtoDetailsComponent);
    }
}
