/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-allocted',
    templateUrl: './allocted.component.html',
    styleUrls: ['./allocted.component.scss'],
})
export class AlloctedComponent implements OnInit {
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

    ngOnInit(): void {
        this.getAllocatedData();
        // this.downloadUrl = environment.downloadUrl;
    }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    displayedColumns: string[] = [
        // 'checkbox',
        'id',
        'name',
        'email',
        'mobile',
        'email',
        'tfn',
        'flag',
        'createdat',
        'source',
        'substatus',
        'status',
    ];

    dataSource = new MatTableDataSource<any>();

    getAllocatedData() {
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        this.taxService.getAlloctedCases(params).subscribe((tom: any) => {
            this.dataSource = tom.data.allocatedCases;
            this.pageLength = tom.data.pagination.total;
        });
    }

    search(val) {
        this.searchText = val;
        this.getAllocatedData();
    }
    allocatedDownload() {
    //   window.open(this.downloadUrl + 'allocatedReport.xlsx');
    }
}
