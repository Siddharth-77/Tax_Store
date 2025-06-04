/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recalculation',
  templateUrl: './recalculation.component.html',
  styleUrls: ['./recalculation.component.scss']
})
export class RecalculationComponent implements OnInit {
  recalculation: FormGroup;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recalculation = new FormGroup({
      recalcu: new FormControl(''),
    });
  }
  close(){
    this.dialog.closeAll();
  }

}
