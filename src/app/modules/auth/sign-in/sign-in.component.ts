/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    @ViewChild('signInnNgForm') signInnNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    otpForm: UntypedFormGroup;
    showAlert: boolean = false;
    otpValue: any;
    change: boolean = false;
    ipAddress: any;
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private snackBar: MatSnackBar,
        private http: HttpClient
    ) {}


    ngOnInit(): void {
        this.http.get<{ip:string}>('https://jsonip.com')
        .subscribe(data => {
          console.log('th data', data);
          this.ipAddress = data.ip;
        });
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        this.otpForm = this._formBuilder.group({
            otp: ['', Validators.required],
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    otpInputChange(data: any) {
        this.otpValue = data;
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }
        this.signInForm.disable();

        this.showAlert = false;
let obj={
    email:this.signInForm.value.email,
    password:this.signInForm.value.password,
    ip:this.ipAddress,
}
        this._authService.signIn(obj).subscribe(
            () => {
                this.change = true;
            },
            (error) => {
                console.log(error);

                this.signInForm.enable();

                this.signInNgForm.resetForm();

                this.alert = {
                    type: 'error',
                    message:error.error.message,
                };

                this.showAlert = true;
            }
        );
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    otpVerify() {
        this.otpForm.disable();

        const obj = {
            email: this.signInForm.value.email,
            otp: this.otpValue,
        };
        console.log(obj);

        this.showAlert = false;

        this._authService.otpVerify(obj).subscribe(
            () => {
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (error) => {

                this.otpForm.enable();

                // this.signInNgForm.resetForm();

                this.alert = {
                    type: 'error',
                    message: error.error.message,
                };
                this.showAlert = true;
            }
        );
    }

    otpResend() {
        this.signIn();
    }

    openSnackBar() {
        this.snackBar.open('Otp Sent Successfully', 'OK', {
            duration: 3000,
        });
    }
}
