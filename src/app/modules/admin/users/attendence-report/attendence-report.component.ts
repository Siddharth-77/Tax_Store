/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-attendence-report',
    templateUrl: './attendence-report.component.html',
    styleUrls: ['./attendence-report.component.scss'],
})
export class AttendenceReportComponent implements OnInit {
    pageSize = 10;
    pageLength: any;
    pageNumber = 1;
    searchText: any;
    activatedUsersCheckbox: boolean = false;
    downloadUrl: any;

    constructor(
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private taxservice: TaxstoreService,
        private snackBar: MatSnackBar,
        private spinner: NgxSpinnerService,
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('startPicker') startPicker: MatDatepicker<any>;
    @ViewChild('endPicker') endPicker: MatDatepicker<any>;

    startDate: Date | null = null;
    endDate: Date | null = null;

    displayedColumns: string[] = [
        'username',
        'firstname',
        'lastname',
        'email',
        'hoursworked',
        'hoursrate',
        'price',
    ];

    dataSource = new MatTableDataSource<any>();

    ngOnInit(): void {
        this.getAttendenceData();
        // this.downloadUrl = environment.downloadUrl;
    }

    onDateChange(type: 'start' | 'end', event: any) {
        if (type === 'start') {
            this.startDate = event.value;
            //  this.startPicker.close();
        } else if (type === 'end') {
            this.endDate = event.value;
            // this.endPicker.close();
        }
        this.getAttendenceData();
    }

    getAttendenceData() {
        this.spinner.show();
        this.paginator.pageSize = this.paginator?.pageSize
            ? this.paginator.pageSize
            : 10;

        let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
            this.paginator.pageIndex + 1
        }`;
        if (this.searchText) {
            params += `&search=${this.searchText}`;
        }
        if (this.startDate && this.endDate) {
            params += `&startDate=${this.datePipe.transform(
                this.startDate.toISOString(),
                'yyyy-MM-dd'
            )}&endDate=${this.datePipe.transform(
                this.endDate.toISOString(),
                'yyyy-MM-dd'
            )}`;
        }

        this.taxservice.getAttendence(params).subscribe((res: any) => {
            this.dataSource = res.data.attendence;
            this.pageLength = res.data.pagination.total;
            setTimeout(() => {
                this.spinner.hide();
            }, 2000);
        },
        (error) => {
            this.snackBar.open( error.error.message, 'Ok',{
                duration: 3000
            });
        }
        );
    }

    search(val) {
        this.searchText = val;
        this.getAttendenceData();
    }
    attendanceDownload(){
        // window.open(this.downloadUrl + 'attendenceReport.xlsx', '_blank');
    }

}
