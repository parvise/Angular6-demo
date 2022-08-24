import { AbstractControl } from "@angular/forms";
import { stringify } from "querystring";

export class CustomValidators {

    static emailDomain(value: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: any = control.value;

            // console.log("email" + email);
            // if (email instanceof Object) {
            //     //  console.log("email" + email.email);
            //     const domain = email.email.substring(email.email.lastIndexOf("@") + 1);
            //     if (domain === '' || domain.toLowerCase() === value.toLowerCase()) {
            //         return null;
            //     }
            //     return { 'emailDomain': true };
            // }


            const domain = email.substring(email.lastIndexOf("@") + 1);
            if (domain === '' || domain.toLowerCase() === value.toLowerCase()) {
                return null;
            }
            return { 'emailDomain': true };
            //console.log("domain " + domain);
        };
    }

    static matchEmail() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const emailControl = control.get('email');
            const confirmEmailControl = control.get('confirmEmail');
            // console.log("welcome" + emailControl.value + "," + confirmEmailControl.value);
            if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
                return null;
            }
            return { 'mailMismacth': true };
            //console.log("domain " + domain);
        };
    }

    static defaultSelection() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            
            if (control.value > 0){
                console.log("Default:" + control.value);
                return null;
            }
            return { 'skillNameSelect': true };
        };
    }
}