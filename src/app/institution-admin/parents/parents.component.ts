import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddParentModalComponent } from '../add-parent-modal/add-parent-modal.component';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  data: any = [
    1,2,3,4,5
  ]
  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  addParenModal(){
    this.matDialog.open(AddParentModalComponent, {
      width: '1200px',
      height: '700px',
      panelClass: 'custom-dialog-container'
    })
  } 

}
