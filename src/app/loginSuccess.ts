import { MenuNames } from "./menuNames";
import { LoginForm } from "./loginForm";

export class LoginSuccess {
    loginResponse: LoginForm;
    isSubmit: boolean;
    menuList: MenuNames[];

    constructor(loginResponse: LoginForm, isSubmit: boolean, menuList: MenuNames[]) {
        this.loginResponse = loginResponse;
        this.isSubmit = isSubmit;
        this.menuList = menuList;
        
    }
}
