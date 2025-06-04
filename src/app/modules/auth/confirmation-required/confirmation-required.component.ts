import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationRequiredComponent
{
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    signIn(){

    }
}
