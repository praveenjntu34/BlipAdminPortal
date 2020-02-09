import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  img_url: string;

  constructor() { }

  onFileChanged(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (e: any) => {
      this.img_url = e.target.result;
    };
    // this.instService.uploadImage(file)
    //       .subscribe((data:any) => {
    //         console.log("file uploaded succesfully", data.pictureId);
    //         localStorage.setItem("pictureId",data.pictureId);
    //         this.loading_tab1 = false;
    //       })

  }
  
  ngOnInit() {
  }

}
