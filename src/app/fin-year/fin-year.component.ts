import { Component, OnInit } from '@angular/core';
import { FinanceYearBean } from '../finance-year-bean';
import { Observable } from 'rxjs';
import { of } from 'rxjs'

@Component({
  selector: 'app-fin-year',
  templateUrl: './fin-year.component.html',
  styleUrls: ['./fin-year.component.css']
})
export class FinYearComponent implements OnInit {

  private finYearBean = null;
  private listFinaceData: any = [];
  private newFinBean = null;
  constructor() { }

  ngOnInit() {
    this.finYearBean =
      new FinanceYearBean("", 1);
    //this.listFinaceData.push(new FinanceYearBean("17/18", 1));
  }

  saveFinancYear() {
    console.log(this.listFinaceData.length);
   // this.listFinaceData = this.listFinaceData.filter((e2, i, a) => i === a.finYear.indexOf(this.finYearBean.finYear));
    this.newFinBean = new FinanceYearBean(this.finYearBean.finYear,this.listFinaceData.length+1);
    this.listFinaceData.push(this.newFinBean);
    this.finYearBean = new FinanceYearBean("", this.listFinaceData.length);
    
   // window.alert(JSON.stringify(e1)+","+i+","+JSON.stringify(a);

    
    console.log(this.listFinaceData);
  }

  editRow(data) {
    this.finYearBean = data;

  }

  deleteRow(data) {
    this.listFinaceData.splice(this.listFinaceData.indexOf(data), 1);
    this.finYearBean = new FinanceYearBean("", this.listFinaceData.length);
  }
}
