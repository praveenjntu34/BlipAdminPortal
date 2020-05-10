import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ParentService } from '../shared/parentservice';

@Component({
  selector: 'app-add-parent-csv',
  templateUrl: './add-parent-csv.component.html',
  styleUrls: ['./add-parent-csv.component.css']
})
export class AddParentCsvComponent implements OnInit {


  parentCsvForm: FormGroup;
  img_url: string;
  img_url2: string;
  bannerId: number;
  
  constructor(private formBuilder: FormBuilder,private _parentService: ParentService) { }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };

    this.parentCsvForm.patchValue({
      fileStream: file
    })

    
  }

  addParentCsv() {
    console.log(this.parentCsvForm);
    
    this._parentService.addParentCsv(this.parentCsvForm.value.fileStream)
          .subscribe((data: any) => {
            console.log("response", data);
            window.location.reload();
          })
  }
  ngOnInit() {
    this.parentCsvForm = this.formBuilder.group({
      fileStream: []
    })
  }

}
