import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatDialogContainer} from '@angular/material/dialog';
@Component({
  selector: 'app-instructor-tab',
  templateUrl: './instructor-tab.component.html',
  styleUrls: ['./instructor-tab.component.css']
})
export class InstructorTabComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MatDialogContainer >) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
