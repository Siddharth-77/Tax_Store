/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { TeamChangeComponent } from './team-change/team-change.component';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-unallocated',
    templateUrl: './unallocated.component.html',
    styleUrls: ['./unallocated.component.scss'],
})
export class UnallocatedComponent implements OnInit {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    searchText: any;
    downloadUrl: any;

    constructor(
        private dialog: MatDialog,
        private taxService: TaxstoreService,
        private router: Router
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = [
        // 'checkbox',
        'id',
        'username',
        'firstname',
        'lastname',
        'email',
        'mobilenumber',
        'role',
        'hourlyreport',
        'flag',
        'action',
    ];

    dataSource = new MatTableDataSource<any>();

    ngOnInit(): void {
        this.getUnallocatedData();
        this.downloadUrl = environment.downloadUrl;
    }

    changeTeam() {
        const dialogRef = this.dialog.open(TeamChangeComponent);
        // dialogRef.afterClosed().subscribe((tom: any)=>{
        //   this.getUserData();
        // });
    }

    getUnallocatedData() {
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        this.taxService.getUnallocatedCases(params).subscribe((tom: any) => {
            this.dataSource = tom.data.unallocatedCases;
            this.pageLength = tom.data.pagination.total;
        });
    }

    search(val) {
        this.searchText = val;
        this.getUnallocatedData();
    }

    unallocatedDownload(){
        window.open(this.downloadUrl + 'unallocatedReport.xlsx');
    }
}
