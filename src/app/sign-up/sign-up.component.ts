import { Component, OnInit } from '@angular/core';

import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: any;
  delForm: any;
  array: any = [];
  selectedfile: any;
  postNewUsers = "https://prod-26.eastus.logic.azure.com:443/workflows/63ff1521c9834a20bc1f82d914167421/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TP0aeDtDfu17o3hpkT5iaI4P4wXaKsyHVWlwgk4Vyx0";

  constructor(public webService: WebService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = 
    this.formBuilder.group({
      username: '',
      name: '',
      surname: '',
      birthdate:'',
      email:'',
      password:'',
      Bio:'',
      });
  }

  submitNewAsset() {
    this.postNewUser(this.userForm.value)
    .subscribe((response: any) => {
      console.log("submitNewAsset")
      this.userForm.reset();
      console.log(response);
      console.log(this.userForm.value);
    })
  }

  postNewUser(data: any) {
    let postData = new FormData();
    postData.append("username", data.username);
    postData.append("name", data.name);
    postData.append("surname", data.surname);
    postData.append("birthdate", data.birthdate);
    postData.append("email", data.email);
    postData.append("password", data.password);
    postData.append("Bio", data.Bio);
    return this.http.post(this.postNewUsers, postData); 
  }

}
