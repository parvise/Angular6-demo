import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuNames } from './menuNames';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {


  private isLoggedIn = new Subject<boolean>();
  private links: MenuNames[];


  constructor() {
    this.addItem(this.getMenus());
    this.isLoggedIn.next(false);
  }

  getMenus() {
    return [new MenuNames(1, 'login', 'Login', true, null),
    new MenuNames(2, 'customers', 'Retrieve', true, null),
    new MenuNames(3, 'customer/add', 'Create', true, null),
    new MenuNames(4, 'search', 'Search', true, null),
    new MenuNames(5, 'newEmployee', 'CreateEmployee', true, null),
    new MenuNames(6, 'listEmployee', 'ListEmployee', true, null),
    new MenuNames(7, 'matDesign', 'AngularMaterial', true, null),
    new MenuNames(8, 'facebook', 'FaceBook', true, null)]
  }

  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.updateItem(this.getMenus());
    }
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });
    //window.alert(role);
    //this.updateItem([new MenuNames(1, 'login', 'User', true)]);
    if (role === 'User Role') {
      this.updateItem([new MenuNames(1, 'logout', 'Logout', true, null), new MenuNames(1, 'login', 'User', true, null),
      new MenuNames(1, 'master', 'Master', true,
        [new MenuNames(1, 'finYear', 'Financial Year', true, null),
        new MenuNames(2, 'tax', 'Tax', true, null),
        new MenuNames(3, 'item', 'Item', true, null),
        new MenuNames(4, 'customerGst', 'Customer', true, null)]
      )
      ]);
    } else if (role === 'Admin Role') {
      this.updateItem([new MenuNames(1, 'logout', 'Logout', true, null), new MenuNames(1, 'login', 'Admin', true, null)]);
    }
  }

  addItem(menus: MenuNames[]) {
    this.links = menus;
  }

  updateItem(menus: MenuNames[]) {
    menus.forEach((menu, index) => {
      this.links.push(menu);
    });
    // window.alert(JSON.stringify(this.links));

  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      // window.alert(JSON.stringify(link)+","+index+","+text);
      if (link.title === text) {
        this.links.splice(index);

      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
