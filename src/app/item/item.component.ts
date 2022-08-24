import { Component, OnInit } from '@angular/core';
import { ItemBean } from '../item-bean';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  private itemBean = new ItemBean();
  constructor() { }

  ngOnInit() {
  }

}
