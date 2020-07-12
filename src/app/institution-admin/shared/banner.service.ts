import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod'
import { BehaviorSubject } from 'rxjs';
const localUrl = 'http://localhost:3400/institution/details'
// const baseUrl = 'http://localhost:3400/'
@Injectable({
  providedIn: 'root'
})
export class BannerService{

  constructor(private http: HttpClient) { }

  public updateList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public newBannerData: any;
  
  addPost(data) {
    let headers = new Headers();
    return this.http.post(environment.baseUrl + 'banner', data);
  }

  deleteBanner(data) {

    let httpParams = new HttpParams();
    httpParams.set('bannerId', data);
    let options = { params: httpParams };
    return this.http.delete(environment.baseUrl + 'delete-banner/' + data);
  }

  getAllInstitutions() {
    return this.http.get(environment.baseUrl + 'institution/simple/list');
  }

  addMultipleBanner(banner_file, requestData) {

    let headers = new Headers();

    const formData =  new FormData();
    formData.append('banner_file',banner_file);
    formData.append('data', JSON.stringify(requestData))
    return this.http.post(environment.baseUrl + 'add-multitple-banners', formData);
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

  getAllBannersForInstitution(relTenantInstitutionId) {
    return this.http.get(environment.baseUrl + 'banner/institution/' + relTenantInstitutionId);
  }


  public setNewBannerData(response) {
    // TODO: change date to required format
    console.log("aa", response);
    
    this.newBannerData = response;
    this.updateList.next(true);
  }

  public getNewBannerData() {
    return this.newBannerData;
  }

  public resetNewBannerData() {
    this.newBannerData = null;
  }
  
}
