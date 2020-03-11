import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SettingsService } from './settings.service';
import { JsonPipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  firstName: string = "khjj";
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordForm: FormGroup;

  errors: string;

  keyErrors: string;
  matchError: boolean;
  formSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private settingService: SettingsService,
     private ngxService: NgxUiLoaderService, private matSnack: MatSnackBar) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('loggedInProfile'));
    console.log("ssfds", obj);
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.email = obj.email
    this.phoneNumber = obj.phoneNumber

    this.buildForm();
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.password.statusChanges.subscribe(newPassword => {
      this.confirmPassword.setValidators([Validators.required, Validators.minLength(8), this.confirmPasswordValidator(newPassword)]);
    })

    this.confirmPassword.valueChanges.subscribe(
      () => {
        const pwd = this.password.value;
        this.confirmPassword.setValidators([Validators.required, Validators.minLength(8), this.confirmPasswordValidator(pwd)]);
      }
    );   
  }



  confirmPasswordValidator(confirmPassword: String): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let password: string = control.value;
      let isInValid = (password !== confirmPassword) ? true : false;
      return isInValid ? {'cnfPassword': {value: 'Invalid'}, 'filled': {value: true}} : null;
    };
  }

    
  
  get password() {
    return this.passwordForm.get('newPassword');
  }  
  get confirmPassword() {
    return this.passwordForm.get('reEnterPassword');
  } 

  changePassword() {
    this.formSubmitted = true;
    this.ngxService.start();
    if(this.passwordForm.valid) { 
      let profile = JSON.parse(localStorage.getItem('loggedInProfile'))
      console.log("username t", profile.email);
      
       this.settingService.changePassword(profile.email,this.password.value,)
              .subscribe((data: any) => {
                console.log("change password response",data.response);
                this.matSnack.open(data.response);
                this.ngxService.stop();
              })
    }
  }
  buildForm() {

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required,Validators.minLength(8)]],
      reEnterPassword: ['', [Validators.required, Validators.minLength(8)]]
    }
    )

  }

}
