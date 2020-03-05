import { Component, OnInit, OnChanges } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('loggedInProfile'));
    console.log("ssfds", obj);
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.email = obj.email
    this.phoneNumber = obj.phoneNumber
  }

  ngOnChanges() {
   
  }

}
