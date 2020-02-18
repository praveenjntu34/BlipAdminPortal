import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class BannerService{

  addPost(data) {
    let headers = new Headers();
    return this.http.post(environment.baseUrl + 'banner', data);
  }

  addBannerFile(file) {
    let headers = new Headers();

    const formData =  new FormData();
    formData.append('file',file);
    return this.http.post(environment.baseUrl + 'post-banner', formData);
  }


  getAllBanners(relTenantInstitutionId) {
    return this.http.get(environment.baseUrl + 'banner/' + relTenantInstitutionId);
  }



  constructor(private http: HttpClient) { }

  
}
