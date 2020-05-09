import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { isError } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

  }

  logout() {
    localStorage.removeItem('loggedInRole');
    this.router.navigate(["/"]);
  }

  login() {
    this.authService.looginWithUsername(this.loginForm.value.username, this.loginForm.value.password)
          .subscribe((response: any) => {
            console.log(response);
            
            if(response.jwt) {
             console.log("rrr", response);
             
             localStorage.setItem('loggedInProfile', JSON.stringify(response))

             localStorage.setItem('loggedInRole', response.role)
             localStorage.setItem('loggedInTenantId', response.relTenantInstitutionId)
              if(response.role == 'InstitutionAdmin') {
                this.router.navigate(["/home/admin/posts"]);
              } else {
                this.router.navigate(["/home/institutions"]);
              }
            } else {
              
            }
          }, (error:any) => {
            this.isError = true;
            console.log("Wrong username and password");
          })
  }
}