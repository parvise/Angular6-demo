import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { IEmployee } from './primeng/practice/input/IEmployee';
import { Observable } from 'rxjs';
import { ISkillSets } from './primeng/practice/input/IskillSets';
import { IMaterialEmp } from './material/employees/IMaterialEmp';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  //private customersUrl = 'http://localhost:3000/employees';
  private customersUrl = 'http://localhost:1010/add/students';
  private editUrl = 'http://localhost:1010/edit/students';
  private updateUrl = 'http://localhost:1010/update/students';
  private deleteUrl = 'http://localhost:1010/delete/students';
  private fetchSkillSetUrl = 'http://localhost:1010/get/skillsets';
  private fetchMaterialDataUrl = 'http://localhost:1010/get/materialdata';
  private saveMaterialDataUrl = 'http://localhost:1010/save/materialdata';
  private updateMaterialDataUrl = 'http://localhost:1010/update/materialdata';
  private deleteMaterialDataUrl = 'http://localhost:1010/delete/materialdata';


  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:1010/get/students')
  }

  getEmployee(id: number): Observable<IEmployee> {
    const url = `${this.editUrl}/${id}`;
    return this.http.get<IEmployee>(url);
  }

  addEmployee(customer: IEmployee): Observable<IEmployee> {
    // console.log("Saving data: " + JSON.stringify(customer));
    const customerT = this.http.post<IEmployee>(this.customersUrl, customer, httpOptions);
    //console.log("Saving data: " + JSON.stringify(customerT));
    return customerT;
  }

  deleteEmployee(customer: IEmployee | number): Observable<IEmployee> {
    //window.alert(typeof customer === 'number');
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.deleteUrl}/${id}`;

    return this.http.delete<IEmployee>(url, httpOptions);
  }

  updateEmployee(customer: IEmployee): Observable<IEmployee> {
    console.log("service" + customer.id);
    return this.http.put<IEmployee>(`${this.updateUrl}/${customer.id}`, customer, httpOptions);
  }

  getSkillSet(): Observable<ISkillSets[]> {
    return this.http.get<ISkillSets[]>(`${this.fetchSkillSetUrl}`);
  }

  getMaterialData(): Observable<IMaterialEmp[]> {
    return this.http.get<IMaterialEmp[]>(`${this.fetchMaterialDataUrl}`);
  }

  addMaterialData(customer: IMaterialEmp): Observable<IMaterialEmp> {
    console.log("Saving data: " + JSON.stringify(customer));

    const customerT = this.http.post<IMaterialEmp>(this.saveMaterialDataUrl, customer, httpOptions);
    console.log("Saving data: " + JSON.stringify(customerT));
    return customerT;
  }

  updateMaterialData(customer: IMaterialEmp): Observable<IMaterialEmp> {
    console.log("Saving data: " + JSON.stringify(customer));
    const customerT = this.http.put<IMaterialEmp>(this.updateMaterialDataUrl, customer, httpOptions);
    //console.log("Saving data: " + JSON.stringify(customerT));
    return customerT;
  }

  deleteMaterialTable(customer: IMaterialEmp | number): Observable<IMaterialEmp> {
    //window.alert(typeof customer === 'number');
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.deleteMaterialDataUrl}/${id}`;

    return this.http.delete<IMaterialEmp>(url, httpOptions);
  }

  pushFileToStorage(customer: IMaterialEmp, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('customer', "" + customer.id);


    const req = new HttpRequest('POST', 'http://localhost:1010/upload/file', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}

