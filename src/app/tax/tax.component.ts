import { Component, OnInit } from '@angular/core';
import { TaxBean } from '../tax-bean';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  private taxBean = new TaxBean();
  constructor() { }

  ngOnInit() {
  }

}
