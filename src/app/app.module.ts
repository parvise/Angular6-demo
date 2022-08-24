import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomerService } from './customer.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ChidComponent } from './chid/chid.component';
import { SearchComponent } from './search/search.component';
import { NavBarService } from './nav-bar.service';
import { FinYearComponent } from './fin-year/fin-year.component';
import { TaxComponent } from './tax/tax.component';
import { ItemComponent } from './item/item.component';
import { CustomerGstComponent } from './customer-gst/customer-gst.component';
import { Globalexceptionhandler } from './globalexceptionhandler';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from './primeng/practice/input/input.component';
import { ListEmployeeComponent } from './parctice/list-employee/list-employee.component';
import { ConfirmdialogComponent } from './practice/confirmdialog/confirmdialog.component';
import { ConfirmationDialogService } from './practice/confirmdialog/confirm-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ChildComponent } from './child/child.component';
import { EmployeesComponent } from './material/employees/employees.component';
import { MaterialModuleModule } from './material/material-module/material-module.module';
import { MatConfirmDailogComponent } from './mat-confirm-dailog/mat-confirm-dailog.component';
// Importing social login module and facebook login provider.
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angular-6-social-login';
import { FacebookAppComponent } from './facebook-app/facebook-app.component';

// Client id for the facebook oauth. This is used for validation of our application to facebook.
// https://developers.facebook.com/
const facebook_oauth_client_id: string = '329813481064871';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(facebook_oauth_client_id)
      }
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    AddCustomerComponent,
    LoginViewComponent,
    WelcomeComponent,
    NavMenuComponent,
    ChidComponent,
    SearchComponent,
    FinYearComponent,
    TaxComponent,
    ItemComponent,
    CustomerGstComponent,
    InputComponent,
    ListEmployeeComponent,
    ConfirmdialogComponent,
    CreateEmployeeComponent,
    ChildComponent,
    EmployeesComponent,
    MatConfirmDailogComponent,
    FacebookAppComponent
  ],
  entryComponents: [
    LoginViewComponent,
    AddCustomerComponent,
    SearchComponent,
    ConfirmdialogComponent,
    InputComponent,
    MatConfirmDailogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    MatDialogModule,
    MaterialModuleModule,
    SocialLoginModule
  ],
  providers: [CustomerService, NavBarService, ConfirmationDialogService, Globalexceptionhandler, { provide: ErrorHandler, useClass: Globalexceptionhandler },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
