import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { Institutions } from './institution.data'
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { InstitutionService } from '../../shared/institution.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Institution } from '../../shared/institution-detail.model'
import { State, City } from '../../shared/location.model';
@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list-new.component.html',
  styleUrls: ['./institution-list-new.component.css']
})
export class InstitutionListComponent implements OnInit {

  @Input() data: any;

  name:string;
  stepCount: number = 1;
  loading: boolean = false;
  loading_tab1: boolean = true;
  img_url: string;
  institutionDetailForm: FormGroup;
  allStates: State [] = [];
  allCities: City[] = [];
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
 
  constructor(private modalService: NgbModal,private instService: InstitutionService, private formBuilder: FormBuilder){

    this.modalOptions = {
      backdrop: 'static',
      centered: true,
      backdropClass:'customBackdrop',
      size: 'xl',
      windowClass: 'modal-container'
    }
  }
  
  open(content) {
    
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  saveInstitutionDetails(){
    
  }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };
    this.instService.uploadImage(file)
          .subscribe((data:any) => {
            console.log("file uploaded succesfully", data.pictureId);
            localStorage.setItem("pictureId",data.pictureId);
            this.loading_tab1 = false;
          })

  }



  ngOnInit() {
    this.institutionDetailForm = this.formBuilder.group({
      institutionName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      institutionTypeId: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      remarks: ['', Validators.required], 
      status: [1],
      // pictureId: ['', Validators.required],
    })

    this.instService.getAllStates()
          .subscribe((data: State[]) => {
            this.allStates = data;
          })
  }

  getCities(stateId) {
    this.instService.getAllCities(stateId)
            .subscribe((data: City[]) => {
              this.allCities = data;
            })
  }

  get f() {return this.institutionDetailForm.controls}

  onSubmit() {
    this.stepCount++;
    this.loading = true;
    console.log("test")
    console.log("Success" + JSON.stringify(this.institutionDetailForm.value))
  }

}
