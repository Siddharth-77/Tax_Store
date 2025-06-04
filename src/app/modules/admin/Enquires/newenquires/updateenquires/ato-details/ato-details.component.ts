/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ato-details',
  templateUrl: './ato-details.component.html',
  styleUrls: ['./ato-details.component.scss']
})
export class AtoDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
