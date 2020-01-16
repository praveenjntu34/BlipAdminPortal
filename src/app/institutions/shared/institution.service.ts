import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const localUrl = 'http://localhost:3400/institution/details'
const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {


  addBranch(branchData: any) {
    const branchFormData = new FormData();
    let headers = new Headers();

    console.log("req", branchData)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(baseUrl + 'institution/branch', JSON.stringify(branchData), httpOptions )
  }

  addSection(sectionData){
    const branchFormData = new FormData();
    let headers = new Headers();

    console.log("req", sectionData)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(baseUrl + 'institution/section', JSON.stringify(sectionData), httpOptions )
  }


  addPOCDetails(pocData) {
    return this.http.post(baseUrl + 'institution/poc',pocData )
  }


  createInstitutionDetails(data : any) {
    return this.http.post(baseUrl + 'institution/details',data);
  }

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


  getInstitutionDetails(institutionId) {
    return this.http.get(baseUrl + 'institution/ins-details/' + institutionId);
  }

  getBranches() {
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
