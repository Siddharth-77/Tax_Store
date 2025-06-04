/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-interview-popup',
  templateUrl: './interview-popup.component.html',
  styleUrls: ['./interview-popup.component.scss']
})
export class InterviewPopupComponent implements OnInit {

  interviewForm: FormGroup;
  appear: boolean = false;
  appear2: boolean = false;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.interviewForm = new FormGroup({
      occupation: new FormControl(''),
      kids: new FormControl(''),
      put1: new FormControl(''),
      put2: new FormControl(''),
      put3: new FormControl(''),
      put4: new FormControl(''),
      put5: new FormControl(''),
      dob: new FormControl(''),
      related: new FormControl(''),
      relatedNo: new FormControl(''),
      third: new FormControl(''),
      forth: new FormControl('')
    });
  }

  interviewDialogClose(){
    this.dialog.closeAll();
  }

  radioChange(){
    this.appear = true;
  }

  radioChanges(){
    this.appear = false;
  }
  radioChange2(){
    this.appear2 = true;
  }

  radioChanges2(){
    this.appear2 = false;
  }

}
