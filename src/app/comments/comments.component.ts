import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: any = [];

  constructor(public webService: WebService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.comments = this.webService.getAllComments(this.route.snapshot.params['id']);

    console.log(Response)
  }

}
