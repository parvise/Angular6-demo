import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { LoginForm } from './loginForm';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:1010/api/customers'; 
  private loginUrl = 'http://localhost:1010/api/login';     // URL to web api
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
  }

  deleteCustomer(customer: Customer | number): Observable<Customer> {
    window.alert(typeof customer === 'number');
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }

  login(loginForm: LoginForm): Observable<LoginForm>{
    const url = `${this.loginUrl}`;
    return this.http.post<any>(url,loginForm, httpOptions);
  }
}
