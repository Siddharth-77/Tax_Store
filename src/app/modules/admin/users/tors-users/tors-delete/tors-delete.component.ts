import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxstoreService } from 'Services/tax-user/taxstore.service';

@Component({
  selector: 'app-tors-delete',
  templateUrl: './tors-delete.component.html',
  styleUrls: ['./tors-delete.component.scss']
})
export class TorsDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TorsDeleteComponent>,
    private taxservice: TaxstoreService,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

  ngOnInit(): void {
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  deleteTorsUser(){
    this.taxservice.deleteTorsUser(this.data).subscribe((res: any)=>[]);
    this.dialogRef.close();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  close(){
    this.dialogRef.close();
  }

}
