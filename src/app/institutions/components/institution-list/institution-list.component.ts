import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { from, Subscriber, Subscription } from 'rxjs';
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
import { NgxUiLoaderService } from 'ngx-ui-loader';


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
export class InstitutionListComponent implements OnInit,OnChanges, OnDestroy {

  private subscriptions: Subscription[] = [];
  data: any;
  name:string;
  img_url: string;
  allStates: State [] = [];
  allCities: City[] = [];
  title = 'ng-bootstrap-modal-demo';
  searchable: boolean = false;
  pageArray: Array<number>;
  selectedPage: number = 1;
  currentIndex: number = 1;
  constructor(private modalService: NgbModal ,private instService: InstitutionService, private formBuilder: FormBuilder
    ,private router: Router, private matDialogue: MatDialog, private ngxService: NgxUiLoaderService
    ){
      
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    console.log("ccount",this.data[0]);
   
  }
  
  open(content) {
    this.matDialogue.open(AddInstitutionModalComponent, {
      width: '800px',
      height: '500px',
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
    this.ngxService.start();

    this.instService.getAllInstitutions()
    .subscribe((data : any) => {
      this.ngxService.stop();
      this.data = data;
      console.log("data to add", data);
      
      this.pageArray = new Array(Math.ceil(this.data[0].count/10))
      console.log("PA",this.pageArray);
    })

    this.instService.getAllStates()
    .subscribe((data: State[]) => {
      this.allStates = data;
    });

    this.updateTableData();

  }

  getCurrentPage(pageNo: number) {
    this.ngxService.start();
    console.log("default config");
    
    this.selectedPage = pageNo;
    this.instService.getAllInstitutionsByPage(pageNo - 1)
    .subscribe((data : any) => {
    this.ngxService.stop();
      this.data = data;
    })
  }

  goToDetails(index) {
    console.log("indexed", this.data[index]);
    
    this.router.navigate(['/home/institutions',this.data[index].relTenantInstitutionId])
  }

  private updateTableData() {
    this.subscriptions.push(this.instService.updateList
      .subscribe(isUpdated => {
        if (isUpdated) {
          const newDataToAdd = this.instService.getNewInstituationData();
          this.instService.resetNewInstituationData();
          if(newDataToAdd != null) {
            this.data.push(newDataToAdd)
          }
        }
      }))
  }

  ngOnDestroy(): void {

  }
 
}