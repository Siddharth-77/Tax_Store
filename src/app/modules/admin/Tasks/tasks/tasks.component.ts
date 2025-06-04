/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  pageSize = 10;
  pageLength: any;
  pageNumber = 1;
  searchText: any;
  clearSearch: boolean = false;
  searchName: any;

  constructor(
    private dialog: MatDialog,
    private taxService: TaxstoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
      'id',
      'username',
      'firstname',
      'lastname',
      'email',
      'create',
      'action',
      'status'
  ];

  dataSource = new MatTableDataSource<any>();

  getTasksData() {
    this.paginator.pageSize = this.paginator?.pageSize
        ? this.paginator.pageSize
        : 10;

    let params = `?pageSize=${this.paginator.pageSize}&pageNumber=${
        this.paginator.pageIndex + 1
    }`;
    if (this.searchText) {
        params += `&search=${this.searchText}`;
    }
    this.taxService.getAllTasks(params).subscribe((tom: any) => {
        this.dataSource = tom.data.allocatedCases;
        this.pageLength = tom.data.pagination.total;
    });
}

search(val) {
    this.searchText = val;
    this.getTasksData();
}

doFilter(data: any) {
  this.clearSearch = true;
  this.searchName = data;
  this.getTasksData();
}

clearr() {
  this.clearSearch = false;
  this.searchName = '';
  this.getTasksData();
}
showClear(e: any) {
  this.clearSearch = true;
}

addTask(){
  const dialogRef = this.dialog.open(AddTaskComponent);

  // dialogRef.afterClosed().subscribe((tom: any) => {
  //   if (tom != 'close') {
  //     if(tom) {
  //       this.getGstData();
  //     }
  //   }
  // });
}


}
