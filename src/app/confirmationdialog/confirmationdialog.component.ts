import { Component, Inject, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent {
  private matdialogRef:MatDialogRef<ConfirmationdialogComponent> = inject(MatDialogRef<ConfirmationdialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  Confirmation(){
    this.matdialogRef.close(true);
  }
}
