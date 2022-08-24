import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMaterialEmp } from './IMaterialEmp';
import { throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatConfirmDailogComponent } from 'src/app/mat-confirm-dailog/mat-confirm-dailog.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  materailEmp: IMaterialEmp[];
  materialData: IMaterialEmp;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'gender', 'isPermanent', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  form = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl("", Validators.minLength(4)),
    email: new FormControl(""),
    hireDate: new FormControl(""),
    gender: new FormControl("1"),
    department: new FormControl("1"),
    permanent: new FormControl(false),
  });

  defaultImg: string = "/assets/images/upload-to-cloud.png";
  fileTODownload: File = null;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private route: ActivatedRoute,
    private empService: EmployeeServiceService,
    private router: Router,
    private toastr: ToastrService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.getMaterialData();

  }

  getMaterialData() {
    this.empService.getMaterialData().subscribe((list) => {
      this.materailEmp = list,
        (err) => {
          return throwError("Fails");
        }
      this.listData = new MatTableDataSource(this.materailEmp);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      /*this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };*/
    });
  }

  departments = [
    { "id": 1, name: "CSE" },
    { "id": 2, name: "ECE" },
    { "id": 3, name: "EEE" },
    { "id": 4, name: "MEC" },
  ]

  resetForm() {
    this.form.reset();
    // alert("welcome");
    this.form.setValue({
      id: 0,
      fullName: "",
      email: "",
      hireDate: "",
      gender: '1',
      department: "0",
      permanent: true,

    })
    this.defaultImg = "/assets/images/upload-to-cloud.png";
   // this.fileTODownload = null;
  }



  onSubmit(): void {
    this.materialData = this.form.value;
    //this.form.value.fullName;
    if (this.materialData.id === null || this.materialData.id == 0) {
      this.empService.addMaterialData(this.materialData).subscribe((data) => {
        this.materialData = data;
        console.log("Design: " + JSON.stringify(this.materialData));

        this.empService.pushFileToStorage(this.materialData, this.fileTODownload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
            this.router.navigate(['matDesign']);
            this.toastr.success('Employee record has Saved Successfully.', 'Employee Details...');
            this.materailEmp = null;
            this.defaultImg = "/assets/images/upload-to-cloud.png";
            this.listData._updateChangeSubscription;
            this.getMaterialData();
            this.resetForm();
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }

        });


      })
    } else {
      this.empService.updateMaterialData(this.materialData).subscribe((data) => {
        this.materialData = data;
        console.log("Design: " + JSON.stringify(this.materialData));
        this.empService.pushFileToStorage(this.materialData, this.fileTODownload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
            this.router.navigate(['matDesign']);
            this.toastr.success('Employee record has Updated Successfully.', 'Employee Details...');
            this.materailEmp = null;
            this.defaultImg = "/assets/images/upload-to-cloud.png";
            this.listData._updateChangeSubscription;
            this.getMaterialData();
            this.resetForm();
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }

        });

      })
    }



  }

  clearSearch() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  edit(row) {
    this.form.patchValue(row);
    console.log("____" + JSON.stringify(row));
    /* this.form.setValue({
       id: row.id,
       fullName: row.fullName,
       email: row.email,
       hireDate: row.hireDate,
       gender: row.gender,
       department: row.department,
       permanent: row.permanent,
 
     })*/
    this.defaultImg = "/assets/images/" + row.fileName;
  }

  onDelete(customer: IMaterialEmp) {
    // if (confirm("Are you sure want to delete record! " + id))
    this.matDialog.open(MatConfirmDailogComponent, {
      width: '390px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      position: { top: '10px' },
      data: {
        message: "Are you sure want to delete record! " + customer.id,
      }
      //top: '10px',
    }).afterClosed().subscribe(data => {
      console.log("deleted" + data);
      if (data) {
        this.empService.deleteMaterialTable(customer).subscribe(() => {

          this.materailEmp = [];
          this.getMaterialData();
          this.resetForm();
          this.toastr.warning('Employee record has Deleted successfully', 'Employee Details...');
        })
      }
    });

  }

  handleFileInput(files: FileList) {
    this.fileTODownload = files.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultImg = event.target.result;
    }
    reader.readAsDataURL(this.fileTODownload);
  }
}
