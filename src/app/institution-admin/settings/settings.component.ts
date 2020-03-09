import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnChanges {

  firstName: string = "khjj";
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordForm: FormGroup;

  errors: string;

  keyErrors: string;
  matchError: boolean;
  constructor(private formBuilder: FormBuilder, private settingService: SettingsService) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('loggedInProfile'));
    console.log("ssfds", obj);
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.email = obj.email
    this.phoneNumber = obj.phoneNumber

    this.buildForm();
  }


  ngOnChanges() {
   
  }

  getError() {
    return this.errors;
  }

  setErrors() {
    console.log("check",this.passwordForm.controls)
    this.getFormValidationErrors();
    if(this.keyErrors === 'required') {
      this.errors = "*Please fill the require feild"
    } else if (this.keyErrors === 'minlength') {
      this.errors = '*Password should be atleast 8 characters'
    } else if (this.passwordForm.errors != null && this.passwordForm.errors.invalid) {
      console.log("Match error");
      this.errors = '*' + this.passwordForm.errors.errorMessage
    } 
  }

  changePassword() {
    this.errors = "";
    console.log(this.passwordForm)
   
    this.setErrors();
    if(this.passwordForm.valid) {
      console.log('call API');
      this.settingService
    }
  }
  buildForm() {

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      reEnterPassword: ['', Validators.minLength(8)]
    }, {validator: this.passwordConfirming})

  }

  passwordConfirming(c: AbstractControl): { invalid: boolean, errorMessage: string } {
    if (c.get('newPassword').value !== c.get('reEnterPassword').value) {
        return {invalid: true, errorMessage: 'Passwords doesn\'t match' };
    }
}

getFormValidationErrors() {
  this.keyErrors = null;
  Object.keys(this.passwordForm.controls).forEach(key => {
  const controlErrors: ValidationErrors = this.passwordForm.get(key).errors;
  if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.keyErrors = keyError;
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}
