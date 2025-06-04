/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { GstaddComponent } from './gstadd/gstadd.component';

@Component({
  selector: 'app-gstcases',
  templateUrl: './gstcases.component.html',
  styleUrls: ['./gstcases.component.scss']
})
export class GstcasesComponent implements OnInit {

  // taxService = inject(TaxstoreService);

  pageSize = 10;
  pageLength: any;
  pageNumber = 1;
  searchText: any;

  constructor(
    private dialog: MatDialog,
    private taxService: TaxstoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getGstData();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
      // 'checkbox',
      'id',
      'username',
      'firstname',
      'lastname',
      'email',
      'mobilenumber',
      'flag',
      'role',
      'hourlyreport',
      'create',
      'action',
  ];

  dataSource = new MatTableDataSource<any>();

  getGstData() {
    this.paginator.pageSize = this.paginator?.pageSize
        ? this.paginator.pageSize
        : 10;

    let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
        this.paginator.pageIndex + 1
    }`;
    if (this.searchText) {
        params += `&search=${this.searchText}`;
    }
    this.taxService.getGstList(params).subscribe((tom: any) => {
        this.dataSource = tom.data.gst;
        this.pageLength = tom.data.pagination.total;
    });
}

search(val) {
    this.searchText = val;
    this.getGstData();
}

gstAdd(){
  const dialogRef = this.dialog.open(GstaddComponent);

  dialogRef.afterClosed().subscribe((tom: any) => {
    if (tom != 'close') {
      if(tom) {
        this.getGstData();
      }
    }
  });
}

}
