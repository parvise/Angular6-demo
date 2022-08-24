import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mat-confirm-dailog',
  templateUrl: './mat-confirm-dailog.component.html',
  styleUrls: ['./mat-confirm-dailog.component.css']
})
export class MatConfirmDailogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MatConfirmDailogComponent>) { }

  ngOnInit() {
    MatDialogRef
  }

  close() {
    this.dialogRef.close(false);
  }
}
