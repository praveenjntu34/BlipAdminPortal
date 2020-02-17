import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { from, Subscriber } from 'rxjs';
import { Institutions } from './institution.data'
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { InstitutionService } from '../../shared/institution.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Institution } from '../../shared/institution-detail.model'
import { State, City } from '../../shared/location.model';
import { POC, PersonDto } from '../../shared/poc.model';
import { TestBed } from '@angular/core/testing';
import { BranchSection, Branch } from '../../shared/branch-section.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddInstitutionModalComponent } from '../add-institution-modal/add-institution-modal.component';


export class BSections {
  sections: Array<string>
  constructor(){
    this.sections = new Array<string>();
  }
}

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list-new.component.html',
  styleUrls: ['./institution-list-new.component.css']
})
export class InstitutionListComponent implements OnInit,OnChanges {

  data: any;

  name:string;
  img_url: string;
  allStates: State [] = [];
  allCities: City[] = [];
  title = 'ng-bootstrap-modal-demo';
  searchable: boolean = false;

  constructor(private modalService: NgbModal ,private instService: InstitutionService, private formBuilder: FormBuilder
    ,private router: Router, private matDialogue: MatDialog
    ){
      
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    console.log("ccount",this.data[0]);
   
  }
  
  open(content) {

    this.matDialogue.open(AddInstitutionModalComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container'
    })
  }


  filterCity(cityId) {
    this.searchable = true;
    console.log("get", cityId);
    this.instService.getAllInstitutionsByCity(cityId)
          .subscribe((response: any) => {
            this.data = response;
          })
  }

  getPicture(stream) {
    let objectURL = 'data:image/jpeg;base64,' + stream;      
   
    return objectURL;
  }
  closeModal() {
    this.modalService.dismissAll();
  }


  getCities(stateId) {
    this.instService.getAllCities(stateId)
            .subscribe((data: City[]) => {
              this.allCities = data;
            })
  }


  ngOnInit() {
    this.instService.getAllInstitutions()
    .subscribe((data : any) => {
      this.data = data;
    })

    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            this.allStates = data;
          })
  }

  goToDetails(index) {
    this.router.navigate(['/home/institutions',this.data[index].institutionId])
  }
 
}