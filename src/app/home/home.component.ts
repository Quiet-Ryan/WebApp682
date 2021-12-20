import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';


import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postForm: any;
  followForm: any;
 UserID: any;
 id: any;
 Username: any;
RFollowID: any = [];
appendFollowArray: any = [];
useFollowArray: any = [];

  getAllComments = "https://prod-72.eastus.logic.azure.com/workflows/97f83226876d40cf8081a5bc183924c5/triggers/manual/paths/invoke/comments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RKnqUb3372lmAYoOjfl2f-Kr_Lbfw4xG9WDDRo3s-zk";
  postNewUsers = "https://prod-26.eastus.logic.azure.com:443/workflows/63ff1521c9834a20bc1f82d914167421/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TP0aeDtDfu17o3hpkT5iaI4P4wXaKsyHVWlwgk4Vyx0";
  postnewFollowers = "https://prod-29.eastus.logic.azure.com:443/workflows/06d654479ee74549ba3e1a85606f87d3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=K6to0WDn5l6b_RHxl1bhFvurSsjGoJjE_B7S7rAQofg";


  

  constructor(public webService: WebService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  this.UserID = sessionStorage.getItem("loginId")
  this.Username = sessionStorage.getItem("loginUser")
    this.webService.getImages();
    this.webService.getSocial();
    this.RetrieveOneUser();
    console.log(this.webService.getSocial)
    this.postForm = 
    this.formBuilder.group({
      body: '',
      userID: '',
      postID:  '',
      username: '',
      });
    this.followForm = 
    this.formBuilder.group({
      username: '',
      name: '',
      surname: '',
      birthdate: '',
      email: '',
      password: '',
      id:'',
      Bio: '',
      followersOf: '',
    })
      
  }
  

postContent(data: any, postID: any) {
let postData = new FormData();
postData.append("body", data.body);
postData.append("userID", this.UserID);
postData.append("username", this.Username);
postData.append("postID", postID);

return this.http.post(this.getAllComments, postData); 
}

submitNewAsset(postID: any) {
this.postContent(this.postForm.value, postID)
.subscribe((response: any) => {
  this.postForm.reset();
  console.log(response);
  console.log(this.postForm.value);
})
}


//* get every post ever made 
viewImages() {
  this.webService.getSocial();
  }

//* Get comment of that particual post 
getComments(postID:any){ 
  console.log(postID);
  this.webService.getAllComments(postID) 

  console.log(Response)
}

//* funtionality for the follow button 

follow(userID:any) {
    console.log(userID)
    console.log(this.RFollowID)
    this.RFollowID =  userID
    sessionStorage.setItem('followerID',this.RFollowID);
    
    this.postNewUser(this.followForm.value)
    .subscribe((response: any) => {
      
    
  })
}

postNewUser(data: any) {
  let FData = new FormData();
  FData.append("username", this.webService.log_list.username);
  FData.append("name", this.webService.log_list.name);
  FData.append("id", this.webService.log_list.id);
  FData.append("surname", this.webService.log_list.surname);
  FData.append("birthdate", this.webService.log_list.birthdate);
  FData.append("email", this.webService.log_list.email);
  FData.append("password", this.webService.log_list.password);
  FData.append("Bio", this.webService.log_list.Bio);


  this.RFollowID = sessionStorage.getItem('followerID');
  console.log("First RFollowID",this.RFollowID)
  this.appendFollowArray.push(this.webService.log_list.followersOf)
  console.log("help",this.webService.log_list.followersOf)
  this.appendFollowArray.push(this.RFollowID)
  console.log("please",this.RFollowID)

 
  var str = this.appendFollowArray.join(",");
console.log("what the fuck?!",str)
FData.append("followersOf", str);
  sessionStorage.removeItem("followersOf");
console.log("FData",FData)

  return this.http.post(this.postnewFollowers, FData); 
}

RetrieveOneUser(){
  this.id = sessionStorage.getItem('loginId');
  this.useFollowArray = this.webService.getOneUser(this.id)
 
}


}
