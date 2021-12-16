import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  postForm: any;
  delForm: any;
  selectedfile: any;
  UserID: any;
  Username: any;
  IUPS = "https://prod-78.eastus.logic.azure.com:443/workflows/6b4db85fd1c64c53b7790ad5e99e2064/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lY1aoLHSCkadKsPAK-jQkJcKJtqntEHofXZEsTNhD8I";
  LoopDel= "https://prod-37.eastus.logic.azure.com:443/workflows/664a0091cf96494eba1a769860e351e5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jDmUhIrrk_kvuQF2O5euJrhHm_zVZF78_mt2Qtummsk";

  constructor(public webService: WebService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.UserID = sessionStorage.getItem("loginId")
    this.Username = sessionStorage.getItem("loginUser")
    this.postForm = 
    this.formBuilder.group({
      body: '',
      title: '',
      userID: '',
      userName: '',
      filePath: 'https://blobstoragecom682.blob.core.windows.net'
      });
  }


onFileSelect(event: any) {
  /**testing event  change below */
  console.log(event)
  this.selectedfile = <File>event.target.files[0];
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.postForm.get('filePath').setValue(file);
  }
}

postContent(data: any) {
  let postData = new FormData();
  postData.append("body", data.body);
  postData.append("userID", this.UserID);
  postData.append("username", this.Username);
  postData.append("title", data.title);
  postData.append("File", this.selectedfile);

  return this.http.post(this.IUPS, postData); 
}

submitNewAsset() {
  this.postContent(this.postForm.value)
  .subscribe((response: any) => {
    this.postForm.reset();
    console.log(response);
    console.log(this.postForm.value);
  })
}

delete_doc(data:any){
  console.log(data.id)
  return this.http.delete(this.LoopDel,this.selectedfile.id)
}

}