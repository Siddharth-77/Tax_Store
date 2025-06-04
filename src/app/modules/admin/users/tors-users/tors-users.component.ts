/* eslint-disable arrow-parens */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable eqeqeq */
import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TorsAdduserComponent } from './tors-adduser/tors-adduser.component';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cloneDeep } from 'lodash';
import { TorsDeleteComponent } from './tors-delete/tors-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription, interval, map, take } from 'rxjs';

@Component({
    selector: 'app-tors-users',
    templateUrl: './tors-users.component.html',
    styleUrls: ['./tors-users.component.scss'],
})
export class TorsUsersComponent implements OnInit, OnDestroy  {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    searchText: any;
    activatedUsers: string = '';
    // sortAZ: boolean = false;
    // sortZA: boolean = false;
    sortingUsers: string = '';
    checkData: any;
    selectedData = [];
    lock: boolean = false;
    isAllSelected: boolean = false;
    loginDetails: any;
    tomen: Subscription;

    count$: Observable<number>;
    constructor(
        private dialog: MatDialog,
        private taxservice: TaxstoreService,
        private snackBar: MatSnackBar,
        private spinner: NgxSpinnerService
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = [
        'checkbox',
        'username',
        'firstname',
        'lastname',
        'email',
        'mobilenumber',
        'role',
        'hourlyreport',
        'action',
    ];

    dataSource = new MatTableDataSource<any>();

    ngOnInit(): void {
        this.loginDetails = JSON.parse(localStorage.getItem('userDetails'));
        this.getUserData();

        this.count$ = interval(1000)
        .pipe(
        take(5), // Emit only the first 5 values
        map((i) => i + 1) // Start from 1 instead of 0
      );
    }

    getUserData() {
        this.spinner.show();
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;

        // if (this.activatedUsers) {
        //     params += `&active=active`;
        // }
        // if (this.deactivatedUsers) {
        //     params += `&active=deactive`;
        // }
        if (this.activatedUsers === 'active') {
            params += `&active=active`;
        } else if (this.activatedUsers === 'deactive') {
            params += `&active=deactive`;
        }
        // if (this.sortAZ) {
        //     params += '&sort=userName&sortValue=1';
        //   }
        // if (this.sortZA) {
        //     params += '&sort=userName&sortValue=-1';
        // }
        if (this.sortingUsers === 'a-z') {
            params += '&sort=userName&sortValue=1';
        } else if (this.sortingUsers === 'z-a') {
            params += '&sort=userName&sortValue=-1';
        }
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        this.tomen = this.taxservice.getAllTors(params).subscribe((res: any) => {
            this.dataSource = res.data.users;
            this.pageLength = res.data.pagination.total;
            this.checkData = res.data.users;
            setTimeout(() => {
                this.spinner.hide();
            }, 2000);
        },
        (error) => {
            this.snackBar.open( error.error.message,'OK',{
                duration: 3000
              });
        }
        );
    }

    ngOnDestroy(){
        if(this.tomen){
            this.tomen.unsubscribe();
        }
    }
    checkAllCheckboxes(e, data) {
        if (e.checked == true) {
            this.selectedData = data;
            this.selectedData.forEach((element, i) => {
                if (element._id == this.loginDetails._id) {
                    this.selectedData.splice(i, 1);
                }
            });
        } else {
            this.selectedData = [];
        }
        console.log("selectedData", this.selectedData);
        data.forEach((item) => {
            item.selected = this.isAllSelected;
        });
        this.lock = this.selectedData.length == 0 ? false : true;
    }

    updateSelectedData(e, item: any) {
        console.log(this.selectedData);
        if (e.checked == true) {
            this.selectedData.push(item);
        } else {
            this.selectedData.forEach((element, i) => {
                if (element._id == item._id) {
                    this.selectedData.splice(i, 1);
                }
            });

        }
        this.lock = this.selectedData.length == 0 ? false : true;
    }

    search(val) {
        this.searchText = val;
        this.getUserData();
    }

    queryData() {
        this.getUserData();
    }

    addUser() {
        const dialogRef = this.dialog.open(TorsAdduserComponent);

        dialogRef.afterClosed().subscribe((tom: any) => {
            if (tom != 'close') {
                if (tom) {
                    this.getUserData();
                }
            }
        },
        (error) => {
            this.snackBar.open( error.error.message,'OK',{
              duration: 3000
            });
          }
        );
    }

    updateUser(data) {
        const dialogRef = this.dialog.open(TorsAdduserComponent, {
            data: cloneDeep(data),
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res != 'close') {
                if (res) {
                    this.getUserData();
                }
            }
        },
        (error) => {
            this.snackBar.open( error.error.message,'OK',{
              duration: 3000
            });
          }
        );
    }

    deleteUser(element) {
        const dialogRef = this.dialog.open(TorsDeleteComponent, {
            data: element._id,
        });
        dialogRef.afterClosed().subscribe((res) => {
            this.getUserData();
        });
    }

    toggleSwitch(data) {
        this.taxservice.toggleTors(data._id).subscribe(
            (res: any) => {
                this.getUserData();
            },
            (error) => {
                this.snackBar.open(  error.error.message,'OK',{
                  duration: 3000
                });
              }
        );
    }


    lockUser(data: any) {
        let detailsArray = [];
        data.forEach((element) => {
            detailsArray.push(element._id);
            // console.log("detailsArray", detailsArray);
        });
        let body = {
            users: detailsArray,
        };
        this.taxservice.deactivateUser(body).subscribe((res: any) => {
            this.getUserData();
        });
    }
    unLockUsers(data: any) {
        let detailsArray = [];
        data.forEach((element) => {
            detailsArray.push(element._id);
            // console.log("detailsArrayunlock", detailsArray);
        });
        let body = {
            users: detailsArray,
        };
        this.taxservice.activateUser(body).subscribe((res: any) => {
            this.getUserData();
        });
    }
}
