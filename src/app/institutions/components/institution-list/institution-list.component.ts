import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { Institutions } from './institution.data'
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list-new.component.html',
  styleUrls: ['./institution-list-new.component.css']
})
export class InstitutionListComponent implements OnInit {

  @Input() data: any;

  name:string;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
 
  constructor(
    private modalService: NgbModal
  ){
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
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  institutions = [
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("MIT University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("MIT University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
    new Institutions("Newyork University","Last active 15 Oct 2:00 PM","Bolshoy prospect,Petrogradskaya storona,12B","../../../../assets/newyork.jpg",28),
  ]

  ngOnInit() {
  }

}
