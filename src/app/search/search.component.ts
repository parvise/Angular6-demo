import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  public fruits: Array<Object> = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Orange' },
    { id: 3, name: 'StrawBerry' },
    { id: 4, name: 'Banana' },
  ];
  public t1 = "welcom";
  public message:string;

  constructor() { }

  ngOnInit(): void {
    
  }

  fruitTest(id: any) {
    this.t1 = id.id + "-" + id.name;
  }



}
