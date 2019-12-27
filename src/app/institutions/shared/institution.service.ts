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

}
