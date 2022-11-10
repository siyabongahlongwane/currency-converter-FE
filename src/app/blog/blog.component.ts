import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  user: any = {};

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
  }

}
