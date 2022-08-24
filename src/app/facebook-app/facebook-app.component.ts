import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider } from "angular-6-social-login";

@Component({
  selector: 'app-facebook-app',
  templateUrl: './facebook-app.component.html',
  styleUrls: ['./facebook-app.component.css']
})
export class FacebookAppComponent implements OnInit {

  user: any;

  constructor(private _socioAuthServ: AuthService) { }

  ngOnInit() {
  }

  // Method to sign in with facebook.
  signIn(platform: string): void {
    platform = FacebookLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        console.log(platform + " logged in user data is= ", response);
        this.user = response;
      }
    );
  }
 
  // Method to log out.
  signOut(): void {
    this._socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');
  }

}
