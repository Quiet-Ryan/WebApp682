import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
UserID : any;

  constructor(public webService: WebService) { }

  ngOnInit(): void {
    
    this.UserID = sessionStorage.getItem('loginId');
    this.webService.getOneUser(this.UserID)
    this.webService.getUserFollowers();

  }



}
 



