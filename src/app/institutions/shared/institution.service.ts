import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const localUrl = 'http://localhost:3400/institution/details'

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient) { }

  getAllInstitutions() {
    return this.http.get(localUrl);
  }

  getInstitutionDetails() {
    return [
      {
        id: 1,
        branchName: "Computer Science and Engineering"
      },
      {
        id:2,
        branchName: "Mechanical Engineering"
      },
      {
        id: 3,
        branchName: "Electrical Engineering"
      },
      {
        id: 4,
        branchName: "Electronics and Communicatio Engineering"
      }
    ]
  }

}
