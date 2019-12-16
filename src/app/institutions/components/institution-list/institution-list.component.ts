import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Institutions } from './institution.data'

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list-new.component.html',
  styleUrls: ['./institution-list-new.component.css']
})
export class InstitutionListComponent implements OnInit {

  name:string;

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
  constructor() {
  }

  ngOnInit() {
  }

}
