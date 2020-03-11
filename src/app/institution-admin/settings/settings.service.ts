import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  constructor(private http: HttpClient) { }

  changePassword(username : any, newPassword: any) {
    var requestData = {
      email: username,
      password: newPassword
    }
    return this.http.post(environment.baseUrl + 'change-password',requestData);
  }

}
