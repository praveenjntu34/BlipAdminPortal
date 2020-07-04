import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MatDialogContainer, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-instructor-tab',
  templateUrl: './instructor-tab.component.html',
  styleUrls: ['./instructor-tab.component.css']
})
export class InstructorTabComponent implements OnInit {

  instructorDetails:any;
  constructor(private dialogRef: MatDialogRef<MatDialogContainer>, @Inject(MAT_DIALOG_DATA) public details: any, private matDialog: MatDialog) { 
    this.instructorDetails = details;
    console.log("sw", details);
    
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
