import { Component, OnInit } from '@angular/core';
import { LoginSuccess } from '../loginSuccess';

@Component({
  selector: 'app-chid',
  templateUrl: './chid.component.html',
  styleUrls: ['./chid.component.css']
})
export class ChidComponent implements OnInit {

  loginSuccess:LoginSuccess;
  constructor() { }

  ngOnInit() {
  }

}
