/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll();
  }
}
