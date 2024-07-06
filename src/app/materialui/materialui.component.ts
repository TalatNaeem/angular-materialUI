import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '.././emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '.././services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from '.././core/core.service';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-materialui',
  templateUrl: './materialui.component.html',
  styleUrls: ['./materialui.component.css']
})
export class MaterialuiComponent {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _coreService: CoreService){}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({next: (val)=>{
      if(val){
        this.getAllEmployees();
      }
    }})
  }

  getAllEmployees(){
    this._empService.getAllEmployee().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._dialog.open(ConfirmationdialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  deleteEmployee(id: number, name: string){
    const dialogRef = this._dialog.open(ConfirmationdialogComponent, {
      data: name
    });
    dialogRef.afterClosed().subscribe({next: (val)=>{
      if(val){
        this._empService.deleteEmployee(id).subscribe({
          next:(res)=>{
            this._coreService.openSnackBar('Employee Deleted Successfully!', 'Ok');
            this.getAllEmployees();
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }
    }})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({next: (val)=>{
      if(val){
        this.getAllEmployees();
      }
    }})
  }
}
