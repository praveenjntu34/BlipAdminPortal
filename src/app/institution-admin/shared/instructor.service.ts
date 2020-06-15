import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class InstructorService{



  saveInstructor(data) {
    console.log('j', data);
    
    return this.http.put(environment.baseUrl + 'editInstructor', data);
  }

  constructor(private http: HttpClient) { }

  
}
