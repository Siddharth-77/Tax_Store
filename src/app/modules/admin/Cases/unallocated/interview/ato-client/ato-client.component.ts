/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ato-client',
  templateUrl: './ato-client.component.html',
  styleUrls: ['./ato-client.component.scss']
})
export class AtoClientComponent implements OnInit {
  atoForm: FormGroup;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.atoForm = new FormGroup({
      tfn: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      dob: new FormControl('', Validators.required)
    });
  }

  atoDialogClose(){
    this.dialog.closeAll();
  }

}
