import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
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
      value: this.counts.activeUsers,
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
      name: 'Inactive Users',
      class: 'redBackground',
      color: 'redColor',
      value: 0,
      route: '../users',
    },
  ];
  constructor(private userService: UserService, private common: CommonService) { }

  ngOnInit(): void {
    this.userService.getUsersCount('api/users/getUserCount').subscribe(res => {
      console.log(res)
      this.counts['activeUsers'] = res?.count;
      console.log(this.counts)
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }
}
