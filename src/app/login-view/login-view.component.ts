import { Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { LoginForm } from '../loginForm';
import { CustomerService } from '../customer.service';
import { LoginSuccess } from '../loginSuccess';
import { MenuNames } from '../menuNames';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit,AfterViewInit {

  loginform = new LoginForm();
  //message: string = "Nothing";
  isSubmit: boolean;
  loginSuccess: LoginSuccess;
  errorMessage:string;

 @ViewChild("userName") userNameElementRef : ElementRef;

  @Output() public eventEmit = new EventEmitter<LoginSuccess>();

  constructor(private customerService: CustomerService, private router: Router, private navBar: NavBarService) {
    console.log("const called");
  }

  ngAfterViewInit(){
    //this.userNameElementRef.nativeElement.focus();
  }

  ngOnInit() {
    console.log("ngOnInit called");
  }

  login(): void {

    //this.eventEmit.emit(true);
    this.customerService.login(this.loginform).subscribe(
      loginResponse => {
        this.loginform = loginResponse;
        //window.alert(JSON.stringify(this.loginform));

        this.loginSuccess = new LoginSuccess(
          this.loginform, true, [new MenuNames(1, 'logout', 'Logout', true, null),
          new MenuNames(2, 'customers', 'Retrieve', true, null), new MenuNames(3, 'customer/add', 'Create', true, null)]);
        this.eventEmit.emit(this.loginSuccess);
        // console.log("---->" + JSON.stringify(this.loginSuccess));
        this.navBar.updateNavAfterAuth(this.loginform.role);
       // this.router.navigate(['/finYear']);
      },
      error => {
        //console.error("Message"+error.message);
        this.errorMessage = error.message+"->"+this.router.url;
        this.router.navigate(['/login']);
        throw error;
      }
    );




  }

}
