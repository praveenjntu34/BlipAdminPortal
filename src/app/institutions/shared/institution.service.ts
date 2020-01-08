import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const localUrl = 'http://localhost:3400/institution/details'
const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient) { }

  getAllInstitutions() {
    return this.http.get(localUrl);
  }

  uploadImage(fileToUpload){
    const formData =  new FormData();
    formData.append('file',fileToUpload, fileToUpload.name);
    return this.http.post(baseUrl + 'institution/upload-file', formData);
  }

  getAllStates() {

    return this.http.get(baseUrl + "states");
  }

  getAllCities(stateId: string) {
    console.log("id here",stateId)
    const formData =  new FormData();
    formData.set("stateId",stateId);
    return this.http.post(baseUrl + "states",formData);
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
