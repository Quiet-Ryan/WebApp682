import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  user: any;
  pass: any;

  constructor(public webService: WebService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = 
    this.formBuilder.group({
      username: '',
      password:''
      });
  }

  login() {

    this.webService.getLogin(this.user, this.pass);
    console.log(this.webService.getLogin(this.user, this.pass));
    console.log(this.loginForm.value);
    sessionStorage.setItem('loginUser',this.user);
    this.webService.getOneUser(this.loginForm.value)
    }


    onKey(event: any) {
      /**testing event  change below */
      console.log(event)
      this.user = event.target.value;
      console.log(this.user)
    }

    onKey2(event: any) {
      /**testing event  change below */
      /**testing event  change below */
      console.log(event)
      this.pass = event.target.value;
      console.log(this.pass)
    }

}

