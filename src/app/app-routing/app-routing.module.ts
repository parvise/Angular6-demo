import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { LoginViewComponent } from '../login-view/login-view.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SearchComponent } from '../search/search.component';
import { TaxComponent } from '../tax/tax.component';
import { ItemComponent } from '../item/item.component';
import { CustomerGstComponent } from '../customer-gst/customer-gst.component';
import { FinYearComponent } from '../fin-year/fin-year.component';
import { InputComponent } from '../primeng/practice/input/input.component';
import { ListEmployeeComponent } from '../parctice/list-employee/list-employee.component';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EmployeesComponent } from '../material/employees/employees.component';
import { FacebookAppComponent } from '../facebook-app/facebook-app.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'logout', component: LoginViewComponent },
  { path: 'finYear', component: FinYearComponent },
  { path: 'tax', component: TaxComponent },
  { path: 'item', component: ItemComponent },
  { path: 'customerGst', component: CustomerGstComponent },
  { path: 'customer/add', component: AddCustomerComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'matDesign', component: EmployeesComponent },
  { path: 'facebook', component: FacebookAppComponent },
  {
    path: 'employee', children: [
      { path: '', component: InputComponent },
      { path: 'editEmployee/:empObj', component: InputComponent },
    ]
  },
  { path: 'newEmployee', component: CreateEmployeeComponent },
  { path: 'listEmployee', component: ListEmployeeComponent },
  { path: '', redirectTo: 'employee', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

