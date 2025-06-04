/* eslint-disable prefer-const */
/* eslint-disable arrow-parens */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseAlertType } from '@fuse/components/alert';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-teams-addusers',
    templateUrl: './teams-addusers.component.html',
    styleUrls: ['./teams-addusers.component.scss'],
})
export class TeamsAddusersComponent implements OnInit {
    torsAdd: FormGroup;
    modify: boolean = false;
    modifyData: any = this.data;
    teamId: any;
    members = [];
    leaders = [];
    selectedMembers = [];
    selectedUser1: any = null;
    selectedUser2: any = null;
    showAlert: boolean = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    users = [];
    userData: any;
    constructor(
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private taxService: TaxstoreService,
        private snackBar: MatSnackBar,
        private detectorRef: ChangeDetectorRef,
        private dailogRef: MatDialogRef<TeamsAddusersComponent>,
        private spinner: NgxSpinnerService,
        private ngZone: NgZone,
        @Inject(MAT_DIALOG_DATA)
        private data: { Data: any }
    ) {
        this.getUsers();
    }

    ngOnInit(): void {
        let data = JSON.parse(localStorage.getItem('userDetails'));
        this.userData = data;
        this.torsAdd = this.fb.group({
            teamName: ['', [Validators.required]],
            teamLeader: [null, [Validators.required]],
            teamMembers: [null, [Validators.required]],
        });
        if (this.modifyData) {
            this.modify = true;
            this.showAlert = false;
            this.teamId = this.modifyData.Data._id;
            this.torsAdd.patchValue(this.modifyData.Data);
            this.leaders.push(this.modifyData.Data.teamLeader);
            this.members = this.modifyData.Data.members;
            this.torsAdd.patchValue({
                teamLeader: this.modifyData.Data.teamLeader._id,
            });
            this.torsAdd
                .get('teamMembers')
                .setValue(this.modifyData.Data.members.map((x) => x._id));
        }
    }

    getUsers() {
        this.taxService.getUserList().subscribe(
            (res: any) => {
                this.leaders = this.leaders.concat(res.data.usersList);
                this.members = this.members.concat(res.data.usersList);
                this.users = res.data.usersList;
                if (this.users.length == 0) {
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message: 'All the users are already in Team',
                    };
                    return;
                } else {
                    this.showAlert = false;
                }
                if (this.modifyData) {
                    this.showAlert = false;
                }
            },
            (err: any) => {
                console.log('err', err);
            }
        );
    }

    submit() {
        if (this.torsAdd.invalid) {
            this.snackBar.open('Please enter the required fields', 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });
            return;
        }
        let obj;
        if (this.modifyData) {
            obj = {
                teamId: this.teamId,
                ...this.torsAdd.value,
            };
        } else {
            obj = {
                ...this.torsAdd.value,
            };
        }

        // this.spinner.show();
        this.taxService.createData(obj).subscribe(
            (res: any) => {
                if (res.data.teamCreate.teamLeader._id == this.userData._id) {
                    localStorage.setItem('userData', JSON.stringify(res.data.teamCreate.teamLeader));
                } else {
                    res.data.teamCreate.teamMembers.forEach((element, i) => {
                        if (element._id == this.userData._id) {
                            localStorage.setItem(
                                'userData',
                                JSON.stringify(
                                    res.data.teamCreate.teamMembers[i]
                                )
                            );
                        }
                    });
                }

                this.snackBar.open(res.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-success'],
                });
                this.dailogRef.close('submit');
                this.spinner.hide();
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });
                console.log('err', err);
                // this.spinner.hide();
            }
        );
    }
    closeDialog() {
        this.dailogRef.close('close');
    }
    selectTeamLeader(e: any) {
        this.members.forEach((element, index) => {
            if (element._id == e._id) this.members.splice(index, 1);
            this.detectorRef.detectChanges();
        });
    }
    selectMembers(e: any) {
        e.forEach((ele) => {
            this.leaders.forEach((element, index) => {
                if (element._id == ele._id) this.leaders.splice(index, 1);
            });
        });
    }
}
