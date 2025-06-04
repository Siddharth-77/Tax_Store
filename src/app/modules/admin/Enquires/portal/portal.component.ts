/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    searchText: any;

    constructor(
        private dialog: MatDialog,
        private taxService: TaxstoreService,
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
        this.getPortalData();
    }

    addUser() {
        // const dialogRef = this.dialog.open(AddenquiresComponent);
        // dialogRef.afterClosed().subscribe((tom: any)=>{
        //   this.getUserData();
        // });
    }

    updateEnquiry() {
        // this.router.navigateByUrl('/enquires/updateenquires');
    }

    getPortalData() {
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        this.taxService.getPortalEnquiry(params).subscribe((res: any) => {
            this.dataSource = res.data.enquiry;
            this.pageLength = res.data.pagination.total;
        });
    }

    search(val) {
        this.searchText = val;
        this.getPortalData();
    }
}
