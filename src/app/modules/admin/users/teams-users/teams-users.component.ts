/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable eqeqeq */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamsAddusersComponent } from './teams-addusers/teams-addusers.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import cloneDeep from 'lodash-es/cloneDeep';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-teams-users',
    templateUrl: './teams-users.component.html',
    styleUrls: ['./teams-users.component.scss'],
})
export class TeamsUsersComponent implements OnInit {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    itemData: any;
    show = false;
    searchText: any;
    activatedUsers: string = '';
    // sortAZ: boolean = false;
    // sortZA: boolean = false;
    sortingUsers: string = '';

    constructor(
        private dialog: MatDialog,
        private taxService: TaxstoreService,
        private snackBar: MatSnackBar,
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = [
        // 'checkbox',
        'username',
        'firstname',
        'lastname',
        'email',
        'mobilenumber',
        'action',
    ];

    dataSource = new MatTableDataSource<any>();

    ngOnInit(): void {
        this.getUserData();
    }

    getUserData() {
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        // search filter query
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        // if (this.activatedUsers) {
        //     params += `&active=active`;
        // }
        // if (this.deactivatedUsers) {
        //     params += `&active=deactive`;
        // }
        // active and inactive users filter
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
        // A-Z Sorting
        if (this.sortingUsers === 'a-z') {
            params += '&sort=userName&sortValue=1';
          } else if (this.sortingUsers === 'z-a') {
            params += '&sort=userName&sortValue=-1';
          }
        this.taxService.getAllTeam(params).subscribe((res: any) => {
            this.dataSource = res.data.team;
            this.pageLength = res.data.pagination.total;
            this.itemData = res.data.team;
            console.log(res);
            // this.itemData.map(show => true);
        });
    }
    queryData() {
        this.getUserData();
    }

    search(val) {
        this.searchText = val;
        this.getUserData();
    }

    addUser() {
        const dialogRef = this.dialog.open(TeamsAddusersComponent, {
            autoFocus: false,
            panelClass: 'onlineSheet',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result != 'close' && result) {
                this.getUserData();
            }
        });
    }

    updateUser(data) {
        const edit = this.dialog.open(TeamsAddusersComponent, {
            panelClass: 'onlineSheet',
            data: {
                Data: cloneDeep(data),
            },
        });
        edit.afterClosed().subscribe((result) => {
            if (result != 'close') {
                if (result) {
                    this.getUserData();
                }
            }
        });
    }

    popup(i) {
        this.itemData.forEach((element) => {
            element.show = false;
        });
        this.itemData[i].show = true;
    }
    pop(i) {
        this.itemData[i].show = false;
    }

}
