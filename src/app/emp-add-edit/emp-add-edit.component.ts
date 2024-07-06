import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CustomValidator } from '../Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  currentDate = new Date();
  education: string[]=[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]
  empForm: FormGroup;
  private empService:EmployeeService = inject(EmployeeService);
  private matdialogRef:MatDialogRef<EmpAddEditComponent> = inject(MatDialogRef<EmpAddEditComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
  ){}

  ngOnInit() {
      this.empForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, CustomValidator.NoSpaceAllowed]),
        lastname: new FormControl('', [Validators.required, CustomValidator.NoSpaceAllowed]),
        email: new FormControl('', Validators.required),
        dob: new FormControl('', [Validators.required, CustomValidator.AgeValidator]),
        gender: new FormControl('', Validators.required),
        education: new FormControl('', Validators.required),
        companyname: new FormControl('', Validators.required),
        experience: new FormControl('', [Validators.required, CustomValidator.minValueOne]),
        package: new FormControl('',[Validators.required, CustomValidator.minValueOne]),
      });

      if(this.data)
        this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this.empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (res)=>{ this._coreService.openSnackBar('Employee Updated Successfully!', 'Ok'); this.matdialogRef.close(true);},
          error: (err)=>{ console.log(err)}
        });
      }
      else{
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (res)=>{ this._coreService.openSnackBar('Employee Added Successfully!', 'Ok'); this.matdialogRef.close(true);},
          error: (err)=>{ console.log(err)}
        });
      }
    }
  }
}
