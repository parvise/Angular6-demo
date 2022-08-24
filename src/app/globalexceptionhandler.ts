import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class Globalexceptionhandler implements ErrorHandler{

    constructor(private injector: Injector) { }    


      
    handleError(error: any): void{
        let router = this.injector.get(Router);
        if(error instanceof HttpErrorResponse){
            console.error("Status:"+error.status);
            console.error("Message"+router.url);
        }else{
            console.error("N/w error or Client Error "+error);
            console.error("Message"+router.url);
        }
    }
}
