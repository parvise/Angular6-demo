import { Component, OnInit } from '@angular/core';
import { MenuNames } from './menuNames';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  //new MenuNames(2, 'customers', 'Retrieve', true), new MenuNames(3, 'customer/add', 'Create', true)
  menuList= new Array("Login");
  message: string;
  constructor() {

  }

  ngOnInit() {

  }

}
