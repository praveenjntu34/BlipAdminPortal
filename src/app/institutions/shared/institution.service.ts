import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {


  updateInstitutionDetails(updatedForm: any) {
    return this.http.put(environment.baseUrl + 'institution/details',updatedForm);
  }


  addInstructor(instructor) {
    return this.http.post(environment.baseUrl + 'instructor',instructor )
  }

  getAllInstructors(relTenantInstitutionId) {
    
    return this.http.get(environment.baseUrl + 'instructor/' + relTenantInstitutionId)
  }


  addBranch(branchData: any) {
    const branchFormData = new FormData();
    let headers = new Headers();

    console.log("req", branchData)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(environment.baseUrl + 'institution/branch', JSON.stringify(branchData), httpOptions )
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
    return this.http.post(environment.baseUrl + 'institution/section', JSON.stringify(sectionData), httpOptions )
  }

  getPOCDetails(relTenantInstitutionId) {
    return this.http.get(environment.baseUrl + 'institution/poc/' + relTenantInstitutionId);
       
  }

  addPOCDetails(pocData) {
    return this.http.post(environment.baseUrl + 'institution/poc',pocData )
  }


  createInstitutionDetails(data : any) {
    return this.http.post(environment.baseUrl + 'institution/details',data);
  }

  constructor(private http: HttpClient) { }

  getAllInstitutions() {
    return this.http.get(environment.baseUrl + 'institution/details');
  }

  uploadImage(fileToUpload){
    const formData =  new FormData();
    formData.append('file',fileToUpload, fileToUpload.name);
    return this.http.post(environment.baseUrl + 'institution/upload-file', formData);
  }

  getAllStates() {

    return this.http.get(environment.baseUrl + "states");
  }

  getAllCities(stateId: string) {
    console.log("id here",stateId)
    const formData =  new FormData();
    formData.set("stateId",stateId);
    return this.http.post(environment.baseUrl + "states",formData);
  }


  getInstitutionDetails(institutionId) {
    return this.http.get(environment.baseUrl + 'institution/ins-details/' + institutionId);
  }

  getInstitutionBranches(id) {
    return this.http.get(environment.baseUrl + 'institution/branch/' + id)
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
