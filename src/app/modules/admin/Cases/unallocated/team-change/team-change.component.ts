/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-change',
  templateUrl: './team-change.component.html',
  styleUrls: ['./team-change.component.scss']
})
export class TeamChangeComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll();
  }
}
