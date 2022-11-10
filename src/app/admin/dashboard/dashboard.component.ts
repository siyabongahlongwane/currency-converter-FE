import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  counts = {
    activeUsers: 0,
    pendingPosts: 0,
    comments: 0,
    inActiveUsers: 0,
  }
  dashboardCards = [
    {
      icon: 'group',
      name: 'Active Users',
      class: 'greenBackground',
      color: 'greenColor',
      value: 0,
      route: '../users',
    },
    {
      icon: 'pending_actions',
      name: 'Pending Posts',
      class: 'blueBackground',
      color: 'blueColor',
      value: 0,
      route: '../posts',
    },
    {
      icon: 'comment',
      name: 'Review Comments',
      class: 'orangeBackground',
      color: 'orangeColor',
      value: 0,
      route: '../comments',
    },
    {
      icon: 'person_off',
      name: 'Deleted Users',
      class: 'redBackground',
      color: 'redColor',
      value: 0,
      route: '../users',
    },
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
