import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input("parentData") public t1;
  @Input("parentArray") public fruits;
  @Output() public childEvent= new EventEmitter();
  @ViewChild("key") userNameElementRef : ElementRef;

  constructor() { }

  ngOnInit() {
  }

  fireEvent(value?:string){
    //alert(value);
    //this.fruits.push({id:this.fruits.length+1,name:value});
    this.childEvent.emit({id:this.fruits.length+1,name:value});
    this.userNameElementRef.nativeElement.value="";
  }

}
