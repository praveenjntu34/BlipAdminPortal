import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class BannerService{




  getAllBanners(relTenantInstitutionId) {
    return this.http.get(environment.baseUrl + 'banner/' + relTenantInstitutionId);
  }



  constructor(private http: HttpClient) { }

  
}
