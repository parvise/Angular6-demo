import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { Observable } from 'rxjs';

import { ISkills } from '../primeng/practice/input/ISkills';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from '../primeng/practice/input/IEmployee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  empForm: FormGroup;
  fullNameLength = 0;
  employee: IEmployee;
  pageTitle: string;
  jmbotronStyle: boolean = false;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required',
      'minlength': 'Full Name must be greater than or equal 2 characters.',
      'maxlength': 'Full Name must be less than or equal 10 characters.'
    },
    'email': {
      'required': 'Email is required',
      'emailDomain': ' Email id must ends with @hp.com'
    },
    'confirmEmail': {
      'required': 'Confirm-Email is required'
    },
    'emailGroup': {
      'mailMismacth': 'Email & Confirm- email has to be match.'
    },
    'phone': {
      'required': 'Phone is required'
    }
  }

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': ''
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private empService: EmployeeServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.empForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPrefer: ['email', Validators.required],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('hp.com')]],
        confirmEmail: ['', Validators.required],
      }, { validator: CustomValidators.matchEmail() }),
      phone: [''],

      skills: this.fb.array([this.addSkill()])
    });
    //get('fullName')
    this.empForm.valueChanges.subscribe((value: FormGroup) => {
      //this.fullNameLength = value.length;
      //console.log(JSON.stringify(value));
      this.logKeyValuePairs(this.empForm);
      //console.log(this.formErrors);
    })

    this.empForm.get('contactPrefer').valueChanges.subscribe((value: string) => {
      this.onChangeContactPrefernce(value);
    });

    this.route.paramMap.subscribe((param) => {
      const id = +param.get('empObj');
      //const id = this.data.empObj;
      //console.log(id);
      if (id) {
        this.getEmployee(id);
        this.pageTitle = "Edit Eployee";
      }
      else {
        this.pageTitle = "Add Eployee";
        this.employee = {
          id: null,
          fullName: '',
          contactPrefer: '',
          email: '',
          skills: [],
        };
      }
    })



    // this.empForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experience: new FormControl(),
    //     proficeincy: new FormControl()
    //   })
    // });
  }

  getEmployee(id: number): void {
    this.empService.getEmployee(id).subscribe((data: IEmployee) => {
      //console.log(data);
      this.editEmployeeData(data);
      this.employee = data;
    },
      (err: any) => {
        console.error(err);
      }
    )
  }

  editEmployeeData(employee: IEmployee) {
    this.empForm.patchValue({
      fullName: employee.fullName,
      contactPrefer: employee.contactPrefer,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.empForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skill: ISkills[]) {
    const formArray = new FormArray([]);
    skill.forEach((s) => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experience: s.experience,
        proficeincy: s.proficeincy
      }));
    })
    return formArray;
  }

  addSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficeincy: ['beginner', Validators.required]
    })
  }

  loadData(): void {
    this.empForm.patchValue({
      fullName: 'djksfjsdfjksdjja',
      email: 'parvise.md20@gmail.com',
      skills: {
        skillName: 'Java/J2EE, Angular 6',
        experience: null,
        proficeincy: 'expert'
      }
    });

    const formArray = new FormArray([
      new FormControl('Parvise', Validators.required),
      new FormGroup({
        country: new FormControl('India', Validators.required),
        state: new FormControl('AP', Validators.required)
      }),
      new FormArray([
        new FormControl('Male', Validators.required)
      ])
    ]);
    console.log(formArray.value);
  }

  addAdditionalSkills(): void {
    (<FormArray>this.empForm.get('skills')).push(this.addSkill());
  }

  deleteSkillGroup(skillGroupIndex: number): void {
    const formArray = (<FormArray>this.empForm.get('skills'));
    formArray.removeAt(skillGroupIndex);
    formArray.markAsDirty();
    formArray.markAsTouched();
  }

  logKeyValuePairs(formGroup: FormGroup = this.empForm): void {
    //console.log('logKeyValuePairs' + formGroup.controls);
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);

      //console.log("Key :" + key + " Value:" + abstractControl.value);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        // console.log(messages);
        // console.log(key + "," + JSON.stringify(abstractControl.errors));
        // this.formErrors[key] = +messages + " ";
        for (const errorKey in abstractControl.errors) {
          //console.log("errors", errorKey);
          if (errorKey)
            this.formErrors[key] += messages[errorKey] + ' ';
        }
      }
      //abstractControl.markAsDirty();

      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      }
      if (abstractControl instanceof FormArray) {
        for (const group of abstractControl.controls) {
          if (group instanceof FormGroup) {
            this.logKeyValuePairs(group);
          }
        }
      }
    })
    //console.log(this.formErrors);
  }

  onSubmit(): void {
    // this.empForm.get('fullName').value;
    //this.empForm.controls.fullName.value;
    // this.logKeyValuePairs(this.empForm);
    //console.log(this.formErrors);
    //this.empForm.controls.fullName.markAsDirty();
    //this.empForm.controls.email.markAsDirty();
    console.log(this.employee);
    this.employee.fullName = this.empForm.value.fullName;
    this.employee.contactPrefer = this.empForm.value.contactPrefer;
    this.employee.email = this.empForm.value.emailGroup.email
    this.employee.phone = this.empForm.value.phone;
    this.employee.skills = this.empForm.value.skills;

    if (this.employee.id) {
      this.empService.updateEmployee(this.employee).subscribe((data) => {
        this.router.navigate(['listEmployee']);
      })
    } else {
      this.empService.addEmployee(this.employee).subscribe((data) => {
        this.router.navigate(['listEmployee']);
      })

    }
    this.toastr.success('Employee record has saved successfully', 'Employee Details...');

  }

  onChangeContactPrefernce(value: string) {
    const phoneControl = this.empForm.get('phone');
    const emailControl = this.empForm.get('emailGroup');
    if (value === 'phone') {
      phoneControl.setValidators(Validators.required);
      emailControl.get('email').clearValidators();
      emailControl.get('confirmEmail').clearValidators();
    } else {
      emailControl.get('email').setValidators([Validators.required, CustomValidators.emailDomain('hp.com')]);
      emailControl.get('confirmEmail').setValidators([Validators.required]);
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
    emailControl.get('email').updateValueAndValidity();
    emailControl.get('confirmEmail').updateValueAndValidity();
  }

}
