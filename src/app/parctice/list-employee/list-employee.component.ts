import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { IEmployee } from 'src/app/primeng/practice/input/IEmployee';
import { throwError, Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/practice/confirmdialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InputComponent } from 'src/app/primeng/practice/input/input.component';
import { ExcelService } from 'src/app/shared/excel.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  private employeeList: IEmployee[];
  private notficationStyle: string;
  private message: string;
  private heading: string;


  constructor(private router: Router, private empService: EmployeeServiceService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.getEmployeesList();
  }

  getEmployeesList(): void {
    this.empService.getEmployees().subscribe((list) => {
      this.employeeList = list,
        (err) => {
          return throwError("Fails");
        }

    });
  }

  AddEmployee(jmbotronStyle, empObj?: IEmployee) {
    jmbotronStyle = true;
    const matConfig = new MatDialogConfig();
    matConfig.disableClose = true;
    matConfig.autoFocus = true;
    matConfig.width = '35%';
    matConfig.height = '90%';
    matConfig.data = { jmbotronStyle, empObj };
    let dialogRef = this.dialog.open(InputComponent, matConfig);
    dialogRef.afterClosed().subscribe(res => {
      console.log("Close" + JSON.stringify(res) + "," + this.employeeList);
      if (typeof res === "undefined") {
        //alert('welcome');
        return;

      }
      console.log("Data" + JSON.stringify(res) + "," + this.employeeList);
      this.employeeList = [];
      this.getEmployeesList();
    });
  }

  editEmployee(empObj: IEmployee): void {
    console.log("empObj" + JSON.stringify(empObj));
    this.AddEmployee(true, empObj);
    //this.router.navigate(['employee/editEmployee/', empObj.id]);
  }

  deleteEmployee(id: number): void {
    // this.openConfirmationDialog();
    this.empService.deleteEmployee(id).subscribe(() => {
      console.log("deleted success");
      this.getEmployeesList();
      this.router.navigate(['listEmployee']);

      this.heading = "Success";
      this.message = "Successfully employee record has deleted";
      this.notficationStyle = "success"
      this.toastr.warning('Successfully employee record has deleted', 'Employee Details...!');

    })
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  generateExcel(): void {
    this.excelService.exportAsExcelFile(this.employeeList, 'Employee');
    //this.excelService.exportAsExcelFileStyle(this.employeeList, 'Employee', ["ID", "FULL NAME", "EMAIL", "PHONE", "CONTACT PREFER", "SKILLS"]);
  }
}
