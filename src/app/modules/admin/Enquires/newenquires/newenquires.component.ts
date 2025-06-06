/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { AddenquiresComponent } from './addenquires/addenquires.component';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-newenquires',
    templateUrl: './newenquires.component.html',
    styleUrls: ['./newenquires.component.scss'],
})
export class NewenquiresComponent implements OnInit {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    searchText: any;
    id: any = '';
    downloadUrl: any;

    constructor(
        private dialog: MatDialog,
        private taxService: TaxstoreService,
        private router: Router
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = [
        'id',
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
        this.getUserData();
        // this.downloadUrl = environment.downloadUrl;
    }

    addUser() {
        const dialogRef = this.dialog.open(AddenquiresComponent);

        dialogRef.afterClosed().subscribe((tom: any) => {
            if(tom != 'close'){
                if(tom){
                    this.getUserData();
                }
            }
        });
    }

    getUserData() {
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `&pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        this.taxService.getAllEnquires(params).subscribe((tom: any) => {
            this.dataSource = tom.data.enquiry;
            this.pageLength = tom.data.pagination.total;
        });
    }
    search(val) {
        this.searchText = val;
        this.getUserData();
    }
    xlsxDown(){
        // window.open(this.downloadUrl + 'enquiresReport.xlsx', '_blank');
    }

    onFilesSelected(){
        const file = new FormData();
    }
}
